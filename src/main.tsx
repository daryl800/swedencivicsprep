import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { AlertTriangle, BarChart3, BookOpen, BriefcaseBusiness, CheckCircle2, ChevronDown, ExternalLink, HeartPulse, HelpCircle, Landmark, Layers3, Scale, Sparkles, Star, X, XCircle } from "lucide-react";
import { LESSONS, MIGRATIONSVERKET_CITIZENSHIP_URL, OFFICIAL_STUDY_GUIDE_URL, QUESTIONS, TOPICS } from "./data";
import { loadProgress, recordAnswered, resetProgress } from "./progress";
import type { ExplanationLanguage, Lesson, Progress, Question, Topic, UiLanguage } from "./types";
import "./styles.css";

type Route =
  | { page: "home" }
  | { page: "topic"; topicId: string }
  | { page: "progress" }
  | { page: "flashcards" }
  | { page: "privacy" };

type UiText = {
  eyebrow: string;
  appTitle: string;
  lead: string;
  languageNote: string;
  dailyPrompt: string;
  earlyAccessTitle: string;
  earlyAccessMessage: string;
  officialGuideLink: string;
  studyPathTitle: string;
  studyPathIntro: string;
  studySteps: { title: string; body: string }[];
  chapterMapTitle: string;
  chapterMapIntro: string;
  chapterNames: Record<string, string>;
  chapterSummaries: Record<string, string>;
  topicCoverageLabel: string;
  studyCardLabel: string;
  studyMaterialTitle: string;
  takeawaysTitle: string;
  vocabularyTitle: string;
  chaptersLabel: string;
  topicSelectorLabel: string;
  allTopics: string;
  roadmapStep: (current: number, total: number) => string;
  testKnowledge: string;
  comingNextTitle: string;
  comingNextIntro: string;
  comingNextItems: { title: string; body: string }[];
  progressDashboardTitle: string;
  progressDashboardIntro: string;
  flashcardsTitle: string;
  flashcardsPreview: string;
  flipCard: string;
  nextCard: string;
  backToHome: string;
  overallProgress: string;
  topicAccuracy: string;
  weakTopic: string;
  weakTopicAdvice: (wrong: number) => string;
  recommendedNext: string;
  topicProgress: (completed: number, total: number) => string;
  continuePractice: string;
  startPractice: string;
  reviewLesson: string;
  startWarmup: (count: number) => string;
  backToTopics: string;
  level: string;
  questionProgress: (current: number, total: number) => string;
  coachNote: string;
  showQuestionHelp: string;
  hideQuestionHelp: string;
  questionHelpLabel: string;
  checkAnswer: string;
  nextQuestion: string;
  resetProgress: string;
  readMore: string;
  showLess: string;
  dismiss: string;
  selected: string;
  correct: string;
  incorrect: string;
  correctKicker: string;
  wrongKicker: string;
  correctTitle: string;
  wrongTitle: string;
  bestAnswer: string;
  explanationFallback: string;
  appLanguage: string;
  appLanguageHint: string;
  today: string;
  total: string;
  progressFresh: string;
  progressWarm: string;
  progressGood: string;
  progressSolid: string;
  progressStrong: string;
  topicNames: Record<string, string>;
  topicFlavor: Record<string, string>;
  topicDescriptions: Record<string, string>;
};

const TOPIC_VISUALS = {
  democracy: { icon: Landmark, accent: "blue" },
  rights: { icon: Scale, accent: "green" },
  everyday: { icon: HeartPulse, accent: "rose" },
  authorities: { icon: BriefcaseBusiness, accent: "gold" }
} as const;

const OFFICIAL_CHAPTERS = [
  { id: "country", number: 1, nameSv: "Landet Sverige", topicId: "everyday" },
  { id: "democratic-system", number: 2, nameSv: "Sveriges demokratiska system", topicId: "democracy" },
  { id: "governance", number: 3, nameSv: "Så här styrs Sverige", topicId: "authorities" },
  { id: "elections", number: 4, nameSv: "Politiska val och partier", topicId: "democracy" },
  { id: "law", number: 5, nameSv: "Lag och rätt", topicId: "rights" },
  { id: "media", number: 6, nameSv: "Mediernas roll", topicId: "rights" },
  { id: "human-rights", number: 7, nameSv: "Mänskliga rättigheter", topicId: "rights" },
  { id: "work-economy", number: 8, nameSv: "Arbetsmarknad och privatekonomi", topicId: "everyday" },
  { id: "welfare", number: 9, nameSv: "Välfärdssamhället", topicId: "everyday" },
  { id: "modern-history", number: 10, nameSv: "Sveriges moderna historia", topicId: "everyday" },
  { id: "world", number: 11, nameSv: "Sverige och omvärlden", topicId: "authorities" },
  { id: "secular-state", number: 12, nameSv: "En sekulär stat och ett mångreligiöst land", topicId: "everyday" },
  { id: "traditions", number: 13, nameSv: "Traditioner och högtider", topicId: "everyday" }
] as const;

