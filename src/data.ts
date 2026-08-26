import type { Chapter, Lesson, Question, Topic } from "./types";
import { DRAFT_QUESTIONS } from "./draftQuestions";

export const OFFICIAL_STUDY_GUIDE_URL =
  "https://www.uhr.se/medborgarskapsprovet/utbildningsmaterial/";

export const MIGRATIONSVERKET_CITIZENSHIP_URL =
  "https://www.migrationsverket.se/en/you-want-to-apply/swedish-citizenship/citizenship-for-adults/citizenship-for-adults.html";

export const TOPICS: Topic[] = [
  {
    id: "democracy",
    nameSv: "Demokrati, val och medier",
    nameEn: "Democracy, Elections & Media",
    descriptionEn: "Practice democracy, elections, political parties, free media, and source criticism."
  },
  {
    id: "rights",
    nameSv: "Rättigheter och skyldigheter",
    nameEn: "Rights & Duties",
    descriptionEn: "Practice constitutional rights, rule of law, human rights, equality, religious freedom, and shared duties."
  },
  {
    id: "everyday",
    nameSv: "Vardagsliv i Sverige",
    nameEn: "Everyday Life in Sweden",
    descriptionEn: "Practice work, private economy, welfare, school, healthcare, daily life, and traditions."
  },
  {
    id: "authorities",
    nameSv: "Sverige, staten och tjänster",
    nameEn: "Sweden, State & Services",
    descriptionEn: "Practice Sweden as a country, how it is governed, modern history, international cooperation, and public services."
  }
];

export const OFFICIAL_CHAPTERS: Chapter[] = [
  { id: "country", number: 1, nameSv: "Landet Sverige", topicId: "authorities" },
  { id: "democratic-system", number: 2, nameSv: "Sveriges demokratiska system", topicId: "democracy" },
  { id: "governance", number: 3, nameSv: "Så här styrs Sverige", topicId: "authorities" },
  { id: "elections", number: 4, nameSv: "Politiska val och partier", topicId: "democracy" },
  { id: "law", number: 5, nameSv: "Lag och rätt", topicId: "rights" },
  { id: "media", number: 6, nameSv: "Mediernas roll", topicId: "democracy" },
  { id: "human-rights", number: 7, nameSv: "Mänskliga rättigheter", topicId: "rights" },
  { id: "work-economy", number: 8, nameSv: "Arbetsmarknad och privatekonomi", topicId: "everyday" },
  { id: "welfare", number: 9, nameSv: "Välfärdssamhället", topicId: "everyday" },
  { id: "modern-history", number: 10, nameSv: "Sveriges moderna historia", topicId: "authorities" },
  { id: "world", number: 11, nameSv: "Sverige och omvärlden", topicId: "authorities" },
  { id: "secular-state", number: 12, nameSv: "En sekulär stat och ett mångreligiöst land", topicId: "rights" },
  { id: "traditions", number: 13, nameSv: "Traditioner och högtider", topicId: "everyday" }
];

