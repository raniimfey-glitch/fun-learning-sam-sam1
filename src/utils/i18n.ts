import { AppItem } from "../types";

export type Language = "ar" | "en" | "fr";

export interface Translations {
  // Brand & General
  brandName: string;
  brandSubtitle: string;
  tagline: string;
  close: string;
  save: string;
  cancel: string;
  search: string;
  searchPlaceholder: string;
  all: string;
  loading: string;
  preview: string;
  openFullscreen: string;
  free: string;
  paid: string;
  paidRequired: string;
  comingSoon: string;
  completed: string;
  markDone: string;
  rate: string;
  ratingTitle: string;
  selectStars: string;
  commentPlaceholder: string;
  sendRating: string;
  reviews: string;
  noReviewsYet: string;
  starsCount: string;
  noAppsFound: string;

  // Header & Viewport
  headerAdminHint: string;
  viewportLabel: string;
  viewportFull: string;
  viewportTablet: string;
  viewportMobile: string;
  viewportRestore: string;
  viewportPreviewing: string;
  login: string;
  mainMenu: string;
  homeNav: string;
  aboutNav: string;
  readingMode: string;
  nightMode: string;
  dayMode: string;
  aiTutorNav: string;
  myJourneyNav: string;
  accountNav: string;
  languageSelect: string;

  // Hero Section
  heroBadge: string;
  heroTitlePrefix: string;
  heroTitleHighlight: string;
  heroDesc: string;
  heroBadgeCurriculum: string;
  heroBadgeInteractive: string;
  heroBadgeLanguage: string;

  // Apps View & Filters
  appsSection: string;
  allEducationalApps: string;
  appsForSubject: string;
  appsCount: string;
  appSingular: string;
  returnToHome: string;

  // App Categories
  catArabic: string;
  catMath: string;
  catScience: string;
  catCivic: string;
  catIslamic: string;
  catGames: string;
  catFrench: string;
  catHistoryGeo: string;
  catEnglish: string;

  // Modals
  // About Modal
  aboutTitle: string;
  aboutWhoAmI: string;
  aboutWhoAmIDesc: string;
  aboutWhoAmIAuthor: string;
  aboutExperience: string;
  aboutWhyProject: string;
  aboutWhyProjectDesc: string;
  aboutWhatDistinguishes: string;
  aboutWhatDistinguishesDesc: string;

  // Journey Modal
  journeyTitle: string;
  journeyCompletedApps: string;
  journeyPoints: string;
  journeyBadges: string;
  journeyBadgesTitle: string;
  journeyBadgesHeading: string;
  journeyCompletedTitle: string;
  journeyCompletedRecent: string;
  journeyEmptyState: string;
  journeyNoCompleted: string;
  badgeEarned: string;
  badgeRequired: string;
  badgeFirstStep: string;
  badgeThreeApps: string;
  badgeFiveHero: string;
  badgeTenStar: string;
  badgeTwentyAmbassador: string;

  // AI Tutor Modal
  aiTutorTitle: string;
  aiTutorSubtitle: string;
  aiTutorWelcome: string;
  aiTutorThinking: string;
  aiTutorPlaceholder: string;
  aiTutorInputPlaceholder: string;
  aiTutorError: string;

  // Unlock Modal
  unlockTitle: string;
  unlockSubtitle: string;
  unlockTargetApp: string;
  unlockPasscodePlaceholder: string;
  unlockButton: string;
  unlockError: string;
  unlockSuccess: string;

  // Auth Modal
  authTitle: string;
  authAccountTitle: string;
  authLoginTab: string;
  authSignupTab: string;
  authFullName: string;
  authFullNamePlaceholder: string;
  authEmail: string;
  authPassword: string;
  authLoginButton: string;
  authSignupButton: string;
  authWelcomeUser: string;

  // Toast notifications
  toastFavAdded: string;
  toastFavRemoved: string;
  toastDoneSuccess: string;
  toastDoneRemoved: string;
  toastMustPreviewFirst: string;
  toastNightMode: string;
  toastDayMode: string;
  toastLangChanged: string;
  toastAppDeleted: string;
  toastCatDeleted: string;
  toastBackupExported: string;
  toastBackupImported: string;
  toastInvalidFile: string;

  // Footer
  footerAuthor: string;
  footerRights: string;
}