const UI_TEXT: Record<UiLanguage, UiText> = {
  en: {
    eyebrow: "Prepare for the Swedish citizenship test",
    appTitle: "Swedish Civics Test Preparation",
    lead: "Practice questions about Swedish society to prepare for the citizenship test.",
    languageNote: "Questions and answer options stay in Swedish. The rest of the app follows your selected language.",
    dailyPrompt: "Start with 10 minutes a day.",
    earlyAccessTitle: "Independent guide",
    earlyAccessMessage: `Study with Sverige i fokus

The official study material for the Swedish citizenship test is Sverige i fokus from UHR and Skolverket. It covers Sweden as a country, democracy, how Sweden is governed, elections, law and rights, media and source criticism, human rights, work and private economy, welfare, modern history, international cooperation, religion, and traditions.

Use Swedish Civics Test Preparation as an independent practice guide: read a chapter in Sverige i fokus first, then use these Swedish questions to check what you remember. We are not the official test and we do not copy official exam questions.`,
    officialGuideLink: "Open the official study material",
    studyPathTitle: "A smarter way to study",
    studyPathIntro: "The useful lesson from stronger study apps is not the visual design. It is the study loop: map the official book, practice active recall, and return to weak chapters.",
    studySteps: [
      { title: "1. Read the source", body: "Start with one chapter in Sverige i fokus. Treat the official material as the map." },
      { title: "2. Drill in Swedish", body: "Answer short Swedish questions while the idea is fresh. The language support explains the concept, not the question text." },
      { title: "3. Repeat weak spots", body: "Use your results to decide what to review next instead of rereading everything from the beginning." }
    ],
    chapterMapTitle: "Official chapter coverage",
    chapterMapIntro: "Sverige i fokus is structured around 13 chapters. This MVP groups those chapters into four practice areas so the app stays simple while still pointing back to the official structure.",
    chapterNames: {
      country: "Sweden as a country",
      "democratic-system": "Sweden's democratic system",
      governance: "How Sweden is governed",
      elections: "Political elections and parties",
      law: "Law and justice",
      media: "The role of the media",
      "human-rights": "Human rights",
      "work-economy": "Labour market and private economy",
      welfare: "The welfare society",
      "modern-history": "Sweden's modern history",
      world: "Sweden and the world",
      "secular-state": "A secular state and a multi-religious country",
      traditions: "Traditions and holidays"
    },
    chapterSummaries: {
      country: "geography, population, resources",
      "democratic-system": "democracy, participation, threats",
      governance: "Riksdag, government, regions, municipalities",
      elections: "elections, parties, referendums",
      law: "constitution, courts, legal security",
      media: "free media, public access, source criticism",
      "human-rights": "equality, children's rights, minorities",
      "work-economy": "work, unions, tax, personal finance",
      welfare: "healthcare, school, social insurance",
      "modern-history": "industrialization and welfare state",
      world: "Nordic, EU, UN, global cooperation",
      "secular-state": "religious freedom and secular society",
      traditions: "national day, midsummer, Lucia, holidays"
    },
    topicCoverageLabel: "Covers",
    studyCardLabel: "Study card",
    studyMaterialTitle: "Study material",
    takeawaysTitle: "Takeaway points",
    vocabularyTitle: "Key Swedish words",
    chaptersLabel: "Official chapters",
    topicSelectorLabel: "Choose a practice area",
    allTopics: "All topics",
    roadmapStep: (current, total) => `Roadmap step ${current} of ${total}`,
    testKnowledge: "Test your knowledge",
    comingNextTitle: "Coming next",
    comingNextIntro: "These are useful product directions, but they will stay clearly marked until they are real features.",
    comingNextItems: [
      { title: "Flashcards", body: "Turn the key Swedish words into quick review cards." },
      { title: "Mixed mock exam", body: "A timed 60-question mode once the question bank is large enough." },
      { title: "Progress dashboard", body: "Show weak topics, streaks, and what to review next." }
    ],
    progressDashboardTitle: "Progress dashboard",
    progressDashboardIntro: "Local progress from this browser. Correct and wrong answer tracking starts from this version.",
    flashcardsTitle: "Flashcards preview",
    flashcardsPreview: "Preview version",
    flipCard: "Flip card",
    nextCard: "Next card",
    backToHome: "Back to home",
    overallProgress: "Overall progress",
    topicAccuracy: "Accuracy",
    weakTopic: "Weak topic",
    weakTopicAdvice: (wrong) => `${wrong} wrong answers recorded. Review this topic next.`,
    recommendedNext: "Recommended next",
    topicProgress: (completed, total) => `${completed}/${total} completed`,
    continuePractice: "Continue",
    startPractice: "Start practice questions",
    reviewLesson: "Review study card",
    startWarmup: (count) => `Study guide + ${count} questions`,
    backToTopics: "Back to topics",
    level: "Level 1",
    questionProgress: (current, total) => `Question ${current} of ${total}`,
    coachNote: "Pick the answer that feels most right. We explain it after you check.",
    showQuestionHelp: "Show language help",
    hideQuestionHelp: "Hide language help",
    questionHelpLabel: "Meaning in your language",
    checkAnswer: "Check my answer",
    nextQuestion: "Try another one",
    resetProgress: "Reset progress",
    readMore: "Read more",
    showLess: "Show less",
    dismiss: "Dismiss",
    selected: "Selected",
    correct: "Correct",
    incorrect: "Not right",
    correctKicker: "Nice, you caught it.",
    wrongKicker: "Close enough to learn from.",
    correctTitle: "That answer works.",
    wrongTitle: "Not this time.",
    bestAnswer: "Best answer",
    explanationFallback: "Explanation coming soon.",
    appLanguage: "App language",
    appLanguageHint: "Questions stay Swedish.",
    today: "today",
    total: "total",
    progressFresh: "Fresh start.",
    progressWarm: "You are warming up.",
    progressGood: "Good rhythm.",
    progressSolid: "Solid session.",
    progressStrong: "Strong practice day.",
    topicNames: {
      democracy: "Democracy & Elections",
      rights: "Rights & Duties",
      everyday: "Everyday Life in Sweden",
      authorities: "Authorities & Services"
    },
    topicFlavor: {
      democracy: "Ballots, voices, and the rules of the game.",
      rights: "Know your freedoms. Know the shared responsibilities too.",
      everyday: "The practical Sweden you meet on a normal Tuesday.",
      authorities: "A quick map of who helps with what."
    },
    topicDescriptions: {
      democracy: "Get comfortable with voting, the Riksdag, and how people can have a voice in Sweden.",
      rights: "Learn the everyday balance: your freedoms, your responsibilities, and everyone's equal value.",
      everyday: "Practice the practical stuff: work breaks, renting, school, healthcare, and daily routines.",
      authorities: "Know who to contact, when to call, and which service helps with what."
    }
  },
  ar: {
    eyebrow: "استعد لاختبار المواطنة السويدية",
    appTitle: "الاستعداد لاختبار المجتمع السويدي",
    lead: "تدرّب على أسئلة عن المجتمع السويدي استعداداً لاختبار المواطنة أو المعرفة المدنية.",
    languageNote: "تبقى الأسئلة وخيارات الإجابة باللغة السويدية. باقي التطبيق يظهر باللغة التي تختارها.",
    dailyPrompt: "ابدأ بعشر دقائق يومياً.",
    earlyAccessTitle: "دليل مستقل",
    earlyAccessMessage: `ادرس مع Sverige i fokus

المادة الرسمية لاختبار المواطنة السويدية هي Sverige i fokus من UHR وSkolverket. تغطي السويد كبلد، والديمقراطية، وكيف تُحكم السويد، والانتخابات، والقانون والحقوق، والإعلام والنقد المصدري، وحقوق الإنسان، والعمل والاقتصاد الشخصي، والرفاه، والتاريخ الحديث، والتعاون الدولي، والدين، والتقاليد.

استخدم Swedish Civics Test Preparation كدليل تدريب مستقل: اقرأ فصلاً من Sverige i fokus أولاً، ثم استخدم هذه الأسئلة السويدية لتراجع ما تتذكره. نحن لسنا الاختبار الرسمي ولا ننسخ أسئلة رسمية من الامتحان.`,
    officialGuideLink: "افتح المادة الدراسية الرسمية",
    studyPathTitle: "طريقة أذكى للدراسة",
    studyPathIntro: "الفكرة المفيدة من تطبيقات الدراسة القوية ليست الشكل فقط، بل طريقة الدراسة: اربط التدريب بالكتاب الرسمي، تدرّب على التذكر النشط، ثم ارجع إلى الفصول الضعيفة.",
    studySteps: [
      { title: "1. اقرأ المصدر", body: "ابدأ بفصل واحد من Sverige i fokus. اعتبر المادة الرسمية خريطتك الأساسية." },
      { title: "2. تدرّب بالسويدية", body: "أجب عن أسئلة قصيرة بالسويدية بينما الفكرة ما زالت حاضرة. دعم اللغة يشرح الفكرة، وليس نص السؤال." },
      { title: "3. كرر النقاط الضعيفة", body: "استخدم نتائجك لتقرر ماذا تراجع بعد ذلك بدلاً من إعادة قراءة كل شيء من البداية." }
    ],
    chapterMapTitle: "تغطية الفصول الرسمية",
    chapterMapIntro: "Sverige i fokus منظّم في 13 فصلاً. هذا الإصدار يجمع هذه الفصول في أربعة مجالات تدريب حتى يبقى التطبيق بسيطاً ومربوطاً بالبنية الرسمية.",
    chapterNames: {
      country: "السويد كبلد",
      "democratic-system": "النظام الديمقراطي في السويد",
      governance: "كيف تُحكم السويد",
      elections: "الانتخابات السياسية والأحزاب",
      law: "القانون والعدالة",
      media: "دور الإعلام",
      "human-rights": "حقوق الإنسان",
      "work-economy": "سوق العمل والاقتصاد الشخصي",
      welfare: "مجتمع الرفاه",
      "modern-history": "تاريخ السويد الحديث",
      world: "السويد والعالم",
      "secular-state": "دولة علمانية وبلد متعدد الأديان",
      traditions: "التقاليد والأعياد"
    },
    chapterSummaries: {
      country: "الجغرافيا، السكان، الموارد",
      "democratic-system": "الديمقراطية، المشاركة، التهديدات",
      governance: "البرلمان، الحكومة، المناطق، البلديات",
      elections: "الانتخابات، الأحزاب، الاستفتاءات",
      law: "الدستور، المحاكم، الأمن القانوني",
      media: "الإعلام الحر، العلنية، النقد المصدري",
      "human-rights": "المساواة، حقوق الأطفال، الأقليات",
      "work-economy": "العمل، النقابات، الضرائب، الاقتصاد الشخصي",
      welfare: "الرعاية الصحية، المدرسة، التأمين الاجتماعي",
      "modern-history": "التصنيع ودولة الرفاه",
      world: "الشمال، الاتحاد الأوروبي، الأمم المتحدة، التعاون العالمي",
      "secular-state": "حرية الدين والمجتمع العلماني",
      traditions: "اليوم الوطني، منتصف الصيف، لوسيا، الأعياد"
    },
    topicCoverageLabel: "يغطي",
    studyCardLabel: "بطاقة الدراسة",
    studyMaterialTitle: "مادة الدراسة",
    takeawaysTitle: "النقاط المهمة",
    vocabularyTitle: "كلمات سويدية مهمة",
    chaptersLabel: "الفصول الرسمية",
    topicSelectorLabel: "اختر مجال التدريب",
    allTopics: "كل الموضوعات",
    roadmapStep: (current, total) => `خطوة الخطة ${current} من ${total}`,
    testKnowledge: "اختبر معلوماتك",
    comingNextTitle: "قادم لاحقاً",
    comingNextIntro: "هذه اتجاهات مفيدة للمنتج، لكنها ستبقى موضحة كميزات قادمة حتى تصبح جاهزة فعلاً.",
    comingNextItems: [
      { title: "بطاقات كلمات", body: "تحويل الكلمات السويدية المهمة إلى بطاقات مراجعة سريعة." },
      { title: "اختبار تجريبي مختلط", body: "وضع مؤقت من 60 سؤالاً عندما يصبح بنك الأسئلة كبيراً بما يكفي." },
      { title: "لوحة تقدم", body: "عرض الموضوعات الضعيفة وسلسلة التدريب وما يجب مراجعته لاحقاً." }
    ],
    progressDashboardTitle: "لوحة التقدم",
    progressDashboardIntro: "تقدم محلي من هذا المتصفح. بدأ تتبع الإجابات الصحيحة والخاطئة من هذا الإصدار.",
    flashcardsTitle: "معاينة بطاقات الكلمات",
    flashcardsPreview: "نسخة معاينة",
    flipCard: "اقلب البطاقة",
    nextCard: "البطاقة التالية",
    backToHome: "العودة إلى الرئيسية",
    overallProgress: "التقدم العام",
    topicAccuracy: "الدقة",
    weakTopic: "موضوع ضعيف",
    weakTopicAdvice: (wrong) => `تم تسجيل ${wrong} إجابات خاطئة. راجع هذا الموضوع بعد ذلك.`,
    recommendedNext: "المقترح التالي",
    topicProgress: (completed, total) => `${completed}/${total} مكتملة`,
    continuePractice: "متابعة",
    startPractice: "ابدأ أسئلة التدريب",
    reviewLesson: "راجع بطاقة الدراسة",
    startWarmup: (count) => `دليل دراسة + ${count} أسئلة`,
    backToTopics: "العودة إلى الموضوعات",
    level: "المستوى 1",
    questionProgress: (current, total) => `السؤال ${current} من ${total}`,
    coachNote: "اختر الإجابة التي تبدو أقرب للصواب. سنشرحها بعد الفحص.",
    showQuestionHelp: "إظهار المساعدة اللغوية",
    hideQuestionHelp: "إخفاء المساعدة اللغوية",
    questionHelpLabel: "المعنى بلغتك",
    checkAnswer: "تحقق من إجابتي",
    nextQuestion: "جرّب سؤالاً آخر",
    resetProgress: "إعادة ضبط التقدم",
    readMore: "اقرأ المزيد",
    showLess: "إظهار أقل",
    dismiss: "إخفاء",
    selected: "مختارة",
    correct: "صحيح",
    incorrect: "غير صحيح",
    correctKicker: "جميل، التقطت الفكرة.",
    wrongKicker: "قريب بما يكفي لتتعلم منه.",
    correctTitle: "هذه الإجابة صحيحة.",
    wrongTitle: "ليس هذه المرة.",
    bestAnswer: "أفضل إجابة",
    explanationFallback: "سيتم إضافة الشرح قريباً.",
    appLanguage: "لغة التطبيق",
    appLanguageHint: "الأسئلة تبقى بالسويدية.",
    today: "اليوم",
    total: "المجموع",
    progressFresh: "بداية جديدة.",
    progressWarm: "أنت بدأت التسخين.",
    progressGood: "إيقاع جيد.",
    progressSolid: "جلسة قوية.",
    progressStrong: "يوم تدريب ممتاز.",
    topicNames: {
      democracy: "الديمقراطية والانتخابات",
      rights: "الحقوق والواجبات",
      everyday: "الحياة اليومية في السويد",
      authorities: "الجهات والخدمات"
    },
    topicFlavor: {
      democracy: "أصوات وانتخابات وقواعد اللعبة الديمقراطية.",
      rights: "اعرف حرياتك، واعرف المسؤوليات المشتركة أيضاً.",
      everyday: "السويد العملية التي تقابلها في يوم عادي.",
      authorities: "خريطة سريعة: من يساعدك في ماذا؟"
    },
    topicDescriptions: {
      democracy: "تدرّب على التصويت والبرلمان وكيف يمكن للناس التأثير في السويد.",
      rights: "تعرّف على الحريات والمسؤوليات والمساواة في الحياة اليومية.",
      everyday: "تدرّب على العمل والسكن والمدرسة والرعاية الصحية والعادات اليومية.",
      authorities: "تعلّم متى تتواصل مع الجهات والخدمات المهمة في السويد."
    }
  },
  zh: {
    eyebrow: "准备瑞典公民/社会知识测试",
    appTitle: "瑞典社会知识测试备考",
    lead: "练习关于瑞典社会的选择题，为未来的公民或社会知识测试做准备。",
    languageNote: "题目和答案选项保持瑞典语。应用界面和解释会使用你选择的语言。",
    dailyPrompt: "每天先练10分钟。",
    earlyAccessTitle: "独立学习指南",
    earlyAccessMessage: `配合 Sverige i fokus 学习

瑞典公民测试的官方学习材料是 UHR 和 Skolverket 的 Sverige i fokus。它涵盖瑞典这个国家、民主、瑞典如何治理、选举、法律和权利、媒体和来源批判、人权、工作和个人经济、福利、现代历史、国际合作、宗教和传统。

请把 Swedish Civics Test Preparation 当作独立练习指南：先阅读 Sverige i fokus 的一个章节，再用这些瑞典语问题检查自己记住了什么。我们不是官方测试，也不复制官方考试题。`,
    officialGuideLink: "打开官方学习材料",
    studyPathTitle: "更聪明的学习方式",
    studyPathIntro: "优秀学习应用真正值得借鉴的不是外观，而是学习循环：对应官方教材、主动回忆练习、再回到薄弱章节。",
    studySteps: [
      { title: "1. 先读官方材料", body: "从 Sverige i fokus 的一个章节开始，把官方材料当作地图。" },
      { title: "2. 用瑞典语练习", body: "趁内容还新鲜时回答短瑞典语问题。语言支持解释概念，不翻译题目本身。" },
      { title: "3. 重复薄弱点", body: "根据练习结果决定下一步复习什么，而不是每次都从头读。" }
    ],
    chapterMapTitle: "官方章节覆盖",
    chapterMapIntro: "Sverige i fokus 分为13章。这个 MVP 把这些章节归到四个练习区，让应用保持简单，同时仍然对应官方结构。",
    chapterNames: {
      country: "瑞典这个国家",
      "democratic-system": "瑞典民主制度",
      governance: "瑞典如何治理",
      elections: "政治选举和政党",
      law: "法律与司法",
      media: "媒体的作用",
      "human-rights": "人权",
      "work-economy": "劳动力市场和个人经济",
      welfare: "福利社会",
      "modern-history": "瑞典现代历史",
      world: "瑞典与世界",
      "secular-state": "世俗国家和多宗教社会",
      traditions: "传统和节日"
    },
    chapterSummaries: {
      country: "地理、人口、资源",
      "democratic-system": "民主、参与、威胁",
      governance: "国会、政府、地区、市",
      elections: "选举、政党、公投",
      law: "基本法、法院、法律保障",
      media: "自由媒体、公开原则、来源批判",
      "human-rights": "平等、儿童权利、少数群体",
      "work-economy": "工作、工会、税、个人经济",
      welfare: "医疗、学校、社会保险",
      "modern-history": "工业化和福利国家",
      world: "北欧、欧盟、联合国、国际合作",
      "secular-state": "宗教自由和世俗社会",
      traditions: "国庆、仲夏节、露西亚、节日"
    },
    topicCoverageLabel: "覆盖",
    studyCardLabel: "学习卡",
    studyMaterialTitle: "学习内容",
    takeawaysTitle: "重点总结",
    vocabularyTitle: "重要瑞典语词汇",
    chaptersLabel: "官方章节",
    topicSelectorLabel: "选择练习方向",
    allTopics: "全部主题",
    roadmapStep: (current, total) => `学习路线第 ${current} / ${total} 步`,
    testKnowledge: "测试你的理解",
    comingNextTitle: "下一步计划",
    comingNextIntro: "这些是有用的产品方向，但在真正完成前会清楚标记为计划功能。",
    comingNextItems: [
      { title: "词汇卡片", body: "把重要瑞典语词汇做成快速复习卡。" },
      { title: "混合模拟考试", body: "当题库足够大后，加入限时60题模式。" },
      { title: "进度面板", body: "显示薄弱主题、连续练习和下一步复习建议。" }
    ],
    progressDashboardTitle: "进度面板",
    progressDashboardIntro: "这是本浏览器中的本地进度。从当前版本开始记录正确和错误答案。",
    flashcardsTitle: "词汇卡片预览",
    flashcardsPreview: "预览版本",
    flipCard: "翻转卡片",
    nextCard: "下一张",
    backToHome: "返回首页",
    overallProgress: "整体进度",
    topicAccuracy: "正确率",
    weakTopic: "薄弱主题",
    weakTopicAdvice: (wrong) => `已记录 ${wrong} 个错误答案。建议接下来复习这个主题。`,
    recommendedNext: "下一步建议",
    topicProgress: (completed, total) => `已完成 ${completed}/${total}`,
    continuePractice: "继续",
    startPractice: "开始练习题",
    reviewLesson: "复习学习卡",
    startWarmup: (count) => `学习指南 + ${count} 题`,
    backToTopics: "返回主题",
    level: "第1级",
    questionProgress: (current, total) => `第 ${current} / ${total} 题`,
    coachNote: "选择你觉得最合适的答案。提交后我们会解释。",
    showQuestionHelp: "显示语言帮助",
    hideQuestionHelp: "隐藏语言帮助",
    questionHelpLabel: "你的语言中的意思",
    checkAnswer: "检查我的答案",
    nextQuestion: "再试一题",
    resetProgress: "重置进度",
    readMore: "阅读更多",
    showLess: "收起",
    dismiss: "关闭",
    selected: "已选择",
    correct: "正确",
    incorrect: "不正确",
    correctKicker: "不错，你抓住重点了。",
    wrongKicker: "接近了，可以从这里学到东西。",
    correctTitle: "这个答案是对的。",
    wrongTitle: "这次不是这个答案。",
    bestAnswer: "最佳答案",
    explanationFallback: "解释即将添加。",
    appLanguage: "应用语言",
    appLanguageHint: "题目保持瑞典语。",
    today: "今天",
    total: "总计",
    progressFresh: "新的开始。",
    progressWarm: "你正在热身。",
    progressGood: "节奏不错。",
    progressSolid: "练得很稳。",
    progressStrong: "今天练习很棒。",
    topicNames: {
      democracy: "民主与选举",
      rights: "权利与义务",
      everyday: "瑞典日常生活",
      authorities: "机构与公共服务"
    },
    topicFlavor: {
      democracy: "选票、声音，以及民主游戏规则。",
      rights: "了解你的自由，也了解共同责任。",
      everyday: "普通星期二也会遇到的实用瑞典生活。",
      authorities: "快速了解谁负责什么。"
    },
    topicDescriptions: {
      democracy: "练习投票、瑞典国会，以及人们如何在瑞典发声。",
      rights: "学习日常生活中的自由、责任、平等和共同价值。",
      everyday: "练习工作休息、租房、学校、医疗和日常习惯。",
      authorities: "学习什么时候联系哪些瑞典机构和公共服务。"
    }
  }
};

