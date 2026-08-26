import { StrictMode, useEffect, useState } from "react";
import type { FormEvent } from "react";
import { createRoot } from "react-dom/client";
import { useTranslation } from "react-i18next";
import { Analytics } from "@vercel/analytics/react";
import { AlertTriangle, BarChart3, BookOpen, BriefcaseBusiness, CheckCircle2, ChevronDown, ExternalLink, HeartPulse, HelpCircle, Home as HomeIcon, Landmark, Layers3, LockKeyhole, MessageSquare, Scale, Sparkles, Star, X, XCircle } from "lucide-react";
import { LESSONS, MIGRATIONSVERKET_CITIZENSHIP_URL, OFFICIAL_CHAPTERS, OFFICIAL_STUDY_GUIDE_URL, QUESTIONS, TOPICS } from "./data";
import { DRAFT_QUESTIONS, type DraftQuestion, type DraftQuestionStatus } from "./draftQuestions";
import i18n from "./i18n";
import { analyticsStatus, trackEvent, trackPageView } from "./analytics";
import { CITIZENSHIP_UPDATE, FAQ_CONTENT, LEGAL_CONTENT } from "./i18n/content";
import { SUPPORTED_LANGUAGES, UI_TEXT, type UiText } from "./i18n/uiText";
import { loadProgress, recordAnswered, resetProgress } from "./progress";
import type { Chapter, ExplanationLanguage, Lesson, Progress, Question, Topic, UiLanguage } from "./types";
import "./styles.css";

type Route =
  | { page: "home" }
  | { page: "topic"; topicId: string }
  | { page: "area"; topicId: string }
  | { page: "chapter"; chapterId: string }
  | { page: "quick" }
  | { page: "mock-exam" }
  | { page: "question-review" }
  | { page: "progress" }
  | { page: "flashcards" }
  | { page: "feedback" }
  | { page: "privacy" }
  | { page: "admin" };

type MobileNavTarget = "home" | "study" | "practice" | "progress";

const QUICK_START_TOPIC_ID = "quick-start";
const QUICK_START_QUESTION_IDS = [
  "draft-batch-a-ch02-001",
  "draft-batch-a-ch05-001",
  "draft-batch-b-ch09-001",
  "draft-batch-a-ch03-001",
  "draft-batch-b-ch06-001"
];
const QUICK_START_TOPIC: Topic = {
  id: QUICK_START_TOPIC_ID,
  nameSv: "Snabbträning",
  nameEn: "Quick practice",
  descriptionEn: "Try five mixed Swedish questions."
};
const QUICK_START_QUESTIONS = QUICK_START_QUESTION_IDS
  .map((questionId) => QUESTIONS.find((question) => question.id === questionId))
  .filter((question): question is Question => Boolean(question));
const FREE_QUESTIONS_PER_CHAPTER = 5;
const HAS_FULL_ACCESS = import.meta.env.VITE_FULL_ACCESS === "true";
const FREE_SAMPLE_QUESTION_IDS = new Set(
  OFFICIAL_CHAPTERS.flatMap((chapter) =>
    QUESTIONS
      .filter((question) => question.chapterId === chapter.id)
      .slice(0, FREE_QUESTIONS_PER_CHAPTER)
      .map((question) => question.id)
  )
);

const TOPIC_VISUALS = {
  democracy: { icon: Landmark, accent: "blue" },
  rights: { icon: Scale, accent: "green" },
  everyday: { icon: HeartPulse, accent: "rose" },
  authorities: { icon: BriefcaseBusiness, accent: "gold" }
} as const;

