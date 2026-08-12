import { StrictMode, useEffect, useState } from "react";
import type { FormEvent } from "react";
import { createRoot } from "react-dom/client";
import { useTranslation } from "react-i18next";
import { AlertTriangle, BarChart3, BookOpen, BriefcaseBusiness, CheckCircle2, ChevronDown, ExternalLink, HeartPulse, HelpCircle, Landmark, Layers3, MessageSquare, Scale, Send, Sparkles, Star, X, XCircle } from "lucide-react";
import { LESSONS, MIGRATIONSVERKET_CITIZENSHIP_URL, OFFICIAL_STUDY_GUIDE_URL, QUESTIONS, TOPICS } from "./data";
import i18n from "./i18n";
import { CITIZENSHIP_UPDATE, FAQ_CONTENT, LEGAL_CONTENT } from "./i18n/content";
import { SUPPORTED_LANGUAGES, UI_TEXT, type UiText } from "./i18n/uiText";
import { loadProgress, recordAnswered, resetProgress } from "./progress";
import type { ExplanationLanguage, Lesson, Progress, Question, Topic, UiLanguage } from "./types";
import "./styles.css";

type Route =
  | { page: "home" }
  | { page: "topic"; topicId: string }
  | { page: "progress" }
  | { page: "flashcards" }
  | { page: "feedback" }
  | { page: "privacy" };

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
const FEEDBACK_EMAIL = "feedback@swedencivicsprep.se";

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
  const ui = useTranslatedUiText(language);

  useEffect(() => {
    if (i18n.language !== language) {
      void i18n.changeLanguage(language);
    }
  }, [language]);

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

  function goFeedback() {
    setRoute({ page: "feedback" });
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
      onOpenFeedback={goFeedback}
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

  if (page === "feedback") {
    return { page: "feedback" };
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
              : nextRoute.page === "feedback"
                ? "/feedback"
                : `/topic/${nextRoute.topicId}`;
    setRouteState(nextRoute);
  }

  return [route, setRoute];
}