export const translations: Record<Language, Translations> = {
  ar: {
    brandName: "رنيم فاي",
    brandSubtitle: "التَّعلُّم المُمْتِع",
    tagline: "مَنَصَّةُ التَّطْبِيقَاتِ التَّعْلِيمِيَّةِ التَّفَاعُلِيَّةِ",
    close: "إغلاق",
    save: "حفظ",
    cancel: "إلغاء",
    search: "بحث",
    searchPlaceholder: "ابحث عن تطبيقٍ تعليميٍّ أو مادةٍ دراسيةٍ...",
    all: "الكلّ",
    loading: "جَارٍ تحميل التَّطبيق التَّفاعليِّ...",
    preview: "معاينة",
    openFullscreen: "فتح النافذة كاملاً",
    free: "مجاني",
    paid: "مدفوع",
    paidRequired: "تطبيق مدفوع (يتطلب رمز فتح)",
    comingSoon: "قريباً",
    completed: "مكتمل",
    markDone: "أكملت",
    rate: "تقييم",
    ratingTitle: "تقييم التَّطبيق",
    selectStars: "اختر عدد النُّجوم",
    commentPlaceholder: "اكتب تعليقك وانطباعك عن التَّطبيق (اختياري)...",
    sendRating: "إرسال التَّقييم",
    reviews: "التَّقييمات والآراء",
    noReviewsYet: "لا توجد تقييماتٌ بعدُ — كن أوَّل من يُقيِّم هذا التَّطبيق! 🌟",
    starsCount: "نجوم",
    noAppsFound: "لم نجد أي تطبيقات مطابقة لخيارات البحث الحالية",

    headerAdminHint: "رنيم فاي | التَّعلُّم المُمْتِع (اضغط 5 مرَّات للوحة التَّحكُّم)",
    viewportLabel: "معاينة حجم الشاشة",
    viewportFull: "الحجم الحالي",
    viewportTablet: "حجم اللوح الرقمي",
    viewportMobile: "حجم الهاتف",
    viewportRestore: "استعادة الحجم الكامل ✕",
    viewportPreviewing: "معاينة حجم",
    login: "دخول",
    mainMenu: "القائمة الرئيسية",
    homeNav: "الواجهة الرَّئيسيَّة",
    aboutNav: "عن المَشْروعِ",
    readingMode: "وضع القراءة",
    nightMode: "الوضع اللّيليّ",
    dayMode: "الوضع النّهاريّ",
    aiTutorNav: "مساعد التَّعلُّم الذَّكيّ",
    myJourneyNav: "رحلتي في التَّعلُّم",
    accountNav: "حساب المتعلم",
    languageSelect: "اللغة",

    heroBadge: "مَنَصَّةُ التَّطْبِيقَاتِ التَّعْلِيمِيَّةِ التَّفَاعُلِيَّةِ",
    heroTitlePrefix: "تَعلَّم اليوم بطريقة",
    heroTitleHighlight: "ممتعة وشيِّقة",
    heroDesc: "بوابة تعليمية رقمية مستقلة متكاملة ، تقدم تطبيقات تعليمية تفاعلية باللغة العربية موجهة لمتعلمي رياض الاطفال وكل مستويات المرحلة الإبتدائية ،وفق مناهج وزارة التربية الوطنية الجزايرية",
    heroBadgeCurriculum: "مناهج ابتدائيَّة متوافقة",
    heroBadgeInteractive: "تطبيقات تفاعليَّة شَيِّقة",
    heroBadgeLanguage: "لغة عربيَّة فصيحة",

    appsSection: "قَسْمُ التَّطْبِيقَاتِ",
    allEducationalApps: "جَمِيعُ التَّطْبِيقَاتِ التَّعْلِيمِيَّةِ",
    appsForSubject: "تَطْبِيقَاتُ مَادَّةِ:",
    appsCount: "تطبيقات",
    appSingular: "تطبيق",
    returnToHome: "الرُّجوعُ لِلصَّفْحَةِ الرَّئِيسِيَّةِ",

    catArabic: "اللغة العربية",
    catMath: "الرياضيات",
    catScience: "العلوم والتكنولوجيا",
    catCivic: "المدنية",
    catIslamic: "الاسلامية",
    catGames: "الألعاب",
    catFrench: "اللغة الفرنسية",
    catHistoryGeo: "التاريخ والجغرافيا",
    catEnglish: "اللغة الإنجليزية",

    aboutTitle: "مَنَصَّةُ \" التّعلّم الممتع \" fun learning",
    aboutWhoAmI: "مَنْ أَنَا؟",
    aboutWhoAmIDesc: "أَنَا سَمِيرَةُ عَبْد الصَّدُوقِ، أُسْتَاذَةٌ فِي الطَّوْرِ الْإِبْتِدَائِيِّ بِخِبْرَةٍ مَيْدَانِيَّةٍ تَمْتَدُّ لِـ 16 عَاماً. جَمَعْتُ بَيْنَ شَغَفِي بِتَطْوِيرِ الْبَرْمَجِيَّاتِ التَّعْلِيمِيَّةِ وَفَهْمِي الْعَمِيقِ لِوَاقِعِ الْفَصْلِ الدِّرَاسِيِّ، لِأَبْتَكِرَ حُلُولاً رَقَمِيَّةً تُلَبِّي مَا يَحْتَاجُهُ التِّلْمِيذُ وَتُشْعِلُ فِيهِ شَرارَةَ الْحَمَاسِ وَالْفُضُولِ!",
    aboutWhoAmIAuthor: "سَمِيرَةُ عَبْد الصَّدُوقِ",
    aboutExperience: "أُسْتَاذَةٌ فِي الطَّوْرِ الْإِبْتِدَائِيِّ بِخِبْرَةٍ مَيْدَانِيَّةٍ تَمْتَدُّ لِـ 16 عَاماً",
    aboutWhyProject: "لِمَاذَا هَذَا الْمَشْرُوعُ؟",
    aboutWhyProjectDesc: "اِنْطَلَقَتْ فِكْرَةُ إِنْشَاءِ مَنَصَّةِ \"التَّعَلُّمِ الْمُمْتِعِ\" سَدّاً لِلْفَجْوَةِ الْحَاصِلَةِ فِي السَّاحَةِ الْجَزَائِرِيَّةِ جَرَّاءَ افْتِقَارِهَا لِلتَّطْبِيقَاتِ التَّعْلِيمِيَّةِ التَّفَاعُلِيَّةِ، وَسَعْياً لِإِثْرَاءِ الْمَحْتَوَى الْوَطَنِيِّ وَالْعَرَبِيِّ بِبَرْمَجِيَّاتٍ رَقَمِيَّةٍ هَادِفَةٍ. نَعْمَلُ عَلَى تَحْوِيلِ مَنَاهِجِ وِزَارَةِ التَّرْبِيَةِ الْوَطَنِيَّةِ الْجَزَائِرِيَّةِ إِلَى أَلْعَابٍ وَتَحَدِّيَاتٍ تَفَاعُلِيَّةٍ تَصْنَعُ الْمَعْرِفَةَ بِالتَّجْرِبَةِ وَالْمُتْعَةِ، وَتَمْنَحُ أَبْنَاءَنَا طَاقَةً اسْتِكْشَافِيَّةً لَا حُدُودَ لَهَا.",
    aboutWhatDistinguishes: "مَا الَّذِي يُمَيِّزُنَا؟",
    aboutWhatDistinguishesDesc: "تَطْبِيقَاتُنَا هِيَ الثَّمَرَةُ الْحَقِيقِيَّةُ لِانْدِمَاجِ الْخِبْرَةِ التَّرْبَوِيَّةِ الْأَصِيلَةِ مَعَ الشَّغَفِ الْبَرْمَجِيِّ! نُصَمِّمُ مُحْتَوَانَا بِرُؤْيَةٍ تَجْمَعُ بَيْنَ الدِّقَّةِ التَّعْلِيمِيَّةِ وَالْجَاذِبِيَّةِ الرَّقَمِيَّةِ، لِنُقَدِّمَ بِيئَةً تَفَاعُلِيَّةً مُحَفِّزَةً تَضْمَنُ أَعْلَى مَعَايِيرِ الْجَوْدَةِ وَالْفَاعِلِيَّةِ.",

    journeyTitle: "رحلتي في التَّعلُّم",
    journeyCompletedApps: "تطبيقٌ مكتملٌ",
    journeyPoints: "نقطة تميُّز",
    journeyBadges: "شارات مكتسبة",
    journeyBadgesTitle: "الشَّارات والأوسمة التَّعليميَّة",
    journeyBadgesHeading: "الشَّارات والأوسمة التَّعليميَّة",
    journeyCompletedTitle: "التَّطبيقات المكتملة حديثاً",
    journeyCompletedRecent: "التَّطبيقات المكتملة حديثاً",
    journeyEmptyState: "لم تُكمِل أيَّ تطبيقٍ بعدُ — ابدأ الآن بالضَّغط على زرِّ \"أكملتُ\" بأيِّ تطبيقٍ! 🚀",
    journeyNoCompleted: "لم تُكمِل أيَّ تطبيقٍ بعدُ — ابدأ الآن بالضَّغط على زرِّ \"أكملتُ\" بأيِّ تطبيقٍ! 🚀",
    badgeEarned: "مكتسبة ✓",
    badgeRequired: "أكمل {n} تطبيقات",
    badgeFirstStep: "أوَّل خطوة",
    badgeThreeApps: "ثلاثة تطبيقات",
    badgeFiveHero: "بطل الخمسة",
    badgeTenStar: "نجم العشرة",
    badgeTwentyAmbassador: "سفير التَّعلُّم",

    aiTutorTitle: "مساعد التَّعلُّم المُمْتِع الذَّكيّ",
    aiTutorSubtitle: "إرشاد تعليمي للطلبة وأولياء الأمور",
    aiTutorWelcome: "مرحباً بك! 👋 أنا مساعد التَّعلُّم الذَّكيّ في منصَّة رنيم فاي. يمكنني إرشادك وتوجيهك لاختيار أفضل التَّطبيقات التَّعليميَّة المناسبة لطفلك ومساعدتك في المناهج والمفاهيم الدِّراسيَّة. ماذا تحبّ أن تسأل اليوم؟",
    aiTutorThinking: "جاري التفكير وصياغة الإجابة...",
    aiTutorPlaceholder: "اسأل عن أفضل تطبيق لمادة معينة أو سن طفلك...",
    aiTutorInputPlaceholder: "اسأل عن أفضل تطبيق لمادة معينة أو سن طفلك...",
    aiTutorError: "يبدو أنَّ هناك بطءً في الاتِّصال بالسِّيرفر. يمكنك استعراض قائمة التَّطبيقات التَّفاعليَّة مباشرةً عبر شريط التَّصنيفات والبحث بالأعلى!",

    unlockTitle: "تطبيقٌ مدفوعٌ (يتطلَّب رمز فتح)",
    unlockSubtitle: "أَدْخِلْ كلمة السِّرِّ الخاصَّة بهذا التَّطبيق للمتابعة",
    unlockTargetApp: "التَّطبيق",
    unlockPasscodePlaceholder: "كلمة السِّرِّ الخاصَّة بالتَّطبيق...",
    unlockButton: "فتح التَّطبيق",
    unlockError: "❌ كلمة السِّرِّ غير صحيحة، يُرجَى إعادة المحاولة",
    unlockSuccess: "🔓 تمَّ فتح التَّطبيق المدفوع بنجاح!",

    authTitle: "رنيم فاي | حساب المتعلم",
    authAccountTitle: "رنيم فاي | حساب المتعلم",
    authLoginTab: "تسجيل دخول",
    authSignupTab: "حساب جديد",
    authFullName: "الاسم كامل",
    authFullNamePlaceholder: "اسم الطالب أو ولي الأمر...",
    authEmail: "البريد الإلكتروني",
    authPassword: "كلمة السِّرِّ",
    authLoginButton: "دخول",
    authSignupButton: "إنشاء حساب",
    authWelcomeUser: "أهلاً بك يا",

    toastFavAdded: "⭐ تمَّت الإضافة للمفَضَّلة",
    toastFavRemoved: "تمَّت الإزالة من المفَضَّلة",
    toastDoneSuccess: "🎉 أحسنتَ! كسبتَ +10 نقاط إنجاز",
    toastDoneRemoved: "تمَّ إلغاء علامة الإنجاز",
    toastMustPreviewFirst: "⚠️ يُرجَى معاينة وتجربة التَّطبيق أوَّلاً قبل وضع علامة الإنجاز! 📱",
    toastNightMode: "🌙 تمَّ تفعيل الوضع اللّيليّ",
    toastDayMode: "☀️ تمَّ تفعيل الوضع النّهاريّ",
    toastLangChanged: "🌐 تم تغيير لغة الواجهة",
    toastAppDeleted: "تم حذف التطبيق من القائمة",
    toastCatDeleted: "تم حذف التصنيف",
    toastBackupExported: "📤 تم تصدير النسخة الاحتياطية بنجاح",
    toastBackupImported: "📥 تم استيراد التطبيقات بنجاح",
    toastInvalidFile: "❌ ملف غير صالح",

    footerAuthor: "التّعلّم الممتع — سميرة عبد الصَّدوق",
    footerRights: "جميع الحقوق محفوظة 2026(c)"
  },
  en: {
    brandName: "Ranim Fay",
    brandSubtitle: "Fun Learning",
    tagline: "Interactive Educational Applications Platform",
    close: "Close",
    save: "Save",
    cancel: "Cancel",
    search: "Search",
    searchPlaceholder: "Search for an educational app or subject...",
    all: "All",
    loading: "Loading interactive application...",
    preview: "Preview",
    openFullscreen: "Open Fullscreen",
    free: "Free",
    paid: "Premium",
    paidRequired: "Premium App (Requires Passcode)",
    comingSoon: "Coming Soon",
    completed: "Completed",
    markDone: "Done",
    rate: "Rate",
    ratingTitle: "Rate Application",
    selectStars: "Select Stars Rating",
    commentPlaceholder: "Write your review or feedback (optional)...",
    sendRating: "Submit Review",
    reviews: "Reviews & Ratings",
    noReviewsYet: "No ratings yet — be the first to rate this app! 🌟",
    starsCount: "Stars",
    noAppsFound: "No educational applications found matching your search.",

    headerAdminHint: "Ranim Fay | Fun Learning (Tap 5 times for Admin Panel)",
    viewportLabel: "Screen Viewport Preview:",
    viewportFull: "Full / Default Size",
    viewportTablet: "Tablet Viewport",
    viewportMobile: "Mobile Viewport",
    viewportRestore: "Restore Full View ✕",
    viewportPreviewing: "Previewing",
    login: "Login",
    mainMenu: "Main Menu",
    homeNav: "Home Page 🏠",
    aboutNav: "About the Project",
    readingMode: "Reading Mode",
    nightMode: "Night / Dark Mode",
    dayMode: "Day / Light Mode",
    aiTutorNav: "Smart AI Learning Assistant",
    myJourneyNav: "My Learning Journey",
    accountNav: "Learner Account",
    languageSelect: "Language",

    heroBadge: "INTERACTIVE EDUCATIONAL APPS PLATFORM",
    heroTitlePrefix: "Learn today in a",
    heroTitleHighlight: "fun & engaging way",
    heroDesc: "An independent integrated digital educational platform offering interactive Arabic educational apps tailored for kindergarten and primary school learners, aligned with the Algerian national curriculum.",
    heroBadgeCurriculum: "Primary Curriculum Aligned",
    heroBadgeInteractive: "Engaging & Interactive Apps",
    heroBadgeLanguage: "Fluent & Clear Arabic",

    appsSection: "APPLICATIONS SECTION",
    allEducationalApps: "ALL EDUCATIONAL APPLICATIONS",
    appsForSubject: "Applications for:",
    appsCount: "Apps",
    appSingular: "App",
    returnToHome: "Return to Home Page",

    catArabic: "Arabic Language",
    catMath: "Mathematics",
    catScience: "Science & Tech",
    catCivic: "Civic Education",
    catIslamic: "Islamic Education",
    catGames: "Educational Games",
    catFrench: "French Language",
    catHistoryGeo: "History & Geography",
    catEnglish: "English Language",

    aboutTitle: "Platform \"Fun Learning\" - Ranim Fay",
    aboutWhoAmI: "WHO AM I?",
    aboutWhoAmIDesc: "I am Samira Essadouk, a primary education teacher with 16 years of field experience. I combined my passion for educational software development with my deep understanding of the classroom reality, to innovate digital solutions that meet what students need and ignite their spark of enthusiasm and curiosity!",
    aboutWhoAmIAuthor: "Samira Essadouk",
    aboutExperience: "Primary education teacher with 16 years of field experience",
    aboutWhyProject: "WHY THIS PROJECT?",
    aboutWhyProjectDesc: "The idea of creating the 'Fun Learning' platform arose to bridge the gap in the Algerian landscape resulting from a lack of interactive educational apps, and to enrich national and Arab content with purposeful software. We work to transform Algerian national curricula into interactive games and challenges that build knowledge through experience and joy.",
    aboutWhatDistinguishes: "WHAT MAKES US SPECIAL?",
    aboutWhatDistinguishesDesc: "Our applications are the authentic fruit of merging genuine educational expertise with coding passion! We design our content with a vision combining pedagogical precision and digital appeal, providing a stimulating interactive environment with the highest standards of quality.",

    journeyTitle: "My Learning Journey",
    journeyCompletedApps: "Completed Apps",
    journeyPoints: "Mastery Points",
    journeyBadges: "Earned Badges",
    journeyBadgesTitle: "Educational Badges & Awards",
    journeyBadgesHeading: "Educational Badges & Awards",
    journeyCompletedTitle: "Recently Completed Applications",
    journeyCompletedRecent: "Recently Completed Applications",
    journeyEmptyState: "You haven't completed any apps yet — start now by clicking 'Done' on any app! 🚀",
    journeyNoCompleted: "You haven't completed any apps yet — start now by clicking 'Done' on any app! 🚀",
    badgeEarned: "Earned ✓",
    badgeRequired: "Complete {n} apps",
    badgeFirstStep: "First Step",
    badgeThreeApps: "Three Apps",
    badgeFiveHero: "High Five Hero",
    badgeTenStar: "Ten Star Champion",
    badgeTwentyAmbassador: "Learning Ambassador",

    aiTutorTitle: "Smart AI Learning Assistant",
    aiTutorSubtitle: "Educational guidance for students and parents",
    aiTutorWelcome: "Welcome! 👋 I am the AI learning assistant for Ranim Fay platform. I can help guide you to the best educational apps suitable for your child's age and level, and explain curriculum concepts. What would you like to explore today?",
    aiTutorThinking: "Thinking and drafting an answer...",
    aiTutorPlaceholder: "Ask about apps for a subject or child's age...",
    aiTutorInputPlaceholder: "Ask about apps for a subject or child's age...",
    aiTutorError: "Connection seems slow. You can browse all interactive apps directly via the categories bar and search above!",

    unlockTitle: "Premium App (Requires Passcode)",
    unlockSubtitle: "Enter the passcode for this application to continue",
    unlockTargetApp: "Application",
    unlockPasscodePlaceholder: "Application passcode...",
    unlockButton: "Unlock Application",
    unlockError: "❌ Incorrect passcode, please try again",
    unlockSuccess: "🔓 Premium app unlocked successfully!",

    authTitle: "Ranim Fay | Learner Account",
    authAccountTitle: "Ranim Fay | Learner Account",
    authLoginTab: "Login",
    authSignupTab: "New Account",
    authFullName: "Full Name",
    authFullNamePlaceholder: "Student or parent name...",
    authEmail: "Email Address",
    authPassword: "Password",
    authLoginButton: "Sign In",
    authSignupButton: "Create Account",
    authWelcomeUser: "Welcome,",

    toastFavAdded: "⭐ Added to favorites",
    toastFavRemoved: "Removed from favorites",
    toastDoneSuccess: "🎉 Great job! You earned +10 achievement points",
    toastDoneRemoved: "Completion mark removed",
    toastMustPreviewFirst: "⚠️ Please preview and try the app first before marking it as completed! 📱",
    toastNightMode: "🌙 Night mode enabled",
    toastDayMode: "☀️ Day mode enabled",
    toastLangChanged: "🌐 Language changed",
    toastAppDeleted: "Application removed from list",
    toastCatDeleted: "Category deleted",
    toastBackupExported: "📤 Backup exported successfully",
    toastBackupImported: "📥 Apps imported successfully",
    toastInvalidFile: "❌ Invalid file",

    footerAuthor: "Fun Learning — Samira Abdessadok",
    footerRights: "All Rights Reserved 2026(c)"
  },
  fr: {
    brandName: "Ranim Fay",
    brandSubtitle: "Apprentissage Amusant",
    tagline: "Plateforme d'Applications Éducatives Interactives",
    close: "Fermer",
    save: "Enregistrer",
    cancel: "Annuler",
    search: "Rechercher",
    searchPlaceholder: "Rechercher une application ou une matière...",
    all: "Tous",
    loading: "Chargement de l'application interactive...",
    preview: "Aperçu",
    openFullscreen: "Ouvrir en plein écran",
    free: "Gratuit",
    paid: "Premium",
    paidRequired: "Application Premium (Code requis)",
    comingSoon: "Bientôt",
    completed: "Terminé",
    markDone: "Terminé",
    rate: "Évaluer",
    ratingTitle: "Évaluer l'application",
    selectStars: "Sélectionnez le nombre d'étoiles",
    commentPlaceholder: "Écrivez votre avis ou commentaire (facultatif)...",
    sendRating: "Envoyer l'évaluation",
    reviews: "Avis et Évaluations",
    noReviewsYet: "Aucune évaluation pour le moment — soyez le premier à évaluer cette app ! 🌟",
    starsCount: "Étoiles",
    noAppsFound: "Aucune application éducative trouvée correspondant à votre recherche.",

    headerAdminHint: "Ranim Fay | Apprentissage Amusant (Appuyez 5 fois pour l'Administration)",
    viewportLabel: "Aperçu Taille d'Écran :",
    viewportFull: "Taille Normale / Actuelle",
    viewportTablet: "Aperçu Tablette",
    viewportMobile: "Aperçu Smartphone",
    viewportRestore: "Rétablir Plein Écran ✕",
    viewportPreviewing: "Aperçu",
    login: "Connexion",
    mainMenu: "Menu Principal",
    homeNav: "Accueil 🏠",
    aboutNav: "À propos du projet",
    readingMode: "Mode de lecture",
    nightMode: "Mode Nuit / Sombre",
    dayMode: "Mode Jour / Clair",
    aiTutorNav: "Tuteur IA Intelligent",
    myJourneyNav: "Mon Parcours d'Apprentissage",
    accountNav: "Compte Apprenant",
    languageSelect: "Langue",

    heroBadge: "PLATEFORME D'APPLICATIONS ÉDUCATIVES INTERACTIVES",
    heroTitlePrefix: "Apprenez aujourd'hui de façon",
    heroTitleHighlight: "amusante et captivante",
    heroDesc: "Portail éducatif numérique autonome et intégré, proposant des applications interactives en arabe destinées aux apprenants de maternelle et du primaire, conforme aux programmes du Ministère de l'Éducation Nationale algérien.",
    heroBadgeCurriculum: "Conforme aux programmes primaires",
    heroBadgeInteractive: "Applications interactives et ludiques",
    heroBadgeLanguage: "Arabe clair et soigné",

    appsSection: "SECTION DES APPLICATIONS",
    allEducationalApps: "TOUTES LES APPLICATIONS ÉDUCATIVES",
    appsForSubject: "Applications pour :",
    appsCount: "Applications",
    appSingular: "Application",
    returnToHome: "Retour à l'accueil",

    catArabic: "Langue Arabe",
    catMath: "Mathématiques",
    catScience: "Sciences & Technologies",
    catCivic: "Éducation Civique",
    catIslamic: "Éducation Islamique",
    catGames: "Jeux Éducatifs",
    catFrench: "Langue Française",
    catHistoryGeo: "Histoire & Géographie",
    catEnglish: "Langue Anglaise",

    aboutTitle: "Plateforme « Apprentissage Amusant » fun learning",
    aboutWhoAmI: "QUI SUIS-JE ?",
    aboutWhoAmIDesc: "Je suis Samira Essadouk, professeure de l'enseignement primaire avec 16 ans d'expérience sur le terrain. J'ai allié ma passion pour le développement de logiciels éducatifs à ma compréhension approfondie de la réalité de la classe pour créer des solutions numériques qui répondent aux besoins des élèves et suscitent leur enthousiasme !",
    aboutWhoAmIAuthor: "Samira Essadouk",
    aboutExperience: "Professeure de l'enseignement primaire avec 16 ans d'expérience",
    aboutWhyProject: "POURQUOI CE PROJET ?",
    aboutWhyProjectDesc: "L'idée de créer la plateforme « Apprentissage Amusant » est née pour combler le manque d'applications éducatives interactives dans le paysage algérien et enrichir le contenu national et arabe. Nous œuvrons à transformer les programmes scolaires du ministère de l'Éducation nationale en jeux et défis interactifs stimulant l'apprentissage par la pratique.",
    aboutWhatDistinguishes: "QU'EST-CE QUI NOUS DISTINGUE ?",
    aboutWhatDistinguishesDesc: "Nos applications sont le fruit authentique de la fusion entre l'expertise pédagogique et la passion du code ! Nous concevons notre contenu avec une vision alliant rigueur éducative et attractivité numérique pour offrir un environnement interactif stimulant de haute qualité.",

    journeyTitle: "Mon Parcours d'Apprentissage",
    journeyCompletedApps: "Applications terminées",
    journeyPoints: "Points de mérite",
    journeyBadges: "Badges obtenus",
    journeyBadgesTitle: "Badges & Récompenses Éducatifs",
    journeyBadgesHeading: "Badges & Récompenses Éducatifs",
    journeyCompletedTitle: "Applications récemment terminées",
    journeyCompletedRecent: "Applications récemment terminées",
    journeyEmptyState: "Vous n'avez pas encore terminé d'application — commencez dès maintenant en cliquant sur 'Terminé' ! 🚀",
    journeyNoCompleted: "Vous n'avez pas encore terminé d'application — commencez dès maintenant en cliquant sur 'Terminé' ! 🚀",
    badgeEarned: "Obtenu ✓",
    badgeRequired: "Terminez {n} applications",
    badgeFirstStep: "Premier Pas",
    badgeThreeApps: "Trois Applications",
    badgeFiveHero: "Héros des Cinq",
    badgeTenStar: "Étoile des Dix",
    badgeTwentyAmbassador: "Ambassadeur du Savoir",

    aiTutorTitle: "Tuteur IA d'Apprentissage Intelligent",
    aiTutorSubtitle: "Conseils pédagogiques pour élèves et parents",
    aiTutorWelcome: "Bienvenue ! 👋 Je suis votre assistant pédagogique intelligent sur la plateforme Ranim Fay. Je peux vous guider vers les meilleures applications adaptées au niveau et à l'âge de votre enfant. Que souhaitez-vous découvrir aujourd'hui ?",
    aiTutorThinking: "Réflexion et rédaction de la réponse...",
    aiTutorPlaceholder: "Posez une question sur une matière ou l'âge de votre enfant...",
    aiTutorInputPlaceholder: "Posez une question sur une matière ou l'âge de votre enfant...",
    aiTutorError: "Connexion lente. Vous pouvez explorer directement les applications via la barre de catégories et la recherche ci-dessus !",

    unlockTitle: "Application Premium (Code requis)",
    unlockSubtitle: "Saisissez le mot de passe de cette application pour continuer",
    unlockTargetApp: "Application",
    unlockPasscodePlaceholder: "Mot de passe de l'application...",
    unlockButton: "Déverrouiller l'application",
    unlockError: "❌ Mot de passe incorrect, veuillez réessayer",
    unlockSuccess: "🔓 Application premium déverrouillée avec succès !",

    authTitle: "Ranim Fay | Compte Apprenant",
    authAccountTitle: "Ranim Fay | Compte Apprenant",
    authLoginTab: "Connexion",
    authSignupTab: "Nouveau Compte",
    authFullName: "Nom Complet",
    authFullNamePlaceholder: "Nom de l'élève ou du parent...",
    authEmail: "Adresse E-mail",
    authPassword: "Mot de passe",
    authLoginButton: "Se connecter",
    authSignupButton: "Créer un compte",
    authWelcomeUser: "Bienvenue,",

    toastFavAdded: "⭐ Ajouté aux favoris",
    toastFavRemoved: "Retiré des favoris",
    toastDoneSuccess: "🎉 Bravo ! Vous avez gagné +10 points de réussite",
    toastDoneRemoved: "Marquage terminé annulé",
    toastMustPreviewFirst: "⚠️ Veuillez d'abord prévisualiser et tester l'application avant de la marquer comme terminée ! 📱",
    toastNightMode: "🌙 Mode nuit activé",
    toastDayMode: "☀️ Mode jour activé",
    toastLangChanged: "🌐 Langue modifiée",
    toastAppDeleted: "Application supprimée de la liste",
    toastCatDeleted: "Catégorie supprimée",
    toastBackupExported: "📤 Sauvegarde exportée avec succès",
    toastBackupImported: "📥 Applications importées avec succès",
    toastInvalidFile: "❌ Fichier invalide",

    footerAuthor: "Apprentissage Amusant — Samira Abdessadok",
    footerRights: "Tous droits réservés 2026(c)"
  }
};