const SUPPORTED_LANGUAGES: { id: UiLanguage; label: string; nativeLabel: string }[] = [
  { id: "en", label: "English", nativeLabel: "English" },
  { id: "ar", label: "Arabic", nativeLabel: "العربية" },
  { id: "zh", label: "Chinese", nativeLabel: "中文" }
];

const CITIZENSHIP_UPDATE: Record<UiLanguage, {
  title: string;
  source: string;
  summary: string;
  intro: string;
  bullets: string[];
  note: string;
  migrationsverketLink: string;
  uhrLink: string;
}> = {
  en: {
    title: "2026 citizenship rules update",
    source: "Based on information from Migrationsverket",
    summary: "New 2026 citizenship rules apply from June. Some applicants may have easier paths to permanent residency.",
    intro: "Since 6 June 2026, Swedish citizenship applications are assessed under stricter requirements. For many adult applicants, the requirements include:",
    bullets: [
      "a valid residence basis, usually permanent residence, right of residence, residence card, or residence status",
      "a required period of habitual residence in Sweden",
      "knowledge of Swedish and Swedish society",
      "ability to support yourself",
      "an orderly and honourable life"
    ],
    note: "Since 12 July 2026, some people with temporary residence permits may be exempt from the permanent-residence requirement. Your personal situation is always assessed by Migrationsverket.",
    migrationsverketLink: "Check requirements at Migrationsverket",
    uhrLink: "Study with Sverige i fokus"
  },
  ar: {
    title: "تحديث قواعد المواطنة 2026",
    source: "بناءً على معلومات من Migrationsverket",
    summary: "تطبق قواعد المواطنة الجديدة لعام 2026 منذ يونيو. قد تكون لدى بعض المتقدمين طرق أسهل نحو الإقامة الدائمة.",
    intro: "منذ 6 يونيو 2026، تُقيَّم طلبات الجنسية السويدية وفق متطلبات أكثر صرامة. لكثير من المتقدمين البالغين تشمل المتطلبات:",
    bullets: [
      "أساس إقامة صالح، غالباً إقامة دائمة أو حق إقامة أو بطاقة إقامة أو وضع إقامة",
      "مدة إقامة مطلوبة في السويد",
      "معرفة باللغة السويدية وبالمجتمع السويدي",
      "القدرة على إعالة نفسك",
      "حياة منظمة وشريفة"
    ],
    note: "منذ 12 يوليو 2026، قد تُستثنى بعض الفئات التي لديها تصاريح إقامة مؤقتة من شرط الإقامة الدائمة. وضعك الشخصي تقيّمه دائماً Migrationsverket.",
    migrationsverketLink: "تحقق من المتطلبات لدى Migrationsverket",
    uhrLink: "ادرس باستخدام Sverige i fokus"
  },
  zh: {
    title: "2026 公民规则更新",
    source: "根据 Migrationsverket 的信息整理",
    summary: "新的 2026 公民规则从六月开始适用。部分申请人获得永久居留的路径可能更容易。",
    intro: "自 2026 年 6 月 6 日起，瑞典公民申请按照更严格的要求审查。对许多成年申请人来说，要求包括：",
    bullets: [
      "有效的居留基础，通常是永久居留、居留权、居留卡或居留身份",
      "在瑞典居住达到规定年限",
      "具备瑞典语和瑞典社会知识",
      "能够自给自足",
      "生活守法、有良好品行"
    ],
    note: "自 2026 年 7 月 12 日起，部分持临时居留许可的人可能不再必须先有永久居留。你的个人情况始终由 Migrationsverket 评估。",
    migrationsverketLink: "在 Migrationsverket 查看要求",
    uhrLink: "使用 Sverige i fokus 学习"
  }
};

const FAQ_CONTENT: Record<UiLanguage, { title: string; intro: string; items: { question: string; answer: string }[] }> = {
  en: {
    title: "FAQ",
    intro: "Short answers for early users. The product is intentionally simple while we test what helps learners most.",
    items: [
      {
        question: "Is Swedish Civics Test Preparation an official test service?",
        answer: "No. Swedish Civics Test Preparation is an independent study and practice tool. We are not affiliated with UHR, Skolverket, Migrationsverket, or the official citizenship test."
      },
      {
        question: "Are these official exam questions?",
        answer: "No. The questions are original practice questions written for this app. They are based on public study themes in Sverige i fokus, not copied from any official exam."
      },
      {
        question: "Why are the questions in Swedish?",
        answer: "The real civics and citizenship test is connected to Swedish society and Swedish-language study material. We keep the questions in Swedish, then add help and explanations in your selected language."
      },
      {
        question: "Where is my progress saved?",
        answer: "For this MVP, progress is saved only in your browser on this device. There are no accounts yet, so progress does not sync across devices."
      },
      {
        question: "Is it free?",
        answer: "Yes, this early version is free while we collect feedback from real learners. Later versions may add accounts, more content, or paid features."
      },
      {
        question: "Does it simulate the full 60-question exam?",
        answer: "Not yet. The current version is topic practice. A timed mixed mock exam is a good next step once the question bank is larger."
      }
    ]
  },
  ar: {
    title: "أسئلة شائعة",
    intro: "إجابات قصيرة للمستخدمين الأوائل. نبقي المنتج بسيطاً الآن حتى نعرف ما يساعد المتعلمين فعلاً.",
    items: [
      {
        question: "هل Swedish Civics Test Preparation خدمة اختبار رسمية؟",
        answer: "لا. Swedish Civics Test Preparation أداة دراسة وتدريب مستقلة. ليست تابعة لـ UHR أو Skolverket أو Migrationsverket أو الاختبار الرسمي للمواطنة."
      },
      {
        question: "هل هذه أسئلة امتحان رسمية؟",
        answer: "لا. الأسئلة أسئلة تدريب أصلية مكتوبة لهذا التطبيق. هي مبنية على موضوعات الدراسة العامة في Sverige i fokus، وليست منسوخة من أي امتحان رسمي."
      },
      {
        question: "لماذا الأسئلة باللغة السويدية؟",
        answer: "الاختبار الحقيقي مرتبط بالمجتمع السويدي وبمواد دراسية سويدية. لذلك تبقى الأسئلة بالسويدية، مع مساعدة وشرح باللغة التي تختارها."
      },
      {
        question: "أين يتم حفظ تقدمي؟",
        answer: "في هذا الإصدار، يتم حفظ التقدم فقط في المتصفح على هذا الجهاز. لا توجد حسابات بعد، لذلك لا تتم مزامنة التقدم بين الأجهزة."
      },
      {
        question: "هل الاستخدام مجاني؟",
        answer: "نعم، هذا الإصدار المبكر مجاني بينما نجمع ملاحظات من متعلمين حقيقيين. قد تضيف الإصدارات اللاحقة حسابات أو محتوى أكثر أو ميزات مدفوعة."
      },
      {
        question: "هل يحاكي الامتحان الكامل المكوّن من 60 سؤالاً؟",
        answer: "ليس بعد. الإصدار الحالي هو تدريب حسب الموضوع. الاختبار التجريبي المختلط مع الوقت خطوة مناسبة لاحقاً عندما يكبر بنك الأسئلة."
      }
    ]
  },
  zh: {
    title: "常见问题",
    intro: "给早期用户的简短说明。我们现在保持产品简单，是为了测试什么真正帮助学习者。",
    items: [
      {
        question: "Swedish Civics Test Preparation 是官方测试服务吗？",
        answer: "不是。Swedish Civics Test Preparation 是独立学习和练习工具。我们不隶属于 UHR、Skolverket、Migrationsverket 或官方公民测试。"
      },
      {
        question: "这些是官方考试题吗？",
        answer: "不是。这些题目是为本应用原创编写的练习题，基于 Sverige i fokus 的公开学习主题，并不是复制任何官方考试题。"
      },
      {
        question: "为什么题目是瑞典语？",
        answer: "真实的社会知识/公民测试与瑞典社会和瑞典语学习材料相关。我们保留瑞典语题目，并用你选择的语言提供帮助和解释。"
      },
      {
        question: "我的进度保存在哪里？",
        answer: "在这个 MVP 中，进度只保存在你当前设备的浏览器里。现在还没有账号，所以不会跨设备同步。"
      },
      {
        question: "现在免费吗？",
        answer: "是的，早期版本免费使用，我们希望收集真实学习者的反馈。之后版本可能会加入账号、更多内容或付费功能。"
      },
      {
        question: "它会模拟完整的60题考试吗？",
        answer: "还不会。当前版本是按主题练习。等题库更大后，限时混合模拟考试会是很好的下一步。"
      }
    ]
  }
};

