import React, { useState } from "react";
import { X, Lock, Plus, Trash2, Edit3, Download, Upload, RefreshCw, Layers } from "lucide-react";
import { AppItem } from "../types";
import { BUILTIN_CATEGORIES } from "../data/initialApps";

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  apps: AppItem[];
  onSaveApp: (app: AppItem, editIndex: number) => void;
  onDeleteApp: (index: number) => void;
  customCategories: string[];
  onDeleteCustomCat: (catName: string) => void;
  onExportData: () => void;
  onImportData: (file: File) => void;
  onResetDefault: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  apps,
  onSaveApp,
  onDeleteApp,
  customCategories,
  onDeleteCustomCat,
  onExportData,
  onImportData,
  onResetDefault,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [passError, setPassError] = useState(false);

  // Reset password field and errors whenever modal opens
  React.useEffect(() => {
    if (isOpen) {
      setPasswordInput("");
      setPassError(false);
    }
  }, [isOpen]);

  const [activeTab, setActiveTab] = useState<"list" | "form" | "cats" | "backup">("list");
  const [editIndex, setEditIndex] = useState(-1);

  // Form State
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [url, setUrl] = useState("");
  const [cat, setCat] = useState("اللغة العربية");
  const [customCatInput, setCustomCatInput] = useState("");
  const [age, setAge] = useState("");
  const [icon, setIcon] = useState("📱");
  const [isPaid, setIsPaid] = useState(false);
  const [paidPass, setPaidPass] = useState("");
  const [formMsg, setFormMsg] = useState("");

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput.trim() === "رنيم2026") {
      setIsAuthenticated(true);
      setPassError(false);
    } else {
      setPassError(true);
    }
  };

  const handleEditClick = (index: number) => {
    const target = apps[index];
    setEditIndex(index);
    setName(target.name);
    setDesc(target.desc);
    setUrl(target.url || "");
    setCat(target.cat);
    setAge(target.age || "");
    setIcon(target.icon || "📱");
    setIsPaid(!!target.paid);
    setPaidPass(target.paidPass || "");
    setActiveTab("form");
  };

  const handleResetForm = () => {
    setEditIndex(-1);
    setName("");
    setDesc("");
    setUrl("");
    setCat("اللغة العربية");
    setCustomCatInput("");
    setAge("");
    setIcon("📱");
    setIsPaid(false);
    setPaidPass("");
    setFormMsg("");
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    const finalCat = cat === "__new__" ? customCatInput.trim() : cat;

    if (!name || !desc || !finalCat) {
      setFormMsg("⚠️ الاسم والوصف والتصنيف هي حقول إلزامية");
      return;
    }

    if (isPaid && !paidPass.trim()) {
      setFormMsg("⚠️ يرجى تعيين كلمة سر للتطبيق المدفوع");
      return;
    }

    const appObj: AppItem = {
      name,
      desc,
      url: url || "#",
      cat: finalCat,
      age: age || "للجميع",
      icon: icon || "📱",
      paid: isPaid,
      paidPass: isPaid ? paidPass.trim() : "",
    };

    onSaveApp(appObj, editIndex);
    setFormMsg("✅ تم الحفظ بنجاح!");
    setTimeout(() => {
      handleResetForm();
      setActiveTab("list");
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/75 backdrop-blur-md flex items-center justify-center p-3 md:p-6 animate-fade-in">
      <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1aab8a] via-[#12977c] to-[#0d8060] p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-amber-300" />
            <h2 className="font-bold text-base font-tajawal">لوحة تحكم رنيم فاي</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {!isAuthenticated ? (
          /* Password Screen */
          <form onSubmit={handleLogin} className="p-8 text-center space-y-4 max-w-sm mx-auto">
            <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-2xl">
              🔒
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              أدخل كلمة المرور الخاصة بالإدارة للوصول لإعدادات المنصة
            </p>
            <input
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              placeholder="أدخل كلمة المرور..."
              className="w-full px-4 py-2.5 text-center text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-[#1aab8a]"
              autoFocus
            />
            {passError && (
              <p className="text-xs text-red-500 font-bold">❌ كلمة السر غير صحيحة</p>
            )}
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#1aab8a] to-[#0d8060] text-white font-bold text-xs hover:brightness-110 shadow-md"
            >
              دخول الإدارة
            </button>
          </form>
        ) : (
          /* Admin Panel */
          <div className="flex flex-col flex-1 overflow-hidden">
            {/* Tab Bar */}
            <div className="flex border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 px-2 pt-2">
              <button
                onClick={() => setActiveTab("list")}
                className={`px-3 py-2 text-xs font-bold rounded-t-xl transition-all ${
                  activeTab === "list"
                    ? "bg-white dark:bg-slate-900 text-[#1aab8a] border-t border-x border-slate-200 dark:border-slate-800"
                    : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                }`}
              >
                📋 قائمة التطبيقات ({apps.length})
              </button>
              <button
                onClick={() => {
                  handleResetForm();
                  setActiveTab("form");
                }}
                className={`px-3 py-2 text-xs font-bold rounded-t-xl transition-all ${
                  activeTab === "form"
                    ? "bg-white dark:bg-slate-900 text-[#1aab8a] border-t border-x border-slate-200 dark:border-slate-800"
                    : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                }`}
              >
                ➕ إضافة / تعديل
              </button>
              <button
                onClick={() => setActiveTab("cats")}
                className={`px-3 py-2 text-xs font-bold rounded-t-xl transition-all ${
                  activeTab === "cats"
                    ? "bg-white dark:bg-slate-900 text-[#1aab8a] border-t border-x border-slate-200 dark:border-slate-800"
                    : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                }`}
              >
                🏷️ التصنيفات
              </button>
              <button
                onClick={() => setActiveTab("backup")}
                className={`px-3 py-2 text-xs font-bold rounded-t-xl transition-all ${
                  activeTab === "backup"
                    ? "bg-white dark:bg-slate-900 text-[#1aab8a] border-t border-x border-slate-200 dark:border-slate-800"
                    : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                }`}
              >
                💾 نسخ احتياطي
              </button>
            </div>

            {/* Tab Body */}
            <div className="p-4 overflow-y-auto flex-1">
              {/* TAB 1: LIST */}
              {activeTab === "list" && (
                <div className="space-y-2">
                  {apps.map((app, index) => (
                    <div
                      key={index}
                      className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl flex items-center justify-between gap-3 text-xs border border-slate-100 dark:border-slate-800"
                    >
                      <div className="flex items-center gap-2.5 overflow-hidden">
                        <span className="text-base shrink-0">{app.icon || "📱"}</span>
                        <div className="truncate">
                          <span className="font-bold text-slate-800 dark:text-slate-100 block truncate">
                            {app.name}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            {app.cat} • {app.paid ? "💎 مدفوع" : "🆓 مجاني"}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => handleEditClick(index)}
                          className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300 hover:bg-emerald-200"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onDeleteApp(index)}
                          className="p-1.5 rounded-lg bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300 hover:bg-red-200"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 2: FORM */}
              {activeTab === "form" && (
                <form onSubmit={handleSubmitForm} className="space-y-3 max-w-lg mx-auto text-xs">
                  <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100 font-tajawal">
                    {editIndex >= 0 ? "✏️ تعديل بيانات التطبيق" : "➕ إضافة تطبيق جديد"}
                  </h3>

                  <div>
                    <label className="block font-bold mb-1">اسم التطبيق *</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="مثال: رحلة الحروف والكلمات"
                      className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-bold mb-1">الوصف المختصر *</label>
                    <textarea
                      value={desc}
                      onChange={(e) => setDesc(e.target.value)}
                      placeholder="وصف مبسط لأهداف التطبيق..."
                      rows={2}
                      className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 resize-none"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block font-bold mb-1">رابط التطبيق (URL)</label>
                      <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="https://..."
                        className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                      />
                    </div>

                    <div>
                      <label className="block font-bold mb-1">التصنيف *</label>
                      <select
                        value={cat}
                        onChange={(e) => setCat(e.target.value)}
                        className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                      >
                        {BUILTIN_CATEGORIES.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                        {customCategories.map((c) => (
                          <option key={c} value={c}>
                            📌 {c}
                          </option>
                        ))}
                        <option value="__new__">➕ تصنيف جديد...</option>
                      </select>
                    </div>
                  </div>

                  {cat === "__new__" && (
                    <div>
                      <label className="block font-bold mb-1 text-emerald-600">اسم التصنيف الجديد *</label>
                      <input
                        type="text"
                        value={customCatInput}
                        onChange={(e) => setCustomCatInput(e.target.value)}
                        placeholder="أدخل اسم التصنيف..."
                        className="w-full p-2 rounded-xl border border-emerald-500 bg-white dark:bg-slate-800"
                      />
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block font-bold mb-1">الفئة العمرية</label>
                      <input
                        type="text"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        placeholder="الصف 1–3 / 4–6 سنوات"
                        className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                      />
                    </div>

                    <div>
                      <label className="block font-bold mb-1">الأيقونة (إيموجي)</label>
                      <input
                        type="text"
                        value={icon}
                        onChange={(e) => setIcon(e.target.value)}
                        placeholder="📱 / 📖 / 🧮"
                        className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-center"
                      />
                    </div>
                  </div>

                  {/* Paid Checkbox */}
                  <div className="p-3 bg-amber-50 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-800/50 space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer font-bold text-amber-900 dark:text-amber-300">
                      <input
                        type="checkbox"
                        checked={isPaid}
                        onChange={(e) => setIsPaid(e.target.checked)}
                        className="accent-amber-500 w-4 h-4"
                      />
                      <span>💎 تطبيق مدفوع (يتطلب رمز سر لفتحه)</span>
                    </label>

                    {isPaid && (
                      <input
                        type="text"
                        value={paidPass}
                        onChange={(e) => setPaidPass(e.target.value)}
                        placeholder="رمز السر المخصص لهذا التطبيق..."
                        className="w-full p-2 rounded-xl border border-amber-400 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100"
                      />
                    )}
                  </div>

                  {formMsg && (
                    <p className="text-center font-bold text-[#1aab8a]">{formMsg}</p>
                  )}

                  <div className="flex gap-2 pt-2">
                    <button
                      type="submit"
                      className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#1aab8a] to-[#0d8060] text-white font-bold"
                    >
                      حفظ البيانات
                    </button>
                    <button
                      type="button"
                      onClick={handleResetForm}
                      className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500"
                    >
                      إلغاء
                    </button>
                  </div>
                </form>
              )}

              {/* TAB 3: CATEGORIES */}
              {activeTab === "cats" && (
                <div className="space-y-4 text-xs">
                  <div>
                    <h4 className="font-bold mb-2 text-slate-700 dark:text-slate-300">
                      🔒 التصنيفات المدمجة بالمنصة
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {BUILTIN_CATEGORIES.map((c) => (
                        <span
                          key={c}
                          className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 font-semibold"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold mb-2 text-slate-700 dark:text-slate-300">
                      📌 التصنيفات المخصصة من طرفك
                    </h4>
                    {customCategories.length === 0 ? (
                      <p className="text-slate-400 py-2">لا توجد تصنيفات مخصصة حالياً</p>
                    ) : (
                      <div className="space-y-1.5">
                        {customCategories.map((c) => (
                          <div
                            key={c}
                            className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl flex items-center justify-between border border-slate-100 dark:border-slate-800"
                          >
                            <span className="font-bold">📌 {c}</span>
                            <button
                              onClick={() => onDeleteCustomCat(c)}
                              className="px-2.5 py-1 rounded-lg bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300 font-bold hover:bg-red-200"
                            >
                              حذف
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 4: BACKUP */}
              {activeTab === "backup" && (
                <div className="space-y-3 text-xs max-w-md mx-auto py-2">
                  <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl flex items-center justify-between gap-3 border border-slate-100 dark:border-slate-800">
                    <div>
                      <div className="font-bold text-slate-800 dark:text-slate-100">تصدير بيانات المنصة</div>
                      <div className="text-[10px] text-slate-400">تنزيل نسخة احتياطية بصيغة JSON</div>
                    </div>
                    <button
                      onClick={onExportData}
                      className="px-3.5 py-2 rounded-xl bg-amber-500 text-white font-bold flex items-center gap-1.5 hover:brightness-110"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>تصدير</span>
                    </button>
                  </div>

                  <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl flex items-center justify-between gap-3 border border-slate-100 dark:border-slate-800">
                    <div>
                      <div className="font-bold text-slate-800 dark:text-slate-100">استيراد بيانات من ملف</div>
                      <div className="text-[10px] text-slate-400">رفع ملف JSON لاستعادة البيانات</div>
                    </div>
                    <label className="px-3.5 py-2 rounded-xl bg-emerald-600 text-white font-bold flex items-center gap-1.5 cursor-pointer hover:brightness-110">
                      <Upload className="w-3.5 h-3.5" />
                      <span>استيراد</span>
                      <input
                        type="file"
                        accept=".json"
                        onChange={(e) => {
                          if (e.target.files?.[0]) onImportData(e.target.files[0]);
                        }}
                        className="hidden"
                      />
                    </label>
                  </div>

                  <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl flex items-center justify-between gap-3 border border-slate-100 dark:border-slate-800">
                    <div>
                      <div className="font-bold text-slate-800 dark:text-slate-100">إعادة الضبط الافتراضي</div>
                      <div className="text-[10px] text-slate-400">استعادة القائمة الأصلية للتطبيقات</div>
                    </div>
                    <button
                      onClick={onResetDefault}
                      className="px-3.5 py-2 rounded-xl bg-red-600 text-white font-bold flex items-center gap-1.5 hover:brightness-110"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>استعادة</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