const QUESTION_TRANSLATIONS: Record<string, Partial<Record<UiLanguage, { question: string; options: string[] }>>> = {
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
const ADMIN_UNLOCKED_KEY = "swedencivicsprep-admin-unlocked";
const ADMIN_PASSWORD_SESSION_KEY = "swedencivicsprep-admin-password";
const ADMIN_PASSWORD = "preview-admin-2026";
const FEEDBACK_FORM_URL = import.meta.env.VITE_FEEDBACK_FORM_URL || "https://tally.so/r/eqOoLO";

registerUiTranslations();

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
  const [feedbackPromptMilestone, setFeedbackPromptMilestone] = useState<number | null>(null);
  const ui = useTranslatedUiText(language);

  useEffect(() => {
    if (i18n.language !== language) {
      void i18n.changeLanguage(language);
    }
  }, [language]);

  useEffect(() => {
    trackPageView(getRouteName(route), {
      uiLanguage: language,
      topicId: route.page === "topic" || route.page === "area" ? route.topicId : undefined,
      chapterId: route.page === "chapter" ? route.chapterId : undefined
    });
  }, [language, route]);

  function goHome() {
    setRoute({ page: "home" });
    setSelectedIndex(null);
    setChecked(false);
    setQuestionHelpVisible(false);
  }

  function goTopic(topicId: string) {
    trackEvent("topic_selected", { topicId, uiLanguage: language });
    setRoute({ page: "topic", topicId });
    setSelectedIndex(null);
    setChecked(false);
    setQuestionHelpVisible(false);
  }

  function goArea(topicId: string) {
    trackEvent("practice_area_selected", { topicId, uiLanguage: language });
    setRoute({ page: "area", topicId });
    setSelectedIndex(null);
    setChecked(false);
    setQuestionHelpVisible(false);
  }

  function goChapter(chapterId: string) {
    const chapter = OFFICIAL_CHAPTERS.find((item) => item.id === chapterId);
    trackEvent("chapter_selected", { chapterId, topicId: chapter?.topicId, uiLanguage: language });
    setRoute({ page: "chapter", chapterId });
    setQuestionIndexByTopic((current) => ({ ...current, [chapterId]: current[chapterId] || 0 }));
    setSelectedIndex(null);
    setChecked(false);
    setQuestionHelpVisible(false);
  }

  function goMockExam() {
    trackEvent("mock_exam_opened", { uiLanguage: language });
    setRoute({ page: "mock-exam" });
    setSelectedIndex(null);
    setChecked(false);
    setQuestionHelpVisible(false);
  }

  function goQuickPractice() {
    trackEvent("practice_started", { mode: "quick_start", questionCount: QUICK_START_QUESTIONS.length, topicId: QUICK_START_TOPIC_ID, uiLanguage: language });
    setQuestionIndexByTopic((current) => ({ ...current, [QUICK_START_TOPIC_ID]: 0 }));
    setRoute({ page: "quick" });
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
    trackEvent("progress_dashboard_viewed", { uiLanguage: language });
    setRoute({ page: "progress" });
  }

  function goFlashcards() {
    trackEvent("flashcards_opened", { uiLanguage: language });
    setRoute({ page: "flashcards" });
  }

  function handleOpenFeedback(source = "manual", topicId?: string, milestone?: number) {
    trackEvent("feedback_opened", { milestone, source, topicId, uiLanguage: language });
    setRoute({ page: "feedback" });
  }

  function goFeedback() {
    handleOpenFeedback("manual");
  }

  function handleFeedbackPromptShown(topicId: string, milestone: number) {
    trackEvent("feedback_prompt_shown", { milestone, topicId, uiLanguage: language });
  }

  function handleFeedbackPromptClicked(topicId: string, milestone: number) {
    trackEvent("feedback_prompt_clicked", { milestone, topicId, uiLanguage: language });
    setFeedbackPromptMilestone(null);
    handleOpenFeedback("practice_milestone", topicId, milestone);
  }

  function handleDismissFeedbackPrompt() {
    setFeedbackPromptMilestone(null);
  }

  function handleStartPractice(topicId: string) {
    trackEvent("practice_started", { topicId, uiLanguage: language });
    setPracticeStartedByTopic((current) => ({ ...current, [topicId]: true }));
    setSelectedIndex(null);
    setChecked(false);
    setQuestionHelpVisible(false);
  }

  function handleReviewLesson(topicId: string) {
    trackEvent("study_guide_opened", { topicId, uiLanguage: language });
    setPracticeStartedByTopic((current) => ({ ...current, [topicId]: false }));
    setSelectedIndex(null);
    setChecked(false);
    setQuestionHelpVisible(false);
  }

  function handleCheck(question: Question) {
    if (selectedIndex === null) return;

    const isCorrect = selectedIndex === question.correctIndex;
    const wasAlreadyAnswered = progress.answeredIds.includes(question.id);
    setChecked(true);
    setLastWasCorrect(isCorrect);
    const nextProgress = recordAnswered(question.id, isCorrect);
    setProgress(nextProgress);
    const nextFeedbackMilestone = getFeedbackMilestone(nextProgress.total);

    if (nextFeedbackMilestone !== null) {
      setFeedbackPromptMilestone(nextFeedbackMilestone);
    }

    trackEvent("question_answered", {
      correctIndex: question.correctIndex,
      isCorrect,
      questionId: question.id,
      selectedIndex,
      topicId: question.topicId,
      uiLanguage: language
    });

    const topicQuestionIds = getAccessibleQuestions(QUESTIONS.filter((item) => item.topicId === question.topicId)).map((item) => item.id);
    const completedTopicQuestions = topicQuestionIds.filter((questionId) => nextProgress.answeredIds.includes(questionId));

    if (!wasAlreadyAnswered && topicQuestionIds.length > 0 && completedTopicQuestions.length === topicQuestionIds.length) {
      trackEvent("topic_completed", {
        questionCount: topicQuestionIds.length,
        topicId: question.topicId,
        uiLanguage: language
      });
    }
  }

  function handleNext(topicId: string, questionCount: number) {
    trackEvent("question_next", { topicId, questionCount, uiLanguage: language });
    setQuestionIndexByTopic((current) => ({
      ...current,
      [topicId]: ((current[topicId] || 0) + 1) % questionCount
    }));
    setSelectedIndex(null);
    setChecked(false);
    setQuestionHelpVisible(false);
  }

  function handleResetProgress() {
    trackEvent("progress_reset", { uiLanguage: language });
    setProgress(resetProgress());
  }

  function handleLanguageChange(nextLanguage: UiLanguage) {
    trackEvent("language_changed", { fromLanguage: language, toLanguage: nextLanguage, uiLanguage: nextLanguage });
    setLanguage(nextLanguage);
    localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);
    localStorage.setItem(OLD_EXPLANATION_LANGUAGE_KEY, nextLanguage);
  }

  function handleToggleQuestionHelp() {
    const topicId = route.page === "topic" ? route.topicId : undefined;
    const nextVisible = !questionHelpVisible;

    trackEvent("question_translation_toggled", {
      helpVisible: nextVisible,
      topicId,
      uiLanguage: language
    });
    setQuestionHelpVisible(nextVisible);
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
        onSelectChapter={goChapter}
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

  if (route.page === "feedback") {
    return (
      <FeedbackPage
        language={language}
        onBack={goHome}
        onSelectLanguage={handleLanguageChange}
        ui={ui}
      />
    );
  }

  if (route.page === "admin") {
    return (
      <AdminDashboardPage
        language={language}
        onBack={goHome}
        onSelectLanguage={handleLanguageChange}
        progress={progress}
        ui={ui}
      />
    );
  }

  if (route.page === "question-review") {
    return <QuestionReviewPage onBack={goHome} />;
  }

  if (route.page === "mock-exam") {
    return (
      <MockExamPage
        language={language}
        onBack={goHome}
        onSelectLanguage={handleLanguageChange}
        ui={ui}
      />
    );
  }

  if (route.page === "area") {
    const topic = TOPICS.find((item) => item.id === route.topicId);

    if (topic) {
      return (
        <AreaPage
          language={language}
          onBack={goHome}
          onOpenFeedback={goFeedback}
          onOpenFlashcards={goFlashcards}
          onOpenPrivacy={goPrivacy}
          onOpenProgress={goProgress}
          onOpenMockExam={goMockExam}
          onQuickPractice={goQuickPractice}
          onSelectChapter={goChapter}
          onSelectLanguage={handleLanguageChange}
          progress={progress}
          topic={topic}
          ui={ui}
        />
      );
    }
  }

  if (route.page === "quick") {
    return (
      <TopicPracticePage
        checked={checked}
        feedbackPromptMilestone={feedbackPromptMilestone}
        language={language}
        lastWasCorrect={lastWasCorrect}
        onDismissFeedbackPrompt={handleDismissFeedbackPrompt}
        onFeedbackPromptShown={handleFeedbackPromptShown}
        onOpenFeedback={handleFeedbackPromptClicked}
        onBack={goHome}
        onCheck={handleCheck}
        onNext={handleNext}
        onResetProgress={handleResetProgress}
        onReviewLesson={handleReviewLesson}
        onSelectAnswer={setSelectedIndex}
        onSelectLanguage={handleLanguageChange}
        onStartPractice={handleStartPractice}
        practiceStarted
        progress={progress}
        questionHelpVisible={questionHelpVisible}
        questionIndex={questionIndexByTopic[QUICK_START_TOPIC_ID] || 0}
        questionsOverride={QUICK_START_QUESTIONS}
        selectedIndex={selectedIndex}
        onToggleQuestionHelp={handleToggleQuestionHelp}
        topic={QUICK_START_TOPIC}
        ui={ui}
      />
    );
  }

  if (route.page === "chapter") {
    const chapter = OFFICIAL_CHAPTERS.find((item) => item.id === route.chapterId);
    const topic = chapter ? TOPICS.find((item) => item.id === chapter.topicId) : undefined;

    if (chapter && topic) {
      const chapterName = ui.chapterNames[chapter.id] || chapter.nameSv;
      const chapterTopic: Topic = {
        id: chapter.id,
        nameSv: chapter.nameSv,
        nameEn: chapterName,
        descriptionEn: ui.chapterSummaries[chapter.id] || topic.descriptionEn
      };

      return (
        <TopicPracticePage
          checked={checked}
          chapterId={chapter.id}
          feedbackPromptMilestone={feedbackPromptMilestone}
          language={language}
          lastWasCorrect={lastWasCorrect}
          onDismissFeedbackPrompt={handleDismissFeedbackPrompt}
          onFeedbackPromptShown={handleFeedbackPromptShown}
          onOpenFeedback={handleFeedbackPromptClicked}
          onBack={goHome}
          onCheck={handleCheck}
          onNext={handleNext}
          onResetProgress={handleResetProgress}
          onReviewLesson={handleReviewLesson}
          onSelectAnswer={setSelectedIndex}
          onSelectLanguage={handleLanguageChange}
          onStartPractice={handleStartPractice}
          practiceId={chapter.id}
          practiceStarted
          progress={progress}
          questionHelpVisible={questionHelpVisible}
          questionIndex={questionIndexByTopic[chapter.id] || 0}
          selectedIndex={selectedIndex}
          onToggleQuestionHelp={handleToggleQuestionHelp}
          topic={chapterTopic}
          ui={ui}
        />
      );
    }
  }

  if (route.page === "topic") {
    const topic = TOPICS.find((item) => item.id === route.topicId);

    if (topic) {
      const lesson = LESSONS.find((item) => item.topicId === topic.id);

      return (
        <TopicPracticePage
          checked={checked}
          feedbackPromptMilestone={feedbackPromptMilestone}
          language={language}
          lastWasCorrect={lastWasCorrect}
          onDismissFeedbackPrompt={handleDismissFeedbackPrompt}
          onFeedbackPromptShown={handleFeedbackPromptShown}
          onOpenFeedback={handleFeedbackPromptClicked}
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
          onToggleQuestionHelp={handleToggleQuestionHelp}
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
      onOpenFeedback={goFeedback}
      onOpenFlashcards={goFlashcards}
      onOpenPrivacy={goPrivacy}
      onOpenMockExam={goMockExam}
      onOpenProgress={goProgress}
      onQuickPractice={goQuickPractice}
      onSelectArea={goArea}
      onSelectLanguage={handleLanguageChange}
      progress={progress}
      ui={ui}
    />
  );
}

function getInitialLanguage(): UiLanguage {
  const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY) || localStorage.getItem(OLD_EXPLANATION_LANGUAGE_KEY);
  return SUPPORTED_LANGUAGES.some((language) => language.id === saved) ? (saved as UiLanguage) : "sv";
}

function registerUiTranslations() {
  Object.entries(UI_TEXT).forEach(([language, uiText]) => {
    i18n.addResourceBundle(language, "translation", toI18nextResource(uiText), true, true);
  });

  void i18n.changeLanguage(getInitialLanguage());
}

function toI18nextResource(uiText: UiText) {
  return Object.fromEntries(
    Object.entries(uiText).filter(([, value]) => typeof value !== "function")
  );
}

function useTranslatedUiText(language: UiLanguage): UiText {
  const { t } = useTranslation();
  const base = UI_TEXT[language] || UI_TEXT.sv;
  const translated = { ...base };

  (Object.keys(base) as (keyof UiText)[]).forEach((key) => {
    const value = base[key];

    if (typeof value === "function") {
      return;
    }

    const isObjectLike = typeof value === "object" && value !== null;
    translated[key] = t(key, {
      defaultValue: value,
      lng: language,
      returnObjects: isObjectLike
    }) as never;
  });

  return translated;
}

function getTextDirection(text: string) {
  return /[\u0590-\u08ff\uFB1D-\uFDFF\uFE70-\uFEFC]/.test(text) ? "rtl" : "ltr";
}

function formatStudyIntroItem(item: string) {
  const trimmed = item.replace(/\.$/, "");
  return getTextDirection(trimmed) === "rtl" ? trimmed : `${trimmed}.`;
}

function getRouteName(route: Route) {
  if (route.page === "topic") {
    return `topic:${route.topicId}`;
  }

  if (route.page === "area") {
    return `area:${route.topicId}`;
  }

  if (route.page === "mock-exam") {
    return "mock-exam";
  }

  if (route.page === "chapter") {
    return `chapter:${route.chapterId}`;
  }

  return route.page;
}

function getInitialRoute(): Route {
  const hash = window.location.hash.replace(/^#\/?/, "");
  const [page, topicId] = hash.split("/");

  if (page === "topic" && topicId) {
    return { page: "topic", topicId };
  }

  if (page === "area" && topicId) {
    return { page: "area", topicId };
  }

  if (page === "chapter" && topicId) {
    return { page: "chapter", chapterId: topicId };
  }

  if (page === "privacy") {
    return { page: "privacy" };
  }

  if (page === "quick") {
    return { page: "quick" };
  }

  if (page === "mock-exam") {
    return { page: "mock-exam" };
  }

  if (page === "question-review") {
    return { page: "question-review" };
  }

  if (page === "progress") {
    return { page: "progress" };
  }

  if (page === "flashcards") {
    return { page: "flashcards" };
  }

  if (page === "feedback") {
    return { page: "feedback" };
  }

  if (page === "admin") {
    return { page: "admin" };
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
          : nextRoute.page === "quick"
            ? "/quick"
            : nextRoute.page === "question-review"
              ? "/question-review"
              : nextRoute.page === "mock-exam"
                ? "/mock-exam"
              : nextRoute.page === "progress"
            ? "/progress"
            : nextRoute.page === "area"
              ? "/area/" + nextRoute.topicId
            : nextRoute.page === "chapter"
              ? "/chapter/" + nextRoute.chapterId
            : nextRoute.page === "flashcards"
              ? "/flashcards"
              : nextRoute.page === "feedback"
                ? "/feedback"
                : nextRoute.page === "admin"
                  ? "/admin"
                  : `/topic/${nextRoute.topicId}`;
    setRouteState(nextRoute);
  }

  return [route, setRoute];
}

function HomePage({
  language,
  onOpenFeedback,
  onOpenFlashcards,
  onOpenMockExam,
  onOpenPrivacy,
  onOpenProgress,
  onQuickPractice,
  onSelectArea,
  onSelectLanguage,
  progress,
  ui
}: {
  language: UiLanguage;
  onOpenFeedback: () => void;
  onOpenFlashcards: () => void;
  onOpenMockExam: () => void;
  onOpenPrivacy: () => void;
  onOpenProgress: () => void;
  onQuickPractice: () => void;
  onSelectArea: (topicId: string) => void;
  onSelectLanguage: (language: UiLanguage) => void;
  progress: Progress;
  ui: UiText;
}) {
  const [showCitizenshipUpdate, setShowCitizenshipUpdate] = useState(
    () => localStorage.getItem(CITIZENSHIP_UPDATE_DISMISSED_KEY) !== "true"
  );
  const visibleTopics = TOPICS;

  function handleDismissCitizenshipUpdate() {
    localStorage.setItem(CITIZENSHIP_UPDATE_DISMISSED_KEY, "true");
    setShowCitizenshipUpdate(false);
  }

  function handleExploreModules() {
    document.getElementById("study-modules")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function handleStartPractice() {
    onQuickPractice();
  }

  return (
    <>
      <AppNav
        onExploreModules={handleExploreModules}
        onOpenMockExam={onOpenMockExam}
        onSelectLanguage={onSelectLanguage}
        onStartPractice={handleStartPractice}
        ui={ui}
        value={language}
      />
      <main className="shell" dir={isRtl(language) ? "rtl" : "ltr"}>
        <section className="intro hero-banner hero-poster">
          <div className="hero-copy">
            <p className="hero-badge">
              <span className="flag-icon" aria-hidden="true" />
              {ui.eyebrow}
            </p>
            <h1>{ui.appTitle}</h1>
            <HeroSourcePill text={ui.lead} />
            <HeroTrustBadge text={ui.heroTrustBadge} />
            <div className="hero-cta-row">
              <button className="hero-primary" type="button" onClick={handleStartPractice}>
                {ui.heroPrimaryCta}
              </button>
              <button className="hero-secondary" type="button" onClick={handleExploreModules}>
                {ui.heroSecondaryCta}
              </button>
            </div>
          </div>
          <HeroArtwork />
        </section>

        <ProofStats ui={ui} />

        {showCitizenshipUpdate ? (
          <CitizenshipUpdateCard language={language} onDismiss={handleDismissCitizenshipUpdate} ui={ui} />
        ) : null}

        <IndependentGuideSection ui={ui} />

        <StudyPathSection ui={ui} />

        <div id="study-modules" className="study-modules-anchor" />

        <section className="topic-list topic-list-primary" aria-label={ui.topicSelectorLabel}>
          {visibleTopics.map((topic) => {
            const allTopicQuestions = QUESTIONS.filter((question) => question.topicId === topic.id);
            const topicQuestions = getAccessibleQuestions(allTopicQuestions);
            const count = topicQuestions.length;
            const fullCount = allTopicQuestions.length;
            const lockedCount = getLockedQuestionCount(allTopicQuestions);
            const completed = topicQuestions.filter((question) => progress.answeredIds.includes(question.id)).length;
            const percent = count > 0 ? Math.round((completed / count) * 100) : 0;
            const visual = TOPIC_VISUALS[topic.id as keyof typeof TOPIC_VISUALS] || TOPIC_VISUALS.democracy;
            const Icon = visual.icon;
            const topicName = ui.topicNames[topic.id] || topic.nameEn;
            const chapterStats = getChapterStatsForTopic(topic.id, progress, ui);
            const moduleStatus =
              percent === 100
                ? { label: ui.moduleMastered, className: "mastered" }
                : completed > 0
                  ? { label: ui.moduleInProgress, className: "in-progress" }
                  : { label: ui.moduleNotStarted, className: "not-started" };

            return (
              <article
                className={`topic-card accent-${visual.accent}`}
                key={topic.id}
              >
                <div>
                  <div className="topic-card-topline">
                    <div className="topic-icon" aria-hidden="true">
                      <Icon size={24} strokeWidth={2.2} />
                    </div>
                    <span className={`module-status ${moduleStatus.className}`}>
                      {HAS_FULL_ACCESS ? ui.fullAccessBadge : ui.freeTierBadge}
                    </span>
                  </div>
                  {language !== "sv" ? <p className="topic-sv" dir="ltr">{topic.nameSv}</p> : null}
                  <h2>{topicName}</h2>
                  <p dir={getTextDirection(ui.topicDescriptions[topic.id] || topic.descriptionEn)}>
                    {ui.topicDescriptions[topic.id] || topic.descriptionEn}
                  </p>
                  {completed > 0 ? (
                    <>
                      <div className="coverage-chips" aria-label={`${ui.topicCoverageLabel} ${topicName}`}>
                        {chapterStats.map((chapter) => (
                          <span key={chapter.id}>{chapter.number}</span>
                        ))}
                      </div>
                      <ChapterProgressList compact stats={chapterStats} ui={ui} />
                    </>
                  ) : (
                    <p className="topic-card-note">
                      {lockedCount > 0 ? ui.freeSampleSummary(count, fullCount) : ui.startWarmup(count)}
                    </p>
                  )}
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
                <button className="primary" type="button" onClick={() => onSelectArea(topic.id)}>
                  {ui.viewChapters}
                </button>
              </article>
            );
          })}
        </section>

        <ComingNextSection onOpenFlashcards={onOpenFlashcards} onOpenMockExam={onOpenMockExam} onOpenProgress={onOpenProgress} ui={ui} />
        <FaqSection language={language} />
        <SiteFooter language={language} onOpenFeedback={onOpenFeedback} onOpenPrivacy={onOpenPrivacy} />
      </main>
      <MobileBottomNav
        active="home"
        language={language}
        onGoHome={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        onOpenPractice={handleStartPractice}
        onOpenProgress={onOpenProgress}
        onOpenStudy={handleExploreModules}
        ui={ui}
      />
    </>
  );
}

function AreaPage({
  language,
  onBack,
  onOpenFeedback,
  onOpenFlashcards,
  onOpenMockExam,
  onOpenPrivacy,
  onOpenProgress,
  onQuickPractice,
  onSelectChapter,
  onSelectLanguage,
  progress,
  topic,
  ui
}: {
  language: UiLanguage;
  onBack: () => void;
  onOpenFeedback: () => void;
  onOpenFlashcards: () => void;
  onOpenMockExam: () => void;
  onOpenPrivacy: () => void;
  onOpenProgress: () => void;
  onQuickPractice: () => void;
  onSelectChapter: (chapterId: string) => void;
  onSelectLanguage: (language: UiLanguage) => void;
  progress: Progress;
  topic: Topic;
  ui: UiText;
}) {
  const allTopicQuestions = QUESTIONS.filter((question) => question.topicId === topic.id);
  const topicQuestions = getAccessibleQuestions(allTopicQuestions);
  const completed = topicQuestions.filter((question) => progress.answeredIds.includes(question.id)).length;
  const percent = topicQuestions.length > 0 ? Math.round((completed / topicQuestions.length) * 100) : 0;
  const visual = TOPIC_VISUALS[topic.id as keyof typeof TOPIC_VISUALS] || TOPIC_VISUALS.democracy;
  const Icon = visual.icon;
  const topicName = ui.topicNames[topic.id] || topic.nameEn;

  function handleStartPractice() {
    onQuickPractice();
  }

  return (
    <>
      <AppNav
        onExploreModules={onBack}
        onOpenMockExam={onOpenMockExam}
        onSelectLanguage={onSelectLanguage}
        onStartPractice={handleStartPractice}
        ui={ui}
        value={language}
      />
      <main className="shell" dir={isRtl(language) ? "rtl" : "ltr"}>
        <section className={`area-layer accent-${visual.accent}`} aria-label={topicName}>
          <button className="ghost area-back" type="button" onClick={onBack}>
            {ui.chooseOtherArea}
          </button>
          <div className="area-layer-heading">
            <div className="topic-icon" aria-hidden="true">
              <Icon size={28} strokeWidth={2.2} />
            </div>
            <div>
              {language !== "sv" ? <p className="topic-sv" dir="ltr">{topic.nameSv}</p> : null}
              <h1>{topicName}</h1>
              <p dir={getTextDirection(ui.topicDescriptions[topic.id] || topic.descriptionEn)}>
                {ui.topicDescriptions[topic.id] || topic.descriptionEn}
              </p>
            </div>
          </div>
          <div className="topic-progress">
            <div className="topic-progress-row">
              <span>{ui.freeSampleSummary(topicQuestions.length, allTopicQuestions.length)}</span>
              <strong>{percent}%</strong>
            </div>
            <div className="topic-progress-track" aria-hidden="true">
              <span style={{ width: `${percent}%` }} />
            </div>
            <span className="area-progress-detail">{ui.topicProgress(completed, topicQuestions.length)}</span>
          </div>
        </section>

        <ChapterMapSection
          language={language}
          onSelectChapter={onSelectChapter}
          progress={progress}
          selectedTopicId={topic.id}
          ui={ui}
        />

        <ComingNextSection
          onOpenFlashcards={onOpenFlashcards}
          onOpenMockExam={onOpenMockExam}
          onOpenProgress={onOpenProgress}
          ui={ui}
        />
        <FaqSection language={language} />
        <SiteFooter language={language} onOpenFeedback={onOpenFeedback} onOpenPrivacy={onOpenPrivacy} />
      </main>
      <MobileBottomNav
        active="study"
        language={language}
        onGoHome={onBack}
        onOpenPractice={handleStartPractice}
        onOpenProgress={onOpenProgress}
        onOpenStudy={onBack}
        ui={ui}
      />
    </>
  );
}

function AppNav({
  onExploreModules,
  onOpenMockExam,
  onSelectLanguage,
  onStartPractice,
  ui,
  value
}: {
  onExploreModules: () => void;
  onOpenMockExam: () => void;
  onSelectLanguage: (language: UiLanguage) => void;
  onStartPractice: () => void;
  ui: UiText;
  value: UiLanguage;
}) {
  function handleAboutClick() {
    document.getElementById("about-guide")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <header className="app-nav" dir={isRtl(value) ? "rtl" : "ltr"}>
      <nav className="app-nav-inner" aria-label="Main navigation">
        <button className="brand-mark" type="button" onClick={handleAboutClick}>
          <span className="brand-icon" aria-hidden="true">
            <BookOpen size={20} />
          </span>
          <span>SwedenCivicsPrep</span>
        </button>

        <div className="nav-links">
          <button type="button" onClick={onExploreModules}>
            {ui.navStudyModules}
          </button>
          <button type="button" onClick={onOpenMockExam}>
            {ui.navPracticeTests}
          </button>
          <button type="button" onClick={handleAboutClick}>
            {ui.navAbout}
          </button>
        </div>

        <div className="nav-actions">
          <LanguageSelector onChange={onSelectLanguage} ui={ui} value={value} />
          <button className="nav-cta" type="button" onClick={onStartPractice}>
            {ui.navStartPractice}
          </button>
        </div>

        <div className="mobile-nav-actions" aria-label={ui.navStartPractice}>
          <LanguageSelector onChange={onSelectLanguage} ui={ui} value={value} />
          <button className="nav-cta mobile-nav-cta" type="button" onClick={onStartPractice}>
            {ui.navStartPractice}
          </button>
        </div>
      </nav>
    </header>
  );
}

function HeroSourcePill({ text }: { text: string }) {
  return (
    <p className="hero-source-pill">
      <img className="hero-source-icon" src="/images/uhr-favicon-96.png" alt="" aria-hidden="true" />
      <span>{text}</span>
    </p>
  );
}

function HeroTrustBadge({ text }: { text: string }) {
  const [questions, explanations] = text.split(" • ");

  return (
    <p className="hero-trust">
      {questions ? <span>✅ {questions}</span> : null}
      {explanations ? <span>✅ {explanations}</span> : null}
    </p>
  );
}

function HeroArtwork() {
  return (
    <div className="hero-artwork" aria-hidden="true">
      <picture>
        <source media="(max-width: 760px)" srcSet="/images/hero-horse-cityhall-mobile.png" />
        <img alt="" className="civic-illustration" src="/images/hero-horse-cityhall-yellow.png" />
      </picture>
    </div>
  );
}

function ProofStats({ ui }: { ui: UiText }) {
  return (
    <section className="proof-strip" aria-label="Study platform highlights">
      {ui.proofStats.map((stat) => (
        <article className="proof-card" key={`${stat.value}-${stat.label}`}>
          <strong>{stat.value}</strong>
          <span>{stat.label}</span>
        </article>
      ))}
    </section>
  );
}

function MobileCta({ onStartPractice, ui }: { onStartPractice: () => void; ui: UiText }) {
  return (
    <div className="mobile-cta" aria-label={ui.heroPrimaryCta}>
      <button type="button" onClick={onStartPractice}>
        {ui.heroPrimaryCta}
      </button>
    </div>
  );
}

function MobileBottomNav({
  active,
  language,
  onGoHome,
  onOpenPractice,
  onOpenProgress,
  onOpenStudy,
  ui
}: {
  active: MobileNavTarget;
  language: UiLanguage;
  onGoHome: () => void;
  onOpenPractice: () => void;
  onOpenProgress: () => void;
  onOpenStudy: () => void;
  ui: UiText;
}) {
  const labels = getMobileNavLabels(language, ui);
  const items: { id: MobileNavTarget; label: string; icon: typeof HomeIcon; onClick: () => void }[] = [
    { id: "home", label: labels.home, icon: HomeIcon, onClick: onGoHome },
    { id: "study", label: labels.study, icon: BookOpen, onClick: onOpenStudy },
    { id: "practice", label: labels.practice, icon: CheckCircle2, onClick: onOpenPractice },
    { id: "progress", label: labels.progress, icon: BarChart3, onClick: onOpenProgress }
  ];

  return (
    <nav className="mobile-bottom-nav" aria-label="Mobile navigation" dir={isRtl(language) ? "rtl" : "ltr"}>
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = item.id === active;

        return (
          <button
            aria-current={isActive ? "page" : undefined}
            className={isActive ? "active" : ""}
            key={item.id}
            type="button"
            onClick={item.onClick}
          >
            <Icon size={21} strokeWidth={2.5} aria-hidden="true" />
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
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
    <section className="early-access" id="about-guide" aria-label={ui.earlyAccessTitle}>
      <h2 className="section-title-with-icon">
        <BookOpen size={20} aria-hidden="true" />
        {ui.earlyAccessTitle}
      </h2>
      {heading ? <p className="guide-kicker" dir={getTextDirection(heading)}>{heading}</p> : null}
      <ul className="guide-list">
        {bullets.map((paragraph) => (
          <li dir={getTextDirection(paragraph)} key={paragraph}>{paragraph}</li>
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
  const introItems = ui.studyPathIntro.split(". ").filter(Boolean).slice(0, 3);

  return (
    <section className="study-path" aria-label={ui.studyPathTitle}>
      <div>
        <p className="eyebrow">{ui.topicCoverageLabel}</p>
        <h2>{ui.studyPathTitle}</h2>
        <ul className="study-intro-list">
          {introItems.map((item) => (
            <li dir={getTextDirection(item)} key={item}>{formatStudyIntroItem(item)}</li>
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
              <p dir={getTextDirection(step.body)}>{step.body}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ChapterMapSection({
  language,
  onSelectChapter,
  progress,
  selectedTopicId,
  ui
}: {
  language: UiLanguage;
  onSelectChapter: (chapterId: string) => void;
  progress: Progress;
  selectedTopicId: string;
  ui: UiText;
}) {
  const selectedTopicName = ui.topicNames[selectedTopicId] || TOPICS.find((topic) => topic.id === selectedTopicId)?.nameEn || ui.chapterMapTitle;

  return (
    <section className="chapter-map" aria-label={ui.chapterMapTitle}>
      <div className="section-heading">
        <p className="eyebrow">{selectedTopicName}</p>
        <h2>{ui.chapterMapTitle}</h2>
        <p dir={getTextDirection(ui.chapterMapIntro)}>{ui.chapterMapIntro}</p>
      </div>
      <div className="chapter-grid">
        {OFFICIAL_CHAPTERS.filter((chapter) => chapter.topicId === selectedTopicId).map((chapter) => {
          const chapterName = ui.chapterNames[chapter.id];
          const visual = TOPIC_VISUALS[chapter.topicId as keyof typeof TOPIC_VISUALS] || TOPIC_VISUALS.democracy;
          const allQuestions = QUESTIONS.filter((question) => question.chapterId === chapter.id);
          const accessibleQuestions = getAccessibleQuestions(allQuestions);
          const completed = accessibleQuestions.filter((question) => progress.answeredIds.includes(question.id)).length;
          const lockedCount = getLockedQuestionCount(allQuestions);
          const percent = accessibleQuestions.length > 0 ? Math.round((completed / accessibleQuestions.length) * 100) : 0;

          return (
            <article className={`chapter-card accent-${visual.accent}`} key={chapter.id}>
              <span className="chapter-number">{chapter.number}</span>
              <div>
                {language === "sv" ? (
                  <h3 dir="ltr">{chapter.nameSv}</h3>
                ) : (
                  <>
                    <p className="chapter-sv" dir="ltr">{chapter.nameSv}</p>
                    <h3 dir={getTextDirection(chapterName)}>{chapterName}</h3>
                  </>
                )}
                <p dir={getTextDirection(ui.chapterSummaries[chapter.id])}>{ui.chapterSummaries[chapter.id]}</p>
              </div>
              <div className="chapter-card-footer">
                <span>{lockedCount > 0 ? ui.freeSampleSummary(accessibleQuestions.length, allQuestions.length) : ui.topicProgress(completed, accessibleQuestions.length)}</span>
                <button className="secondary" type="button" onClick={() => onSelectChapter(chapter.id)}>
                  {completed > 0 ? ui.continuePractice : ui.startPractice}
                </button>
              </div>
              <div className="chapter-progress-track" aria-hidden="true">
                <span style={{ width: `${percent}%` }} />
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function ComingNextSection({
  onOpenFlashcards,
  onOpenMockExam,
  onOpenProgress,
  ui
}: {
  onOpenFlashcards: () => void;
  onOpenMockExam: () => void;
  onOpenProgress: () => void;
  ui: UiText;
}) {
  return (
    <section className="coming-next" aria-label={ui.comingNextTitle}>
      <div className="section-heading">
        <h2>{ui.comingNextTitle}</h2>
        <p dir={getTextDirection(ui.comingNextIntro)}>{ui.comingNextIntro}</p>
      </div>
      <div className="coming-grid">
        {ui.comingNextItems.map((item, index) => {
          const Icon = index === 0 ? Sparkles : index === 1 ? CheckCircle2 : HeartPulse;
          const isAvailable = true;
          const onClick = index === 0 ? onOpenFlashcards : index === 1 ? onOpenMockExam : onOpenProgress;

          return (
            <article className={`coming-card ${isAvailable ? "preview-available" : ""}`} key={item.title}>
              <div className="coming-icon" aria-hidden="true">
                <Icon size={20} strokeWidth={2.3} />
              </div>
              <h3 dir={getTextDirection(item.title)}>{item.title}</h3>
              <p dir={getTextDirection(item.body)}>{item.body}</p>
              {isAvailable ? (
                <button className="secondary coming-action" type="button" onClick={onClick}>
                  {index === 0 ? ui.flashcardsPreview : index === 1 ? ui.mockExamStart : ui.continuePractice}
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
  onOpenFeedback,
  onOpenPrivacy
}: {
  language: UiLanguage;
  onOpenFeedback: () => void;
  onOpenPrivacy: () => void;
}) {
  const legal = LEGAL_CONTENT[language];

  return (
    <footer className="site-footer">
      <p>{legal.footerNote}</p>
      <div className="footer-actions">
        <button className="footer-link" type="button" onClick={onOpenFeedback}>
          {UI_TEXT[language].feedbackTitle}
        </button>
        <button className="footer-link" type="button" onClick={onOpenPrivacy}>
          {legal.privacyLink}
        </button>
      </div>
    </footer>
  );
}

function FeedbackPage({
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
  const tallyUrl = new URL(FEEDBACK_FORM_URL);
  tallyUrl.searchParams.set("transparentBackground", "1");
  tallyUrl.searchParams.set("dynamicHeight", "1");
  tallyUrl.searchParams.set("source", "app-feedback-page");
  tallyUrl.searchParams.set("language", language);

  return (
    <main className="shell" dir={isRtl(language) ? "rtl" : "ltr"}>
      <nav className="topbar">
        <button className="ghost" type="button" onClick={onBack}>
          {ui.backToHome}
        </button>
        <LanguageSelector onChange={onSelectLanguage} ui={ui} value={language} />
      </nav>

      <section className="feedback-page">
        <div className="feedback-intro">
          <div className="feedback-icon" aria-hidden="true">
            <MessageSquare size={24} strokeWidth={2.3} />
          </div>
          <p className="eyebrow">{ui.feedbackPromptTitle}</p>
          <h1>{ui.feedbackTitle}</h1>
          <p>{ui.feedbackIntro}</p>
          <p>{ui.feedbackPromptBody}</p>
        </div>

        <iframe
          className="feedback-embed"
          data-tally-src={tallyUrl.toString()}
          loading="lazy"
          src={tallyUrl.toString()}
          title={ui.feedbackTitle}
        />

        <p className="feedback-fallback">
          <a href={tallyUrl.toString()} rel="noreferrer" target="_blank">
            {ui.feedbackSend} <ExternalLink size={16} aria-hidden="true" />
          </a>
        </p>
      </section>
    </main>
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
  onSelectChapter,
  onSelectLanguage,
  onSelectTopic,
  progress,
  ui
}: {
  language: UiLanguage;
  onBack: () => void;
  onSelectChapter: (chapterId: string) => void;
  onSelectLanguage: (language: UiLanguage) => void;
  onSelectTopic: (topicId: string) => void;
  progress: Progress;
  ui: UiText;
}) {
  const topicStats = TOPICS.map((topic) => getTopicStats(topic, progress, ui));
  const chapterStats = getChapterDashboardStats(progress, ui);
  const recentMistakes = getRecentMistakes(progress, ui);
  const accessibleQuestionCount = getAccessibleQuestions(QUESTIONS).length;
  const currentQuestionIds = new Set(QUESTIONS.map((question) => question.id));
  const practicedQuestions = progress.answeredIds.filter((questionId) => currentQuestionIds.has(questionId)).length;
  const currentKnownAnswers = Object.entries(progress.answers || {})
    .filter(([questionId]) => currentQuestionIds.has(questionId))
    .map(([, answer]) => answer);
  const correct = currentKnownAnswers.reduce((sum, answer) => sum + answer.correct, 0);
  const attempts = currentKnownAnswers.reduce((sum, answer) => sum + answer.attempts, 0);
  const wrong = currentKnownAnswers.reduce((sum, answer) => sum + answer.wrong, 0);
  const accuracy = attempts > 0 ? Math.round((correct / attempts) * 100) : 0;
  const weakChapters = chapterStats
    .filter((chapter) => chapter.attempts > 0 && chapter.wrong > 0)
    .sort((left, right) => left.accuracy - right.accuracy || right.wrong - left.wrong)
    .slice(0, 5);
  const weakTopic = [...topicStats]
    .filter((topic) => topic.attempts > 0)
    .sort((a, b) => a.accuracy - b.accuracy || b.wrong - a.wrong)[0];
  const recommendedChapter = weakChapters[0] || [...chapterStats].sort((a, b) => a.completedPercent - b.completedPercent || a.number - b.number)[0];

  function handleOpenStudy() {
    onBack();
    window.setTimeout(() => {
      document.getElementById("study-modules")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
  }

  function handleOpenPractice() {
    if (recommendedChapter) {
      onSelectChapter(recommendedChapter.id);
      return;
    }

    onSelectTopic(TOPICS[0]?.id || "democracy");
  }

  return (
    <>
      <main className="shell" dir={isRtl(language) ? "rtl" : "ltr"}>
        <nav className="topbar">
          <button className="ghost" type="button" onClick={onBack}>
            {ui.backToHome}
          </button>
          <LanguageSelector onChange={onSelectLanguage} ui={ui} value={language} />
        </nav>

        <section className="dashboard-page">
          <div className="section-heading dashboard-heading">
            <div>
              <p className="eyebrow">{ui.overallProgress}</p>
              <h1>{ui.progressDashboardTitle}</h1>
              <p>{ui.progressDashboardIntro}</p>
            </div>
            <p className="dashboard-local-note">{ui.progressLocalOnlyNote}</p>
          </div>

          <div className="dashboard-stats dashboard-stats-expanded">
            <article>
              <strong>{practicedQuestions}/{QUESTIONS.length}</strong>
              <span>{ui.progressAnsweredMetric}</span>
            </article>
            <article>
              <strong>{accessibleQuestionCount}/{QUESTIONS.length}</strong>
              <span>{ui.progressAccessibleMetric}</span>
            </article>
            <article>
              <strong>{accuracy}%</strong>
              <span>{ui.progressAccuracyMetric}</span>
            </article>
            <article>
              <strong>{progress.today}</strong>
              <span>{ui.progressTodayMetric}</span>
            </article>
          </div>

          {recommendedChapter ? (
            <section className="dashboard-recommendation">
              <div>
                <p className="eyebrow">{ui.recommendedNext}</p>
                <h2>{recommendedChapter.number}. {recommendedChapter.name}</h2>
                <p>{recommendedChapter.wrong > 0 ? ui.progressWrongCount(recommendedChapter.wrong) : ui.topicProgress(recommendedChapter.completed, recommendedChapter.total)}</p>
              </div>
              <button className="primary" type="button" onClick={() => onSelectChapter(recommendedChapter.id)}>
                {ui.progressReviewNow}
              </button>
            </section>
          ) : null}

          <div className="dashboard-insight-grid">
            <section className="dashboard-panel weak-chapter-panel">
              <div className="dashboard-panel-heading">
                <h2>{ui.progressWeakChaptersTitle}</h2>
                <span>{wrong > 0 ? ui.progressWrongCount(wrong) : ui.topicAccuracy}</span>
              </div>
              {weakChapters.length > 0 ? (
                <div className="weak-chapter-list">
                  {weakChapters.map((chapter) => (
                    <article className="weak-chapter-item" key={chapter.id}>
                      <div>
                        <strong>{chapter.number}. {chapter.name}</strong>
                        <span>{ui.progressAttempts(chapter.attempts)} · {ui.progressWrongCount(chapter.wrong)}</span>
                      </div>
                      <button className="secondary" type="button" onClick={() => onSelectChapter(chapter.id)}>
                        {ui.progressReviewNow}
                      </button>
                    </article>
                  ))}
                </div>
              ) : (
                <p className="dashboard-empty">{ui.progressNoWeakChapters}</p>
              )}
            </section>

            <section className="dashboard-panel recent-mistakes-panel">
              <div className="dashboard-panel-heading">
                <h2>{ui.progressRecentMistakesTitle}</h2>
                <span>{recentMistakes.length}</span>
              </div>
              {recentMistakes.length > 0 ? (
                <div className="recent-mistake-list">
                  {recentMistakes.map((item) => (
                    <article className="recent-mistake-item" key={item.id}>
                      <p>{item.chapterNumber}. {item.chapterName}</p>
                      <strong lang="sv">{item.questionSv}</strong>
                      <button className="secondary" type="button" onClick={() => onSelectChapter(item.chapterId)}>
                        {ui.progressReviewNow}
                      </button>
                    </article>
                  ))}
                </div>
              ) : (
                <p className="dashboard-empty">{ui.progressNoRecentMistakes}</p>
              )}
            </section>
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
            {topicStats.map((topic) => {
              const visual = TOPIC_VISUALS[topic.id as keyof typeof TOPIC_VISUALS] || TOPIC_VISUALS.democracy;
              const Icon = visual.icon;
              const chapterStatsForTopic = getChapterStatsForTopic(topic.id, progress, ui);
              const status =
                topic.completedPercent === 100
                  ? { label: ui.moduleMastered, className: "mastered" }
                  : topic.completed > 0
                    ? { label: ui.moduleInProgress, className: "in-progress" }
                    : { label: ui.moduleNotStarted, className: "not-started" };

              return (
                <article className={"topic-dashboard-card accent-" + visual.accent} key={topic.id}>
                  <div className="topic-dashboard-heading">
                    <span className="topic-icon" aria-hidden="true">
                      <Icon size={24} strokeWidth={2.2} />
                    </span>
                    <div>
                      <h2>{topic.name}</h2>
                      <p dir="ltr">{topic.nameSv}</p>
                    </div>
                    <span className={"module-status " + status.className}>{status.label}</span>
                  </div>
                  <div className="topic-progress">
                    <div className="topic-progress-row">
                      <span>{ui.topicProgress(topic.completed, topic.total)}</span>
                      <strong>{topic.completedPercent}%</strong>
                    </div>
                    <div className="topic-progress-track" aria-hidden="true">
                      <span style={{ width: topic.completedPercent + "%" }} />
                    </div>
                  </div>
                  <div className="dashboard-topic-meta">
                    <span>{ui.progressAttempts(topic.attempts)}</span>
                    <span>{ui.topicAccuracy}: {topic.accuracy}%</span>
                    <span>{ui.progressWrongCount(topic.wrong)}</span>
                  </div>
                  <ChapterProgressList stats={chapterStatsForTopic} ui={ui} />
                  <button className="secondary" type="button" onClick={() => onSelectTopic(topic.id)}>
                    {topic.completed > 0 ? ui.continuePractice : ui.startPractice}
                  </button>
                </article>
              );
            })}
          </div>
        </section>
      </main>
      <MobileBottomNav
        active="progress"
        language={language}
        onGoHome={onBack}
        onOpenPractice={handleOpenPractice}
        onOpenProgress={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        onOpenStudy={handleOpenStudy}
        ui={ui}
      />
    </>
  );
}

type ChapterDashboardStat = {
  id: string;
  number: number;
  name: string;
  total: number;
  completed: number;
  completedPercent: number;
  attempts: number;
  correct: number;
  wrong: number;
  accuracy: number;
};

function getChapterDashboardStats(progress: Progress, ui: UiText): ChapterDashboardStat[] {
  return OFFICIAL_CHAPTERS.map((chapter) => {
    const questions = getAccessibleQuestions(QUESTIONS.filter((question) => question.chapterId === chapter.id));
    const questionIds = new Set(questions.map((question) => question.id));
    const answers = questions.map((question) => progress.answers?.[question.id]).filter(Boolean);
    const attempts = answers.reduce((sum, answer) => sum + answer.attempts, 0);
    const correct = answers.reduce((sum, answer) => sum + answer.correct, 0);
    const wrong = answers.reduce((sum, answer) => sum + answer.wrong, 0);
    const completed = progress.answeredIds.filter((questionId) => questionIds.has(questionId)).length;

    return {
      id: chapter.id,
      number: chapter.number,
      name: ui.chapterNames[chapter.id] || chapter.nameSv,
      total: questions.length,
      completed,
      completedPercent: questions.length > 0 ? Math.round((completed / questions.length) * 100) : 0,
      attempts,
      correct,
      wrong,
      accuracy: attempts > 0 ? Math.round((correct / attempts) * 100) : 0
    };
  });
}

function getRecentMistakes(progress: Progress, ui: UiText) {
  return [...progress.answeredIds]
    .reverse()
    .map((questionId) => QUESTIONS.find((question) => question.id === questionId))
    .filter((question): question is Question => Boolean(question && progress.answers?.[question.id]?.lastCorrect === false))
    .slice(0, 5)
    .map((question) => {
      const chapter = OFFICIAL_CHAPTERS.find((item) => item.id === question.chapterId);

      return {
        id: question.id,
        chapterId: question.chapterId,
        chapterName: chapter ? ui.chapterNames[chapter.id] || chapter.nameSv : question.chapterId,
        chapterNumber: chapter?.number || 0,
        questionSv: question.questionSv
      };
    });
}

function getMobileNavLabels(language: UiLanguage, ui: UiText) {
  const labels: Partial<Record<UiLanguage, Record<MobileNavTarget, string>>> = {
    sv: { home: "Hem", study: "Studera", practice: "Träna", progress: "Framsteg" },
    en: { home: "Home", study: "Study", practice: "Practice", progress: "Progress" },
    zh: { home: "首页", study: "学习", practice: "练习", progress: "进度" },
    ar: { home: "الرئيسية", study: "الدراسة", practice: "التدريب", progress: "التقدم" },
    so: { home: "Hore", study: "Baro", practice: "Tababar", progress: "Horumar" },
    fa: { home: "خانه", study: "مطالعه", practice: "تمرین", progress: "پیشرفت" },
    ti: { home: "መጀመርታ", study: "መጽናዕቲ", practice: "ልምምድ", progress: "ምዕባለ" }
  };

  return labels[language] || {
    home: "Home",
    study: ui.navStudyModules,
    practice: ui.navPracticeTests,
    progress: ui.progressDashboardTitle
  };
}

const QUESTION_REVIEW_STORAGE_KEY = "swedencivicsprep-question-review-v1";

type DraftQuestionReview = {
  note: string;
  status: DraftQuestionStatus;
  updatedAt: string;
};

function QuestionReviewPage({ onBack }: { onBack: () => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [statusFilter, setStatusFilter] = useState<"all" | DraftQuestionStatus>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [reviews, setReviews] = useState<Record<string, DraftQuestionReview>>(() => loadDraftQuestionReviews());
  const filteredQuestions = DRAFT_QUESTIONS.filter((question) => {
    const review = reviews[question.id];
    const status = review?.status || question.status;
    const search = searchQuery.trim().toLowerCase();
    const matchesStatus = statusFilter === "all" || status === statusFilter;
    const matchesSearch = !search || [question.id, question.questionSv, question.questionEn, question.topicId, question.chapterId, question.difficulty, ...question.tags].some((item) => item.toLowerCase().includes(search));

    return matchesStatus && matchesSearch;
  });
  const boundedIndex = Math.min(currentIndex, Math.max(filteredQuestions.length - 1, 0));
  const question = filteredQuestions[boundedIndex];
  const review = question ? reviews[question.id] : null;
  const activeStatus = review?.status || question?.status || "draft";
  const reviewedCount = DRAFT_QUESTIONS.filter((item) => (reviews[item.id]?.status || item.status) !== "draft").length;
  const approvedCount = DRAFT_QUESTIONS.filter((item) => (reviews[item.id]?.status || item.status) === "approved").length;

  useEffect(() => {
    if (currentIndex !== boundedIndex) {
      setCurrentIndex(boundedIndex);
    }
  }, [boundedIndex, currentIndex]);

  function updateReview(questionId: string, next: Partial<DraftQuestionReview>) {
    setReviews((current) => {
      const existing = current[questionId] || { note: "", status: "draft", updatedAt: new Date().toISOString() };
      const updated = {
        ...current,
        [questionId]: {
          ...existing,
          ...next,
          updatedAt: new Date().toISOString()
        }
      };
      localStorage.setItem(QUESTION_REVIEW_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }

  function handleDecision(status: DraftQuestionStatus) {
    if (!question) return;
    updateReview(question.id, { status });
  }

  function handleExport() {
    const payload = {
      exportedAt: new Date().toISOString(),
      summary: {
        approved: approvedCount,
        reviewed: reviewedCount,
        total: DRAFT_QUESTIONS.length
      },
      reviews
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "question-review-decisions.json";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <main className="shell question-review-page">
      <nav className="topbar">
        <button className="ghost" type="button" onClick={onBack}>Back to app</button>
        <div className="topbar-tools">
          <button className="secondary" type="button" onClick={handleExport}>Export review JSON</button>
        </div>
      </nav>

      <section className="question-review-hero">
        <p className="eyebrow">Local content review</p>
        <h1>Draft question review</h1>
        <p>Review generated Swedish civics questions before they become part of the public question bank.</p>
        <div className="question-review-stats">
          <span><strong>{DRAFT_QUESTIONS.length}</strong> draft questions</span>
          <span><strong>{reviewedCount}</strong> reviewed</span>
          <span><strong>{approvedCount}</strong> approved</span>
        </div>
      </section>

      <section className="question-review-toolbar" aria-label="Review filters">
        <label>
          Search
          <input value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="question, tag, chapter, topic" />
        </label>
        <label>
          Status
          <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value as "all" | DraftQuestionStatus)}>
            <option value="all">All</option>
            <option value="draft">Draft</option>
            <option value="approved">Approved</option>
            <option value="needs_edit">Needs edit</option>
            <option value="rejected">Rejected</option>
          </select>
        </label>
      </section>

      {question ? (
        <section className="question-review-layout">
          <article className="question-review-card">
            <div className="question-review-meta">
              <span>{boundedIndex + 1} / {filteredQuestions.length}</span>
              <span>Chapter {question.chapterNumber}: {formatAdminChapterName(question.chapterId)}</span>
              <span>{formatAdminTopicName(question.topicId, UI_TEXT.en)}</span>
              <span>{question.difficulty}</span>
              <span className={`review-status review-status-${activeStatus}`}>{formatDraftStatus(activeStatus)}</span>
            </div>

            <h2 lang="sv">{question.questionSv}</h2>
            <p className="question-review-translation">{question.questionEn}</p>
            <div className="question-review-options">
              {question.options.map((option, index) => (
                <div className={index === question.correctIndex ? "suggested-correct" : ""} key={option}>
                  <strong>{String.fromCharCode(65 + index)}</strong>
                  <span className="question-review-option-copy">
                    <span lang="sv">{option}</span>
                    <em>{question.optionsEn[index]}</em>
                  </span>
                  {index === question.correctIndex ? <small>Suggested answer</small> : null}
                </div>
              ))}
            </div>

            <div className="question-review-explanation">
              <p className="eyebrow">Suggested explanation</p>
              <p>{question.explanationEn}</p>
            </div>

            <div className="question-review-tags">
              {question.tags.map((tag) => <span key={tag}>{tag}</span>)}
            </div>
          </article>

          <aside className="question-review-side">
            <div className="question-review-actions">
              <button className="primary" type="button" onClick={() => handleDecision("approved")}>
                <CheckCircle2 size={18} aria-hidden="true" />
                Approve
              </button>
              <button className="secondary" type="button" onClick={() => handleDecision("needs_edit")}>Needs edit</button>
              <button className="ghost" type="button" onClick={() => handleDecision("rejected")}>
                <XCircle size={18} aria-hidden="true" />
                Reject
              </button>
            </div>

            <label className="question-review-note">
              Review notes
              <textarea
                value={review?.note || ""}
                onChange={(event) => updateReview(question.id, { note: event.target.value })}
                placeholder="What should change before this question is approved?"
                rows={8}
              />
            </label>

            <div className="question-review-nav">
              <button className="secondary" type="button" disabled={boundedIndex === 0} onClick={() => setCurrentIndex((index) => Math.max(index - 1, 0))}>Previous</button>
              <button className="secondary" type="button" disabled={boundedIndex >= filteredQuestions.length - 1} onClick={() => setCurrentIndex((index) => Math.min(index + 1, filteredQuestions.length - 1))}>Next</button>
            </div>
          </aside>
        </section>
      ) : (
        <section className="admin-panel"><p className="admin-empty-state">No draft questions match this filter.</p></section>
      )}
    </main>
  );
}

function loadDraftQuestionReviews(): Record<string, DraftQuestionReview> {
  try {
    const raw = localStorage.getItem(QUESTION_REVIEW_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function formatDraftStatus(status: DraftQuestionStatus) {
  return status === "needs_edit" ? "Needs edit" : status.charAt(0).toUpperCase() + status.slice(1);
}

function formatAdminChapterName(chapterId: string) {
  const chapter = OFFICIAL_CHAPTERS.find((item) => item.id === chapterId);
  return chapter ? chapter.nameSv : chapterId;
}

function AdminDashboardPage({
  language,
  onBack,
  onSelectLanguage,
  progress,
  ui
}: {
  language: UiLanguage;
  onBack: () => void;
  onSelectLanguage: (language: UiLanguage) => void;
  progress: Progress;
  ui: UiText;
}) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [adminPassword, setAdminPassword] = useState(() => sessionStorage.getItem(ADMIN_PASSWORD_SESSION_KEY) || "");
  const [unlocked, setUnlocked] = useState(() => localStorage.getItem(ADMIN_UNLOCKED_KEY) === "true");
  const [adminStats, setAdminStats] = useState<AdminStats | null>(null);
  const [adminStatsStatus, setAdminStatsStatus] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const [adminStatsMessage, setAdminStatsMessage] = useState("");
  const topicStats = TOPICS.map((topic) => getTopicStats(topic, progress, ui));
  const knownAnswers = Object.values(progress.answers || {});
  const attempts = knownAnswers.reduce((sum, answer) => sum + answer.attempts, 0);
  const correct = knownAnswers.reduce((sum, answer) => sum + answer.correct, 0);
  const wrong = knownAnswers.reduce((sum, answer) => sum + answer.wrong, 0);
  const accuracy = attempts > 0 ? Math.round((correct / attempts) * 100) : 0;
  const strongestTopic = [...topicStats].filter((topic) => topic.attempts > 0).sort((a, b) => b.accuracy - a.accuracy)[0];
  const busiestTopic = [...topicStats].sort((a, b) => b.attempts - a.attempts)[0];
  const productionTopic = adminStats?.topics[0];
  const maxProductionTopicCount = Math.max(...(adminStats?.topics.map((topic) => topic.count) || [0]));
  const maxProductionLanguageCount = Math.max(...(adminStats?.languages.map((item) => item.count) || [0]));
  const productionInsights = adminStats
    ? [
        {
          note: "Practice starters / unique visitors",
          title: "Start conversion",
          value: `${adminStats.overview.startConversionRate}%`
        },
        {
          note: "Question answers per practice start",
          title: "Practice depth",
          value: String(adminStats.overview.practiceDepth)
        },
        {
          note: "Question help opens / answers",
          title: "Question help opened",
          value: `${adminStats.overview.languageHelpUsageRate}%`
        },
        {
          note: "Page views / unique visitors",
          title: "Average visits per user",
          value: String(adminStats.overview.averageVisitsPerUser)
        },
        {
          note: "Active on 2+ different days",
          title: "Returning users",
          value: String(adminStats.overview.returningUsers)
        },
        {
          note: "Users with 2+ visits/page views",
          title: "Repeat sessions",
          value: String(adminStats.overview.repeatVisitors)
        },
        {
          note: "Users who answered 10+ questions",
          title: "Heavy users",
          value: String(adminStats.overview.heavyUsers)
        },
        {
          note: "Users who practiced more than one topic",
          title: "Same-user topic spread",
          value: String(adminStats.overview.multiTopicUsers)
        }
      ]
    : [];
  const dashboardItems = [
    {
      title: "Product analytics",
      body: analyticsStatus.enabled
        ? "PostHog browser event collection is configured for production visits and learning actions."
        : "Set VITE_POSTHOG_KEY in Vercel to collect real visitors, referrers, countries, devices, and retention.",
      status: analyticsStatus.enabled ? "Connected" : "Needs key"
    },
    {
      title: "Learning events",
      body: "The app now emits topic_selected, practice_started, question_answered, language_changed, question_translation_toggled, feedback_prompt_shown, feedback_prompt_clicked, and feedback_opened. Submitted feedback is stored in Tally.",
      status: "Added"
    },
    {
      title: "Private stats API",
      body: adminStats
        ? "The Vercel function returned production aggregates from PostHog."
        : "Set server-only env vars so /api/admin/stats can pull production aggregates from PostHog.",
      status: adminStats ? "Connected" : "Needs env"
    }
  ];

  useEffect(() => {
    if (!unlocked || !adminPassword) {
      return;
    }

    let cancelled = false;

    async function fetchAdminStats() {
      setAdminStatsStatus("loading");
      setAdminStatsMessage("");

      try {
        const response = await fetch("/api/admin/stats", {
          headers: {
            "x-admin-password": adminPassword
          }
        });
        const payload = await response.json();

        if (cancelled) {
          return;
        }

        if (!response.ok) {
          setAdminStats(null);
          setAdminStatsStatus("error");
          setAdminStatsMessage(payload.error || "Production stats are not available yet.");
          return;
        }

        setAdminStats(payload);
        setAdminStatsStatus("ready");
      } catch {
        if (!cancelled) {
          setAdminStats(null);
          setAdminStatsStatus("error");
          setAdminStatsMessage("Could not reach /api/admin/stats. This works after deploying to Vercel.");
        }
      }
    }

    void fetchAdminStats();

    return () => {
      cancelled = true;
    };
  }, [adminPassword, unlocked]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (password === ADMIN_PASSWORD) {
      localStorage.setItem(ADMIN_UNLOCKED_KEY, "true");
      sessionStorage.setItem(ADMIN_PASSWORD_SESSION_KEY, password);
      setAdminPassword(password);
      setUnlocked(true);
      setError("");
      return;
    }

    setError("Wrong password. This is only a lightweight gate for the preview admin page.");
  }

  function handleLock() {
    localStorage.removeItem(ADMIN_UNLOCKED_KEY);
    sessionStorage.removeItem(ADMIN_PASSWORD_SESSION_KEY);
    setAdminPassword("");
    setAdminStats(null);
    setAdminStatsStatus("idle");
    setUnlocked(false);
    setPassword("");
  }

  if (!unlocked) {
    return (
      <main className="shell admin-shell">
        <section className="admin-login-card" aria-labelledby="admin-login-title">
          <div className="admin-login-icon" aria-hidden="true">
            <LockKeyhole size={30} strokeWidth={2.2} />
          </div>
          <p className="eyebrow">Admin preview</p>
          <h1 id="admin-login-title">SwedenCivicsPrep Admin</h1>
          <p>
            This page is hidden from normal navigation and protected by a simple static password for now. It is not a replacement for proper server-side admin security.
          </p>
          <form className="admin-login-form" onSubmit={handleSubmit}>
            <label>
              <span>Password</span>
              <input
                autoComplete="current-password"
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter admin password"
                type="password"
                value={password}
              />
            </label>
            {error ? <p className="admin-error" role="alert">{error}</p> : null}
            <button className="primary" type="submit">
              Open dashboard
            </button>
          </form>
          <button className="ghost" type="button" onClick={onBack}>
            Back to site
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="shell admin-shell" dir={isRtl(language) ? "rtl" : "ltr"}>
      <nav className="topbar">
        <button className="ghost" type="button" onClick={onBack}>
          Back to site
        </button>
        <div className="admin-top-actions">
          <LanguageSelector onChange={onSelectLanguage} ui={ui} value={language} />
          <button className="secondary" type="button" onClick={handleLock}>
            Lock admin
          </button>
        </div>
      </nav>

      <section className="admin-hero">
        <div>
          <p className="eyebrow">Private admin preview</p>
          <h1>Site statistics dashboard</h1>
          <p>
            This page combines production PostHog aggregates with local browser practice data. If the private stats API is not configured yet, local data remains visible as a fallback.
          </p>
        </div>
        <div className="admin-live-badge">
          <span aria-hidden="true" />
          {adminStats ? "Production stats" : analyticsStatus.enabled ? "Analytics connected" : "Local data only"}
        </div>
      </section>

      <section className="admin-metric-grid" aria-label="Admin overview">
        <AdminMetric
          title="Visitors"
          value={adminStats ? String(adminStats.overview.visitors) : analyticsStatus.enabled ? "In PostHog" : "Not connected"}
          note={adminStats ? `${adminStats.range} unique visitors` : analyticsStatus.enabled ? "Waiting for private stats API" : "Set VITE_POSTHOG_KEY to begin collection"}
        />
        <AdminMetric
          title="Questions answered"
          value={String(adminStats?.overview.questionsAnswered ?? attempts)}
          note={adminStats ? `${adminStats.range} production events` : `${progress.today} today / ${progress.total} total in this browser`}
        />
        <AdminMetric
          title="Correct answer rate"
          value={`${adminStats?.overview.correctRate ?? accuracy}%`}
          note={adminStats ? "Based on production question_answered events" : `${correct} correct / ${wrong} wrong locally`}
        />
        <AdminMetric
          title="Most active area"
          value={productionTopic?.name || busiestTopic?.name || "-"}
          note={productionTopic ? `${productionTopic.count} production events` : `${busiestTopic?.attempts || 0} local attempts`}
        />
      </section>

      <section className="admin-panel admin-analytics-panel">
        <div className="admin-panel-heading">
          <div>
            <p className="eyebrow">Production analytics</p>
            <h2>{adminStats ? "Production stats are connected" : analyticsStatus.enabled ? "PostHog event tracking is ready" : "PostHog is not configured yet"}</h2>
          </div>
          <Sparkles size={24} aria-hidden="true" />
        </div>
        {adminStatsStatus === "error" ? (
          <p className="admin-api-message" role="status">{adminStatsMessage}</p>
        ) : null}
        {adminStatsStatus === "loading" ? (
          <p className="admin-api-message" role="status">Loading production stats from PostHog...</p>
        ) : null}
        <div className="admin-analytics-grid">
          <div>
            <strong>Provider</strong>
            <span>{analyticsStatus.provider}</span>
          </div>
          <div>
            <strong>Host</strong>
            <span>{analyticsStatus.host}</span>
          </div>
          <div>
            <strong>Browser events</strong>
            <span>{analyticsStatus.enabled ? "Collecting when deployed with env key" : "Disabled until VITE_POSTHOG_KEY is set"}</span>
          </div>
          <div>
            <strong>Private stats API</strong>
            <span>{adminStats ? `Connected at ${new Date(adminStats.generatedAt).toLocaleString()}` : adminStatsStatus === "loading" ? "Loading..." : "Not connected yet"}</span>
          </div>
        </div>
        <div className="admin-analytics-actions">
          {analyticsStatus.dashboardUrl ? (
            <a className="primary admin-dashboard-link" href={analyticsStatus.dashboardUrl} target="_blank" rel="noreferrer">
              Open PostHog dashboard
            </a>
          ) : null}
          <code>VITE_POSTHOG_KEY</code>
          <code>VITE_POSTHOG_HOST</code>
          <code>VITE_POSTHOG_DASHBOARD_URL</code>
        </div>
      </section>

      {adminStats ? (
        <section className="admin-panel admin-insights-panel">
          <div className="admin-panel-heading">
            <div>
              <p className="eyebrow">Product behavior</p>
              <h2>Conversion, depth, and returning browser users</h2>
            </div>
            <BarChart3 size={24} aria-hidden="true" />
          </div>
          <div className="admin-insight-metric-grid">
            {productionInsights.map((item) => (
              <AdminMetric key={item.title} title={item.title} value={item.value} note={item.note} />
            ))}
          </div>
        </section>
      ) : null}

      {adminStats ? (
        <section className="admin-panel admin-difficulty-panel">
          <div className="admin-panel-heading">
            <div>
              <p className="eyebrow">Question difficulty</p>
              <h2>Questions with the highest wrong-answer rate</h2>
            </div>
            <AlertTriangle size={24} aria-hidden="true" />
          </div>
          {adminStats.difficultQuestions.length > 0 ? (
            <div className="admin-topic-list">
              {adminStats.difficultQuestions.map((question) => (
                <div className="admin-topic-row" key={question.name}>
                  <div>
                    <strong>{formatAdminQuestionLabel(question.name)}</strong>
                    <span>{question.wrong} wrong / {question.total} answers</span>
                  </div>
                  <div className="admin-topic-meter" aria-hidden="true">
                    <span style={{ width: `${question.wrongRate}%` }} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="admin-empty-state">No question has enough production answers yet. Difficulty appears after at least two answers per question.</p>
          )}
        </section>
      ) : null}

      {adminStats ? (
        <section className="admin-panel admin-language-panel">
          <div className="admin-panel-heading">
            <div>
              <p className="eyebrow">App language choices</p>
              <h2>Which app languages people choose</h2>
            </div>
            <MessageSquare size={24} aria-hidden="true" />
          </div>
          {adminStats.languages.length > 0 ? (
            <div className="admin-topic-list">
              {adminStats.languages.map((item) => (
                <div className="admin-topic-row" key={item.name}>
                  <div>
                    <strong>{formatAdminLanguageName(item.name)}</strong>
                    <span>{item.count} app language change events</span>
                  </div>
                  <div className="admin-topic-meter" aria-hidden="true">
                    <span style={{ width: `${maxProductionLanguageCount > 0 ? Math.round((item.count / maxProductionLanguageCount) * 100) : 0}%` }} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="admin-empty-state">No app language change events yet. Change language on the live site once, then refresh this page.</p>
          )}
        </section>
      ) : null}

      <section className="admin-panel-grid">
        <article className="admin-panel admin-topic-panel">
          <div className="admin-panel-heading">
            <div>
              <p className="eyebrow">Practice areas</p>
              <h2>Where learners spend time</h2>
            </div>
            <BarChart3 size={24} aria-hidden="true" />
          </div>
          <div className="admin-topic-list">
            {adminStats?.topics.length ? (
              adminStats.topics.map((topic) => (
                <div className="admin-topic-row" key={topic.name}>
                  <div>
                    <strong>{formatAdminTopicName(topic.name, ui)}</strong>
                    <span>{topic.count} production events</span>
                  </div>
                  <div className="admin-topic-meter" aria-hidden="true">
                    <span style={{ width: `${maxProductionTopicCount > 0 ? Math.round((topic.count / maxProductionTopicCount) * 100) : 0}%` }} />
                  </div>
                </div>
              ))
            ) : (
              topicStats.map((topic) => (
                <div className="admin-topic-row" key={topic.id}>
                  <div>
                    <strong>{topic.name}</strong>
                    <span>{topic.attempts} local attempts · {topic.accuracy}% correct</span>
                  </div>
                  <div className="admin-topic-meter" aria-hidden="true">
                    <span style={{ width: `${Math.min(topic.completedPercent, 100)}%` }} />
                  </div>
                </div>
              ))
            )}
          </div>
        </article>

        <article className="admin-panel">
          <div className="admin-panel-heading">
            <div>
              <p className="eyebrow">Content quality</p>
              <h2>What to review next</h2>
            </div>
            <CheckCircle2 size={24} aria-hidden="true" />
          </div>
          <div className="admin-insight-list">
            <p>
              <strong>Strongest topic:</strong> {strongestTopic?.name || "Not enough data yet"}
            </p>
            <p>
              <strong>Unique questions practiced:</strong> {progress.answeredIds.length} / {QUESTIONS.length}
            </p>
            <p>
              <strong>Suggested next metric:</strong> track translation toggle usage per question to find hard Swedish wording.
            </p>
          </div>
        </article>
      </section>

      <section className="admin-panel">
        <div className="admin-panel-heading">
          <div>
            <p className="eyebrow">Analytics setup status</p>
            <h2>What is connected now</h2>
          </div>
          <Layers3 size={24} aria-hidden="true" />
        </div>
        <div className="admin-roadmap-grid">
          {dashboardItems.map((item) => (
            <article className="admin-roadmap-card" key={item.title}>
              <span>{item.status}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="admin-panel admin-events-panel">
        <div className="admin-panel-heading">
          <div>
            <p className="eyebrow">Tracked events</p>
            <h2>Event activity in the last 30 days</h2>
          </div>
          <MessageSquare size={24} aria-hidden="true" />
        </div>
        <div className="admin-event-tags">
          {(adminStats?.events || [
            { name: "page_viewed", count: 0 },
            { name: "language_changed", count: 0 },
            { name: "topic_selected", count: 0 },
            { name: "study_guide_opened", count: 0 },
            { name: "practice_started", count: 0 },
            { name: "question_answered", count: 0 },
            { name: "question_translation_toggled", count: 0 },
            { name: "topic_completed", count: 0 },
            { name: "feedback_prompt_shown", count: 0 },
            { name: "feedback_prompt_clicked", count: 0 },
            { name: "feedback_opened", count: 0 }
          ]).map((event) => (
            <code className={event.count > 0 ? "active" : ""} key={event.name}>
              <span>{event.name}</span>
              {adminStats ? <strong>{event.count}</strong> : null}
            </code>
          ))}
        </div>
      </section>
    </main>
  );
}

function AccessGateNotice({ lockedCount, totalCount, ui }: { lockedCount: number; totalCount: number; ui: UiText }) {
  return (
    <aside className="access-gate-notice" aria-label={ui.upgradePromptTitle}>
      <span>{ui.freeTierBadge}</span>
      <strong>{ui.upgradePromptTitle}</strong>
      <p>{ui.upgradePromptBody(lockedCount, totalCount)}</p>
    </aside>
  );
}

function getAccessibleQuestions(questions: Question[]) {
  if (HAS_FULL_ACCESS) {
    return questions;
  }

  return questions.filter((question) => FREE_SAMPLE_QUESTION_IDS.has(question.id));
}

function getLockedQuestionCount(questions: Question[]) {
  return Math.max(questions.length - getAccessibleQuestions(questions).length, 0);
}

function AdminMetric({ note, title, value }: { note: string; title: string; value: string }) {
  return (
    <article className="admin-metric-card">
      <span>{title}</span>
      <strong>{value}</strong>
      <p>{note}</p>
    </article>
  );
}

function formatAdminQuestionLabel(questionId: string) {
  const question = QUESTIONS.find((item) => item.id === questionId);

  return question ? questionId + ": " + question.questionSv : questionId;
}

function formatAdminLanguageName(languageId: string) {
  const language = SUPPORTED_LANGUAGES.find((item) => item.id === languageId);
  return language ? `${language.flag} ${language.nativeLabel} (${language.shortLabel})` : languageId;
}

function formatAdminTopicName(topicId: string, ui: UiText) {
  return ui.topicNames[topicId] || TOPICS.find((topic) => topic.id === topicId)?.nameEn || topicId;
}

type MockExamAnswerMap = Record<string, number>;

function MockExamPage({
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
  const [questions, setQuestions] = useState<Question[]>(() => createMockExamQuestions());
  const [started, setStarted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<MockExamAnswerMap>({});
  const [questionHelpVisible, setQuestionHelpVisible] = useState(false);
  const question = questions[currentIndex];
  const answeredCount = questions.filter((item) => answers[item.id] !== undefined).length;
  const percent = questions.length > 0 ? Math.round(((currentIndex + 1) / questions.length) * 100) : 0;
  const result = submitted ? getMockExamResult(questions, answers, ui) : null;
  const selectedIndex = question ? answers[question.id] ?? null : null;

  function startExam() {
    trackEvent("mock_exam_started", { questionCount: questions.length, fullAccess: HAS_FULL_ACCESS, uiLanguage: language });
    setStarted(true);
    setSubmitted(false);
    setCurrentIndex(0);
    setAnswers({});
    setQuestionHelpVisible(false);
  }

  function restartExam() {
    const nextQuestions = createMockExamQuestions();
    trackEvent("mock_exam_restarted", { questionCount: nextQuestions.length, fullAccess: HAS_FULL_ACCESS, uiLanguage: language });
    setQuestions(nextQuestions);
    setStarted(true);
    setSubmitted(false);
    setCurrentIndex(0);
    setAnswers({});
    setQuestionHelpVisible(false);
  }

  function submitExam() {
    const nextResult = getMockExamResult(questions, answers, ui);
    trackEvent("mock_exam_submitted", {
      correct: nextResult.correct,
      percent: nextResult.percent,
      questionCount: questions.length,
      uiLanguage: language
    });
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function selectAnswer(index: number) {
    if (!question || submitted) return;
    setAnswers((current) => ({ ...current, [question.id]: index }));
  }

  function goPrevious() {
    setCurrentIndex((current) => Math.max(current - 1, 0));
    setQuestionHelpVisible(false);
  }

  function goNext() {
    setCurrentIndex((current) => Math.min(current + 1, questions.length - 1));
    setQuestionHelpVisible(false);
  }

  if (!started) {
    return (
      <main className="shell" dir={isRtl(language) ? "rtl" : "ltr"}>
        <nav className="topbar">
          <button className="ghost" type="button" onClick={onBack}>
            {ui.backToHome}
          </button>
          <LanguageSelector onChange={onSelectLanguage} ui={ui} value={language} />
        </nav>

        <section className="mock-exam-start">
          <p className="eyebrow">{ui.mockExamBadge}</p>
          <h1>{ui.mockExamTitle}</h1>
          <p dir={getTextDirection(ui.mockExamIntro)}>{ui.mockExamIntro}</p>
          <div className="mock-exam-start-grid">
            <span>{ui.mockExamLength(questions.length)}</span>
            <span>{HAS_FULL_ACCESS ? ui.fullAccessBadge : ui.freeTierBadge}</span>
            <span>{ui.chaptersLabel}: {OFFICIAL_CHAPTERS.length}</span>
          </div>
          <button className="hero-primary" type="button" onClick={startExam}>
            {ui.mockExamStart}
          </button>
        </section>
      </main>
    );
  }

  if (submitted && result) {
    return (
      <main className="shell" dir={isRtl(language) ? "rtl" : "ltr"}>
        <nav className="topbar">
          <button className="ghost" type="button" onClick={onBack}>
            {ui.backToHome}
          </button>
          <LanguageSelector onChange={onSelectLanguage} ui={ui} value={language} />
        </nav>

        <section className="mock-exam-result">
          <div className="mock-score-card">
            <p className="eyebrow">{ui.mockExamResultTitle}</p>
            <strong>{ui.mockExamScore(result.correct, questions.length, result.percent)}</strong>
            <p>{ui.mockExamResultIntro}</p>
          </div>

          <section className="mock-weak-card" aria-label={ui.mockExamWeakChapters}>
            <h2>{ui.mockExamWeakChapters}</h2>
            {result.weakChapters.length > 0 ? (
              <div className="mock-weak-list">
                {result.weakChapters.map((chapter) => (
                  <div className="mock-weak-item" key={chapter.id}>
                    <strong>{chapter.number}. {chapter.name}</strong>
                    <span>{chapter.correct}/{chapter.total}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p>{ui.mockExamNoWeakChapters}</p>
            )}
          </section>

          <details className="mock-review-panel">
            <summary>
              <span>{ui.mockExamReviewAnswers}</span>
              <ChevronDown size={18} aria-hidden="true" />
            </summary>
            <div className="mock-review-list">
              {questions.map((item, index) => {
                const answer = answers[item.id];
                const isCorrect = answer === item.correctIndex;
                const chapter = OFFICIAL_CHAPTERS.find((chapterItem) => chapterItem.id === item.chapterId);

                return (
                  <article className={"mock-review-item " + (isCorrect ? "correct" : "wrong")} key={item.id}>
                    <p className="eyebrow">{index + 1}. {chapter ? ui.chapterNames[chapter.id] || chapter.nameSv : item.chapterId}</p>
                    <h3 lang="sv">{item.questionSv}</h3>
                    <p><strong>{ui.bestAnswer}:</strong> <span lang="sv">{item.options[item.correctIndex]}</span></p>
                    <p>{getExplanation(item, language, ui)}</p>
                  </article>
                );
              })}
            </div>
          </details>

          <div className="actions">
            <button className="primary" type="button" onClick={restartExam}>
              {ui.mockExamRestart}
            </button>
            <button className="secondary" type="button" onClick={onBack}>
              {ui.backToHome}
            </button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="shell" dir={isRtl(language) ? "rtl" : "ltr"}>
      <nav className="topbar">
        <button className="ghost" type="button" onClick={onBack}>
          {ui.backToHome}
        </button>
        <div className="topbar-tools">
          <span className="level-pill">{ui.mockExamBadge}</span>
          <LanguageSelector onChange={onSelectLanguage} ui={ui} value={language} />
        </div>
      </nav>

      <section className="practice mock-exam-session">
        <div className="practice-header">
          <div>
            <p className="topic-sv" dir="ltr">Medborgarskapsprovet</p>
            <h1>{ui.mockExamTitle}</h1>
            <p className="topic-flavor">{ui.mockExamIntro}</p>
          </div>
          <div className="practice-meta">
            <p className="level-pill">{ui.mockExamAnswered(answeredCount, questions.length)}</p>
            <p className="question-count">{ui.questionProgress(currentIndex + 1, questions.length)}</p>
          </div>
        </div>

        <QuizProgressHeader
          percent={percent}
          questionLabel={ui.questionProgress(currentIndex + 1, questions.length)}
          studyModeLabel={ui.mockExamBadge}
        />

        <QuestionCard
          checked={false}
          language={language}
          onSelectAnswer={selectAnswer}
          onToggleQuestionHelp={() => setQuestionHelpVisible((current) => !current)}
          question={question}
          questionHelpVisible={questionHelpVisible}
          selectedIndex={selectedIndex}
          ui={ui}
        />

        <div className="actions practice-actions mock-exam-actions">
          <button className="secondary" type="button" disabled={currentIndex === 0} onClick={goPrevious}>
            {ui.mockExamPrevious}
          </button>
          {currentIndex < questions.length - 1 ? (
            <button className="primary" type="button" onClick={goNext}>
              {ui.mockExamNext}
            </button>
          ) : (
            <button className="primary" type="button" disabled={answeredCount === 0} onClick={submitExam}>
              {ui.mockExamSubmit}
            </button>
          )}
          <button className="ghost" type="button" onClick={submitExam} disabled={answeredCount === 0}>
            {ui.mockExamAnswered(answeredCount, questions.length)}
          </button>
        </div>
      </section>
    </main>
  );
}

function createMockExamQuestions() {
  const pool = getAccessibleQuestions(QUESTIONS);
  const seed = Date.now();
  const examLength = Math.min(HAS_FULL_ACCESS ? 60 : 40, pool.length);
  const selected: Question[] = [];
  const chapters = OFFICIAL_CHAPTERS.map((chapter) => ({
    chapter,
    questions: pool
      .filter((question) => question.chapterId === chapter.id)
      .sort((left, right) => seededQuestionRank(left.id, seed) - seededQuestionRank(right.id, seed))
  }));

  let round = 0;
  while (selected.length < examLength && chapters.some((item) => item.questions[round])) {
    chapters.forEach((item) => {
      const nextQuestion = item.questions[round];
      if (nextQuestion && selected.length < examLength) {
        selected.push(nextQuestion);
      }
    });
    round += 1;
  }

  return selected.sort((left, right) => seededQuestionRank(left.id, seed + 1) - seededQuestionRank(right.id, seed + 1));
}

function seededQuestionRank(questionId: string, seed: number) {
  const value = questionId + ":" + seed;
  let hash = 2166136261;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
}

function getMockExamResult(questions: Question[], answers: MockExamAnswerMap, ui: UiText) {
  const correct = questions.filter((question) => answers[question.id] === question.correctIndex).length;
  const percent = questions.length > 0 ? Math.round((correct / questions.length) * 100) : 0;
  const chapterResults = OFFICIAL_CHAPTERS.map((chapter) => {
    const chapterQuestions = questions.filter((question) => question.chapterId === chapter.id);
    const chapterCorrect = chapterQuestions.filter((question) => answers[question.id] === question.correctIndex).length;

    return {
      id: chapter.id,
      number: chapter.number,
      name: ui.chapterNames[chapter.id] || chapter.nameSv,
      total: chapterQuestions.length,
      correct: chapterCorrect
    };
  }).filter((chapter) => chapter.total > 0);
  const weakChapters = chapterResults
    .filter((chapter) => chapter.correct < chapter.total)
    .sort((left, right) => (left.correct / left.total) - (right.correct / right.total))
    .slice(0, 4);

  return { correct, percent, weakChapters };
}

type FlashcardMark = "known" | "review";

type FlashcardSessionMarks = Record<string, FlashcardMark>;

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
  const [chapterId, setChapterId] = useState("all");
  const [cards, setCards] = useState<Question[]>(() => createFlashcardDeck("all"));
  const [cardIndex, setCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [marks, setMarks] = useState<FlashcardSessionMarks>({});
  const card = cards[cardIndex];
  const currentChapter = card ? OFFICIAL_CHAPTERS.find((chapter) => chapter.id === card.chapterId) : undefined;
  const selectedChapter = chapterId === "all" ? undefined : OFFICIAL_CHAPTERS.find((chapter) => chapter.id === chapterId);
  const knownCount = Object.values(marks).filter((mark) => mark === "known").length;
  const reviewCount = Object.values(marks).filter((mark) => mark === "review").length;

  function refreshDeck(nextChapterId = chapterId) {
    const nextCards = createFlashcardDeck(nextChapterId);
    setCards(nextCards);
    setCardIndex(0);
    setFlipped(false);
  }

  function handleChapterChange(nextChapterId: string) {
    setChapterId(nextChapterId);
    refreshDeck(nextChapterId);
    trackEvent("flashcards_filter_changed", { chapterId: nextChapterId, uiLanguage: language });
  }

  function previousCard() {
    setFlipped(false);
    setCardIndex((current) => (current - 1 + cards.length) % cards.length);
  }

  function nextCard() {
    setFlipped(false);
    setCardIndex((current) => (current + 1) % cards.length);
  }

  function markCard(mark: FlashcardMark) {
    if (!card) return;
    setMarks((current) => ({ ...current, [card.id]: mark }));
    trackEvent("flashcard_marked", { chapterId: card.chapterId, mark, questionId: card.id, uiLanguage: language });
    nextCard();
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
        <div className="section-heading flashcard-heading">
          <div>
            <p className="eyebrow">{ui.flashcardsPreview}</p>
            <h1>{ui.flashcardsTitle}</h1>
            <p dir={getTextDirection(ui.flashcardsIntro)}>{ui.flashcardsIntro}</p>
          </div>
          <div className="flashcard-stats" aria-label={ui.flashcardsTitle}>
            <span>{ui.flashcardsKnownCount(knownCount)}</span>
            <span>{ui.flashcardsReviewCount(reviewCount)}</span>
            <span>{HAS_FULL_ACCESS ? ui.fullAccessBadge : ui.freeTierBadge}</span>
          </div>
        </div>

        <div className="flashcard-controls">
          <label>
            <span>{ui.flashcardsChapterFilter}</span>
            <select value={chapterId} onChange={(event) => handleChapterChange(event.target.value)}>
              <option value="all">{ui.flashcardsAllChapters}</option>
              {OFFICIAL_CHAPTERS.map((chapter) => (
                <option key={chapter.id} value={chapter.id}>
                  {chapter.number}. {ui.chapterNames[chapter.id] || chapter.nameSv}
                </option>
              ))}
            </select>
          </label>
          <button className="secondary" type="button" onClick={() => refreshDeck()}>
            {ui.flashcardsShuffle}
          </button>
        </div>

        {card ? (
          <>
            <button className={"flashcard question-flashcard" + (flipped ? " flipped" : "")} type="button" onClick={() => setFlipped((current) => !current)}>
              <span className="flashcard-side-label">{flipped ? ui.flashcardsAnswerSide : ui.flashcardsQuestionSide}</span>
              <small>
                {currentChapter ? currentChapter.number + ". " + (ui.chapterNames[currentChapter.id] || currentChapter.nameSv) : selectedChapter?.nameSv || ui.flashcardsAllChapters}
              </small>
              {flipped ? (
                <span className="flashcard-answer-content">
                  <strong lang="sv">{card.options[card.correctIndex]}</strong>
                  <em>{getExplanation(card, language, ui)}</em>
                </span>
              ) : (
                <strong lang="sv">{card.questionSv}</strong>
              )}
            </button>

            <div className="flashcard-progress-row">
              <span>{ui.flashcardsCardProgress(cardIndex + 1, cards.length)}</span>
              <div className="topic-progress-track" aria-hidden="true">
                <span style={{ width: ((cardIndex + 1) / cards.length) * 100 + "%" }} />
              </div>
            </div>

            <div className="actions flashcard-actions">
              <button className="secondary" type="button" onClick={previousCard}>
                {ui.mockExamPrevious}
              </button>
              <button className="primary" type="button" onClick={() => setFlipped((current) => !current)}>
                {ui.flipCard}
              </button>
              <button className="secondary" type="button" onClick={nextCard}>
                {ui.nextCard}
              </button>
            </div>

            <div className="flashcard-rating-actions">
              <button className="review" type="button" disabled={!flipped} onClick={() => markCard("review")}>
                {ui.flashcardsReviewAgain}
              </button>
              <button className="known" type="button" disabled={!flipped} onClick={() => markCard("known")}>
                {ui.flashcardsKnown}
              </button>
            </div>
          </>
        ) : (
          <div className="flashcard-empty">
            <p>{ui.flashcardsDeckEmpty}</p>
          </div>
        )}
      </section>
    </main>
  );
}

function createFlashcardDeck(chapterId: string) {
  const pool = getAccessibleQuestions(QUESTIONS).filter((question) => chapterId === "all" || question.chapterId === chapterId);
  const seed = Date.now();
  return [...pool].sort((left, right) => seededQuestionRank(left.id, seed) - seededQuestionRank(right.id, seed));
}

function getTopicStats(topic: Topic, progress: Progress, ui: UiText) {
  const questions = getAccessibleQuestions(QUESTIONS.filter((question) => question.topicId === topic.id));
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

function getChapterStatsForTopic(topicId: string, progress: Progress, ui: UiText) {
  return OFFICIAL_CHAPTERS.map((chapter) => {
    const allQuestions = QUESTIONS.filter((question) => question.topicId === topicId && question.chapterId === chapter.id);
    const questions = getAccessibleQuestions(allQuestions);
    const completed = questions.filter((question) => progress.answeredIds.includes(question.id)).length;
    const percent = questions.length > 0 ? Math.round((completed / questions.length) * 100) : 0;

    return {
      id: chapter.id,
      number: chapter.number,
      name: ui.chapterNames[chapter.id] || chapter.nameSv,
      total: questions.length,
      fullTotal: allQuestions.length,
      locked: getLockedQuestionCount(allQuestions),
      completed,
      percent
    };
  }).filter((chapter) => chapter.total > 0);
}

function ChapterProgressList({
  compact = false,
  stats,
  ui
}: {
  compact?: boolean;
  stats: ReturnType<typeof getChapterStatsForTopic>;
  ui: UiText;
}) {
  if (stats.length === 0) {
    return null;
  }

  return (
    <div className={`chapter-progress-list ${compact ? "compact" : ""}`} aria-label={ui.chaptersLabel}>
      {stats.map((chapter) => (
        <div className="chapter-progress-item" key={chapter.id}>
          <div className="chapter-progress-topline">
            <strong>
              {chapter.number}. {chapter.name}
            </strong>
            <span>{chapter.locked > 0 ? ui.freeSampleSummary(chapter.total, chapter.fullTotal) : ui.topicProgress(chapter.completed, chapter.total)}</span>
          </div>
          <div className="chapter-progress-track" aria-hidden="true">
            <span style={{ width: `${chapter.percent}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

type AdminStats = {
  configured: boolean;
  generatedAt: string;
  range: string;
  overview: {
    averageVisitsPerUser: number;
    correctRate: number;
    feedbackSubmissions: number;
    heavyUsers: number;
    languageHelpUsageRate: number;
    multiTopicUsers: number;
    pageViews: number;
    practiceDepth: number;
    practiceStarts: number;
    practiceStarters: number;
    questionsAnswered: number;
    repeatVisitors: number;
    returningUsers: number;
    startConversionRate: number;
    visitors: number;
  };
  difficultQuestions: { correct: number; name: string; total: number; wrong: number; wrongRate: number }[];
  events: { count: number; name: string }[];
  languages: { count: number; name: string }[];
  topics: { count: number; name: string }[];
};

type TopicPracticePageProps = {
  checked: boolean;
  chapterId?: string;
  feedbackPromptMilestone: number | null;
  language: UiLanguage;
  lastWasCorrect: boolean;
  lesson?: Lesson;
  onDismissFeedbackPrompt: () => void;
  onFeedbackPromptShown: (topicId: string, milestone: number) => void;
  onOpenFeedback: (topicId: string, milestone: number) => void;
  onBack: () => void;
  onCheck: (question: Question) => void;
  onNext: (topicId: string, questionCount: number) => void;
  onResetProgress: () => void;
  onReviewLesson: (topicId: string) => void;
  onSelectAnswer: (index: number) => void;
  onSelectLanguage: (language: UiLanguage) => void;
  onStartPractice: (topicId: string) => void;
  practiceId?: string;
  practiceStarted: boolean;
  progress: Progress;
  questionsOverride?: Question[];
  questionHelpVisible: boolean;
  questionIndex: number;
  selectedIndex: number | null;
  topic: Topic;
  onToggleQuestionHelp: () => void;
  ui: UiText;
};

function TopicPracticePage({
  checked,
  chapterId,
  feedbackPromptMilestone,
  language,
  lastWasCorrect,
  lesson,
  onDismissFeedbackPrompt,
  onFeedbackPromptShown,
  onOpenFeedback,
  onBack,
  onCheck,
  onNext,
  onResetProgress,
  onReviewLesson,
  onSelectAnswer,
  onSelectLanguage,
  onStartPractice,
  onToggleQuestionHelp,
  practiceId,
  practiceStarted,
  progress,
  questionsOverride,
  questionHelpVisible,
  questionIndex,
  selectedIndex,
  topic,
  ui
}: TopicPracticePageProps) {
  const lessonQuestionIds = new Set(lesson?.questionIds || []);
  const lessonChapterIds = new Set(
    OFFICIAL_CHAPTERS
      .filter((chapter) => lesson?.chapterNumbers.includes(chapter.number))
      .map((chapter) => chapter.id)
  );
  const allQuestions = questionsOverride || (chapterId
    ? QUESTIONS.filter((question) => question.chapterId === chapterId)
    : lesson
      ? QUESTIONS.filter((question) => lessonQuestionIds.has(question.id) || lessonChapterIds.has(question.chapterId))
      : QUESTIONS.filter((question) => question.topicId === topic.id));
  const questions = questionsOverride ? allQuestions : getAccessibleQuestions(allQuestions);
  const lockedQuestionCount = questionsOverride ? 0 : getLockedQuestionCount(allQuestions);
  const safeQuestionIndex = questions.length > 0 ? questionIndex % questions.length : 0;
  const question = questions[safeQuestionIndex];
  const topicName = ui.topicNames[topic.id] || topic.nameEn;
  const questionNumber = safeQuestionIndex + 1;
  const questionPercent = questions.length > 0 ? Math.round((questionNumber / questions.length) * 100) : 0;
  const chapter = OFFICIAL_CHAPTERS.find((item) => item.id === question.chapterId);
  const chapterName = chapter ? ui.chapterNames[chapter.id] || chapter.nameSv : "";
  const [shownFeedbackPrompts, setShownFeedbackPrompts] = useState<number[]>([]);
  const feedbackMilestone = feedbackPromptMilestone;
  const shouldShowFeedbackPrompt = checked && feedbackMilestone !== null;
  const mobileActionDisabled = checked ? false : selectedIndex === null;
  const mobileActionLabel = checked ? ui.nextQuestion : ui.checkAnswer;
  const currentPracticeId = practiceId || topic.id;
  const handleMobileAction = () => {
    if (checked) {
      onNext(currentPracticeId, questions.length);
      return;
    }

    onCheck(question);
  };

  useEffect(() => {
    if (!checked || !shouldShowFeedbackPrompt || feedbackMilestone === null || shownFeedbackPrompts.includes(feedbackMilestone)) {
      return;
    }

    onFeedbackPromptShown(topic.id, feedbackMilestone);
    setShownFeedbackPrompts((current) => [...current, feedbackMilestone]);
  }, [feedbackMilestone, onFeedbackPromptShown, shouldShowFeedbackPrompt, shownFeedbackPrompts, topic.id]);

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
            {chapter ? (
              <p className="chapter-pill">
                {chapter.number}. {chapterName}
              </p>
            ) : null}
            <p className="question-count">{ui.questionProgress(safeQuestionIndex + 1, questions.length)}</p>
          </div>
        </div>

        <QuizProgressHeader
          percent={questionPercent}
          questionLabel={ui.questionProgress(questionNumber, questions.length)}
          studyModeLabel={ui.studyModeBadge}
        />

        <p className="coach-note">{ui.coachNote}</p>

        {lockedQuestionCount > 0 ? (
          <AccessGateNotice lockedCount={lockedQuestionCount} totalCount={allQuestions.length} ui={ui} />
        ) : null}

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

        {shouldShowFeedbackPrompt && feedbackMilestone !== null ? (
          <FeedbackNudge
            onDismiss={onDismissFeedbackPrompt}
            onOpenFeedback={() => onOpenFeedback(topic.id, feedbackMilestone)}
            ui={ui}
          />
        ) : null}

        <div className="actions practice-actions">
          <button className="primary" type="button" disabled={selectedIndex === null || checked} onClick={() => onCheck(question)}>
            {ui.checkAnswer}
          </button>
          <button className="secondary" type="button" disabled={!checked} onClick={() => onNext(currentPracticeId, questions.length)}>
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
        <div className="quiz-mobile-footer">
          <button className="primary" type="button" disabled={mobileActionDisabled} onClick={handleMobileAction}>
            {mobileActionLabel}
          </button>
        </div>
      </section>
      ) : null}
    </main>
  );
}

function getFeedbackMilestone(total: number) {
  if (total === 6 || total === 12 || (total > 0 && total % 24 === 0)) {
    return total;
  }

  return null;
}

function FeedbackNudge({
  onDismiss,
  onOpenFeedback,
  ui
}: {
  onDismiss: () => void;
  onOpenFeedback: () => void;
  ui: UiText;
}) {
  return (
    <aside className="feedback-nudge" aria-label={ui.feedbackNudgeTitle}>
      <div className="feedback-nudge-copy">
        <p className="eyebrow">{ui.feedbackNudgeTitle}</p>
        <p>{ui.feedbackNudgeBody}</p>
      </div>
      <div className="feedback-nudge-actions">
        <button className="secondary" type="button" onClick={onOpenFeedback}>
          <MessageSquare size={18} aria-hidden="true" />
          {ui.feedbackNudgeAction}
        </button>
        <button className="ghost" type="button" onClick={onDismiss}>
          {ui.dismiss}
        </button>
      </div>
    </aside>
  );
}

function QuizProgressHeader({
  percent,
  questionLabel,
  studyModeLabel
}: {
  percent: number;
  questionLabel: string;
  studyModeLabel: string;
}) {
  return (
    <section className="quiz-progress-header" aria-label={questionLabel}>
      <div className="quiz-progress-topline">
        <strong>{questionLabel}</strong>
        <span>
          <Sparkles size={15} aria-hidden="true" />
          {studyModeLabel}
        </span>
      </div>
      <div className="quiz-progress-track" aria-hidden="true">
        <span style={{ width: `${percent}%` }} />
      </div>
    </section>
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
  const lessonTitle = lesson.titles[language] || lesson.titles.en;
  const studyText = lesson.studyText[language] || lesson.studyText.en;
  const takeaways = lesson.takeaways[language] || lesson.takeaways.en;

  return (
    <section className="lesson-card" aria-label={ui.studyCardLabel}>
      <div className="lesson-header">
        <div>
          <p className="lesson-step">{ui.roadmapStep(lessonNumber, LESSONS.length)}</p>
          <h1>{lessonTitle}</h1>
          {language !== "sv" ? <p className="topic-sv" dir="ltr">{lesson.titleSv}</p> : null}
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
          {studyText.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>

        <section className="lesson-section takeaway-panel">
          <h2 className="section-title-with-icon">
            <Star size={20} aria-hidden="true" />
            {ui.takeawaysTitle}
          </h2>
          <ul>
            {takeaways.map((takeaway, index) => (
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
              <span>{item.translations[language] || item.translations.en}</span>
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
  const questionHelpButtonLabel = getQuestionHelpButtonLabel(questionHelpVisible, language, ui);

  return (
    <form className="question-form" dir="ltr">
      <fieldset>
        {translation ? (
          <div className="question-toolbar">
            <button className="secondary help-toggle" type="button" onClick={onToggleQuestionHelp}>
              <HelpCircle size={17} aria-hidden="true" />
              {questionHelpButtonLabel}
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
          {getShuffledOptions(question).map(({ option, originalIndex }, displayIndex) => {
            const isSelected = selectedIndex === originalIndex;
            const isCorrect = checked && originalIndex === question.correctIndex;
            const isWrong = checked && isSelected && originalIndex !== question.correctIndex;
            const statusClass = isCorrect ? "correct" : isWrong ? "wrong" : "";
            const statusLabel = isCorrect ? ui.correct : isWrong ? ui.incorrect : isSelected ? ui.selected : "";
            const translatedOption = showHelp ? translation.options[originalIndex] : "";

            return (
              <label className={`option ${isSelected ? "selected" : ""} ${statusClass}`} key={`${question.id}-${originalIndex}`}>
                <input
                  checked={isSelected}
                  disabled={checked}
                  name="answer"
                  onChange={() => onSelectAnswer(originalIndex)}
                  type="radio"
                  value={originalIndex}
                />
                <span className="option-letter" aria-hidden="true">{String.fromCharCode(65 + displayIndex)}</span>
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

type ShuffledOption = {
  option: string;
  originalIndex: number;
};

function getShuffledOptions(question: Question): ShuffledOption[] {
  return question.options
    .map((option, originalIndex) => ({ option, originalIndex }))
    .sort((left, right) => seededOptionRank(question.id, left.originalIndex) - seededOptionRank(question.id, right.originalIndex));
}

function seededOptionRank(questionId: string, optionIndex: number) {
  const value = `${questionId}:${optionIndex}`;
  let hash = 2166136261;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
}
function getQuestionHelpButtonLabel(questionHelpVisible: boolean, language: UiLanguage, ui: UiText) {
  if (questionHelpVisible) {
    return ui.hideQuestionHelp;
  }

  const selectedLanguage = SUPPORTED_LANGUAGES.find((item) => item.id === language);

  if (!selectedLanguage || language === "sv") {
    return ui.showQuestionHelp;
  }

  return `${ui.showQuestionHelp} · ${selectedLanguage.nativeLabel}`;
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
    <details className={`result ${lastWasCorrect ? "result-correct" : "result-wrong"}`} open aria-live="polite">
      <summary>
        <span>{lastWasCorrect ? ui.correctTitle : ui.wrongTitle}</span>
        <ChevronDown size={18} aria-hidden="true" />
      </summary>
      <p className="result-kicker">{lastWasCorrect ? ui.correctKicker : ui.wrongKicker}</p>
      <p>
        <strong>{ui.bestAnswer}:</strong> <span dir="ltr">{question.options[question.correctIndex]}</span>
      </p>
      <p dir={isRtl(language) ? "rtl" : "ltr"}>{explanation}</p>
    </details>
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
  const [open, setOpen] = useState(false);
  const selectedLanguage = SUPPORTED_LANGUAGES.find((language) => language.id === value) || SUPPORTED_LANGUAGES[0];

  function handleSelect(language: UiLanguage) {
    onChange(language);
    setOpen(false);
  }

  return (
    <div className={`language-select ${open ? "open" : ""}`}>
      <span>{ui.appLanguage}</span>
      <button
        aria-expanded={open}
        aria-haspopup="listbox"
        className="language-trigger"
        onClick={() => setOpen((current) => !current)}
        type="button"
      >
        <span className="language-flag" aria-hidden="true">{selectedLanguage.flag}</span>
        <span className="language-current">
          <strong>{selectedLanguage.shortLabel}</strong>
          <small>{selectedLanguage.nativeLabel}</small>
        </span>
        <ChevronDown size={16} aria-hidden="true" />
      </button>
      {open ? (
        <div className="language-menu" role="listbox" aria-label={ui.appLanguage}>
          {SUPPORTED_LANGUAGES.map((language) => {
            const isSelected = language.id === value;

            return (
              <button
                aria-selected={isSelected}
                className={isSelected ? "selected" : ""}
                key={language.id}
                onClick={() => handleSelect(language.id)}
                role="option"
                type="button"
              >
                <span className="language-flag" aria-hidden="true">{language.flag}</span>
                <span>
                  <strong>{language.nativeLabel}</strong>
                  <small>{language.label}</small>
                </span>
                <em>{language.shortLabel}</em>
              </button>
            );
          })}
        </div>
      ) : null}
      <small>{ui.appLanguageHint}</small>
      <select aria-hidden="true" tabIndex={-1} value={value} onChange={(event) => onChange(event.target.value as UiLanguage)}>
        {SUPPORTED_LANGUAGES.map((language) => (
          <option key={language.id} value={language.id}>
            {language.flag} {language.nativeLabel} / {language.label}
          </option>
        ))}
      </select>
    </div>
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
  return language === "ar" || language === "fa";
}

createRoot(document.querySelector("#app")!).render(
  <StrictMode>
    <App />
    <Analytics />
  </StrictMode>
);