const LEGAL_CONTENT: Record<UiLanguage, {
  homeLink: string;
  privacyLink: string;
  footerNote: string;
  title: string;
  updated: string;
  intro: string;
  sections: { title: string; body: string[] }[];
}> = {
  en: {
    homeLink: "Back to home",
    privacyLink: "Terms & privacy",
    footerNote: "Original practice questions based on public study themes. Not official exam questions.",
    title: "Terms & Privacy",
    updated: "Last updated: 10 August 2026",
    intro: "This page explains how Swedish Civics Test Preparation works today. It is intentionally short because the current MVP has no accounts, payments, backend database, or advertising trackers.",
    sections: [
      {
        title: "Independent study tool",
        body: [
          "Swedish Civics Test Preparation is an independent practice guide for people studying Swedish society. We are not affiliated with UHR, Skolverket, Migrationsverket, or the official citizenship test.",
          "The practice questions are original and based on public study themes in Sverige i fokus. We do not copy, publish, or claim to provide official exam questions."
        ]
      },
      {
        title: "Your use of the app",
        body: [
          "You may use the app for your own study and share feedback with us.",
          "Please do not scrape, republish, or sell the question bank, explanations, translations, or design as another product."
        ]
      },
      {
        title: "Privacy in the current MVP",
        body: [
          "There are no user accounts, payments, contact forms, analytics pixels, or backend-stored profiles in this version.",
          "Your practice progress and selected language are saved locally in your browser using localStorage. This data stays on your device unless you clear browser storage or later choose to use a future account feature."
        ]
      },
      {
        title: "Future changes",
        body: [
          "If we add accounts, payments, analytics, email login, or cloud progress sync later, this policy must be updated before those features are released.",
          "This page is product guidance, not legal advice. Before a larger public launch, a GDPR review is still worth doing."
        ]
      }
    ]
  },
  ar: {
    homeLink: "العودة إلى الصفحة الرئيسية",
    privacyLink: "الشروط والخصوصية",
    footerNote: "أسئلة تدريب أصلية مبنية على موضوعات دراسة عامة. ليست أسئلة امتحان رسمية.",
    title: "الشروط والخصوصية",
    updated: "آخر تحديث: 10 أغسطس 2026",
    intro: "تشرح هذه الصفحة كيف يعمل Swedish Civics Test Preparation اليوم. هي قصيرة لأن إصدار MVP الحالي لا يحتوي على حسابات أو مدفوعات أو قاعدة بيانات خلفية أو تتبع إعلاني.",
    sections: [
      {
        title: "أداة دراسة مستقلة",
        body: [
          "Swedish Civics Test Preparation دليل تدريب مستقل للأشخاص الذين يدرسون المجتمع السويدي. لسنا تابعين لـ UHR أو Skolverket أو Migrationsverket أو اختبار المواطنة الرسمي.",
          "أسئلة التدريب أصلية ومبنية على موضوعات الدراسة العامة في Sverige i fokus. نحن لا ننسخ أو ننشر أو ندعي تقديم أسئلة امتحان رسمية."
        ]
      },
      {
        title: "استخدامك للتطبيق",
        body: [
          "يمكنك استخدام التطبيق لدراستك الشخصية وإرسال ملاحظاتك إلينا.",
          "يرجى عدم استخراج أو إعادة نشر أو بيع بنك الأسئلة أو الشروحات أو الترجمات أو التصميم كمنتج آخر."
        ]
      },
      {
        title: "الخصوصية في الإصدار الحالي",
        body: [
          "لا توجد حسابات مستخدمين أو مدفوعات أو نماذج تواصل أو بكسلات تحليلات أو ملفات شخصية محفوظة في خادم في هذا الإصدار.",
          "يتم حفظ تقدم التدريب واللغة المختارة محلياً في متصفحك باستخدام localStorage. تبقى هذه البيانات على جهازك إلا إذا مسحت تخزين المتصفح أو اخترت لاحقاً استخدام ميزة حساب مستقبلية."
        ]
      },
      {
        title: "تغييرات مستقبلية",
        body: [
          "إذا أضفنا لاحقاً حسابات أو مدفوعات أو تحليلات أو تسجيل دخول بالبريد أو مزامنة تقدم سحابية، يجب تحديث هذه السياسة قبل إطلاق تلك الميزات.",
          "هذه الصفحة إرشاد للمنتج وليست نصيحة قانونية. قبل إطلاق عام أكبر، من المفيد إجراء مراجعة GDPR."
        ]
      }
    ]
  },
  zh: {
    homeLink: "返回首页",
    privacyLink: "条款与隐私",
    footerNote: "原创练习题，基于公开学习主题；不是官方考试题。",
    title: "条款与隐私",
    updated: "最后更新：2026年8月10日",
    intro: "本页说明 Swedish Civics Test Preparation 目前如何运作。当前 MVP 没有账号、付款、后台数据库或广告追踪，所以内容保持简短。",
    sections: [
      {
        title: "独立学习工具",
        body: [
          "Swedish Civics Test Preparation 是面向瑞典社会知识学习者的独立练习指南。我们不隶属于 UHR、Skolverket、Migrationsverket 或官方公民测试。",
          "练习题是原创内容，基于 Sverige i fokus 的公开学习主题。我们不复制、发布或声称提供官方考试题。"
        ]
      },
      {
        title: "你如何使用本应用",
        body: [
          "你可以把本应用用于个人学习，也可以向我们提供反馈。",
          "请不要抓取、重新发布或出售题库、解释、翻译或设计，把它们做成另一个产品。"
        ]
      },
      {
        title: "当前 MVP 的隐私",
        body: [
          "当前版本没有用户账号、付款、联系表单、分析像素，也没有保存在后台的用户资料。",
          "你的练习进度和所选语言会通过 localStorage 保存在本设备浏览器中。除非你清除浏览器存储，或未来选择使用账号功能，否则这些数据留在你的设备上。"
        ]
      },
      {
        title: "未来变化",
        body: [
          "如果之后加入账号、付款、分析、邮件登录或云端进度同步，我们需要在发布这些功能前更新本政策。",
          "本页是产品说明，不是法律建议。更大规模公开发布前，仍然值得做一次 GDPR 审查。"
        ]
      }
    ]
  }
};