function HomePage({
  language,
  onOpenFeedback,
  onOpenFlashcards,
  onOpenPrivacy,
  onOpenProgress,
  onSelectLanguage,
  onSelectTopic,
  progress,
  ui
}: {
  language: UiLanguage;
  onOpenFeedback: () => void;
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

  function handleExploreModules() {
    document.getElementById("study-modules")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function handleStartPractice() {
    onSelectTopic(TOPICS[0]?.id || "democracy");
  }

  return (
    <>
      <AppNav
        onExploreModules={handleExploreModules}
        onSelectLanguage={onSelectLanguage}
        onStartPractice={handleStartPractice}
        ui={ui}
        value={language}
      />
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
            <div className="hero-cta-row">
              <button className="hero-primary" type="button" onClick={handleStartPractice}>
                {ui.heroPrimaryCta}
              </button>
              <button className="hero-secondary" type="button" onClick={handleExploreModules}>
                {ui.heroSecondaryCta}
              </button>
            </div>
            <p className="hero-trust">{ui.heroTrustBadge}</p>
          </div>
          <HeroMockup ui={ui} />
        </section>

        <ProofStats ui={ui} />

        {showCitizenshipUpdate ? (
          <CitizenshipUpdateCard language={language} onDismiss={handleDismissCitizenshipUpdate} ui={ui} />
        ) : null}

        <IndependentGuideSection ui={ui} />

        <StudyPathSection ui={ui} />
        <ChapterMapSection language={language} ui={ui} />

        <div id="study-modules" className="study-modules-anchor">
          <TopicSelector
            selectedTopicId={selectedTopicFilter}
            onSelectTopic={setSelectedTopicFilter}
            ui={ui}
          />
        </div>

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
                  {language !== "sv" ? <p className="topic-sv" dir="ltr">{topic.nameSv}</p> : null}
                  <h2>{topicName}</h2>
                  <p dir={getTextDirection(ui.topicDescriptions[topic.id] || topic.descriptionEn)}>
                    {ui.topicDescriptions[topic.id] || topic.descriptionEn}
                  </p>
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
        <SiteFooter language={language} onOpenFeedback={onOpenFeedback} onOpenPrivacy={onOpenPrivacy} />
      </main>
      <MobileCta onStartPractice={handleStartPractice} ui={ui} />
    </>
  );
}

function AppNav({
  onExploreModules,
  onSelectLanguage,
  onStartPractice,
  ui,
  value
}: {
  onExploreModules: () => void;
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
          <button type="button" onClick={onStartPractice}>
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
      </nav>
    </header>
  );
}

function HeroMockup({ ui }: { ui: UiText }) {
  return (
    <aside className="hero-mockup" aria-label={ui.heroMockLabel}>
      <div className="mockup-header">
        <span>{ui.heroMockLabel}</span>
        <span className="mockup-pill">1 / 12</span>
      </div>
      <div className="mockup-body">
        <p className="mockup-question" dir="ltr">{ui.heroMockQuestion}</p>
        <div className="mockup-options" dir="ltr">
          <div className="mockup-option wrong">
            <XCircle size={18} aria-hidden="true" />
            <span>{ui.heroMockOptionWrong}</span>
            <strong>Inte rätt</strong>
          </div>
          <div className="mockup-option correct">
            <CheckCircle2 size={18} aria-hidden="true" />
            <span>{ui.heroMockOptionCorrect}</span>
            <strong>Rätt</strong>
          </div>
          <div className="mockup-option">
            <span className="mockup-radio" aria-hidden="true" />
            <span>{ui.heroMockOptionMiss}</span>
          </div>
        </div>
        <div className="mockup-explanation">
          <p>{ui.heroMockExplanationLabel}</p>
          <span>{ui.heroMockExplanation}</span>
        </div>
      </div>
    </aside>
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

function ChapterMapSection({ language, ui }: { language: UiLanguage; ui: UiText }) {
  return (
    <section className="chapter-map" aria-label={ui.chapterMapTitle}>
      <div className="section-heading">
        <h2>{ui.chapterMapTitle}</h2>
        <p dir={getTextDirection(ui.chapterMapIntro)}>{ui.chapterMapIntro}</p>
      </div>
      <div className="chapter-grid">
        {OFFICIAL_CHAPTERS.map((chapter) => {
          const chapterName = ui.chapterNames[chapter.id];

          return (
            <article className={`chapter-card accent-${TOPIC_VISUALS[chapter.topicId].accent}`} key={chapter.id}>
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
            </article>
          );
        })}
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
        <p dir={getTextDirection(ui.comingNextIntro)}>{ui.comingNextIntro}</p>
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
              <h3 dir={getTextDirection(item.title)}>{item.title}</h3>
              <p dir={getTextDirection(item.body)}>{item.body}</p>
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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [feedbackType, setFeedbackType] = useState(ui.feedbackTypes[0]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setFeedbackType(ui.feedbackTypes[0]);
  }, [ui.feedbackTypes]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const body = [
      `Feedback type: ${feedbackType}`,
      `Name: ${name || "Not provided"}`,
      `Reply email: ${email || "Not provided"}`,
      `App language: ${language}`,
      "",
      message
    ].join("\n");

    const mailto = new URL(`mailto:${FEEDBACK_EMAIL}`);
    mailto.searchParams.set("subject", `Swedish Civics Test Preparation feedback: ${feedbackType}`);
    mailto.searchParams.set("body", body);
    window.location.href = mailto.toString();
  }

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

        <form className="feedback-form" onSubmit={handleSubmit}>
          <label>
            <span>{ui.feedbackNameLabel}</span>
            <input
              autoComplete="name"
              onChange={(event) => setName(event.target.value)}
              placeholder={ui.feedbackNamePlaceholder}
              value={name}
            />
          </label>

          <label>
            <span>{ui.feedbackEmailLabel}</span>
            <input
              autoComplete="email"
              inputMode="email"
              onChange={(event) => setEmail(event.target.value)}
              placeholder={ui.feedbackEmailPlaceholder}
              type="email"
              value={email}
            />
          </label>

          <label>
            <span>{ui.feedbackTypeLabel}</span>
            <select onChange={(event) => setFeedbackType(event.target.value)} value={feedbackType}>
              {ui.feedbackTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </label>

          <label className="feedback-message-field">
            <span>{ui.feedbackMessageLabel}</span>
            <textarea
              onChange={(event) => setMessage(event.target.value)}
              placeholder={ui.feedbackMessagePlaceholder}
              required
              rows={8}
              value={message}
            />
          </label>

          <button className="primary feedback-submit" type="submit">
            <Send size={17} aria-hidden="true" />
            {ui.feedbackSend}
          </button>
        </form>

        <p className="feedback-fallback">
          {ui.feedbackMailFallback}{" "}
          <a href={`mailto:${FEEDBACK_EMAIL}`}>{FEEDBACK_EMAIL}</a>
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
      translation: item.translations[language] || item.translations.en
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
  return language === "ar" || language === "fa";
}

createRoot(document.querySelector("#app")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
