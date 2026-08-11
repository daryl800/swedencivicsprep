import type { Lesson, Question, Topic } from "./types";

export const OFFICIAL_STUDY_GUIDE_URL =
  "https://www.uhr.se/medborgarskapsprovet/utbildningsmaterial/";

export const MIGRATIONSVERKET_CITIZENSHIP_URL =
  "https://www.migrationsverket.se/en/you-want-to-apply/swedish-citizenship/citizenship-for-adults/citizenship-for-adults.html";

export const TOPICS: Topic[] = [
  {
    id: "democracy",
    nameSv: "Demokrati och val",
    nameEn: "Democracy & Elections",
    descriptionEn: "Practice democracy, elections, political parties, and how Sweden is governed."
  },
  {
    id: "rights",
    nameSv: "Rättigheter och skyldigheter",
    nameEn: "Rights & Duties",
    descriptionEn: "Practice constitutional rights, rule of law, human rights, equality, media, and source criticism."
  },
  {
    id: "everyday",
    nameSv: "Vardagsliv i Sverige",
    nameEn: "Everyday Life in Sweden",
    descriptionEn: "Practice facts about Sweden, work, private economy, welfare, history, religion, and traditions."
  },
  {
    id: "authorities",
    nameSv: "Myndigheter och tjänster",
    nameEn: "Authorities & Services",
    descriptionEn: "Practice who does what: parliament, government, municipalities, regions, courts, agencies, and public services."
  }
];