const QUESTION_TRANSLATIONS: Record<string, Record<UiLanguage, { question: string; options: string[] }>> = {
  "democracy-001": {
    en: { question: "What does the word democracy mean?", options: ["Rule by the people", "Rule by a king", "Rule by companies", "Rule by courts"] },
    ar: { question: "ماذا تعني كلمة ديمقراطية؟", options: ["حكم الشعب", "حكم الملك", "حكم الشركات", "حكم المحاكم"] },
    zh: { question: "民主这个词是什么意思？", options: ["人民治理", "国王治理", "企业治理", "法院治理"] }
  },
  "democracy-002": {
    en: { question: "What is a free election?", options: ["An election where everyone must vote for the same party", "An election where the vote is secret and there are several choices", "An election where only the government may vote", "An election where the employer decides"] },
    ar: { question: "ما هي الانتخابات الحرة؟", options: ["انتخابات يجب أن يصوت فيها الجميع لنفس الحزب", "انتخابات يكون التصويت فيها سرياً وتوجد عدة اختيارات", "انتخابات تصوت فيها الحكومة فقط", "انتخابات يقرر فيها صاحب العمل"] },
    zh: { question: "什么是自由选举？", options: ["所有人必须投同一个党的选举", "投票保密且有多个选择的选举", "只有政府可以投票的选举", "由雇主决定的选举"] }
  },
  "democracy-003": {
    en: { question: "Which of these is a way to influence society?", options: ["Voting in political elections", "Spreading threats against politicians", "Hiding important information", "Letting others vote for you"] },
    ar: { question: "أي من هذه الطرق يمكن أن تؤثر في المجتمع؟", options: ["التصويت في الانتخابات السياسية", "نشر تهديدات ضد السياسيين", "إخفاء معلومات مهمة", "ترك الآخرين يصوتون عنك"] },
    zh: { question: "以下哪一种是影响社会的方式？", options: ["在政治选举中投票", "传播对政治人物的威胁", "隐藏重要信息", "让别人替你投票"] }
  },
  "democracy-004": {
    en: { question: "How often are regular elections held for the Riksdag, regions, and municipalities?", options: ["Every year", "Every two years", "Every four years", "Every ten years"] },
    ar: { question: "كم مرة تُجرى الانتخابات العادية للبرلمان والمناطق والبلديات؟", options: ["كل سنة", "كل سنتين", "كل أربع سنوات", "كل عشر سنوات"] },
    zh: { question: "国会、地区和市的普通选举多久举行一次？", options: ["每年", "每两年", "每四年", "每十年"] }
  },
  "democracy-005": {
    en: { question: "What are the Riksdag's most important tasks?", options: ["Making laws and deciding the state budget", "Judging people in court", "Providing healthcare", "Deciding rent in all homes"] },
    ar: { question: "ما أهم مهام البرلمان السويدي؟", options: ["سن القوانين وتقرير ميزانية الدولة", "الحكم على الناس في المحكمة", "تقديم الرعاية الصحية", "تحديد الإيجار في كل المساكن"] },
    zh: { question: "瑞典国会最重要的任务是什么？", options: ["制定法律并决定国家预算", "在法院审判人", "提供医疗", "决定所有住房的租金"] }
  },
  "democracy-006": {
    en: { question: "What can be a threat to democracy?", options: ["Many people vote", "False information and threats in public debate", "Several parties take part in elections", "People discuss politics"] },
    ar: { question: "ما الذي يمكن أن يهدد الديمقراطية؟", options: ["أن يصوت كثير من الناس", "المعلومات الكاذبة والتهديدات في النقاش العام", "مشاركة عدة أحزاب في الانتخابات", "أن يناقش الناس السياسة"] },
    zh: { question: "什么可能威胁民主？", options: ["很多人投票", "公共讨论中的虚假信息和威胁", "多个政党参加选举", "人们讨论政治"] }
  },
  "rights-001": {
    en: { question: "What does legal security / rule of law mean?", options: ["No one may be convicted without a fair trial", "Police may judge without a court", "Only rich people follow the law", "Laws only apply to citizens"] },
    ar: { question: "ماذا يعني الأمن القانوني أو سيادة القانون؟", options: ["لا يجوز إدانة أحد دون محاكمة عادلة", "يمكن للشرطة الحكم دون محكمة", "الأغنياء فقط يتبعون القانون", "القوانين تنطبق فقط على المواطنين"] },
    zh: { question: "法律保障/法治是什么意思？", options: ["没有公正审判，任何人都不应被定罪", "警察可以不经过法院判决", "只有富人才遵守法律", "法律只适用于公民"] }
  },
  "rights-002": {
    en: { question: "Which of these is a Swedish constitutional law?", options: ["The Freedom of the Press Act", "The Education Act", "The Rent Act", "The Traffic Ordinance"] },
    ar: { question: "أي من هذه القوانين هو قانون دستوري سويدي؟", options: ["قانون حرية الصحافة", "قانون المدرسة", "قانون الإيجار", "نظام المرور"] },
    zh: { question: "以下哪一个是瑞典基本法？", options: ["新闻出版自由法", "学校法", "租赁法", "交通条例"] }
  },
  "rights-003": {
    en: { question: "What does freedom of expression mean?", options: ["You may say and write your opinions", "You may threaten others", "The state must always agree", "Only journalists may talk politics"] },
    ar: { question: "ماذا تعني حرية التعبير؟", options: ["يمكنك قول وكتابة آرائك", "يمكنك تهديد الآخرين", "يجب أن توافق الدولة دائماً", "الصحفيون فقط يمكنهم الحديث عن السياسة"] },
    zh: { question: "言论自由是什么意思？", options: ["你可以说出和写下自己的观点", "你可以威胁他人", "国家必须总是同意", "只有记者可以谈政治"] }
  },
  "rights-004": {
    en: { question: "Why are free media important in a democracy?", options: ["They can scrutinize power and spread information", "They should decide all laws", "They should replace courts", "They should tell everyone how to vote"] },
    ar: { question: "لماذا الإعلام الحر مهم في الديمقراطية؟", options: ["يمكنه مراقبة السلطة ونشر المعلومات", "يجب أن يقرر كل القوانين", "يجب أن يحل محل المحاكم", "يجب أن يقول للجميع كيف يصوتون"] },
    zh: { question: "为什么自由媒体对民主很重要？", options: ["它们可以监督权力并传播信息", "它们应决定所有法律", "它们应取代法院", "它们应告诉每个人如何投票"] }
  },
  "rights-005": {
    en: { question: "What is source criticism?", options: ["Thinking about whether information is true and where it comes from", "Always believing everything on social media", "Only reading headlines", "Never asking for evidence"] },
    ar: { question: "ما هو النقد المصدري؟", options: ["التفكير هل المعلومات صحيحة ومن أين جاءت", "تصديق كل شيء في وسائل التواصل", "قراءة العناوين فقط", "عدم طلب أدلة أبداً"] },
    zh: { question: "什么是来源批判？", options: ["思考信息是否真实以及来自哪里", "总是相信社交媒体上的一切", "只读标题", "从不要求证据"] }
  },
  "rights-006": {
    en: { question: "What does the principle of human rights say?", options: ["All people have equal value and rights", "Rights only apply to adults", "Rights only apply to people with jobs", "Each municipality chooses if people have rights"] },
    ar: { question: "ماذا تقول فكرة حقوق الإنسان؟", options: ["كل الناس لهم نفس القيمة والحقوق", "الحقوق للبالغين فقط", "الحقوق لمن لديهم عمل فقط", "كل بلدية تختار إذا كان للناس حقوق"] },
    zh: { question: "人权原则说明什么？", options: ["所有人都有平等价值和权利", "权利只适用于成年人", "权利只适用于有工作的人", "每个市自行决定人们是否有权利"] }
  },
  "everyday-001": {
    en: { question: "Which are Sweden's three largest cities?", options: ["Stockholm, Gothenburg, and Malmö", "Uppsala, Lund, and Kiruna", "Malmö, Visby, and Örebro", "Gothenburg, Växjö, and Umeå"] },
    ar: { question: "ما أكبر ثلاث مدن في السويد؟", options: ["ستوكهولم ويوتبوري ومالمو", "أوبسالا ولوند وكيرونا", "مالمو وفيسبي وأوربرو", "يوتبوري وفيكخو وأوميو"] },
    zh: { question: "瑞典三大城市是哪三个？", options: ["斯德哥尔摩、哥德堡和马尔默", "乌普萨拉、隆德和基律纳", "马尔默、维斯比和厄勒布鲁", "哥德堡、韦克舍和于默奥"] }
  },
  "everyday-002": {
    en: { question: "Which natural resource has long been important for Sweden's economy?", options: ["Iron ore and forest", "Coffee plantations", "Oil in the desert", "Cotton fields"] },
    ar: { question: "أي مورد طبيعي كان مهماً لاقتصاد السويد منذ زمن طويل؟", options: ["خام الحديد والغابات", "مزارع القهوة", "النفط في الصحراء", "حقول القطن"] },
    zh: { question: "哪种自然资源长期对瑞典经济很重要？", options: ["铁矿石和森林", "咖啡种植园", "沙漠中的石油", "棉花田"] }
  },
  "everyday-003": {
    en: { question: "Why do people pay tax in Sweden?", options: ["To finance welfare such as healthcare, school, and care", "So everyone can vote twice", "To avoid following the law", "So the state owns all homes"] },
    ar: { question: "لماذا يدفع الناس الضرائب في السويد؟", options: ["لتمويل الرفاه مثل الرعاية الصحية والمدرسة والرعاية", "حتى يصوت الجميع مرتين", "لتجنب اتباع القانون", "حتى تملك الدولة كل المساكن"] },
    zh: { question: "为什么人们在瑞典缴税？", options: ["资助医疗、学校和照护等福利", "让每个人可以投两次票", "为了不用遵守法律", "让国家拥有所有住房"] }
  },
  "everyday-004": {
    en: { question: "Who are the labour-market parties?", options: ["Employers and trade unions", "Courts and libraries", "Regions and hospitals", "Banks and universities"] },
    ar: { question: "من هم أطراف سوق العمل؟", options: ["أصحاب العمل والنقابات", "المحاكم والمكتبات", "المناطق والمستشفيات", "البنوك والجامعات"] },
    zh: { question: "劳动力市场的双方是谁？", options: ["雇主和工会", "法院和图书馆", "地区和医院", "银行和大学"] }
  },
  "everyday-005": {
    en: { question: "What does it mean that Sweden is a secular state?", options: ["The state is not governed by a religion", "Everyone must have the same religion", "Religion is forbidden", "Only religious parties may govern"] },
    ar: { question: "ماذا يعني أن السويد دولة علمانية؟", options: ["الدولة لا تُحكم بدين", "يجب أن يكون للجميع نفس الدين", "الدين ممنوع", "الأحزاب الدينية فقط يمكنها الحكم"] },
    zh: { question: "瑞典是世俗国家是什么意思？", options: ["国家不由宗教治理", "所有人必须有同一种宗教", "宗教被禁止", "只有宗教政党可以治理"] }
  },
  "everyday-006": {
    en: { question: "What happened in Sweden during the 1800s and 1900s according to the material?", options: ["Sweden changed from an agricultural society to an industrial and welfare society", "Sweden became a desert state", "Sweden stopped having municipalities", "Sweden abolished all schools"] },
    ar: { question: "ماذا حدث في السويد خلال القرنين 19 و20 حسب المادة؟", options: ["تحولت السويد من مجتمع زراعي إلى مجتمع صناعي ورفاه", "أصبحت السويد دولة صحراوية", "توقفت السويد عن وجود البلديات", "ألغت السويد كل المدارس"] },
    zh: { question: "根据材料，瑞典在19世纪和20世纪发生了什么？", options: ["瑞典从农业社会变为工业和福利社会", "瑞典变成沙漠国家", "瑞典不再有市政府", "瑞典废除了所有学校"] }
  },
  "authorities-001": {
    en: { question: "Who is Sweden's head of state?", options: ["The king", "The prime minister", "The speaker", "The parliamentary ombudsman"] },
    ar: { question: "من هو رئيس دولة السويد؟", options: ["الملك", "رئيس الوزراء", "رئيس البرلمان", "أمين المظالم البرلماني"] },
    zh: { question: "谁是瑞典国家元首？", options: ["国王", "首相", "议长", "议会监察员"] }
  },
  "authorities-002": {
    en: { question: "What does the government do?", options: ["Governs the country and carries out Riksdag decisions", "Judges criminal cases", "Chooses all members of parliament", "Owns all media"] },
    ar: { question: "ماذا تفعل الحكومة؟", options: ["تدير البلاد وتنفذ قرارات البرلمان", "تحكم في القضايا الجنائية", "تختار كل أعضاء البرلمان", "تملك كل وسائل الإعلام"] },
    zh: { question: "政府做什么？", options: ["管理国家并执行国会决定", "审判刑事案件", "选择所有国会议员", "拥有所有媒体"] }
  },
  "authorities-003": {
    en: { question: "What are regions mainly responsible for?", options: ["Healthcare", "Riksdag laws", "Passport control at the border", "All courts"] },
    ar: { question: "ما المسؤولية الرئيسية للمناطق؟", options: ["الرعاية الصحية", "قوانين البرلمان", "مراقبة الجوازات على الحدود", "كل المحاكم"] },
    zh: { question: "地区主要负责什么？", options: ["医疗保健", "国会法律", "边境护照检查", "所有法院"] }
  },
  "authorities-004": {
    en: { question: "What are municipalities often responsible for?", options: ["School, care for older people, and local issues", "Making constitutional laws", "Leading the EU", "Judging in court"] },
    ar: { question: "ما الذي تكون البلديات مسؤولة عنه غالباً؟", options: ["المدرسة ورعاية كبار السن والقضايا المحلية", "سن القوانين الدستورية", "قيادة الاتحاد الأوروبي", "الحكم في المحكمة"] },
    zh: { question: "市政府通常负责什么？", options: ["学校、老人照护和地方事务", "制定基本法", "领导欧盟", "在法院审判"] }
  },
  "authorities-005": {
    en: { question: "What do courts do?", options: ["Try cases and judge according to law", "Write party programs", "Decide municipal tax", "Run health centers"] },
    ar: { question: "ماذا تفعل المحاكم؟", options: ["تنظر في القضايا وتحكم وفق القانون", "تكتب برامج الأحزاب", "تقرر ضريبة البلدية", "تدير المراكز الصحية"] },
    zh: { question: "法院做什么？", options: ["审理案件并依法判决", "撰写政党纲领", "决定市政税", "运营医疗中心"] }
  },
  "authorities-006": {
    en: { question: "What does it mean that Sweden cooperates internationally?", options: ["Sweden takes part in Nordic, European, and global cooperation", "Sweden has no contact with other countries", "Sweden lets other countries decide all laws", "Sweden has abolished its defence"] },
    ar: { question: "ماذا يعني أن السويد تتعاون دولياً؟", options: ["تشارك السويد في تعاون شمالي وأوروبي وعالمي", "ليس للسويد أي اتصال بدول أخرى", "تترك السويد للدول الأخرى تقرير كل القوانين", "ألغت السويد دفاعها"] },
    zh: { question: "瑞典进行国际合作是什么意思？", options: ["瑞典参与北欧、欧洲和全球合作", "瑞典与其他国家没有联系", "瑞典让其他国家决定所有法律", "瑞典废除了国防"] }
  }
};

const LANGUAGE_STORAGE_KEY = "appLanguage";
const OLD_EXPLANATION_LANGUAGE_KEY = "explanationLanguage";
const CITIZENSHIP_UPDATE_DISMISSED_KEY = "citizenshipUpdateDismissed";

