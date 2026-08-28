import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "10mb" }));

  // Initialize Gemini lazily on request
  const getGeminiClient = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return null;
    return new GoogleGenAI({ apiKey });
  };

  // Health check API
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", appName: "التعلم الممتع - رنيم فاي" });
  });

  // Gemini AI Assistant / Educational Recommender API
  app.post("/api/ai-tutor", async (req, res) => {
    try {
      const { prompt, appsContext } = req.body;
      if (!prompt) {
        return res.status(400).json({ error: "الرجاء كتابة سؤالك أولاً" });
      }

      const ai = getGeminiClient();
      if (!ai) {
        return res.json({
          reply: `أهلاً بك في منصَّة التَّعَلُّم المُمْتِع! 👋
يمكنني مساعدتك في توجيه طفلك واختيار التَّطبيق التَّعليميِّ الأنسب من مكتبة تطبيقاتنا (لغة عربيَّة، رياضيات، علوم، إسلاميَّة، ألعاب).
(ملاحظة: تفعيل المساعد الذَّكيِّ يتطلَّب ضبط GEMINI_API_KEY في إعدادات البيئة).`
        });
      }

      const systemInstruction = `أنت "مساعد التَّعلُّم المُمْتِع" للأطفال وأولياء الأمور والمعلِّمين في منصَّة "رنيم فاي | التَّعلُّم المُمْتِع".
منصَّتنا تقدِّم تطبيقات تعليميَّة تفاعليَّة للأطفال باللُّغة العربيَّة في سنِّ التَّمدرس، وتغطِّي كلَّ الأطوار في المرحلة الابتدائيَّة، وفق مناهج وزارة التَّربية الوطنيَّة.

قائمة التَّطبيقات المتاحة بالمنصَّة:
${JSON.stringify(appsContext || [], null, 2)}

مهامك:
1. الإجابة بلغة عربيَّة مشجِّعة وبسيطة وودودة ومناسبة للأطفال والأولياء.
2. اقتراح التَّطبيقات المناسبة من القائمة أعلاه بناءً على عمر الطفل والمادَّة المستهدفة (رياضيات، لغة عربيَّة، علوم...).
3. شرح مفاهيم تعليميَّة بسيطة أو تقديم نصائح تربويَّة.
4. استخدم الإيموجيات الملوَّنة والأسلوب المحفِّز.`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
          { role: "user", parts: [{ text: `${systemInstruction}\n\nسؤال المستخدم: ${prompt}` }] }
        ]
      });

      const replyText = response.text || "عذراً، لم أستطع فهم السؤال بشكل كامل. حاول صياغته مرة أخرى!";
      return res.json({ reply: replyText });
    } catch (err: any) {
      console.error("AI Tutor Error:", err);
      return res.status(500).json({ error: "حدث خطأ في التواصل مع المساعد الذكي. يرجى المحاولة لاحقاً." });
    }
  });

  // Vite middleware for development vs static serve for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 [Raniim Fey Platform] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