export const getStoredLanguage = (): Language => {
  const stored = localStorage.getItem("ranimfay_lang");
  if (stored === "en" || stored === "fr" || stored === "ar") {
    return stored;
  }
  return "ar";
};

export const saveStoredLanguage = (lang: Language): void => {
  localStorage.setItem("ranimfay_lang", lang);
  applyDocumentLanguage(lang);
};

export const applyDocumentLanguage = (lang: Language): void => {
  if (typeof document !== "undefined") {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }
};

export const getAppName = (app: AppItem, lang: Language): string => {
  if (lang === "en" && app.nameEn) return app.nameEn;
  if (lang === "fr" && app.nameFr) return app.nameFr;
  return app.name;
};

export const getAppDesc = (app: AppItem, lang: Language): string => {
  if (lang === "en" && app.descEn) return app.descEn;
  if (lang === "fr" && app.descFr) return app.descFr;
  return app.desc;
};

export const getAppAge = (app: AppItem, lang: Language): string => {
  if (lang === "en" && app.ageEn) return app.ageEn;
  if (lang === "fr" && app.ageFr) return app.ageFr;
  return app.age;
};

export const getCategoryLabel = (category: string, lang: Language): string => {
  const t = translations[lang];
  if (!category) return "";
  const trimmed = category.trim();
  if (trimmed === "all" || trimmed === "الكل") return t.all;

  const lower = trimmed.toLowerCase();
  if (lower.includes("عرب") || lower === "اللغة العربية" || lower === "لغة عربية") return t.catArabic;
  if (lower.includes("رياضيات") || lower === "الرياضيات") return t.catMath;
  if (lower.includes("علوم") || lower === "العلوم والتكنولوجيا" || lower === "العلوم") return t.catScience;
  if (lower.includes("مدنية") || lower === "المدنية" || lower.includes("تربية مدنية")) return t.catCivic;
  if (lower.includes("إسلام") || lower.includes("اسلام") || lower === "الاسلامية" || lower.includes("تربية اسلامية")) return t.catIslamic;
  if (lower.includes("لعب") || lower.includes("ألعاب") || lower === "الألعاب") return t.catGames;
  if (lower.includes("فرنس") || lower === "اللغة الفرنسية") return t.catFrench;
  if (lower.includes("تاريخ") || lower.includes("جغراف")) return t.catHistoryGeo;
  if (lower.includes("إنجليز") || lower.includes("انكليز") || lower === "اللغة الإنجليزية") return t.catEnglish;

  return category;
};