function App() {
  const [route, setRoute] = useHashRoute();
  const [progress, setProgress] = useState<Progress>(() => loadProgress());
  const [questionIndexByTopic, setQuestionIndexByTopic] = useState<Record<string, number>>({});
  const [practiceStartedByTopic, setPracticeStartedByTopic] = useState<Record<string, boolean>>({});
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [lastWasCorrect, setLastWasCorrect] = useState(false);
  const [questionHelpVisible, setQuestionHelpVisible] = useState(false);
  const [language, setLanguage] = useState<UiLanguage>(() => getInitialLanguage());
  const ui = UI_TEXT[language];

  function goHome() {
    setRoute({ page: "home" });
    setSelectedIndex(null);
    setChecked(false);
    setQuestionHelpVisible(false);
  }

  function goTopic(topicId: string) {
    setRoute({ page: "topic", topicId });
    setSelectedIndex(null);
    setChecked(false);
    setQuestionHelpVisible(false);
  }

  function goPrivacy() {
    setRoute({ page: "privacy" });
    setSelectedIndex(null);
    setChecked(false);
    setQuestionHelpVisible(false);
  }

  function goProgress() {
    setRoute({ page: "progress" });
  }

  function goFlashcards() {
    setRoute({ page: "flashcards" });
  }

  function handleStartPractice(topicId: string) {
    setPracticeStartedByTopic((current) => ({ ...current, [topicId]: true }));
    setSelectedIndex(null);
    setChecked(false);
    setQuestionHelpVisible(false);
  }

  function handleReviewLesson(topicId: string) {
    setPracticeStartedByTopic((current) => ({ ...current, [topicId]: false }));
    setSelectedIndex(null);
    setChecked(false);
    setQuestionHelpVisible(false);
  }

  function handleCheck(question: Question) {
    if (selectedIndex === null) return;

    setChecked(true);
    setLastWasCorrect(selectedIndex === question.correctIndex);
    setProgress(recordAnswered(question.id, selectedIndex === question.correctIndex));
  }

  function handleNext(topicId: string, questionCount: number) {
    setQuestionIndexByTopic((current) => ({
      ...current,
      [topicId]: ((current[topicId] || 0) + 1) % questionCount
    }));
    setSelectedIndex(null);
    setChecked(false);
    setQuestionHelpVisible(false);
  }

  function handleResetProgress() {
    setProgress(resetProgress());
  }

  function handleLanguageChange(nextLanguage: UiLanguage) {
    setLanguage(nextLanguage);
    localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);
    localStorage.setItem(OLD_EXPLANATION_LANGUAGE_KEY, nextLanguage);
  }

  if (route.page === "privacy") {
    return (
      <PrivacyPage
        language={language}
        onBack={goHome}
        onSelectLanguage={handleLanguageChange}
        ui={ui}
      />
    );
  }

  if (route.page === "progress") {
    return (
      <ProgressDashboardPage
        language={language}
        onBack={goHome}
        onSelectLanguage={handleLanguageChange}
        onSelectTopic={goTopic}
        progress={progress}
        ui={ui}
      />
    );
  }

  if (route.page === "flashcards") {
    return (
      <FlashcardsPreviewPage
        language={language}
        onBack={goHome}
        onSelectLanguage={handleLanguageChange}
        ui={ui}
      />
    );
  }

  if (route.page === "topic") {
    const topic = TOPICS.find((item) => item.id === route.topicId);

    if (topic) {
      const lesson = LESSONS.find((item) => item.topicId === topic.id);

      return (
        <TopicPracticePage
          checked={checked}
          language={language}
          lastWasCorrect={lastWasCorrect}
          onBack={goHome}
          onCheck={handleCheck}
          onNext={handleNext}
          onResetProgress={handleResetProgress}
          onReviewLesson={handleReviewLesson}
          onSelectAnswer={setSelectedIndex}
          onSelectLanguage={handleLanguageChange}
          onStartPractice={handleStartPractice}
          practiceStarted={practiceStartedByTopic[topic.id] || !lesson}
          progress={progress}
          questionHelpVisible={questionHelpVisible}
          questionIndex={questionIndexByTopic[topic.id] || 0}
          selectedIndex={selectedIndex}
          onToggleQuestionHelp={() => setQuestionHelpVisible((current) => !current)}
          lesson={lesson}
          topic={topic}
          ui={ui}
        />
      );
    }
  }

  return (
    <HomePage
      language={language}
      onOpenFlashcards={goFlashcards}
      onOpenPrivacy={goPrivacy}
      onOpenProgress={goProgress}
      onSelectLanguage={handleLanguageChange}
      onSelectTopic={goTopic}
      progress={progress}
      ui={ui}
    />
  );
}

function getInitialLanguage(): UiLanguage {
  const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY) || localStorage.getItem(OLD_EXPLANATION_LANGUAGE_KEY);
  return SUPPORTED_LANGUAGES.some((language) => language.id === saved) ? (saved as UiLanguage) : "en";
}