export const LESSONS: Lesson[] = [
  {
    id: "lesson-democracy-basics",
    topicId: "democracy",
    chapterNumbers: [2, 4],
    titleSv: "Demokrati, val och påverkan",
    titles: {
      en: "Democracy, elections, and influence",
      ar: "الديمقراطية والانتخابات والتأثير",
      so: "Dimuqraadiyad, doorashooyin, iyo saamayn",
      fa: "دموکراسی، انتخابات و تأثیرگذاری",
      ti: "ዲሞክራሲ፣ ምርጫታትን ጽልዋን",
      zh: "民主、选举和影响社会"
    },
    studyText: {
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
      { sv: "demokrati", translations: { en: "democracy", ar: "ديمقراطية", so: "dimuqraadiyad", fa: "دموکراسی", ti: "ዲሞክራሲ", zh: "民主" } },
      { sv: "riksdag", translations: { en: "parliament", ar: "البرلمان", so: "baarlamaanka Iswiidhan", fa: "پارلمان سوئد", ti: "ፓርላማ ሽወደን", zh: "国会" } },
      { sv: "val", translations: { en: "election", ar: "انتخابات", so: "doorasho", fa: "انتخابات", ti: "ምርጫ", zh: "选举" } },
      { sv: "påverka", translations: { en: "influence", ar: "يؤثر", so: "saamayn ku yeelasho", fa: "تأثیر گذاشتن", ti: "ጽልዋ ምግባር", zh: "影响" } }
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
      en: "Rights, law, and media",
      ar: "الحقوق والقانون والإعلام",
      so: "Xuquuq, sharci, iyo warbaahin",
      fa: "حقوق، قانون و رسانه",
      ti: "መሰላት፣ ሕጊን ሚድያን",
      zh: "权利、法律和媒体"
    },
    studyText: {
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
      { sv: "rättssäkerhet", translations: { en: "rule of law/legal security", ar: "الأمن القانوني/سيادة القانون", so: "ku dhaqanka sharciga / amni sharci", fa: "حاکمیت قانون / امنیت حقوقی", ti: "ልዕልና ሕጊ / ሕጋዊ ውሕስነት", zh: "法治/法律保障" } },
      { sv: "grundlag", translations: { en: "constitutional law", ar: "قانون دستوري", so: "sharciga dastuuriga ah", fa: "قانون اساسی", ti: "መሰረታዊ ሕጊ", zh: "基本法" } },
      { sv: "yttrandefrihet", translations: { en: "freedom of expression", ar: "حرية التعبير", so: "xorriyadda hadalka", fa: "آزادی بیان", ti: "ናጽነት ርእይቶ", zh: "言论自由" } },
      { sv: "källkritik", translations: { en: "source criticism", ar: "النقد المصدري", so: "hubinta ilaha macluumaadka", fa: "نقد و بررسی منبع", ti: "ምርመራ ምንጪ", zh: "来源批判" } }
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
      en: "Daily life, welfare, and Sweden as a country",
      ar: "الحياة اليومية والرفاه والسويد كبلد",
      so: "Nolol maalmeed, daryeel bulsho, iyo Iswiidhan dal ahaan",
      fa: "زندگی روزمره، رفاه و سوئد به عنوان یک کشور",
      ti: "ዕለታዊ ህይወት፣ ድሕነትን ሽወደን ከም ሃገርን",
      zh: "日常生活、福利和瑞典这个国家"
    },
    studyText: {
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
      { sv: "välfärd", translations: { en: "welfare", ar: "الرفاه", so: "daryeel bulsho", fa: "رفاه", ti: "ድሕነት", zh: "福利" } },
      { sv: "skatt", translations: { en: "tax", ar: "ضريبة", so: "canshuur", fa: "مالیات", ti: "ግብሪ", zh: "税" } },
      { sv: "arbetsmarknad", translations: { en: "labour market", ar: "سوق العمل", so: "suuqa shaqada", fa: "بازار کار", ti: "ዕዳጋ ስራሕ", zh: "劳动力市场" } },
      { sv: "sekulär", translations: { en: "secular", ar: "علماني", so: "aan diin dowladeed ku dhisnayn", fa: "سکولار", ti: "ሴኩላር", zh: "世俗的" } }
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
      en: "How Sweden is governed and cooperates with the world",
      ar: "كيف تُحكم السويد وتتعاون مع العالم",
      so: "Sida Iswiidhan loo maamulo iyo sida ay ula shaqeyso dunida",
      fa: "سوئد چگونه اداره می‌شود و با جهان همکاری می‌کند",
      ti: "ሽወደን ከመይ ከምትመሓደርን ምስ ዓለም ከመይ ከምትተሓባበርን",
      zh: "瑞典如何治理并与世界合作"
    },
    studyText: {
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
      { sv: "statschef", translations: { en: "head of state", ar: "رئيس الدولة", so: "madaxa qaranka", fa: "رئیس کشور", ti: "ርእሰ ሃገር", zh: "国家元首" } },
      { sv: "regering", translations: { en: "government", ar: "الحكومة", so: "dowlad", fa: "دولت", ti: "መንግስቲ", zh: "政府" } },
      { sv: "region", translations: { en: "region", ar: "منطقة", so: "gobol", fa: "منطقه", ti: "ረጂዮን", zh: "地区" } },
      { sv: "kommun", translations: { en: "municipality", ar: "بلدية", so: "degmo", fa: "شهرداری", ti: "ኮሙን", zh: "市/地方政府" } }
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

export const QUESTIONS: Question[] = [
  {
    id: "democracy-001",
    topicId: "democracy",
    questionSv: "Vad betyder ordet demokrati?",
    options: ["Folkstyre", "Kungastyre", "Företagsstyre", "Domstolsstyre"],
    correctIndex: 0,
    explanations: {
      en: "In Sverige i fokus, democracy is explained as a system where power comes from the people. People influence society through free and fair elections and public debate.",
      ar: "في Sverige i fokus تُشرح الديمقراطية كنظام تأتي فيه السلطة من الشعب. يؤثر الناس في المجتمع من خلال انتخابات حرة وعادلة والنقاش العام.",
      zh: "在《Sverige i fokus》中，民主被解释为权力来自人民的制度。人们通过自由公正的选举和公共讨论影响社会。"
    }
  },
  {
    id: "democracy-002",
    topicId: "democracy",
    questionSv: "Vad är ett fritt val?",
    options: ["Ett val där alla måste rösta på samma parti", "Ett val där rösten är hemlig och det finns flera alternativ", "Ett val där bara regeringen får rösta", "Ett val där arbetsgivaren bestämmer"],
    correctIndex: 1,
    explanations: {
      en: "Free elections mean voters can choose between different political options without threats or force. The vote is secret.",
      ar: "الانتخابات الحرة تعني أن الناخب يستطيع الاختيار بين بدائل سياسية مختلفة دون تهديد أو إجبار. التصويت يكون سرياً.",
      zh: "自由选举表示选民可以在不同政治选择之间投票，不受威胁或强迫。投票是秘密的。"
    }
  },
  {
    id: "democracy-003",
    topicId: "democracy",
    questionSv: "Vilket av detta är ett sätt att påverka samhället?",
    options: ["Att rösta i politiska val", "Att sprida hot mot politiker", "Att gömma viktig information", "Att låta andra rösta åt dig"],
    correctIndex: 0,
    explanations: {
      en: "The official material gives examples such as voting, joining a party or association, contacting politicians, demonstrating, and writing debate articles.",
      ar: "تذكر المادة الرسمية أمثلة مثل التصويت، والانضمام إلى حزب أو جمعية، والتواصل مع السياسيين، والتظاهر، وكتابة مقالات رأي.",
      zh: "官方材料举例说，投票、加入政党或协会、联系政治人物、示威和写评论文章，都是影响社会的方式。"
    }
  },
  {
    id: "democracy-004",
    topicId: "democracy",
    questionSv: "Hur ofta hålls ordinarie val till riksdag, regioner och kommuner?",
    options: ["Varje år", "Vartannat år", "Vart fjärde år", "Vart tionde år"],
    correctIndex: 2,
    explanations: {
      en: "Sweden normally has general elections every four years. Voters choose representatives for the Riksdag, regions, and municipalities.",
      ar: "تُجرى الانتخابات العامة في السويد عادة كل أربع سنوات. يختار الناخبون ممثلين للبرلمان والمناطق والبلديات.",
      zh: "瑞典通常每四年举行一次大选。选民选择国会、地区和市政府的代表。"
    }
  },
  {
    id: "democracy-005",
    topicId: "democracy",
    questionSv: "Vad är riksdagens viktigaste uppgifter?",
    options: ["Att stifta lagar och besluta om statens budget", "Att döma personer i domstol", "Att ge sjukvård", "Att bestämma hyran i alla bostäder"],
    correctIndex: 0,
    explanations: {
      en: "The Riksdag is Sweden's parliament. It makes laws, decides the state budget, and checks the government.",
      ar: "الريكسداغ هو البرلمان السويدي. يسن القوانين، ويقرر ميزانية الدولة، ويراقب الحكومة.",
      zh: "Riksdag 是瑞典国会。它制定法律、决定国家预算，并监督政府。"
    }
  },
  {
    id: "democracy-006",
    topicId: "democracy",
    questionSv: "Vad kan vara ett hot mot demokratin?",
    options: ["Många människor röstar", "Falsk information och hot i samhällsdebatten", "Flera partier deltar i valet", "Människor diskuterar politik"],
    correctIndex: 1,
    explanations: {
      en: "Sverige i fokus names false information, hate, threats, and low participation as problems that can weaken democracy.",
      ar: "تذكر Sverige i fokus أن المعلومات الكاذبة والكراهية والتهديدات وضعف المشاركة يمكن أن تضعف الديمقراطية.",
      zh: "《Sverige i fokus》指出，虚假信息、仇恨、威胁和低参与度会削弱民主。"
    }
  },
  {
    id: "rights-001",
    topicId: "rights",
    questionSv: "Vad betyder rättssäkerhet?",
    options: ["Att ingen får dömas utan en rättvis rättegång", "Att polisen får döma utan domstol", "Att bara rika personer följer lagen", "Att lagar bara gäller medborgare"],
    correctIndex: 0,
    explanations: {
      en: "Rule of law means laws apply to everyone and that no one should be convicted without a fair trial.",
      ar: "تعني سيادة القانون أن القوانين تطبق على الجميع، وأنه لا ينبغي إدانة أي شخص دون محاكمة عادلة.",
      zh: "法治意味着法律适用于每个人，任何人都不应在没有公正审判的情况下被定罪。"
    }
  },
  {
    id: "rights-002",
    topicId: "rights",
    questionSv: "Vilken av dessa är en svensk grundlag?",
    options: ["Tryckfrihetsförordningen", "Skollagen", "Hyreslagen", "Trafikförordningen"],
    correctIndex: 0,
    explanations: {
      en: "The Freedom of the Press Act is one of Sweden's constitutional laws. The constitution gives strong protection to democracy and freedoms.",
      ar: "قانون حرية الصحافة هو أحد القوانين الدستورية في السويد. تحمي القوانين الدستورية الديمقراطية والحريات بقوة.",
      zh: "《新闻出版自由法》是瑞典的基本法之一。基本法强力保护民主和自由。"
    }
  },
  {
    id: "rights-003",
    topicId: "rights",
    questionSv: "Vad betyder yttrandefrihet?",
    options: ["Att man får säga och skriva sina åsikter", "Att man får hota andra", "Att staten alltid måste hålla med", "Att bara journalister får prata politik"],
    correctIndex: 0,
    explanations: {
      en: "Freedom of expression protects the right to say and write opinions. It does not mean you may threaten people or spread hate.",
      ar: "حرية التعبير تحمي الحق في قول وكتابة الآراء. لكنها لا تعني السماح بتهديد الناس أو نشر الكراهية.",
      zh: "言论自由保护说出和写下观点的权利，但不表示可以威胁他人或传播仇恨。"
    }
  },
  {
    id: "rights-004",
    topicId: "rights",
    questionSv: "Varför är fria medier viktiga i en demokrati?",
    options: ["De kan granska makten och sprida information", "De ska bestämma alla lagar", "De ska ersätta domstolar", "De ska tala om för alla hur de måste rösta"],
    correctIndex: 0,
    explanations: {
      en: "The official material explains that free media can inform people, create debate, and scrutinize those in power.",
      ar: "توضح المادة الرسمية أن الإعلام الحر يمكنه إبلاغ الناس، وخلق نقاش، ومراقبة أصحاب السلطة.",
      zh: "官方材料说明，自由媒体可以提供信息、促进讨论，并监督掌权者。"
    }
  },
  {
    id: "rights-005",
    topicId: "rights",
    questionSv: "Vad är källkritik?",
    options: ["Att fundera på om information är sann och var den kommer ifrån", "Att alltid tro på allt i sociala medier", "Att bara läsa rubriker", "Att aldrig fråga efter bevis"],
    correctIndex: 0,
    explanations: {
      en: "Source criticism means checking where information comes from, whether it is reliable, and why it was published.",
      ar: "النقد المصدري يعني التحقق من مصدر المعلومات، وهل هي موثوقة، ولماذا نُشرت.",
      zh: "来源批判指检查信息来自哪里、是否可靠，以及发布的目的是什么。"
    }
  },
  {
    id: "rights-006",
    topicId: "rights",
    questionSv: "Vad säger principen om mänskliga rättigheter?",
    options: ["Alla människor har lika värde och rättigheter", "Rättigheter gäller bara vuxna", "Rättigheter gäller bara personer med arbete", "Varje kommun väljer om människor har rättigheter"],
    correctIndex: 0,
    explanations: {
      en: "Sverige i fokus presents human rights as applying to everyone. Equality, children's rights, minority rights, and anti-discrimination are part of this area.",
      ar: "تقدم Sverige i fokus حقوق الإنسان على أنها تنطبق على الجميع. وتشمل المساواة وحقوق الأطفال وحقوق الأقليات ومكافحة التمييز.",
      zh: "《Sverige i fokus》说明人权适用于每个人。平等、儿童权利、少数群体权利和反歧视都属于这一领域。"
    }
  },
  {
    id: "everyday-001",
    topicId: "everyday",
    questionSv: "Vilka är Sveriges tre största städer?",
    options: ["Stockholm, Göteborg och Malmö", "Uppsala, Lund och Kiruna", "Malmö, Visby och Örebro", "Göteborg, Växjö och Umeå"],
    correctIndex: 0,
    explanations: {
      en: "The study material describes Sweden's population and says the three largest cities are Stockholm, Gothenburg, and Malmö.",
      ar: "تصف المادة الدراسية سكان السويد وتذكر أن أكبر ثلاث مدن هي ستوكهولم ويوتبوري ومالمو.",
      zh: "学习材料介绍瑞典人口，并说明三大城市是斯德哥尔摩、哥德堡和马尔默。"
    }
  },
  {
    id: "everyday-002",
    topicId: "everyday",
    questionSv: "Vilken naturresurs har länge varit viktig för Sveriges ekonomi?",
    options: ["Järnmalm och skog", "Kaffeodlingar", "Olja i öknen", "Bomullsfält"],
    correctIndex: 0,
    explanations: {
      en: "Sverige i fokus highlights iron ore, minerals, forests, agricultural land, and water as important natural resources.",
      ar: "تؤكد Sverige i fokus على خام الحديد والمعادن والغابات والأراضي الزراعية والمياه كموارد طبيعية مهمة.",
      zh: "《Sverige i fokus》强调铁矿石、矿产、森林、农地和水是重要自然资源。"
    }
  },
  {
    id: "everyday-003",
    topicId: "everyday",
    questionSv: "Varför betalar människor skatt i Sverige?",
    options: ["För att finansiera välfärd som vård, skola och omsorg", "För att alla ska få rösta två gånger", "För att slippa följa lagen", "För att staten ska äga alla bostäder"],
    correctIndex: 0,
    explanations: {
      en: "The welfare society is financed largely through taxes. Taxes pay for services such as healthcare, education, and care.",
      ar: "يموَّل مجتمع الرفاه إلى حد كبير من الضرائب. تدفع الضرائب تكاليف خدمات مثل الرعاية الصحية والتعليم والرعاية الاجتماعية.",
      zh: "福利社会很大程度上由税收资助。税收用于医疗、教育和照护等服务。"
    }
  },
  {
    id: "everyday-004",
    topicId: "everyday",
    questionSv: "Vilka är arbetsmarknadens parter?",
    options: ["Arbetsgivare och fackföreningar", "Domstolar och bibliotek", "Regioner och sjukhus", "Banker och universitet"],
    correctIndex: 0,
    explanations: {
      en: "The labour-market parties are employers and trade unions. They negotiate many workplace conditions through collective agreements.",
      ar: "أطراف سوق العمل هم أصحاب العمل والنقابات. يتفاوضون حول كثير من شروط العمل من خلال الاتفاقيات الجماعية.",
      zh: "劳动力市场的双方是雇主和工会。他们通过集体协议协商许多工作条件。"
    }
  },
  {
    id: "everyday-005",
    topicId: "everyday",
    questionSv: "Vad betyder att Sverige är en sekulär stat?",
    options: ["Staten är inte styrd av en religion", "Alla måste ha samma religion", "Religion är förbjuden", "Bara religiösa partier får styra"],
    correctIndex: 0,
    explanations: {
      en: "A secular state is not governed by a religion. At the same time, Sweden is a country where people may have different religions or no religion.",
      ar: "الدولة العلمانية لا تُحكم بدين. وفي الوقت نفسه يمكن للناس في السويد أن تكون لهم أديان مختلفة أو لا دين لهم.",
      zh: "世俗国家不由宗教统治。同时，在瑞典人们可以有不同宗教，也可以没有宗教。"
    }
  },
  {
    id: "everyday-006",
    topicId: "everyday",
    questionSv: "Vad hände i Sverige under 1800- och 1900-talet enligt materialet?",
    options: ["Sverige förändrades från jordbrukssamhälle till industri- och välfärdssamhälle", "Sverige blev en ökenstat", "Sverige slutade ha kommuner", "Sverige avskaffade alla skolor"],
    correctIndex: 0,
    explanations: {
      en: "The modern-history chapter describes Sweden's development from an agricultural society to an industrial society and later a welfare society.",
      ar: "يصف فصل التاريخ الحديث تطور السويد من مجتمع زراعي إلى مجتمع صناعي ثم إلى مجتمع رفاه.",
      zh: "现代历史章节介绍瑞典如何从农业社会发展为工业社会，后来发展为福利社会。"
    }
  },
  {
    id: "authorities-001",
    topicId: "authorities",
    questionSv: "Vem är Sveriges statschef?",
    options: ["Kungen", "Statsministern", "Talmannen", "Justitieombudsmannen"],
    correctIndex: 0,
    explanations: {
      en: "Sweden is a monarchy, and the king is the head of state. Political power is exercised through democratic institutions.",
      ar: "السويد ملكية، والملك هو رئيس الدولة. أما السلطة السياسية فتُمارس من خلال المؤسسات الديمقراطية.",
      zh: "瑞典是君主制国家，国王是国家元首。政治权力通过民主机构行使。"
    }
  },
  {
    id: "authorities-002",
    topicId: "authorities",
    questionSv: "Vad gör regeringen?",
    options: ["Styr landet och genomför riksdagens beslut", "Dömer i brottmål", "Väljer alla riksdagsledamöter", "Äger alla medier"],
    correctIndex: 0,
    explanations: {
      en: "The government governs the country and carries out decisions made by the Riksdag. It is led by the prime minister.",
      ar: "تدير الحكومة البلاد وتنفذ قرارات البرلمان. ويقودها رئيس الوزراء.",
      zh: "政府管理国家并执行国会的决定。政府由首相领导。"
    }
  },
  {
    id: "authorities-003",
    topicId: "authorities",
    questionSv: "Vad ansvarar regionerna främst för?",
    options: ["Hälso- och sjukvård", "Riksdagens lagar", "Passkontroll vid gränsen", "Alla domstolar"],
    correctIndex: 0,
    explanations: {
      en: "Regions have major responsibility for healthcare. Municipalities, regions, and the state have different responsibilities in the welfare system.",
      ar: "تتحمل المناطق مسؤولية كبيرة عن الرعاية الصحية. وللبلديات والمناطق والدولة مسؤوليات مختلفة في نظام الرفاه.",
      zh: "地区主要负责医疗保健。市、地区和国家在福利体系中有不同责任。"
    }
  },
  {
    id: "authorities-004",
    topicId: "authorities",
    questionSv: "Vad ansvarar kommuner ofta för?",
    options: ["Skola, äldreomsorg och lokala frågor", "Att stifta grundlagar", "Att leda EU", "Att döma i domstol"],
    correctIndex: 0,
    explanations: {
      en: "Municipalities handle many local services, including schools, care for older people, and local planning.",
      ar: "تتعامل البلديات مع كثير من الخدمات المحلية، مثل المدارس ورعاية كبار السن والتخطيط المحلي.",
      zh: "市政府处理许多地方服务，包括学校、老人照护和地方规划。"
    }
  },
  {
    id: "authorities-005",
    topicId: "authorities",
    questionSv: "Vad gör domstolarna?",
    options: ["Prövar mål och dömer enligt lag", "Skriver partiprogram", "Bestämmer kommunalskatten", "Driver vårdcentraler"],
    correctIndex: 0,
    explanations: {
      en: "Courts are part of the legal system. They try cases and decide according to law.",
      ar: "المحاكم جزء من النظام القانوني. تنظر في القضايا وتحكم وفقاً للقانون.",
      zh: "法院是法律体系的一部分。法院审理案件并依法作出判决。"
    }
  },
  {
    id: "authorities-006",
    topicId: "authorities",
    questionSv: "Vad betyder att Sverige samarbetar internationellt?",
    options: ["Sverige deltar i till exempel nordiskt, europeiskt och globalt samarbete", "Sverige har inga kontakter med andra länder", "Sverige låter andra länder bestämma alla lagar", "Sverige har avskaffat sitt försvar"],
    correctIndex: 0,
    explanations: {
      en: "Sverige i fokus covers Sweden's cooperation with Nordic countries, the EU, the UN, and other international organizations.",
      ar: "تتناول Sverige i fokus تعاون السويد مع دول الشمال والاتحاد الأوروبي والأمم المتحدة ومنظمات دولية أخرى.",
      zh: "《Sverige i fokus》介绍瑞典与北欧国家、欧盟、联合国和其他国际组织的合作。"
    }
  },
  {
    id: "democracy-007",
    topicId: "democracy",
    questionSv: "Vem kan rösta i val till riksdagen?",
    options: ["Svenska medborgare som har fyllt 18 år", "Alla som turistar i Sverige", "Barn som går i skolan", "Alla företag i Sverige"],
    correctIndex: 0,
    translations: {
      en: { question: "Who can vote in elections to the Riksdag?", options: ["Swedish citizens who have turned 18", "Everyone visiting Sweden as a tourist", "Children who go to school", "All companies in Sweden"] },
      ar: { question: "من يمكنه التصويت في انتخابات البرلمان السويدي؟", options: ["المواطنون السويديون الذين بلغوا 18 سنة", "كل من يزور السويد كسائح", "الأطفال الذين يذهبون إلى المدرسة", "كل الشركات في السويد"] },
      zh: { question: "谁可以在瑞典国会选举中投票？", options: ["年满18岁的瑞典公民", "所有来瑞典旅游的人", "上学的儿童", "瑞典所有公司"] }
    },
    explanations: {
      en: "For Riksdag elections, voters must be Swedish citizens and at least 18 years old. Other elections have different rules.",
      ar: "في انتخابات البرلمان يجب أن يكون الناخب مواطناً سويدياً وأن يكون عمره 18 سنة على الأقل. للانتخابات الأخرى قواعد مختلفة.",
      zh: "国会选举要求选民是瑞典公民并年满18岁。其他选举有不同规则。"
    }
  },
  {
    id: "democracy-008",
    topicId: "democracy",
    questionSv: "Vad är en folkomröstning?",
    options: ["När folket får säga ja eller nej i en viktig fråga", "När en domstol väljer regering", "När ett företag skriver lagar", "När skolan bestämmer skatt"],
    correctIndex: 0,
    translations: {
      en: { question: "What is a referendum?", options: ["When the people can say yes or no on an important issue", "When a court chooses the government", "When a company writes laws", "When the school decides tax"] },
      ar: { question: "ما هو الاستفتاء؟", options: ["عندما يستطيع الشعب قول نعم أو لا في قضية مهمة", "عندما تختار المحكمة الحكومة", "عندما تكتب شركة القوانين", "عندما تقرر المدرسة الضريبة"] },
      zh: { question: "什么是公投？", options: ["人民可以对重要问题说是或否", "法院选择政府", "公司制定法律", "学校决定税收"] }
    },
    explanations: {
      en: "A referendum lets voters give their view on a specific question. It is one way people can participate in democracy.",
      ar: "يسمح الاستفتاء للناخبين بإبداء رأيهم في سؤال محدد. وهو طريقة من طرق المشاركة الديمقراطية.",
      zh: "公投让选民对某个具体问题表达意见。这是人们参与民主的一种方式。"
    }
  },
  {
    id: "democracy-009",
    topicId: "democracy",
    questionSv: "Vad gör politiska partier?",
    options: ["De samlar idéer och försöker få stöd i val", "De dömer brottmål", "De sköter alla sjukhus", "De bestämmer vem som får vara svensk"],
    correctIndex: 0,
    translations: {
      en: { question: "What do political parties do?", options: ["They gather ideas and try to get support in elections", "They judge criminal cases", "They run all hospitals", "They decide who may be Swedish"] },
      ar: { question: "ماذا تفعل الأحزاب السياسية؟", options: ["تجمع الأفكار وتحاول الحصول على دعم في الانتخابات", "تحكم في القضايا الجنائية", "تدير كل المستشفيات", "تقرر من يحق له أن يكون سويدياً"] },
      zh: { question: "政党做什么？", options: ["汇集想法并争取选举支持", "审判刑事案件", "管理所有医院", "决定谁可以成为瑞典人"] }
    },
    explanations: {
      en: "Parties present political ideas and candidates. Voters choose between parties in elections.",
      ar: "تقدم الأحزاب أفكاراً سياسية ومرشحين. يختار الناخبون بين الأحزاب في الانتخابات.",
      zh: "政党提出政治想法和候选人。选民在选举中在政党之间作出选择。"
    }
  },
  {
    id: "democracy-010",
    topicId: "democracy",
    questionSv: "Vad betyder offentlighetsprincipen?",
    options: ["Att många handlingar hos myndigheter kan läsas av allmänheten", "Att alla måste berätta sin lön", "Att privata brev alltid är offentliga", "Att medier skriver alla lagar"],
    correctIndex: 0,
    translations: {
      en: { question: "What does the principle of public access mean?", options: ["Many documents at public authorities can be read by the public", "Everyone must tell their salary", "Private letters are always public", "Media write all laws"] },
      ar: { question: "ماذا يعني مبدأ العلنية؟", options: ["يمكن للجمهور قراءة كثير من وثائق الجهات العامة", "يجب على الجميع إعلان راتبهم", "الرسائل الخاصة تكون دائماً عامة", "الإعلام يكتب كل القوانين"] },
      zh: { question: "公开原则是什么意思？", options: ["公众可以查阅公共机构的许多文件", "每个人都必须公开工资", "私人信件总是公开的", "媒体制定所有法律"] }
    },
    explanations: {
      en: "The principle of public access supports transparency. It helps citizens and media examine how authorities work.",
      ar: "يدعم مبدأ العلنية الشفافية. ويساعد المواطنين ووسائل الإعلام على فحص عمل الجهات العامة.",
      zh: "公开原则支持透明度，帮助公民和媒体了解公共机构如何工作。"
    }
  },
  {
    id: "democracy-011",
    topicId: "democracy",
    questionSv: "Vad är en fredlig demonstration?",
    options: ["När människor samlas för att visa en åsikt utan våld", "När polisen väljer parti", "När man hotar andra på nätet", "När bara en person får prata"],
    correctIndex: 0,
    translations: {
      en: { question: "What is a peaceful demonstration?", options: ["When people gather to show an opinion without violence", "When the police choose a party", "When someone threatens others online", "When only one person may speak"] },
      ar: { question: "ما هي المظاهرة السلمية؟", options: ["عندما يجتمع الناس لإظهار رأي دون عنف", "عندما تختار الشرطة حزباً", "عندما يهدد شخص الآخرين على الإنترنت", "عندما يسمح لشخص واحد فقط بالكلام"] },
      zh: { question: "什么是和平示威？", options: ["人们非暴力地聚集表达观点", "警察选择政党", "有人在网上威胁他人", "只有一个人可以说话"] }
    },
    explanations: {
      en: "Peaceful demonstrations are a democratic way to express opinions. Threats and violence are not part of democratic participation.",
      ar: "المظاهرات السلمية طريقة ديمقراطية للتعبير عن الآراء. التهديد والعنف ليسا جزءاً من المشاركة الديمقراطية.",
      zh: "和平示威是表达观点的民主方式。威胁和暴力不属于民主参与。"
    }
  },
  {
    id: "democracy-012",
    topicId: "democracy",
    questionSv: "Varför är det viktigt att många röstar?",
    options: ["Då speglar besluten bättre folkets vilja", "Då behöver Sverige inga lagar", "Då försvinner alla partier", "Då bestämmer kungen allt"],
    correctIndex: 0,
    translations: {
      en: { question: "Why is it important that many people vote?", options: ["Then decisions better reflect the people's will", "Then Sweden does not need laws", "Then all parties disappear", "Then the king decides everything"] },
      ar: { question: "لماذا من المهم أن يصوت كثير من الناس؟", options: ["حينها تعكس القرارات إرادة الشعب بشكل أفضل", "حينها لا تحتاج السويد إلى قوانين", "حينها تختفي كل الأحزاب", "حينها يقرر الملك كل شيء"] },
      zh: { question: "为什么很多人投票很重要？", options: ["这样决定更能反映人民意愿", "这样瑞典就不需要法律", "这样所有政党都会消失", "这样国王决定一切"] }
    },
    explanations: {
      en: "High participation makes democracy stronger because more voices are included in the result.",
      ar: "المشاركة العالية تجعل الديمقراطية أقوى لأن أصواتاً أكثر تدخل في النتيجة.",
      zh: "高参与度会让民主更强，因为结果包含更多人的声音。"
    }
  },
  {
    id: "rights-007",
    topicId: "rights",
    questionSv: "Vad betyder religionsfrihet?",
    options: ["Att man får ha en religion, byta religion eller inte ha någon religion", "Att alla måste ha samma religion", "Att religion alltid bestämmer lagen", "Att bara vuxna får tro"],
    correctIndex: 0,
    translations: {
      en: { question: "What does freedom of religion mean?", options: ["You may have a religion, change religion, or have no religion", "Everyone must have the same religion", "Religion always decides the law", "Only adults may believe"] },
      ar: { question: "ماذا تعني حرية الدين؟", options: ["يمكنك أن يكون لديك دين أو تغير دينك أو لا يكون لديك دين", "يجب أن يكون للجميع نفس الدين", "الدين يقرر القانون دائماً", "البالغون فقط يمكنهم الإيمان"] },
      zh: { question: "宗教自由是什么意思？", options: ["你可以有宗教、改变宗教或没有宗教", "每个人必须有同一种宗教", "宗教总是决定法律", "只有成年人可以信仰"] }
    },
    explanations: {
      en: "Freedom of religion is protected in Sweden. It includes the right to believe, change belief, or not believe.",
      ar: "حرية الدين محمية في السويد. وتشمل الحق في الإيمان أو تغيير المعتقد أو عدم الإيمان.",
      zh: "宗教自由在瑞典受到保护，包括信仰、改变信仰或不信仰的权利。"
    }
  },
  {
    id: "rights-008",
    topicId: "rights",
    questionSv: "Vad betyder diskriminering?",
    options: ["Att någon behandlas sämre på grund av till exempel kön, religion eller etnicitet", "Att alla får samma chans", "Att man röstar i ett val", "Att man betalar skatt"],
    correctIndex: 0,
    translations: {
      en: { question: "What does discrimination mean?", options: ["Someone is treated worse because of things like gender, religion, or ethnicity", "Everyone gets the same chance", "Someone votes in an election", "Someone pays tax"] },
      ar: { question: "ماذا يعني التمييز؟", options: ["أن يعامل شخص بشكل أسوأ بسبب الجنس أو الدين أو الأصل مثلاً", "أن يحصل الجميع على نفس الفرصة", "أن يصوت شخص في انتخابات", "أن يدفع شخص ضريبة"] },
      zh: { question: "歧视是什么意思？", options: ["某人因性别、宗教或族裔等原因受到较差对待", "每个人得到同样机会", "某人在选举中投票", "某人缴税"] }
    },
    explanations: {
      en: "Swedish law protects people against discrimination. Equal value is a central idea in human rights.",
      ar: "يحمي القانون السويدي الناس من التمييز. القيمة المتساوية فكرة أساسية في حقوق الإنسان.",
      zh: "瑞典法律保护人们免受歧视。平等价值是人权的核心思想。"
    }
  },
  {
    id: "rights-009",
    topicId: "rights",
    questionSv: "Vad är barnkonventionen?",
    options: ["Regler om barns rattigheter", "Regler om banklan", "Regler om bilparkering", "Regler om politiska partier"],
    correctIndex: 0,
    translations: {
      en: { question: "What is the Convention on the Rights of the Child?", options: ["Rules about children's rights", "Rules about bank loans", "Rules about car parking", "Rules about political parties"] },
      ar: { question: "ما هي اتفاقية حقوق الطفل؟", options: ["قواعد عن حقوق الأطفال", "قواعد عن القروض البنكية", "قواعد عن مواقف السيارات", "قواعد عن الأحزاب السياسية"] },
      zh: { question: "《儿童权利公约》是什么？", options: ["关于儿童权利的规则", "关于银行贷款的规则", "关于停车的规则", "关于政党的规则"] }
    },
    explanations: {
      en: "Children have their own rights. Sweden has made the Convention on the Rights of the Child part of Swedish law.",
      ar: "للأطفال حقوق خاصة بهم. جعلت السويد اتفاقية حقوق الطفل جزءاً من القانون السويدي.",
      zh: "儿童有自己的权利。瑞典已将《儿童权利公约》纳入瑞典法律。"
    }
  },
  {
    id: "rights-010",
    topicId: "rights",
    questionSv: "Vad betyder skyldighet?",
    options: ["Något man ansvarar för att göra eller följa", "En present från staten", "En typ av semester", "En hemlig röst"],
    correctIndex: 0,
    translations: {
      en: { question: "What does duty/responsibility mean?", options: ["Something you are responsible for doing or following", "A gift from the state", "A type of holiday", "A secret vote"] },
      ar: { question: "ماذا تعني الواجبات أو المسؤوليات؟", options: ["شيء تكون مسؤولاً عن فعله أو اتباعه", "هدية من الدولة", "نوع من العطلة", "تصويت سري"] },
      zh: { question: "义务/责任是什么意思？", options: ["你有责任去做或遵守的事情", "国家给的礼物", "一种假期", "秘密投票"] }
    },
    explanations: {
      en: "Rights and duties go together. For example, people have rights, but they must also follow laws and respect others' rights.",
      ar: "الحقوق والواجبات مرتبطتان. للناس حقوق، لكن عليهم أيضاً اتباع القوانين واحترام حقوق الآخرين.",
      zh: "权利和义务相互关联。例如，人们有权利，也必须遵守法律并尊重他人的权利。"
    }
  },
  {
    id: "rights-011",
    topicId: "rights",
    questionSv: "Vad betyder likhet infor lagen?",
    options: ["Lagen ska gälla lika för alla", "Bara vuxna behöver följa lagen", "Olika städer har alltid olika grundlagar", "Domstolen får strunta i lagen"],
    correctIndex: 0,
    translations: {
      en: { question: "What does equality before the law mean?", options: ["The law should apply equally to everyone", "Only adults need to follow the law", "Different cities always have different constitutions", "The court may ignore the law"] },
      ar: { question: "ماذا تعني المساواة أمام القانون؟", options: ["يجب أن ينطبق القانون بالتساوي على الجميع", "البالغون فقط يحتاجون إلى اتباع القانون", "كل مدينة لها دائماً دستور مختلف", "يمكن للمحكمة تجاهل القانون"] },
      zh: { question: "法律面前人人平等是什么意思？", options: ["法律应平等适用于每个人", "只有成年人需要遵守法律", "不同城市总是有不同基本法", "法院可以无视法律"] }
    },
    explanations: {
      en: "Equality before the law is part of rule of law. Public power must be used according to law, not personal preference.",
      ar: "المساواة أمام القانون جزء من سيادة القانون. يجب استخدام السلطة العامة وفق القانون، لا حسب الرأي الشخصي.",
      zh: "法律面前人人平等是法治的一部分。公共权力必须依法使用，而不是按个人喜好使用。"
    }
  },
  {
    id: "rights-012",
    topicId: "rights",
    questionSv: "Vad ska du göra om du delar information på nätet?",
    options: ["Tänka på källan och om informationen kan stämma", "Dela alltid snabbt utan att läsa", "Ändra fakta så de passar din åsikt", "Skriva att allt är sant"],
    correctIndex: 0,
    translations: {
      en: { question: "What should you do when sharing information online?", options: ["Think about the source and whether the information may be true", "Always share quickly without reading", "Change facts so they fit your opinion", "Write that everything is true"] },
      ar: { question: "ماذا يجب أن تفعل عند مشاركة معلومات على الإنترنت؟", options: ["فكر في المصدر وهل يمكن أن تكون المعلومات صحيحة", "شارك بسرعة دائماً دون قراءة", "غير الحقائق حتى تناسب رأيك", "اكتب أن كل شيء صحيح"] },
      zh: { question: "在网上分享信息时应该怎么做？", options: ["思考来源以及信息是否可能真实", "总是不阅读就快速分享", "改变事实来符合你的观点", "写下一切都是真的"] }
    },
    explanations: {
      en: "Source criticism is practical democracy training. Checking before sharing helps reduce false information.",
      ar: "النقد المصدري تدريب عملي على الديمقراطية. التحقق قبل المشاركة يساعد على تقليل المعلومات الكاذبة.",
      zh: "来源批判是实际的民主训练。分享前核查有助于减少虚假信息。"
    }
  },
  {
    id: "everyday-007",
    topicId: "everyday",
    questionSv: "Vad är en vårdcentral?",
    options: ["En mottagning för vanlig sjukvård nära dig", "En domstol för vårdfrågor", "Ett kontor för pass", "En skola för vuxna"],
    correctIndex: 0,
    translations: {
      en: { question: "What is a health centre?", options: ["A clinic for ordinary healthcare near you", "A court for healthcare questions", "An office for passports", "A school for adults"] },
      ar: { question: "ما هو المركز الصحي؟", options: ["عيادة للرعاية الصحية العادية بالقرب منك", "محكمة لقضايا الرعاية", "مكتب للجوازات", "مدرسة للكبار"] },
      zh: { question: "什么是医疗中心？", options: ["你附近提供普通医疗的诊所", "处理医疗问题的法院", "办理护照的办公室", "成人学校"] }
    },
    explanations: {
      en: "A vårdcentral is usually the first healthcare contact for non-emergency problems.",
      ar: "المركز الصحي هو غالباً أول جهة تتواصل معها للمشكلات الصحية غير الطارئة.",
      zh: "vårdcentral 通常是非紧急健康问题的第一联系点。"
    }
  },
  {
    id: "everyday-008",
    topicId: "everyday",
    questionSv: "Vad är 1177?",
    options: ["Sjukvardsradgivning och information om vard", "Polisens akutnummer", "Skatteverkets nummer", "Ett politiskt parti"],
    correctIndex: 0,
    translations: {
      en: { question: "What is 1177?", options: ["Healthcare advice and information about care", "The police emergency number", "The Tax Agency number", "A political party"] },
      ar: { question: "ما هو 1177؟", options: ["نصائح صحية ومعلومات عن الرعاية", "رقم طوارئ الشرطة", "رقم مصلحة الضرائب", "حزب سياسي"] },
      zh: { question: "1177 是什么？", options: ["医疗建议和护理信息", "警察紧急电话", "税务局电话", "一个政党"] }
    },
    explanations: {
      en: "1177 gives healthcare advice and helps you understand where to seek care. For life-threatening emergencies, call 112.",
      ar: "يقدم 1177 نصائح صحية ويساعدك على معرفة أين تطلب الرعاية. في الحالات المهددة للحياة اتصل بـ112.",
      zh: "1177 提供医疗建议并帮助你了解去哪里就医。危及生命的紧急情况请拨打112。"
    }
  },
  {
    id: "everyday-009",
    topicId: "everyday",
    questionSv: "Vad betyder skolplikt?",
    options: ["Att barn måste gå i skolan under vissa år", "Att vuxna måste gå på universitet", "Att skolan är frivillig för alla barn", "Att bara pojkar går i skolan"],
    correctIndex: 0,
    translations: {
      en: { question: "What does compulsory schooling mean?", options: ["Children must attend school for certain years", "Adults must go to university", "School is voluntary for all children", "Only boys go to school"] },
      ar: { question: "ماذا يعني التعليم الإلزامي؟", options: ["يجب أن يذهب الأطفال إلى المدرسة خلال سنوات معينة", "يجب على الكبار الذهاب إلى الجامعة", "المدرسة اختيارية لكل الأطفال", "الأولاد فقط يذهبون إلى المدرسة"] },
      zh: { question: "义务教育是什么意思？", options: ["儿童必须在一定年限上学", "成年人必须上大学", "所有儿童都可自愿选择是否上学", "只有男孩上学"] }
    },
    explanations: {
      en: "Compulsory schooling means children have both a right and a duty to attend school during the compulsory school years.",
      ar: "التعليم الإلزامي يعني أن للأطفال حقاً وواجباً في الذهاب إلى المدرسة خلال سنوات التعليم الإلزامي.",
      zh: "义务教育表示儿童在义务教育年限内既有上学权利，也有上学义务。"
    }
  },
  {
    id: "everyday-010",
    topicId: "everyday",
    questionSv: "Vad är fika ofta på en arbetsplats?",
    options: ["En kort paus med kaffe eller nagot att ata", "Ett mote i domstol", "En typ av skatt", "En bostadskontrakt"],
    correctIndex: 0,
    translations: {
      en: { question: "What is fika often at a workplace?", options: ["A short break with coffee or something to eat", "A meeting in court", "A type of tax", "A housing contract"] },
      ar: { question: "ما هي الفيكا غالباً في مكان العمل؟", options: ["استراحة قصيرة مع قهوة أو شيء يؤكل", "اجتماع في المحكمة", "نوع من الضريبة", "عقد سكن"] },
      zh: { question: "工作场所的 fika 通常是什么？", options: ["喝咖啡或吃点东西的短休息", "法院会议", "一种税", "住房合同"] }
    },
    explanations: {
      en: "Fika is a common social break in Sweden. It can be a small but useful part of workplace culture.",
      ar: "الفيكا استراحة اجتماعية شائعة في السويد. قد تكون جزءاً صغيراً لكنه مفيد من ثقافة العمل.",
      zh: "fika 是瑞典常见的社交休息，也是工作文化中的一个小但有用的部分。"
    }
  },
  {
    id: "everyday-011",
    topicId: "everyday",
    questionSv: "Vad är ett hyreskontrakt?",
    options: ["Ett avtal mellan hyresvard och hyresgast", "Ett pass fran Polisen", "Ett beslut fran riksdagen", "Ett betyg fran skolan"],
    correctIndex: 0,
    translations: {
      en: { question: "What is a rental contract?", options: ["An agreement between landlord and tenant", "A passport from the Police", "A decision from the Riksdag", "A grade from school"] },
      ar: { question: "ما هو عقد الإيجار؟", options: ["اتفاق بين المؤجر والمستأجر", "جواز سفر من الشرطة", "قرار من البرلمان", "درجة من المدرسة"] },
      zh: { question: "什么是租赁合同？", options: ["房东和租客之间的协议", "警察签发的护照", "国会的决定", "学校成绩"] }
    },
    explanations: {
      en: "A rental contract describes rights and responsibilities for both landlord and tenant, such as rent and rules for the home.",
      ar: "يصف عقد الإيجار حقوق ومسؤوليات المؤجر والمستأجر، مثل الإيجار وقواعد السكن.",
      zh: "租赁合同说明房东和租客双方的权利和责任，例如租金和住房规则。"
    }
  },
  {
    id: "everyday-012",
    topicId: "everyday",
    questionSv: "Vad är privatekonomi?",
    options: ["Hur en person eller familj planerar pengar, inkomster och utgifter", "Hur domstolar skriver domar", "Hur partier väljer ledare", "Hur sjukhus bygger rum"],
    correctIndex: 0,
    translations: {
      en: { question: "What is personal finance?", options: ["How a person or family plans money, income, and expenses", "How courts write judgments", "How parties choose leaders", "How hospitals build rooms"] },
      ar: { question: "ما هو الاقتصاد الشخصي؟", options: ["كيف يخطط الشخص أو العائلة للمال والدخل والمصاريف", "كيف تكتب المحاكم الأحكام", "كيف تختار الأحزاب القادة", "كيف تبني المستشفيات الغرف"] },
      zh: { question: "什么是个人经济？", options: ["个人或家庭如何规划金钱、收入和支出", "法院如何写判决", "政党如何选择领导人", "医院如何建房间"] }
    },
    explanations: {
      en: "Private economy includes income, expenses, saving, borrowing, and paying bills. It is part of everyday life in Sweden.",
      ar: "يشمل الاقتصاد الشخصي الدخل والمصاريف والادخار والاقتراض ودفع الفواتير. وهو جزء من الحياة اليومية في السويد.",
      zh: "个人经济包括收入、支出、储蓄、借款和支付账单，是瑞典日常生活的一部分。"
    }
  },
  {
    id: "authorities-007",
    topicId: "authorities",
    questionSv: "Vad gör Skatteverket?",
    options: ["Arbetar med skatt, folkbokforing och personnummer", "Driver alla skolor", "Domer i brottmal", "Tar hand om akut sjukvard"],
    correctIndex: 0,
    translations: {
      en: { question: "What does the Swedish Tax Agency do?", options: ["Works with tax, population registration, and personal identity numbers", "Runs all schools", "Judges criminal cases", "Handles emergency healthcare"] },
      ar: { question: "ماذا تفعل مصلحة الضرائب السويدية؟", options: ["تعمل مع الضرائب والتسجيل السكاني والرقم الشخصي", "تدير كل المدارس", "تحكم في القضايا الجنائية", "تتعامل مع الرعاية الصحية الطارئة"] },
      zh: { question: "瑞典税务局做什么？", options: ["处理税务、人口登记和个人号码", "运营所有学校", "审判刑事案件", "处理紧急医疗"] }
    },
    explanations: {
      en: "Skatteverket handles taxes and population registration, including personal identity numbers for people registered in Sweden.",
      ar: "تتعامل Skatteverket مع الضرائب والتسجيل السكاني، بما في ذلك الرقم الشخصي للأشخاص المسجلين في السويد.",
      zh: "Skatteverket 处理税务和人口登记，包括在瑞典登记人员的个人号码。"
    }
  },
  {
    id: "authorities-008",
    topicId: "authorities",
    questionSv: "Vad gör Försäkringskassan?",
    options: ["Handlägger socialförsäkring, till exempel föräldrapenning och sjukpenning", "Bestämmer alla lagar", "Ger körkort", "Driver bibliotek"],
    correctIndex: 0,
    translations: {
      en: { question: "What does the Swedish Social Insurance Agency do?", options: ["Handles social insurance, for example parental benefit and sickness benefit", "Decides all laws", "Issues driving licences", "Runs libraries"] },
      ar: { question: "ماذا تفعل مصلحة التأمينات الاجتماعية؟", options: ["تتعامل مع التأمين الاجتماعي مثل تعويض الوالدين وتعويض المرض", "تقرر كل القوانين", "تصدر رخص القيادة", "تدير المكتبات"] },
      zh: { question: "瑞典社会保险局做什么？", options: ["处理社会保险，例如父母津贴和病假津贴", "决定所有法律", "发放驾驶执照", "运营图书馆"] }
    },
    explanations: {
      en: "Försäkringskassan administers parts of the social insurance system, such as benefits for sickness, disability, and parenting.",
      ar: "تدير Försäkringskassan أجزاء من نظام التأمين الاجتماعي، مثل تعويضات المرض والإعاقة والوالدية.",
      zh: "Försäkringskassan 管理社会保险体系的一部分，例如疾病、残疾和育儿相关补助。"
    }
  },
  {
    id: "authorities-009",
    topicId: "authorities",
    questionSv: "När kontaktar man Arbetsförmedlingen?",
    options: ["När man söker arbete eller behöver stöd för att komma in på arbetsmarknaden", "När man behöver akut ambulans", "När man vill rösta i riksdagen", "När man ska döma ett brottmål"],
    correctIndex: 0,
    translations: {
      en: { question: "When do you contact the Public Employment Service?", options: ["When looking for work or needing support to enter the labour market", "When you need an ambulance urgently", "When you want to vote in the Riksdag", "When you will judge a criminal case"] },
      ar: { question: "متى تتواصل مع مكتب العمل؟", options: ["عندما تبحث عن عمل أو تحتاج دعماً لدخول سوق العمل", "عندما تحتاج سيارة إسعاف بشكل عاجل", "عندما تريد التصويت في البرلمان", "عندما ستحكم في قضية جنائية"] },
      zh: { question: "什么时候联系公共就业服务局？", options: ["找工作或需要进入劳动力市场的支持时", "急需救护车时", "想在国会投票时", "要审判刑事案件时"] }
    },
    explanations: {
      en: "Arbetsförmedlingen supports people who are looking for work and can connect job seekers with labour-market measures.",
      ar: "تدعم Arbetsförmedlingen الأشخاص الذين يبحثون عن عمل ويمكنها ربط الباحثين عن عمل بإجراءات سوق العمل.",
      zh: "Arbetsförmedlingen 支持找工作的人，并可以把求职者与劳动力市场措施联系起来。"
    }
  },
  {
    id: "authorities-010",
    topicId: "authorities",
    questionSv: "Nar ska man ringa 112?",
    options: ["Vid akut fara för liv, egendom eller miljö", "När man vill boka en vanlig läkartid", "När man vill fråga om skatt", "När man vill ställa sig i bostadskö"],
    correctIndex: 0,
    translations: {
      en: { question: "When should you call 112?", options: ["In urgent danger to life, property, or the environment", "When you want to book a normal doctor appointment", "When you want to ask about tax", "When you want to join a housing queue"] },
      ar: { question: "متى يجب الاتصال بـ112؟", options: ["عند خطر عاجل على الحياة أو الممتلكات أو البيئة", "عندما تريد حجز موعد طبي عادي", "عندما تريد السؤال عن الضرائب", "عندما تريد التسجيل في طابور السكن"] },
      zh: { question: "什么时候应该拨打112？", options: ["生命、财产或环境有紧急危险时", "想预约普通医生时间时", "想询问税务时", "想排住房队列时"] }
    },
    explanations: {
      en: "112 is the emergency number. Use it for urgent situations that need police, ambulance, fire service, or rescue.",
      ar: "112 هو رقم الطوارئ. استخدمه للحالات العاجلة التي تحتاج الشرطة أو الإسعاف أو الإطفاء أو الإنقاذ.",
      zh: "112 是紧急电话。用于需要警察、救护车、消防或救援的紧急情况。"
    }
  },
  {
    id: "authorities-011",
    topicId: "authorities",
    questionSv: "Vem beslutar om lagar i Sverige?",
    options: ["Riksdagen", "Vårdcentralen", "En hyresvärd", "Ett privat företag"],
    correctIndex: 0,
    translations: {
      en: { question: "Who decides laws in Sweden?", options: ["The Riksdag", "The health centre", "A landlord", "A private company"] },
      ar: { question: "من يقرر القوانين في السويد؟", options: ["البرلمان", "المركز الصحي", "مؤجر", "شركة خاصة"] },
      zh: { question: "瑞典由谁决定法律？", options: ["国会", "医疗中心", "房东", "私人公司"] }
    },
    explanations: {
      en: "The Riksdag is Sweden's parliament and decides laws. The government then governs and carries out many decisions.",
      ar: "الريكسداغ هو البرلمان السويدي ويقرر القوانين. ثم تدير الحكومة البلاد وتنفذ كثيراً من القرارات.",
      zh: "Riksdag 是瑞典国会，负责决定法律。政府随后治理国家并执行许多决定。"
    }
  },
  {
    id: "authorities-012",
    topicId: "authorities",
    questionSv: "Vilken nivå ansvarar ofta för förskola och grundskola?",
    options: ["Kommunen", "EU", "FN", "Kungen"],
    correctIndex: 0,
    translations: {
      en: { question: "Which level is often responsible for preschool and compulsory school?", options: ["The municipality", "The EU", "The UN", "The king"] },
      ar: { question: "أي مستوى يكون غالباً مسؤولاً عن الروضة والمدرسة الأساسية؟", options: ["البلدية", "الاتحاد الأوروبي", "الأمم المتحدة", "الملك"] },
      zh: { question: "哪个层级通常负责幼儿园和义务学校？", options: ["市政府", "欧盟", "联合国", "国王"] }
    },
    explanations: {
      en: "Municipalities are responsible for many local services, including preschool, compulsory school, elder care, and local planning.",
      ar: "البلديات مسؤولة عن كثير من الخدمات المحلية، مثل الروضة والمدرسة الأساسية ورعاية كبار السن والتخطيط المحلي.",
      zh: "市政府负责许多地方服务，包括幼儿园、义务学校、老人照护和地方规划。"
    }
  }
];
