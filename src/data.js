const TOPICS = [
  {
    id: "democracy-elections",
    nameSv: "Demokrati och val",
    nameEn: "Democracy & Elections",
    descriptionEn: "How Swedish democracy works, elections, parties, and public decision-making."
  },
  {
    id: "rights-duties",
    nameSv: "Rättigheter och skyldigheter",
    nameEn: "Rights & Duties",
    descriptionEn: "Basic rights, responsibilities, equality, laws, and civic duties."
  },
  {
    id: "everyday-welfare",
    nameSv: "Vardagsliv och välfärd",
    nameEn: "Everyday Life & Welfare",
    descriptionEn: "Schools, healthcare, social insurance, family life, and public services."
  },
  {
    id: "authorities-work",
    nameSv: "Myndigheter och arbete",
    nameEn: "Authorities & Work",
    descriptionEn: "Important authorities, work life, taxes, and employment rights."
  }
];

const QUESTIONS = [
  {
    id: "dem-001",
    topicId: "democracy-elections",
    questionSv: "Hur ofta hålls riksdagsval i Sverige?",
    options: ["Varje år", "Vartannat år", "Vart fjärde år", "Vart sjätte år"],
    correctIndex: 2,
    explanationEn: "Elections to the Riksdag, regions, and municipalities are normally held every four years.",
    explanationZh: ""
  },
  {
    id: "dem-002",
    topicId: "democracy-elections",
    questionSv: "Vad heter Sveriges parlament?",
    options: ["Regeringen", "Riksdagen", "Kommunen", "Domstolen"],
    correctIndex: 1,
    explanationEn: "The Riksdag is Sweden's national parliament and makes laws.",
    explanationZh: ""
  },
  {
    id: "dem-003",
    topicId: "democracy-elections",
    questionSv: "Vem får rösta i riksdagsval?",
    options: ["Alla som bor i Sverige", "Svenska medborgare som fyllt 18 år", "Endast personer med arbete", "Endast personer födda i Sverige"],
    correctIndex: 1,
    explanationEn: "To vote in Riksdag elections, a person must be a Swedish citizen and at least 18 years old.",
    explanationZh: ""
  },
  {
    id: "dem-004",
    topicId: "democracy-elections",
    questionSv: "Vad betyder yttrandefrihet?",
    options: ["Att man får säga och uttrycka sina åsikter", "Att man måste rösta", "Att staten bestämmer alla åsikter", "Att bara politiker får tala offentligt"],
    correctIndex: 0,
    explanationEn: "Freedom of expression means people can express opinions, within the limits set by law.",
    explanationZh: ""
  },
  {
    id: "dem-005",
    topicId: "democracy-elections",
    questionSv: "Vilka bestämmer i en kommun?",
    options: ["Kommunfullmäktige", "Polisen", "Riksbanken", "Kungen"],
    correctIndex: 0,
    explanationEn: "The municipal council is elected by residents and decides on local matters.",
    explanationZh: ""
  },
  {
    id: "dem-006",
    topicId: "democracy-elections",
    questionSv: "Vad är en folkomröstning?",
    options: ["Ett domstolsbeslut", "En omröstning där medborgare tar ställning i en fråga", "Ett möte på en arbetsplats", "En privat enkät"],
    correctIndex: 1,
    explanationEn: "A referendum lets voters express their view on a specific political question.",
    explanationZh: ""
  },

  {
    id: "rights-001",
    topicId: "rights-duties",
    questionSv: "Vad innebär religionsfrihet i Sverige?",
    options: ["Att alla måste ha samma religion", "Att man får välja religion eller ingen religion", "Att religion är förbjuden", "Att bara vissa religioner är tillåtna"],
    correctIndex: 1,
    explanationEn: "Freedom of religion includes the right to practice a religion and the right not to have one.",
    explanationZh: ""
  },
  {
    id: "rights-002",
    topicId: "rights-duties",
    questionSv: "Vilken skyldighet har alla som har skattepliktig inkomst i Sverige?",
    options: ["Att betala skatt", "Att starta företag", "Att arbeta heltid", "Att gå med i ett parti"],
    correctIndex: 0,
    explanationEn: "People with taxable income must pay tax, which helps fund public services.",
    explanationZh: ""
  },
  {
    id: "rights-003",
    topicId: "rights-duties",
    questionSv: "Vad betyder jämställdhet?",
    options: ["Att män bestämmer mer", "Att kvinnor bestämmer mer", "Att kvinnor och män har samma rättigheter och möjligheter", "Att alla måste ha samma yrke"],
    correctIndex: 2,
    explanationEn: "Gender equality means women and men have equal rights, responsibilities, and opportunities.",
    explanationZh: ""
  },
  {
    id: "rights-004",
    topicId: "rights-duties",
    questionSv: "Vad är diskriminering?",
    options: ["Att behandla någon sämre på grund av till exempel kön, religion eller etnicitet", "Att rösta i ett val", "Att följa lagen", "Att söka arbete"],
    correctIndex: 0,
    explanationEn: "Discrimination means unfair treatment connected to protected grounds such as gender, ethnicity, religion, disability, or age.",
    explanationZh: ""
  },
  {
    id: "rights-005",
    topicId: "rights-duties",
    questionSv: "Vad är skolplikt?",
    options: ["Att barn måste gå i skolan", "Att vuxna måste studera på universitet", "Att alla måste läsa svenska varje dag", "Att skolan är frivillig för barn"],
    correctIndex: 0,
    explanationEn: "Children in Sweden have compulsory schooling, which means they must attend school during certain ages.",
    explanationZh: ""
  },
  {
    id: "rights-006",
    topicId: "rights-duties",
    questionSv: "Vad kan hända om någon bryter mot lagen?",
    options: ["Personen kan prövas av domstol", "Personen får automatiskt medborgarskap", "Personen behöver inte göra något", "Personen får rösta två gånger"],
    correctIndex: 0,
    explanationEn: "Courts decide whether someone has broken the law and what consequence applies.",
    explanationZh: ""
  },

  {
    id: "welfare-001",
    topicId: "everyday-welfare",
    questionSv: "Vilken myndighet ansvarar ofta för socialförsäkringen?",
    options: ["Försäkringskassan", "Skatteverket", "Polisen", "Migrationsverket"],
    correctIndex: 0,
    explanationEn: "Forsakringskassan handles many social insurance benefits, such as parental benefit and sickness benefit.",
    explanationZh: ""
  },
  {
    id: "welfare-002",
    topicId: "everyday-welfare",
    questionSv: "Vad är barnbidrag?",
    options: ["Ett bidrag till familjer med barn", "En skatt för barn", "En avgift till skolan", "Ett lån från banken"],
    correctIndex: 0,
    explanationEn: "Child allowance is financial support paid to families with children.",
    explanationZh: ""
  },
  {
    id: "welfare-003",
    topicId: "everyday-welfare",
    questionSv: "Vem ansvarar för vårdcentraler och sjukhus i Sverige?",
    options: ["Regionerna", "Riksbanken", "Trafikverket", "Kronofogden"],
    correctIndex: 0,
    explanationEn: "Regions are responsible for healthcare, including health centers and hospitals.",
    explanationZh: ""
  },
  {
    id: "welfare-004",
    topicId: "everyday-welfare",
    questionSv: "Vad är föräldraförsäkring?",
    options: ["Ersättning när föräldrar är hemma med barn", "En försäkring för bilar", "En avgift till kommunen", "Ett krav för att rösta"],
    correctIndex: 0,
    explanationEn: "Parental insurance gives parents financial support when they stay home to care for a child.",
    explanationZh: ""
  },
  {
    id: "welfare-005",
    topicId: "everyday-welfare",
    questionSv: "Vad betyder allemansrätten?",
    options: ["Rätten att röra sig i naturen med ansvar", "Rätten att bygga hus var som helst", "Rätten att köra bil i skogen", "Rätten att ta någons privata saker"],
    correctIndex: 0,
    explanationEn: "The right of public access lets people enjoy nature, but they must not disturb or destroy.",
    explanationZh: ""
  },
  {
    id: "welfare-006",
    topicId: "everyday-welfare",
    questionSv: "Vad är en förskola?",
    options: ["Pedagogisk verksamhet för yngre barn", "En domstol", "Ett äldreboende", "Ett bibliotek för vuxna"],
    correctIndex: 0,
    explanationEn: "Preschool is educational childcare for young children before compulsory school.",
    explanationZh: ""
  },

  {
    id: "work-001",
    topicId: "authorities-work",
    questionSv: "Vilken myndighet hanterar folkbokföring?",
    options: ["Skatteverket", "Arbetsförmedlingen", "Domstolsverket", "Riksdagen"],
    correctIndex: 0,
    explanationEn: "The Swedish Tax Agency handles population registration and many tax matters.",
    explanationZh: ""
  },
  {
    id: "work-002",
    topicId: "authorities-work",
    questionSv: "Vad gör Arbetsförmedlingen?",
    options: ["Hjälper arbetssökande och arbetsgivare", "Bestämmer straff i domstol", "Utfärdar pass", "Bygger vägar"],
    correctIndex: 0,
    explanationEn: "The Public Employment Service supports job seekers and employers in the labor market.",
    explanationZh: ""
  },
  {
    id: "work-003",
    topicId: "authorities-work",
    questionSv: "Vad är kollektivavtal?",
    options: ["Avtal mellan arbetsgivare och fack om villkor", "Ett hyreskontrakt", "Ett beslut från polisen", "En privat försäkring"],
    correctIndex: 0,
    explanationEn: "Collective agreements set employment conditions such as pay, working hours, and insurance in many workplaces.",
    explanationZh: ""
  },
  {
    id: "work-004",
    topicId: "authorities-work",
    questionSv: "Varför betalar man skatt?",
    options: ["För att finansiera gemensamma tjänster", "För att köpa aktier", "För att slippa följa lagen", "För att få rösta oftare"],
    correctIndex: 0,
    explanationEn: "Taxes fund shared services such as schools, healthcare, roads, and social security.",
    explanationZh: ""
  },
  {
    id: "work-005",
    topicId: "authorities-work",
    questionSv: "Vad kan ett fackförbund hjälpa till med?",
    options: ["Frågor om arbetsvillkor och rättigheter", "Att utfärda körkort", "Att besluta om medborgarskap", "Att registrera födsel"],
    correctIndex: 0,
    explanationEn: "A trade union can support members with workplace rights, negotiations, and employment conditions.",
    explanationZh: ""
  },
  {
    id: "work-006",
    topicId: "authorities-work",
    questionSv: "Vilken myndighet prövar många ärenden om uppehållstillstånd?",
    options: ["Migrationsverket", "Riksbanken", "Kommunfullmäktige", "Försäkringskassan"],
    correctIndex: 0,
    explanationEn: "The Swedish Migration Agency handles many cases related to residence permits and migration.",
    explanationZh: ""
  }
];