function getInitialRoute(): Route {
  const hash = window.location.hash.replace(/^#\/?/, "");
  const [page, topicId] = hash.split("/");

  if (page === "topic" && topicId) {
    return { page: "topic", topicId };
  }

  if (page === "privacy") {
    return { page: "privacy" };
  }

  if (page === "progress") {
    return { page: "progress" };
  }

  if (page === "flashcards") {
    return { page: "flashcards" };
  }

  return { page: "home" };
}

function useHashRoute(): [Route, (route: Route) => void] {
  const [route, setRouteState] = useState<Route>(() => getInitialRoute());

  useEffect(() => {
    function syncRoute() {
      setRouteState(getInitialRoute());
    }

    window.addEventListener("hashchange", syncRoute);
    return () => window.removeEventListener("hashchange", syncRoute);
  }, []);

  function setRoute(nextRoute: Route) {
    window.location.hash =
      nextRoute.page === "home"
        ? "/"
        : nextRoute.page === "privacy"
          ? "/privacy"
          : nextRoute.page === "progress"
            ? "/progress"
            : nextRoute.page === "flashcards"
              ? "/flashcards"
              : `/topic/${nextRoute.topicId}`;
    setRouteState(nextRoute);
  }

  return [route, setRoute];
}

function HomePage({
  language,
  onOpenFlashcards,
  onOpenPrivacy,
  onOpenProgress,
  onSelectLanguage,
  onSelectTopic,
  progress,
  ui
}: {
  language: UiLanguage;
  onOpenFlashcards: () => void;
  onOpenPrivacy: () => void;
  onOpenProgress: () => void;
  onSelectLanguage: (language: UiLanguage) => void;
  onSelectTopic: (topicId: string) => void;
  progress: Progress;
  ui: UiText;
}) {
  const [selectedTopicFilter, setSelectedTopicFilter] = useState<string>("all");
  const [showCitizenshipUpdate, setShowCitizenshipUpdate] = useState(
    () => localStorage.getItem(CITIZENSHIP_UPDATE_DISMISSED_KEY) !== "true"
  );
  const visibleTopics =
    selectedTopicFilter === "all" ? TOPICS : TOPICS.filter((topic) => topic.id === selectedTopicFilter);

  function handleDismissCitizenshipUpdate() {
    localStorage.setItem(CITIZENSHIP_UPDATE_DISMISSED_KEY, "true");
    setShowCitizenshipUpdate(false);
  }

  return (
    <main className="shell" dir={isRtl(language) ? "rtl" : "ltr"}>
      <section className="intro hero-banner">
        <div className="hero-copy">
          <p className="hero-badge">
            <span className="flag-icon" aria-hidden="true" />
            {ui.eyebrow}
          </p>
          <h1>{ui.appTitle}</h1>
          <p className="lead">{ui.lead}</p>
          <p className="language-note">{ui.languageNote}</p>
        </div>
        <div className="intro-actions">
          <p className="daily-prompt">{ui.dailyPrompt}</p>
          <ProgressCounter progress={progress} ui={ui} />
          <LanguageSelector onChange={onSelectLanguage} ui={ui} value={language} />
        </div>
      </section>

      {showCitizenshipUpdate ? (
        <CitizenshipUpdateCard language={language} onDismiss={handleDismissCitizenshipUpdate} ui={ui} />
      ) : null}

      <IndependentGuideSection ui={ui} />

      <StudyPathSection ui={ui} />
      <ChapterMapSection ui={ui} />

      <TopicSelector
        selectedTopicId={selectedTopicFilter}
        onSelectTopic={setSelectedTopicFilter}
        ui={ui}
      />

      <section className="topic-list" aria-label="Topics">
        {visibleTopics.map((topic) => {
          const topicQuestions = QUESTIONS.filter((question) => question.topicId === topic.id);
          const count = topicQuestions.length;
          const completed = topicQuestions.filter((question) => progress.answeredIds.includes(question.id)).length;
          const percent = count > 0 ? Math.round((completed / count) * 100) : 0;
          const visual = TOPIC_VISUALS[topic.id as keyof typeof TOPIC_VISUALS] || TOPIC_VISUALS.democracy;
          const Icon = visual.icon;
          const topicName = ui.topicNames[topic.id] || topic.nameEn;
          const coveredChapters = OFFICIAL_CHAPTERS.filter((chapter) => chapter.topicId === topic.id);

          return (
            <article className={`topic-card accent-${visual.accent}`} key={topic.id}>
              <div>
                <div className="topic-icon" aria-hidden="true">
                  <Icon size={24} strokeWidth={2.2} />
                </div>
                <p className="topic-sv" dir="ltr">{topic.nameSv}</p>
                <h2>{topicName}</h2>
                <p>{ui.topicDescriptions[topic.id] || topic.descriptionEn}</p>
                <div className="coverage-chips" aria-label={`${ui.topicCoverageLabel} ${topicName}`}>
                  {coveredChapters.map((chapter) => (
                    <span key={chapter.id}>{chapter.number}</span>
                  ))}
                </div>
              </div>
              <div className="topic-progress">
                <div className="topic-progress-row">
                  <span>{ui.topicProgress(completed, count)}</span>
                  <strong>{percent}%</strong>
                </div>
                <div className="topic-progress-track" aria-hidden="true">
                  <span style={{ width: `${percent}%` }} />
                </div>
              </div>
              <button className="primary" type="button" onClick={() => onSelectTopic(topic.id)}>
                {completed > 0 ? ui.continuePractice : ui.startWarmup(count)}
              </button>
            </article>
          );
        })}
      </section>

      <ComingNextSection onOpenFlashcards={onOpenFlashcards} onOpenProgress={onOpenProgress} ui={ui} />
      <FaqSection language={language} />
      <SiteFooter language={language} onOpenPrivacy={onOpenPrivacy} />
    </main>
  );
}

function TopicSelector({
  selectedTopicId,
  onSelectTopic,
  ui
}: {
  selectedTopicId: string;
  onSelectTopic: (topicId: string) => void;
  ui: UiText;
}) {
  const choices = [{ id: "all", label: ui.allTopics }, ...TOPICS.map((topic) => ({
    id: topic.id,
    label: ui.topicNames[topic.id] || topic.nameEn
  }))];

  return (
    <section className="topic-selector" aria-label={ui.topicSelectorLabel}>
      <p>{ui.topicSelectorLabel}</p>
      <div className="selector-tabs" role="tablist" aria-label={ui.topicSelectorLabel}>
        {choices.map((choice) => {
          const isActive = selectedTopicId === choice.id;

          return (
            <button
              aria-selected={isActive}
              className={`selector-tab ${isActive ? "active" : ""}`}
              key={choice.id}
              onClick={() => onSelectTopic(choice.id)}
              role="tab"
              type="button"
            >
              {choice.label}
            </button>
          );
        })}
      </div>
    </section>
  );
}

function IndependentGuideSection({ ui }: { ui: UiText }) {
  const paragraphs = ui.earlyAccessMessage.split("\n\n").filter(Boolean);
  const heading = paragraphs[0];
  const bullets = paragraphs.slice(1, 3);

  return (
    <section className="early-access" aria-label={ui.earlyAccessTitle}>
      <h2 className="section-title-with-icon">
        <BookOpen size={20} aria-hidden="true" />
        {ui.earlyAccessTitle}
      </h2>
      {heading ? <p className="guide-kicker">{heading}</p> : null}
      <ul className="guide-list">
        {bullets.map((paragraph) => (
          <li key={paragraph}>{paragraph}</li>
        ))}
      </ul>
      <a className="source-link" href={OFFICIAL_STUDY_GUIDE_URL} rel="noopener noreferrer" target="_blank">
        {ui.officialGuideLink}
        <ExternalLink size={16} aria-hidden="true" />
      </a>
    </section>
  );
}

function CitizenshipUpdateCard({
  language,
  onDismiss,
  ui
}: {
  language: UiLanguage;
  onDismiss: () => void;
  ui: UiText;
}) {
  const [expanded, setExpanded] = useState(false);
  const update = CITIZENSHIP_UPDATE[language];

  return (
    <section className="citizenship-update" aria-label={update.title}>
      <button className="update-dismiss" type="button" aria-label={ui.dismiss} onClick={onDismiss}>
        <X size={18} aria-hidden="true" />
      </button>
      <div className="update-icon" aria-hidden="true">
        <AlertTriangle size={22} strokeWidth={2.4} />
      </div>
      <div>
        <p className="eyebrow">{update.source}</p>
        <h2>{update.title}</h2>
        <p className="update-summary">{update.summary}</p>
        <button
          className="update-read-more"
          type="button"
          aria-expanded={expanded}
          onClick={() => setExpanded((current) => !current)}
        >
          {expanded ? ui.showLess : ui.readMore}
          <ChevronDown className={expanded ? "rotate" : ""} size={16} aria-hidden="true" />
        </button>
        {expanded ? (
          <div className="update-details">
            <p>{update.intro}</p>
            <ul>
              {update.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
            <p>{update.note}</p>
            <div className="update-links">
              <a href={MIGRATIONSVERKET_CITIZENSHIP_URL} rel="noopener noreferrer" target="_blank">
                {update.migrationsverketLink}
                <ExternalLink size={15} aria-hidden="true" />
              </a>
              <a href={OFFICIAL_STUDY_GUIDE_URL} rel="noopener noreferrer" target="_blank">
                {update.uhrLink}
                <ExternalLink size={15} aria-hidden="true" />
              </a>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function StudyPathSection({ ui }: { ui: UiText }) {
  return (
    <section className="study-path" aria-label={ui.studyPathTitle}>
      <div>
        <p className="eyebrow">{ui.topicCoverageLabel}</p>
        <h2>{ui.studyPathTitle}</h2>
        <ul className="study-intro-list">
          {ui.studyPathIntro.split(". ").filter(Boolean).slice(0, 3).map((item) => (
            <li key={item}>{item.replace(/\.$/, "")}.</li>
          ))}
        </ul>
      </div>
      <div className="study-steps">
        {ui.studySteps.map((step, index) => (
          <article className="study-step" key={step.title}>
            <span className="step-number" aria-hidden="true">{index + 1}</span>
            <div>
              <h3>
                <span aria-hidden="true">{index === 0 ? "📖" : index === 1 ? "🎯" : "↻"}</span>
                {step.title.replace(/^\d+\.\s*/, "")}
              </h3>
              <p>{step.body}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ChapterMapSection({ ui }: { ui: UiText }) {
  return (
    <section className="chapter-map" aria-label={ui.chapterMapTitle}>
      <div className="section-heading">
        <h2>{ui.chapterMapTitle}</h2>
        <p>{ui.chapterMapIntro}</p>
      </div>
      <div className="chapter-grid">
        {OFFICIAL_CHAPTERS.map((chapter) => (
          <article className={`chapter-card accent-${TOPIC_VISUALS[chapter.topicId].accent}`} key={chapter.id}>
            <span className="chapter-number">{chapter.number}</span>
            <div>
              <p className="chapter-sv" dir="ltr">{chapter.nameSv}</p>
              <h3>{ui.chapterNames[chapter.id]}</h3>
              <p>{ui.chapterSummaries[chapter.id]}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ComingNextSection({
  onOpenFlashcards,
  onOpenProgress,
  ui
}: {
  onOpenFlashcards: () => void;
  onOpenProgress: () => void;
  ui: UiText;
}) {
  return (
    <section className="coming-next" aria-label={ui.comingNextTitle}>
      <div className="section-heading">
        <h2>{ui.comingNextTitle}</h2>
        <p>{ui.comingNextIntro}</p>
      </div>
      <div className="coming-grid">
        {ui.comingNextItems.map((item, index) => {
          const Icon = index === 0 ? Sparkles : index === 1 ? CheckCircle2 : HeartPulse;
          const isAvailable = index === 0 || index === 2;
          const onClick = index === 0 ? onOpenFlashcards : index === 2 ? onOpenProgress : undefined;

          return (
            <article className={`coming-card ${isAvailable ? "preview-available" : ""}`} key={item.title}>
              <div className="coming-icon" aria-hidden="true">
                <Icon size={20} strokeWidth={2.3} />
              </div>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
              {isAvailable ? (
                <button className="secondary coming-action" type="button" onClick={onClick}>
                  {index === 0 ? ui.flashcardsPreview : ui.continuePractice}
                </button>
              ) : null}
            </article>
          );
        })}
      </div>
    </section>
  );
}

function FaqSection({ language }: { language: UiLanguage }) {
  const faq = FAQ_CONTENT[language];

  return (
    <section className="faq-section" id="faq" aria-label={faq.title}>
      <div className="section-heading">
        <h2>{faq.title}</h2>
        <p>{faq.intro}</p>
      </div>
      <div className="faq-list">
        {faq.items.map((item) => (
          <FaqItem item={item} key={item.question} />
        ))}
      </div>
    </section>
  );
}

function FaqItem({ item }: { item: { question: string; answer: string } }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className={`faq-item ${expanded ? "expanded" : ""}`}>
      <button
        className="faq-question"
        type="button"
        aria-expanded={expanded}
        onClick={() => setExpanded((current) => !current)}
      >
        <span>{item.question}</span>
        <ChevronDown className="faq-chevron" size={18} aria-hidden="true" />
      </button>
      <div className="faq-answer">
        <div>
          <p>{item.answer}</p>
        </div>
      </div>
    </article>
  );
}

function SiteFooter({
  language,
  onOpenPrivacy
}: {
  language: UiLanguage;
  onOpenPrivacy: () => void;
}) {
  const legal = LEGAL_CONTENT[language];

  return (
    <footer className="site-footer">
      <p>{legal.footerNote}</p>
      <button className="footer-link" type="button" onClick={onOpenPrivacy}>
        {legal.privacyLink}
      </button>
    </footer>
  );
}

function PrivacyPage({
  language,
  onBack,
  onSelectLanguage,
  ui
}: {
  language: UiLanguage;
  onBack: () => void;
  onSelectLanguage: (language: UiLanguage) => void;
  ui: UiText;
}) {
  const legal = LEGAL_CONTENT[language];

  return (
    <main className="shell" dir={isRtl(language) ? "rtl" : "ltr"}>
      <nav className="topbar">
        <button className="ghost" type="button" onClick={onBack}>
          {legal.homeLink}
        </button>
        <LanguageSelector onChange={onSelectLanguage} ui={ui} value={language} />
      </nav>

      <article className="legal-page">
        <p className="eyebrow">{legal.privacyLink}</p>
        <h1>{legal.title}</h1>
        <p className="legal-updated">{legal.updated}</p>
        <p className="lead">{legal.intro}</p>

        <div className="legal-sections">
          {legal.sections.map((section) => (
            <section className="legal-section" key={section.title}>
              <h2>{section.title}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}
        </div>
      </article>
    </main>
  );
}

function ProgressDashboardPage({
  language,
  onBack,
  onSelectLanguage,
  onSelectTopic,
  progress,
  ui
}: {
  language: UiLanguage;
  onBack: () => void;
  onSelectLanguage: (language: UiLanguage) => void;
  onSelectTopic: (topicId: string) => void;
  progress: Progress;
  ui: UiText;
}) {
  const topicStats = TOPICS.map((topic) => getTopicStats(topic, progress, ui));
  const practicedQuestions = progress.answeredIds.length;
  const totalQuestions = QUESTIONS.length;
  const totalKnownAnswers = Object.values(progress.answers || {});
  const correct = totalKnownAnswers.reduce((sum, answer) => sum + answer.correct, 0);
  const attempts = totalKnownAnswers.reduce((sum, answer) => sum + answer.attempts, 0);
  const accuracy = attempts > 0 ? Math.round((correct / attempts) * 100) : 0;
  const weakTopic = [...topicStats]
    .filter((topic) => topic.attempts > 0)
    .sort((a, b) => a.accuracy - b.accuracy || b.wrong - a.wrong)[0];
  const recommended = weakTopic || [...topicStats].sort((a, b) => a.completedPercent - b.completedPercent)[0];

  return (
    <main className="shell" dir={isRtl(language) ? "rtl" : "ltr"}>
      <nav className="topbar">
        <button className="ghost" type="button" onClick={onBack}>
          {ui.backToHome}
        </button>
        <LanguageSelector onChange={onSelectLanguage} ui={ui} value={language} />
      </nav>

      <section className="dashboard-page">
        <div className="section-heading">
          <p className="eyebrow">{ui.overallProgress}</p>
          <h1>{ui.progressDashboardTitle}</h1>
          <p>{ui.progressDashboardIntro}</p>
        </div>

        <div className="dashboard-stats">
          <article>
            <strong>{practicedQuestions}/{totalQuestions}</strong>
            <span>{ui.topicProgress(practicedQuestions, totalQuestions)}</span>
          </article>
          <article>
            <strong>{progress.today}</strong>
            <span>{ui.today}</span>
          </article>
          <article>
            <strong>{accuracy}%</strong>
            <span>{ui.topicAccuracy}</span>
          </article>
          <article>
            <strong>{recommended?.name || "-"}</strong>
            <span>{ui.recommendedNext}</span>
          </article>
        </div>

        {weakTopic ? (
          <section className="weak-topic">
            <p className="eyebrow">{ui.weakTopic}</p>
            <h2>{weakTopic.name}</h2>
            <p>{ui.weakTopicAdvice(weakTopic.wrong)}</p>
            <button className="primary" type="button" onClick={() => onSelectTopic(weakTopic.id)}>
              {ui.continuePractice}
            </button>
          </section>
        ) : null}

        <div className="topic-dashboard-grid">
          {topicStats.map((topic) => (
            <article className="topic-dashboard-card" key={topic.id}>
              <div>
                <h2>{topic.name}</h2>
                <p dir="ltr">{topic.nameSv}</p>
              </div>
              <div className="topic-progress">
                <div className="topic-progress-row">
                  <span>{ui.topicProgress(topic.completed, topic.total)}</span>
                  <strong>{topic.completedPercent}%</strong>
                </div>
                <div className="topic-progress-track" aria-hidden="true">
                  <span style={{ width: `${topic.completedPercent}%` }} />
                </div>
              </div>
              <p>
                {ui.topicAccuracy}: <strong>{topic.accuracy}%</strong>
              </p>
              <button className="secondary" type="button" onClick={() => onSelectTopic(topic.id)}>
                {ui.continuePractice}
              </button>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

function FlashcardsPreviewPage({
  language,
  onBack,
  onSelectLanguage,
  ui
}: {
  language: UiLanguage;
  onBack: () => void;
  onSelectLanguage: (language: UiLanguage) => void;
  ui: UiText;
}) {
  const cards = LESSONS.flatMap((lesson) =>
    lesson.vocabulary.map((item) => ({
      topic: ui.topicNames[lesson.topicId] || lesson.topicId,
      sv: item.sv,
      translation: item.translations[language]
    }))
  );
  const [cardIndex, setCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const card = cards[cardIndex];

  function nextCard() {
    setFlipped(false);
    setCardIndex((current) => (current + 1) % cards.length);
  }

  return (
    <main className="shell" dir={isRtl(language) ? "rtl" : "ltr"}>
      <nav className="topbar">
        <button className="ghost" type="button" onClick={onBack}>
          {ui.backToHome}
        </button>
        <LanguageSelector onChange={onSelectLanguage} ui={ui} value={language} />
      </nav>

      <section className="flashcard-page">
        <div className="section-heading">
          <p className="eyebrow">{ui.flashcardsPreview}</p>
          <h1>{ui.flashcardsTitle}</h1>
          <p>{ui.comingNextItems[0].body}</p>
        </div>

        <button className={`flashcard ${flipped ? "flipped" : ""}`} type="button" onClick={() => setFlipped((current) => !current)}>
          <span>{card.topic}</span>
          <strong lang="sv">{flipped ? card.translation : card.sv}</strong>
          <small>{flipped ? card.sv : ui.flipCard}</small>
        </button>

        <div className="actions">
          <button className="primary" type="button" onClick={() => setFlipped((current) => !current)}>
            {ui.flipCard}
          </button>
          <button className="secondary" type="button" onClick={nextCard}>
            {ui.nextCard}
          </button>
        </div>
      </section>
    </main>
  );
}

function getTopicStats(topic: Topic, progress: Progress, ui: UiText) {
  const questions = QUESTIONS.filter((question) => question.topicId === topic.id);
  const answers = questions.map((question) => progress.answers?.[question.id]).filter(Boolean);
  const attempts = answers.reduce((sum, answer) => sum + answer.attempts, 0);
  const correct = answers.reduce((sum, answer) => sum + answer.correct, 0);
  const wrong = answers.reduce((sum, answer) => sum + answer.wrong, 0);
  const completed = questions.filter((question) => progress.answeredIds.includes(question.id)).length;

  return {
    id: topic.id,
    name: ui.topicNames[topic.id] || topic.nameEn,
    nameSv: topic.nameSv,
    total: questions.length,
    completed,
    completedPercent: questions.length > 0 ? Math.round((completed / questions.length) * 100) : 0,
    attempts,
    correct,
    wrong,
    accuracy: attempts > 0 ? Math.round((correct / attempts) * 100) : 0
  };
}

type TopicPracticePageProps = {
  checked: boolean;
  language: UiLanguage;
  lastWasCorrect: boolean;
  lesson?: Lesson;
  onBack: () => void;
  onCheck: (question: Question) => void;
  onNext: (topicId: string, questionCount: number) => void;
  onResetProgress: () => void;
  onReviewLesson: (topicId: string) => void;
  onSelectAnswer: (index: number) => void;
  onSelectLanguage: (language: UiLanguage) => void;
  onStartPractice: (topicId: string) => void;
  practiceStarted: boolean;
  progress: Progress;
  questionHelpVisible: boolean;
  questionIndex: number;
  selectedIndex: number | null;
  topic: Topic;
  onToggleQuestionHelp: () => void;
  ui: UiText;
};

function TopicPracticePage({
  checked,
  language,
  lastWasCorrect,
  lesson,
  onBack,
  onCheck,
  onNext,
  onResetProgress,
  onReviewLesson,
  onSelectAnswer,
  onSelectLanguage,
  onStartPractice,
  onToggleQuestionHelp,
  practiceStarted,
  progress,
  questionHelpVisible,
  questionIndex,
  selectedIndex,
  topic,
  ui
}: TopicPracticePageProps) {
  const lessonQuestionIds = new Set(lesson?.questionIds || []);
  const questions = lesson
    ? QUESTIONS.filter((question) => lessonQuestionIds.has(question.id))
    : QUESTIONS.filter((question) => question.topicId === topic.id);
  const question = questions[questionIndex];
  const topicName = ui.topicNames[topic.id] || topic.nameEn;

  return (
    <main className="shell" dir={isRtl(language) ? "rtl" : "ltr"}>
      <nav className="topbar">
        <button className="ghost" type="button" onClick={onBack}>
          {ui.backToTopics}
        </button>
        <div className="topbar-tools">
          <LanguageSelector onChange={onSelectLanguage} ui={ui} value={language} />
          <ProgressCounter progress={progress} ui={ui} />
        </div>
      </nav>

      {lesson && !practiceStarted ? (
        <LessonCard
          language={language}
          lesson={lesson}
          onStartPractice={() => onStartPractice(topic.id)}
          topicName={topicName}
          ui={ui}
        />
      ) : null}

      {practiceStarted ? (
      <section className="practice">
        <div className="practice-header">
          <div>
            <p className="topic-sv" dir="ltr">{topic.nameSv}</p>
            <h1>{topicName}</h1>
            <p className="topic-flavor">{ui.topicFlavor[topic.id] || "Small steps, useful knowledge."}</p>
          </div>
          <div className="practice-meta">
            <p className="level-pill">{topicName} · {ui.level}</p>
            <p className="question-count">{ui.questionProgress(questionIndex + 1, questions.length)}</p>
          </div>
        </div>

        <p className="coach-note">{ui.coachNote}</p>

        <QuestionCard
          checked={checked}
          language={language}
          onSelectAnswer={onSelectAnswer}
          onToggleQuestionHelp={onToggleQuestionHelp}
          question={question}
          questionHelpVisible={questionHelpVisible}
          selectedIndex={selectedIndex}
          ui={ui}
        />

        {checked ? <ResultPanel language={language} lastWasCorrect={lastWasCorrect} question={question} ui={ui} /> : null}

        <div className="actions">
          <button className="primary" type="button" disabled={selectedIndex === null || checked} onClick={() => onCheck(question)}>
            {ui.checkAnswer}
          </button>
          <button className="secondary" type="button" disabled={!checked} onClick={() => onNext(topic.id, questions.length)}>
            {ui.nextQuestion}
          </button>
          <button className="ghost" type="button" onClick={onResetProgress}>
            {ui.resetProgress}
          </button>
          {lesson ? (
            <button className="ghost" type="button" onClick={() => onReviewLesson(topic.id)}>
              {ui.reviewLesson}
            </button>
          ) : null}
        </div>
      </section>
      ) : null}
    </main>
  );
}

function LessonCard({
  language,
  lesson,
  onStartPractice,
  topicName,
  ui
}: {
  language: UiLanguage;
  lesson: Lesson;
  onStartPractice: () => void;
  topicName: string;
  ui: UiText;
}) {
  const lessonIndex = LESSONS.findIndex((item) => item.id === lesson.id);
  const lessonNumber = lessonIndex >= 0 ? lessonIndex + 1 : 1;

  return (
    <section className="lesson-card" aria-label={ui.studyCardLabel}>
      <div className="lesson-header">
        <div>
          <p className="lesson-step">{ui.roadmapStep(lessonNumber, LESSONS.length)}</p>
          <h1>{lesson.titles[language]}</h1>
          <p className="topic-sv" dir="ltr">{lesson.titleSv}</p>
        </div>
        <div className="lesson-meta">
          <p>{topicName}</p>
          <div className="coverage-chips" aria-label={ui.chaptersLabel}>
            {lesson.chapterNumbers.map((number) => (
              <span key={number}>{number}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="lesson-grid">
        <section className="lesson-section">
          <h2 className="section-title-with-icon">
            <BookOpen size={20} aria-hidden="true" />
            {ui.studyMaterialTitle}
          </h2>
          {lesson.studyText[language].map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>

        <section className="lesson-section takeaway-panel">
          <h2 className="section-title-with-icon">
            <Star size={20} aria-hidden="true" />
            {ui.takeawaysTitle}
          </h2>
          <ul>
            {lesson.takeaways[language].map((takeaway, index) => (
              <li key={takeaway}>
                <span aria-hidden="true">{index + 1}</span>
                <strong>{takeaway}</strong>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="lesson-section vocabulary-panel">
        <h2>{ui.vocabularyTitle}</h2>
        <div className="vocabulary-list">
          {lesson.vocabulary.map((item) => (
            <div className="vocabulary-item" key={item.sv}>
              <strong lang="sv">{item.sv}</strong>
              <span>{item.translations[language]}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="actions">
        <button className="primary test-knowledge" type="button" onClick={onStartPractice}>
          <HelpCircle size={20} aria-hidden="true" />
          {ui.testKnowledge}
        </button>
        <a className="source-link" href={OFFICIAL_STUDY_GUIDE_URL} rel="noreferrer" target="_blank">
          {ui.officialGuideLink}
        </a>
      </div>
    </section>
  );
}

function QuestionCard({
  checked,
  language,
  onSelectAnswer,
  onToggleQuestionHelp,
  question,
  questionHelpVisible,
  selectedIndex,
  ui
}: {
  checked: boolean;
  language: UiLanguage;
  onSelectAnswer: (index: number) => void;
  onToggleQuestionHelp: () => void;
  question: Question;
  questionHelpVisible: boolean;
  selectedIndex: number | null;
  ui: UiText;
}) {
  const translation = getQuestionTranslation(question, language);
  const showHelp = questionHelpVisible && translation;

  return (
    <form className="question-form" dir="ltr">
      <fieldset>
        {translation ? (
          <div className="question-toolbar">
            <button className="ghost help-toggle" type="button" onClick={onToggleQuestionHelp}>
              {questionHelpVisible ? ui.hideQuestionHelp : ui.showQuestionHelp}
            </button>
          </div>
        ) : null}
        <legend>{question.questionSv}</legend>
        {showHelp ? (
          <aside className="question-help" dir={isRtl(language) ? "rtl" : "ltr"}>
            <p className="question-help-label">{ui.questionHelpLabel}</p>
            <p>{translation.question}</p>
          </aside>
        ) : null}
        <div className="options">
          {question.options.map((option, optionIndex) => {
            const isSelected = selectedIndex === optionIndex;
            const isCorrect = checked && optionIndex === question.correctIndex;
            const isWrong = checked && isSelected && optionIndex !== question.correctIndex;
            const statusClass = isCorrect ? "correct" : isWrong ? "wrong" : "";
            const statusLabel = isCorrect ? ui.correct : isWrong ? ui.incorrect : isSelected ? ui.selected : "";
            const translatedOption = showHelp ? translation.options[optionIndex] : "";

            return (
              <label className={`option ${isSelected ? "selected" : ""} ${statusClass}`} key={option}>
                <input
                  checked={isSelected}
                  disabled={checked}
                  name="answer"
                  onChange={() => onSelectAnswer(optionIndex)}
                  type="radio"
                  value={optionIndex}
                />
                <span className="option-text">
                  <span>{option}</span>
                  {translatedOption ? (
                    <small className="option-translation" dir={isRtl(language) ? "rtl" : "ltr"}>
                      {translatedOption}
                    </small>
                  ) : null}
                </span>
                {statusLabel ? (
                  <span className="option-status" dir="auto">
                    {isWrong ? <XCircle size={18} aria-hidden="true" /> : <CheckCircle2 size={18} aria-hidden="true" />}
                    {statusLabel}
                  </span>
                ) : null}
              </label>
            );
          })}
        </div>
      </fieldset>
    </form>
  );
}

function getQuestionTranslation(question: Question, language: UiLanguage) {
  return question.translations?.[language] || QUESTION_TRANSLATIONS[question.id]?.[language] || null;
}

function ResultPanel({
  language,
  lastWasCorrect,
  question,
  ui
}: {
  language: ExplanationLanguage;
  lastWasCorrect: boolean;
  question: Question;
  ui: UiText;
}) {
  const explanation = getExplanation(question, language, ui);

  return (
    <section className={`result ${lastWasCorrect ? "result-correct" : "result-wrong"}`} aria-live="polite">
      <p className="result-kicker">{lastWasCorrect ? ui.correctKicker : ui.wrongKicker}</p>
      <h2>{lastWasCorrect ? ui.correctTitle : ui.wrongTitle}</h2>
      <p>
        <strong>{ui.bestAnswer}:</strong> <span dir="ltr">{question.options[question.correctIndex]}</span>
      </p>
      <p dir={isRtl(language) ? "rtl" : "ltr"}>{explanation}</p>
    </section>
  );
}

function getExplanation(question: Question, language: ExplanationLanguage, ui: UiText) {
  return question.explanations[language]?.trim() || question.explanations.en || ui.explanationFallback;
}

function LanguageSelector({
  onChange,
  ui,
  value
}: {
  onChange: (language: UiLanguage) => void;
  ui: UiText;
  value: UiLanguage;
}) {
  return (
    <label className="language-select">
      <span>{ui.appLanguage}</span>
      <select value={value} onChange={(event) => onChange(event.target.value as UiLanguage)}>
        {SUPPORTED_LANGUAGES.map((language) => (
          <option key={language.id} value={language.id}>
            {language.nativeLabel} / {language.label}
          </option>
        ))}
      </select>
      <small>{ui.appLanguageHint}</small>
    </label>
  );
}

function ProgressCounter({ progress, ui }: { progress: Progress; ui: UiText }) {
  return (
    <div className="progress" aria-label="Practice progress">
      <span>
        <strong>{progress.today}</strong> {ui.today}
      </span>
      <span aria-hidden="true">/</span>
      <span>
        <strong>{progress.total}</strong> {ui.total}
      </span>
      <span className="progress-message">{getProgressMessage(progress.today, ui)}</span>
    </div>
  );
}

function getProgressMessage(today: number, ui: UiText) {
  if (today === 0) return ui.progressFresh;
  if (today < 3) return ui.progressWarm;
  if (today < 6) return ui.progressGood;
  if (today < 10) return ui.progressSolid;
  return ui.progressStrong;
}

function isRtl(language: ExplanationLanguage | UiLanguage) {
  return language === "ar";
}

createRoot(document.querySelector("#app")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