export const LESSONS: Lesson[] = [
  {
    id: "lesson-democracy-basics",
    topicId: "democracy",
    chapterNumbers: [2, 4],
    titleSv: "Demokrati, val och påverkan",
    titles: {
      sv: "Demokrati, val och påverkan",
      en: "Democracy, elections, and influence",
      ar: "الديمقراطية والانتخابات والتأثير",
      so: "Dimuqraadiyad, doorashooyin, iyo saamayn",
      fa: "دموکراسی، انتخابات و تأثیرگذاری",
      ti: "ዲሞክራሲ፣ ምርጫታትን ጽልዋን",
      zh: "民主、选举和影响社会"
    },
    studyText: {
      sv: [
        "Sverige i fokus förklarar Sverige som en demokrati. Det betyder att den politiska makten kommer från folket och att människor väljer representanter i fria val.",
        "Demokrati är mer än att rösta. Människor kan också påverka samhället genom föreningar, kontakt med politiker, fredliga demonstrationer, debattartiklar och offentliga samtal.",
        "En stark demokrati behöver fria val, fria medier, respekt för rättigheter och människor som kontrollerar information i stället för att sprida hot eller falska påståenden."
      ],
      en: [
        "Sverige i fokus explains Sweden as a democracy. That means political power comes from the people, and people choose representatives in free elections.",
        "Democracy is more than voting. People can also influence society by joining associations, contacting politicians, demonstrating peacefully, writing debate articles, and taking part in public discussion.",
        "A strong democracy needs free elections, free media, respect for rights, and people who can check information instead of spreading threats or false claims."
      ],
      ar: [
        "تشرح Sverige i fokus السويد كدولة ديمقراطية. هذا يعني أن السلطة السياسية تأتي من الشعب، وأن الناس يختارون ممثليهم في انتخابات حرة.",
        "الديمقراطية ليست التصويت فقط. يمكن للناس أيضاً التأثير في المجتمع عبر الجمعيات، والتواصل مع السياسيين، والتظاهر السلمي، وكتابة مقالات رأي، والمشاركة في النقاش العام.",
        "تحتاج الديمقراطية القوية إلى انتخابات حرة، وإعلام حر، واحترام الحقوق، وأشخاص يتحققون من المعلومات بدلاً من نشر التهديدات أو الادعاءات الكاذبة."
      ],
      so: [
        "Sverige i fokus waxay sharxaysaa in Iswiidhan tahay dal dimuqraadi ah. Taas macnaheedu waa in awoodda siyaasadeed ka timaaddo dadka, dadkuna ay doortaan wakiillo doorashooyin xor ah.",
        "Dimuqraadiyaddu ma aha codbixin oo keliya. Dadku sidoo kale waxay bulshada saamayn ugu yeelan karaan ururro, la xiriiridda siyaasiyiinta, bannaanbax nabad ah, qorista maqaal dood ah, iyo ka qaybgalka doodda dadweynaha.",
        "Dimuqraadiyad xooggan waxay u baahan tahay doorashooyin xor ah, warbaahin xor ah, ixtiraam xuquuq, iyo dad hubiya macluumaadka halkii ay faafin lahaayeen hanjabaad ama sheegashooyin been ah."
      ],
      fa: [
        "Sverige i fokus سوئد را به عنوان یک دموکراسی توضیح می‌دهد. یعنی قدرت سیاسی از مردم می‌آید و مردم نمایندگان خود را در انتخابات آزاد انتخاب می‌کنند.",
        "دموکراسی فقط رأی دادن نیست. مردم می‌توانند با عضویت در انجمن‌ها، تماس با سیاستمداران، تظاهرات مسالمت‌آمیز، نوشتن مقاله‌های بحثی و شرکت در گفت‌وگوی عمومی بر جامعه اثر بگذارند.",
        "یک دموکراسی قوی به انتخابات آزاد، رسانه آزاد، احترام به حقوق و افرادی نیاز دارد که اطلاعات را بررسی کنند و تهدید یا ادعاهای نادرست پخش نکنند."
      ],
      ti: [
        "Sverige i fokus ሽወደን ከም ዲሞክራሲ ትገልጻ። እዚ ማለት ፖለቲካዊ ስልጣን ካብ ህዝቢ ይመጽእ፣ ህዝቢ ድማ ኣብ ናጻ ምርጫታት ወከልቱ ይመርጽ።",
        "ዲሞክራሲ ድምጺ ምሃብ ጥራይ ኣይኮነን። ሰባት ብማሕበራት፣ ምስ ፖለቲከኛታት ብምርኻብ፣ ብሰላማዊ ሰልፊ፣ ብጽሑፋት ክትዕ እናጻሕፉን ኣብ ህዝባዊ ዘተ ብምስታፍን ጽልዋ ክገብሩ ይኽእሉ።",
        "ጽኑዕ ዲሞክራሲ ናጻ ምርጫታት፣ ናጻ ሚድያ፣ ክብሪ መሰላት፣ ከምኡውን ሓበሬታ ዝምርምሩ ሰባት የድልዮ።"
      ],
      zh: [
        "《Sverige i fokus》把瑞典解释为一个民主国家。这表示政治权力来自人民，人们通过自由选举选择代表。",
        "民主不只是投票。人们也可以通过加入协会、联系政治人物、和平示威、写评论文章和参与公共讨论来影响社会。",
        "强健的民主需要自由选举、自由媒体、对权利的尊重，以及愿意核查信息而不是传播威胁或虚假说法的人。"
      ]
    },
    takeaways: {
      sv: [
        "Demokrati betyder folkstyre.",
        "Sverige har normalt allmänna val vart fjärde år.",
        "Riksdagen stiftar lagar, beslutar om statens budget och kontrollerar regeringen.",
        "Falsk information, hot, hat och låg delaktighet kan försvaga demokratin."
      ],
      en: [
        "Democracy means rule by the people.",
        "Sweden normally has general elections every four years.",
        "The Riksdag makes laws, decides the state budget, and checks the government.",
        "False information, threats, hate, and low participation can weaken democracy."
      ],
      ar: [
        "الديمقراطية تعني حكم الشعب.",
        "تُجرى الانتخابات العامة في السويد عادة كل أربع سنوات.",
        "الريكسداغ يسن القوانين، ويقرر ميزانية الدولة، ويراقب الحكومة.",
        "المعلومات الكاذبة والتهديدات والكراهية وضعف المشاركة يمكن أن تضعف الديمقراطية."
      ],
      so: [
        "Dimuqraadiyaddu waxay ka dhigan tahay in dadku xukumaan.",
        "Iswiidhan badanaa waxay leedahay doorashooyin guud afartii sanoba mar.",
        "Riksdag wuxuu sameeyaa sharciyo, go'aamiyaa miisaaniyadda qaranka, wuxuuna kormeeraa dowladda.",
        "Macluumaad been ah, hanjabaad, nacayb, iyo ka-qaybgal hoose ayaa daciifin kara dimuqraadiyadda."
      ],
      fa: [
        "دموکراسی یعنی حکومت مردم.",
        "سوئد معمولاً هر چهار سال یک‌بار انتخابات عمومی دارد.",
        "Riksdag قانون تصویب می‌کند، بودجه دولت را تعیین می‌کند و بر دولت نظارت دارد.",
        "اطلاعات نادرست، تهدید، نفرت و مشارکت کم می‌تواند دموکراسی را ضعیف کند."
      ],
      ti: [
        "ዲሞክራሲ ማለት ህዝቢ ይመርሕ ማለት እዩ።",
        "ሽወደን ብተለምዶ ኣብ ነፍሲ ወከፍ ኣርባዕተ ዓመት ሓፈሻዊ ምርጫ ትገብር።",
        "Riksdag ሕግታት ይገብር፣ ባጀት መንግስቲ ይውስን፣ ንመንግስቲ ድማ ይቆጻጸር።",
        "ሓሶት ሓበሬታ፣ ምፍርራሕ፣ ጽልኢ፣ ከምኡውን ዝተሓተ ተሳትፎ ዲሞክራሲ ከድክሙ ይኽእሉ።"
      ],
      zh: [
        "民主表示人民治理。",
        "瑞典通常每四年举行一次大选。",
        "Riksdag 制定法律、决定国家预算，并监督政府。",
        "虚假信息、威胁、仇恨和低参与度会削弱民主。"
      ]
    },
    vocabulary: [
      { sv: "demokrati", translations: { sv: "folkstyre", en: "democracy", ar: "ديمقراطية", so: "dimuqraadiyad", fa: "دموکراسی", ti: "ዲሞክራሲ", zh: "民主" } },
      { sv: "riksdag", translations: { sv: "Sveriges parlament", en: "parliament", ar: "البرلمان", so: "baarlamaanka Iswiidhan", fa: "پارلمان سوئد", ti: "ፓርላማ ሽወደን", zh: "国会" } },
      { sv: "val", translations: { sv: "när människor röstar", en: "election", ar: "انتخابات", so: "doorasho", fa: "انتخابات", ti: "ምርጫ", zh: "选举" } },
      { sv: "påverka", translations: { sv: "försöka ändra eller bidra", en: "influence", ar: "يؤثر", so: "saamayn ku yeelasho", fa: "تأثیر گذاشتن", ti: "ጽልዋ ምግባር", zh: "影响" } }
    ],
    questionIds: [
      "democracy-001",
      "democracy-002",
      "democracy-003",
      "democracy-004",
      "democracy-005",
      "democracy-006",
      "democracy-007",
      "democracy-008",
      "democracy-009",
      "democracy-010",
      "democracy-011",
      "democracy-012"
    ]
  },
  {
    id: "lesson-rights-law-media",
    topicId: "rights",
    chapterNumbers: [5, 6, 7],
    titleSv: "Rättigheter, lag och medier",
    titles: {
      sv: "Rättigheter, lag och medier",
      en: "Rights, law, and media",
      ar: "الحقوق والقانون والإعلام",
      so: "Xuquuq, sharci, iyo warbaahin",
      fa: "حقوق، قانون و رسانه",
      ti: "መሰላት፣ ሕጊን ሚድያን",
      zh: "权利、法律和媒体"
    },
    studyText: {
      sv: [
        "Sverige i fokus kopplar demokrati till rättssäkerhet. Lagar ska gälla för alla, och domstolar ska döma enligt lagen.",
        "Sveriges grundlagar skyddar friheter som yttrandefrihet och tryckfrihet. Friheterna är viktiga, men de ger inte rätt att hota eller sprida hat mot andra människor.",
        "Materialet lyfter också medier och källkritik. I en demokrati behöver människor information, men de behöver också fråga var informationen kommer från och om den är pålitlig."
      ],
      en: [
        "Sverige i fokus connects democracy with rule of law. Laws should apply to everyone, and courts must judge according to law.",
        "Sweden's constitutional laws protect freedoms such as freedom of expression and freedom of the press. These freedoms are important, but they do not allow threats or hate against other people.",
        "The material also highlights media and source criticism. In a democracy, people need information, but they also need to ask where information comes from and whether it is reliable."
      ],
      ar: [
        "تربط Sverige i fokus الديمقراطية بسيادة القانون. يجب أن تنطبق القوانين على الجميع، ويجب أن تحكم المحاكم وفقاً للقانون.",
        "تحمي القوانين الدستورية في السويد حريات مثل حرية التعبير وحرية الصحافة. هذه الحريات مهمة، لكنها لا تسمح بالتهديد أو الكراهية ضد الآخرين.",
        "تؤكد المادة أيضاً على الإعلام والنقد المصدري. في الديمقراطية يحتاج الناس إلى المعلومات، لكنهم يحتاجون أيضاً إلى السؤال عن مصدرها ومدى موثوقيتها."
      ],
      so: [
        "Sverige i fokus waxay isku xirtaa dimuqraadiyadda iyo ku dhaqanka sharciga. Sharciyadu waa inay qof walba khuseeyaan, maxkamaduhuna waa inay ku xukumaan sharciga.",
        "Sharciyada dastuuriga ah ee Iswiidhan waxay ilaaliyaan xorriyado sida xorriyadda hadalka iyo xorriyadda saxaafadda. Xorriyadahani waa muhiim, laakiin ma oggola hanjabaad ama nacayb ka dhan ah dadka kale.",
        "Qalabku sidoo kale wuxuu xoogga saaraa warbaahinta iyo källkritik. Dimuqraadiyadda, dadku waxay u baahan yihiin macluumaad, laakiin waa inay sidoo kale is weydiiyaan halka macluumaadku ka yimid iyo inuu la isku halayn karo."
      ],
      fa: [
        "Sverige i fokus دموکراسی را با حاکمیت قانون پیوند می‌دهد. قوانین باید برای همه اجرا شوند و دادگاه‌ها باید بر اساس قانون حکم کنند.",
        "قوانین اساسی سوئد آزادی‌هایی مانند آزادی بیان و آزادی مطبوعات را محافظت می‌کنند. این آزادی‌ها مهم هستند، اما تهدید یا نفرت علیه دیگران را مجاز نمی‌کنند.",
        "این منبع همچنین بر رسانه و نقد منبع تأکید دارد. در دموکراسی مردم به اطلاعات نیاز دارند، اما باید بپرسند اطلاعات از کجا آمده و آیا قابل اعتماد است."
      ],
      ti: [
        "Sverige i fokus ዲሞክራሲን ምስ ልዕልና ሕጊ ትተሓሓዞ። ሕግታት ንኹሉ ሰብ ክትግበሩ ኣለዎም፣ ቤት ፍርዲ ድማ ብሕጊ ክፈርድ ኣለዎ።",
        "መሰረታዊ ሕግታት ሽወደን ከም ናጽነት ርእይቶን ናጽነት ፕሬስን ዝኣመሰሉ ናጽነታት ይሕልዉ። እዞም ናጽነታት ኣገደስቲ እዮም፣ ግን ምፍርራሕ ወይ ጽልኢ ኣንጻር ካልኦት ኣየፍቅዱን።",
        "እቲ መጽናዕቲ ብዛዕባ ሚድያን ምርመራ ምንጪን እውን ይገልጽ። ኣብ ዲሞክራሲ፣ ሰባት ሓበሬታ የድልዮም፣ ግን ምንጪ ናይቲ ሓበሬታን ተኣማንነቱን ክሓቱ ኣለዎም።"
      ],
      zh: [
        "《Sverige i fokus》把民主和法治联系在一起。法律应适用于每个人，法院必须依法判决。",
        "瑞典的基本法保护言论自由和新闻出版自由等自由。这些自由很重要，但不允许威胁他人或传播仇恨。",
        "材料也强调媒体和来源批判。在民主社会，人们需要信息，也需要询问信息来自哪里、是否可靠。"
      ]
    },
    takeaways: {
      sv: [
        "Rättssäkerhet betyder att ingen står över lagen.",
        "Yttrandefrihet skyddar åsikter, men inte hot eller hets mot folkgrupp.",
        "Fria medier kan informera människor och granska makten.",
        "Källkritik betyder att kontrollera avsändare, syfte, bevis och trovärdighet."
      ],
      en: [
        "Rule of law means no one is above the law.",
        "Freedom of expression protects opinions, but not threats or hate speech.",
        "Free media can inform people and scrutinize power.",
        "Source criticism means checking sender, purpose, evidence, and reliability."
      ],
      ar: [
        "سيادة القانون تعني أنه لا أحد فوق القانون.",
        "حرية التعبير تحمي الآراء، لكنها لا تحمي التهديدات أو خطاب الكراهية.",
        "الإعلام الحر يمكنه إبلاغ الناس ومراقبة السلطة.",
        "النقد المصدري يعني فحص المرسل والهدف والأدلة والموثوقية."
      ],
      so: [
        "Ku dhaqanka sharcigu wuxuu ka dhigan yahay in qofna ka sarreyn sharciga.",
        "Xorriyadda hadalku waxay ilaalisaa fikradaha, laakiin ma ilaaliso hanjabaad ama hadal nacayb.",
        "Warbaahin xor ah waxay dadka siin kartaa macluumaad, waxayna kormeeri kartaa awoodda.",
        "Källkritik waxay ka dhigan tahay hubinta cidda dirtay, ujeeddada, caddaynta, iyo kalsoonida."
      ],
      fa: [
        "حاکمیت قانون یعنی هیچ‌کس بالاتر از قانون نیست.",
        "آزادی بیان از نظرها محافظت می‌کند، اما تهدید یا نفرت‌پراکنی را محافظت نمی‌کند.",
        "رسانه آزاد می‌تواند به مردم اطلاعات بدهد و قدرت را بررسی کند.",
        "نقد منبع یعنی بررسی فرستنده، هدف، شواهد و قابل اعتماد بودن اطلاعات."
      ],
      ti: [
        "ልዕልና ሕጊ ማለት ማንም ሰብ ካብ ሕጊ ላዕሊ ኣይኮነን።",
        "ናጽነት ርእይቶ ሓሳባት ይሕሉ፣ ግን ምፍርራሕ ወይ ናይ ጽልኢ ዘረባ ኣይሕሉን።",
        "ናጻ ሚድያ ንሰባት ሓበሬታ ክህብን ስልጣን ክምርምርን ይኽእል።",
        "ምርመራ ምንጪ ማለት ላኣኺ፣ ዕላማ፣ መርትዖ፣ ከምኡውን ተኣማንነት ምርኣይ ማለት እዩ።"
      ],
      zh: [
        "法治表示没有人高于法律。",
        "言论自由保护观点，但不保护威胁或仇恨言论。",
        "自由媒体可以提供信息并监督权力。",
        "来源批判表示检查发布者、目的、证据和可靠性。"
      ]
    },
    vocabulary: [
      { sv: "rättssäkerhet", translations: { sv: "trygghet genom lag och rätt", en: "rule of law/legal security", ar: "الأمن القانوني/سيادة القانون", so: "ku dhaqanka sharciga / amni sharci", fa: "حاکمیت قانون / امنیت حقوقی", ti: "ልዕልና ሕጊ / ሕጋዊ ውሕስነት", zh: "法治/法律保障" } },
      { sv: "grundlag", translations: { sv: "extra viktig lag om hur landet styrs", en: "constitutional law", ar: "قانون دستوري", so: "sharciga dastuuriga ah", fa: "قانون اساسی", ti: "መሰረታዊ ሕጊ", zh: "基本法" } },
      { sv: "yttrandefrihet", translations: { sv: "frihet att uttrycka åsikter", en: "freedom of expression", ar: "حرية التعبير", so: "xorriyadda hadalka", fa: "آزادی بیان", ti: "ናጽነት ርእይቶ", zh: "言论自由" } },
      { sv: "källkritik", translations: { sv: "att kontrollera information och källor", en: "source criticism", ar: "النقد المصدري", so: "hubinta ilaha macluumaadka", fa: "نقد و بررسی منبع", ti: "ምርመራ ምንጪ", zh: "来源批判" } }
    ],
    questionIds: [
      "rights-001",
      "rights-002",
      "rights-003",
      "rights-004",
      "rights-005",
      "rights-006",
      "rights-007",
      "rights-008",
      "rights-009",
      "rights-010",
      "rights-011",
      "rights-012"
    ]
  },
  {
    id: "lesson-everyday-welfare-history",
    topicId: "everyday",
    chapterNumbers: [1, 8, 9, 10, 12, 13],
    titleSv: "Vardag, välfärd och Sverige som land",
    titles: {
      sv: "Vardag, välfärd och Sverige som land",
      en: "Daily life, welfare, and Sweden as a country",
      ar: "الحياة اليومية والرفاه والسويد كبلد",
      so: "Nolol maalmeed, daryeel bulsho, iyo Iswiidhan dal ahaan",
      fa: "زندگی روزمره، رفاه و سوئد به عنوان یک کشور",
      ti: "ዕለታዊ ህይወት፣ ድሕነትን ሽወደን ከም ሃገርን",
      zh: "日常生活、福利和瑞典这个国家"
    },
    studyText: {
      sv: [
        "Sverige i fokus börjar med Sverige som land: geografi, befolkning, naturresurser och hur samhället har förändrats över tid.",
        "En central idé är välfärdssamhället. Många tjänster, som sjukvård, utbildning och omsorg, betalas med skatter och organiseras av det offentliga.",
        "Materialet beskriver också arbetsliv, privatekonomi, sekulärt samhälle, religionsfrihet och traditioner. De ämnena förklarar vardagslivet, inte bara politiken."
      ],
      en: [
        "Sverige i fokus starts with Sweden as a country: geography, population, natural resources, and how society has changed over time.",
        "A central idea is the welfare society. Many services, such as healthcare, education, and care, are paid for by taxes and organized by the public sector.",
        "The material also describes working life, private economy, secular society, religious freedom, and traditions. These topics help explain everyday life, not only politics."
      ],
      ar: [
        "تبدأ Sverige i fokus بالسويد كبلد: الجغرافيا والسكان والموارد الطبيعية وكيف تغيّر المجتمع عبر الزمن.",
        "فكرة مركزية هي مجتمع الرفاه. كثير من الخدمات، مثل الرعاية الصحية والتعليم والرعاية الاجتماعية، تُدفع من الضرائب وتنظمها الجهات العامة.",
        "تصف المادة أيضاً حياة العمل والاقتصاد الشخصي والمجتمع العلماني وحرية الدين والتقاليد. هذه الموضوعات تشرح الحياة اليومية، وليس السياسة فقط."
      ],
      so: [
        "Sverige i fokus waxay ka bilaabataa Iswiidhan dal ahaan: juqraafi, dadka, khayraadka dabiiciga ah, iyo sida bulshadu isu beddeshay waqti ka dib.",
        "Fikrad muhiim ah waa bulshada daryeelka. Adeegyo badan, sida daryeel caafimaad, waxbarasho, iyo daryeel, waxaa lagu bixiyaa canshuur, waxaana abaabula qaybta dadweynaha.",
        "Qalabku sidoo kale wuxuu sharxayaa nolosha shaqada, dhaqaalaha gaarka ah, bulsho sekulär ah, xorriyadda diinta, iyo dhaqamada. Mawduucyadani waxay sharxaan nolol maalmeedka, ma aha siyaasadda oo keliya."
      ],
      fa: [
        "Sverige i fokus با سوئد به عنوان یک کشور شروع می‌کند: جغرافیا، جمعیت، منابع طبیعی و این‌که جامعه در طول زمان چگونه تغییر کرده است.",
        "یک مفهوم اصلی، جامعه رفاهی است. بسیاری از خدمات مانند درمان، آموزش و مراقبت از طریق مالیات پرداخت می‌شوند و توسط بخش عمومی سازمان‌دهی می‌شوند.",
        "این منبع همچنین زندگی کاری، اقتصاد شخصی، جامعه سکولار، آزادی دین و سنت‌ها را توضیح می‌دهد. این موضوع‌ها زندگی روزمره را توضیح می‌دهند، نه فقط سیاست را."
      ],
      ti: [
        "Sverige i fokus ብሽወደን ከም ሃገር ትጅምር፦ ጂኦግራፊ፣ ህዝቢ፣ ተፈጥሮኣዊ ሃብቲ፣ ከምኡውን ማሕበረሰብ ኣብ ግዜ ከመይ ከምዝተቐየረ።",
        "ቀንዲ ሓሳብ ማሕበረሰብ ድሕነት እዩ። ብዙሓት ኣገልግሎታት፣ ከም ጥዕና፣ ትምህርቲ፣ ክንክን፣ ብግብሪ ይኽፈሉ እና ብህዝባዊ ክፋል ይውደቡ።",
        "እቲ መጽናዕቲ እውን ህይወት ስራሕ፣ ውልቃዊ ቁጠባ፣ ሴኩላር ማሕበረሰብ፣ ናጽነት ሃይማኖትን ባህልታትን ይገልጽ። እዞም ርእሰ-ጉዳያት ዕለታዊ ህይወት ይገልጹ፣ ፖለቲካ ጥራይ ኣይኮኑን።"
      ],
      zh: [
        "《Sverige i fokus》从瑞典这个国家开始：地理、人口、自然资源，以及社会如何随时间变化。",
        "一个核心概念是福利社会。许多服务，例如医疗、教育和照护，由税收支付并由公共部门组织。",
        "材料也介绍工作生活、个人经济、世俗社会、宗教自由和传统。这些主题解释的不只是政治，也包括日常生活。"
      ]
    },
    takeaways: {
      sv: [
        "Sveriges största städer är Stockholm, Göteborg och Malmö.",
        "Skogar, mineraler, jordbruksmark och vatten är viktiga resurser.",
        "Skatter finansierar en stor del av välfärdssystemet.",
        "Sverige är sekulärt, och människor kan ha olika religioner eller ingen religion."
      ],
      en: [
        "Sweden's largest cities are Stockholm, Gothenburg, and Malmö.",
        "Forests, minerals, agricultural land, and water are important resources.",
        "Taxes finance much of the welfare system.",
        "Sweden is secular, and people may have different religions or no religion."
      ],
      ar: [
        "أكبر مدن السويد هي ستوكهولم ويوتبوري ومالمو.",
        "الغابات والمعادن والأراضي الزراعية والمياه موارد مهمة.",
        "تموّل الضرائب جزءاً كبيراً من نظام الرفاه.",
        "السويد دولة علمانية، ويمكن للناس أن تكون لهم أديان مختلفة أو لا دين لهم."
      ],
      so: [
        "Magaalooyinka ugu waaweyn Iswiidhan waa Stockholm, Göteborg, iyo Malmö.",
        "Kaymaha, macdanta, dhulka beeraha, iyo biyuhu waa khayraad muhiim ah.",
        "Canshuurtu waxay maalgelisaa qayb weyn oo ka mid ah nidaamka daryeelka bulshada.",
        "Iswiidhan waa dal sekulär ah, dadkuna waxay yeelan karaan diimo kala duwan ama diin la'aan."
      ],
      fa: [
        "بزرگ‌ترین شهرهای سوئد Stockholm، Gothenburg و Malmö هستند.",
        "جنگل‌ها، معادن، زمین کشاورزی و آب منابع مهم هستند.",
        "مالیات بخش بزرگی از نظام رفاه را تأمین مالی می‌کند.",
        "سوئد سکولار است و مردم می‌توانند دین‌های متفاوت داشته باشند یا بی‌دین باشند."
      ],
      ti: [
        "ዝዓበያ ከተማታት ሽወደን Stockholm, Gothenburg, Malmö እየን።",
        "ዱር፣ ማዕድናት፣ መሬት ሕርሻን ማይን ኣገደስቲ ሃብቲ እዮም።",
        "ግብሪ ዓቢ ክፋል ናይ ስርዓት ድሕነት ይምውል።",
        "ሽወደን ሴኩላር ሃገር እያ፣ ሰባት ዝተፈላለዩ ሃይማኖታት ወይ ሃይማኖት ዘይብሎም ክኾኑ ይኽእሉ።"
      ],
      zh: [
        "瑞典最大的城市是斯德哥尔摩、哥德堡和马尔默。",
        "森林、矿产、农地和水是重要资源。",
        "税收资助了福利体系的大部分。",
        "瑞典是世俗国家，人们可以有不同宗教，也可以没有宗教。"
      ]
    },
    vocabulary: [
      { sv: "välfärd", translations: { sv: "samhällets stöd och service", en: "welfare", ar: "الرفاه", so: "daryeel bulsho", fa: "رفاه", ti: "ድሕነት", zh: "福利" } },
      { sv: "skatt", translations: { sv: "pengar som betalas till det offentliga", en: "tax", ar: "ضريبة", so: "canshuur", fa: "مالیات", ti: "ግብሪ", zh: "税" } },
      { sv: "arbetsmarknad", translations: { sv: "området där arbete söks och erbjuds", en: "labour market", ar: "سوق العمل", so: "suuqa shaqada", fa: "بازار کار", ti: "ዕዳጋ ስራሕ", zh: "劳动力市场" } },
      { sv: "sekulär", translations: { sv: "inte styrd av religion", en: "secular", ar: "علماني", so: "aan diin dowladeed ku dhisnayn", fa: "سکولار", ti: "ሴኩላር", zh: "世俗的" } }
    ],
    questionIds: [
      "everyday-001",
      "everyday-002",
      "everyday-003",
      "everyday-004",
      "everyday-005",
      "everyday-006",
      "everyday-007",
      "everyday-008",
      "everyday-009",
      "everyday-010",
      "everyday-011",
      "everyday-012"
    ]
  },
  {
    id: "lesson-authorities-governance",
    topicId: "authorities",
    chapterNumbers: [3, 11],
    titleSv: "Så styrs Sverige och samarbetar med omvärlden",
    titles: {
      sv: "Så styrs Sverige och samarbetar med omvärlden",
      en: "How Sweden is governed and cooperates with the world",
      ar: "كيف تُحكم السويد وتتعاون مع العالم",
      so: "Sida Iswiidhan loo maamulo iyo sida ay ula shaqeyso dunida",
      fa: "سوئد چگونه اداره می‌شود و با جهان همکاری می‌کند",
      ti: "ሽወደን ከመይ ከምትመሓደርን ምስ ዓለም ከመይ ከምትተሓባበርን",
      zh: "瑞典如何治理并与世界合作"
    },
    studyText: {
      sv: [
        "Sverige i fokus beskriver Sverige som en demokrati och en monarki. Kungen är statschef, men politiska beslut fattas genom demokratiska institutioner.",
        "Riksdagen stiftar lagar och beslutar om statens budget. Regeringen styr landet och genomför beslut. Kommuner och regioner ansvarar för många lokala tjänster och välfärdstjänster.",
        "Sverige samarbetar också internationellt, till exempel med de nordiska länderna, EU, FN och andra organisationer."
      ],
      en: [
        "Sverige i fokus describes Sweden as a democracy and a monarchy. The king is head of state, but political decisions are made through democratic institutions.",
        "The Riksdag makes laws and decides the state budget. The government governs the country and carries out decisions. Municipalities and regions handle many local and welfare services.",
        "Sweden also cooperates internationally, for example with Nordic countries, the EU, the UN, and other organizations."
      ],
      ar: [
        "تصف Sverige i fokus السويد كديمقراطية وملكية. الملك هو رئيس الدولة، لكن القرارات السياسية تُتخذ من خلال المؤسسات الديمقراطية.",
        "الريكسداغ يسن القوانين ويقرر ميزانية الدولة. الحكومة تدير البلاد وتنفذ القرارات. البلديات والمناطق تتعامل مع كثير من الخدمات المحلية وخدمات الرفاه.",
        "تتعاون السويد أيضاً دولياً، مثلاً مع دول الشمال والاتحاد الأوروبي والأمم المتحدة ومنظمات أخرى."
      ],
      so: [
        "Sverige i fokus waxay Iswiidhan ku tilmaantaa dimuqraadiyad iyo boqortooyo. Boqorku waa madaxa qaranka, laakiin go'aannada siyaasadeed waxaa lagu sameeyaa hay'ado dimuqraadi ah.",
        "Riksdag wuxuu sameeyaa sharciyada wuxuuna go'aamiyaa miisaaniyadda qaranka. Dowladda ayaa dalka maamusha oo fulisa go'aannada. Degmooyinka iyo gobolladu waxay qabtaan adeegyo badan oo maxalli ah iyo adeegyo daryeel bulsho.",
        "Iswiidhan sidoo kale waxay si caalami ah ula shaqeysaa dalalka Waqooyiga Yurub, Midowga Yurub, Qaramada Midoobay, iyo ururro kale."
      ],
      fa: [
        "Sverige i fokus سوئد را به عنوان یک دموکراسی و پادشاهی توضیح می‌دهد. پادشاه رئیس کشور است، اما تصمیم‌های سیاسی از طریق نهادهای دموکراتیک گرفته می‌شوند.",
        "Riksdag قانون تصویب می‌کند و بودجه دولت را تعیین می‌کند. دولت کشور را اداره می‌کند و تصمیم‌ها را اجرا می‌کند. شهرداری‌ها و مناطق بسیاری از خدمات محلی و رفاهی را انجام می‌دهند.",
        "سوئد همچنین در سطح بین‌المللی همکاری می‌کند، برای مثال با کشورهای نوردیک، اتحادیه اروپا، سازمان ملل و سازمان‌های دیگر."
      ],
      ti: [
        "Sverige i fokus ሽወደን ከም ዲሞክራሲን ንግስነትን ትገልጻ። ንጉስ ርእሰ ሃገር እዩ፣ ግን ፖለቲካዊ ውሳነታት ብዲሞክራሲያዊ ትካላት ይግበሩ።",
        "Riksdag ሕግታት ይገብርን ባጀት መንግስቲ ይውስንን። መንግስቲ ንሃገር ይመርሕን ውሳነታት ይፍጽምን። ኮሙናትን ረጂዮናትን ብዙሓት ናይ ከባቢን ድሕነትን ኣገልግሎታት ይሕዙ።",
        "ሽወደን እውን ብዓለም ደረጃ ትተሓባበር፣ ንኣብነት ምስ ኖርዲክ ሃገራት፣ EU፣ UN እና ካልኦት ውድባት።"
      ],
      zh: [
        "《Sverige i fokus》把瑞典描述为民主国家和君主制国家。国王是国家元首，但政治决定通过民主机构作出。",
        "Riksdag 制定法律并决定国家预算。政府管理国家并执行决定。市和地区负责许多地方服务和福利服务。",
        "瑞典也进行国际合作，例如与北欧国家、欧盟、联合国和其他组织合作。"
      ]
    },
    takeaways: {
      sv: [
        "Kungen är statschef, men folkvalda institutioner har den politiska makten.",
        "Riksdagen stiftar lagar och kontrollerar regeringen.",
        "Regionerna ansvarar främst för sjukvård.",
        "Kommunerna ansvarar för många lokala tjänster, bland annat skolor och äldreomsorg."
      ],
      en: [
        "The king is head of state, but elected institutions hold political power.",
        "The Riksdag makes laws and checks the government.",
        "Regions are mainly responsible for healthcare.",
        "Municipalities handle many local services, including schools and care for older people."
      ],
      ar: [
        "الملك هو رئيس الدولة، لكن المؤسسات المنتخبة تملك السلطة السياسية.",
        "الريكسداغ يسن القوانين ويراقب الحكومة.",
        "المناطق مسؤولة بشكل رئيسي عن الرعاية الصحية.",
        "البلديات تتعامل مع كثير من الخدمات المحلية، مثل المدارس ورعاية كبار السن."
      ],
      so: [
        "Boqorku waa madaxa qaranka, laakiin hay'adaha la doortay ayaa haya awoodda siyaasadeed.",
        "Riksdag wuxuu sameeyaa sharciyo wuxuuna kormeeraa dowladda.",
        "Gobolladu waxay inta badan mas'uul ka yihiin daryeelka caafimaadka.",
        "Degmooyinku waxay qabtaan adeegyo badan oo maxalli ah, oo ay ku jiraan dugsiyada iyo daryeelka dadka waayeelka ah."
      ],
      fa: [
        "پادشاه رئیس کشور است، اما نهادهای انتخاب‌شده قدرت سیاسی دارند.",
        "Riksdag قانون تصویب می‌کند و دولت را بررسی می‌کند.",
        "مناطق بیشتر مسئول خدمات درمانی هستند.",
        "شهرداری‌ها بسیاری از خدمات محلی، از جمله مدرسه و مراقبت از سالمندان را انجام می‌دهند."
      ],
      ti: [
        "ንጉስ ርእሰ ሃገር እዩ፣ ግን ዝተመርጹ ትካላት ፖለቲካዊ ስልጣን ይሕዙ።",
        "Riksdag ሕግታት ይገብርን ንመንግስቲ ይቆጻጸርን።",
        "ረጂዮናት ብቐንዱ ንኣገልግሎት ጥዕና ሓላፍነት ኣለዎም።",
        "ኮሙናት ብዙሓት ናይ ከባቢ ኣገልግሎታት ይሕዙ፣ እዚ ድማ ቤት ትምህርትን ክንክን ኣረጋውያንን የጠቓልል።"
      ],
      zh: [
        "国王是国家元首，但政治权力属于民选机构。",
        "Riksdag 制定法律并监督政府。",
        "地区主要负责医疗保健。",
        "市政府处理许多地方服务，包括学校和老人照护。"
      ]
    },
    vocabulary: [
      { sv: "statschef", translations: { sv: "landets formella högsta företrädare", en: "head of state", ar: "رئيس الدولة", so: "madaxa qaranka", fa: "رئیس کشور", ti: "ርእሰ ሃገር", zh: "国家元首" } },
      { sv: "regering", translations: { sv: "de ministrar som styr landet", en: "government", ar: "الحكومة", so: "dowlad", fa: "دولت", ti: "መንግስቲ", zh: "政府" } },
      { sv: "region", translations: { sv: "regional nivå som bland annat ansvarar för vård", en: "region", ar: "منطقة", so: "gobol", fa: "منطقه", ti: "ረጂዮን", zh: "地区" } },
      { sv: "kommun", translations: { sv: "lokal nivå som ansvarar för många vardagstjänster", en: "municipality", ar: "بلدية", so: "degmo", fa: "شهرداری", ti: "ኮሙን", zh: "市/地方政府" } }
    ],
    questionIds: [
      "authorities-001",
      "authorities-002",
      "authorities-003",
      "authorities-004",
      "authorities-005",
      "authorities-006",
      "authorities-007",
      "authorities-008",
      "authorities-009",
      "authorities-010",
      "authorities-011",
      "authorities-012"
    ]
  }
];

export const QUESTIONS: Question[] = DRAFT_QUESTIONS.map((question) => {
  const chapter = OFFICIAL_CHAPTERS.find((item) => item.id === question.chapterId);

  return {
    id: question.id,
    topicId: chapter?.topicId || question.topicId,
    chapterId: question.chapterId,
    questionSv: question.questionSv,
    options: question.options,
    correctIndex: question.correctIndex,
    translations: {
      en: {
        question: question.questionEn,
        options: question.optionsEn
      }
    },
    explanations: {
      en: question.explanationEn
    }
  };
});
