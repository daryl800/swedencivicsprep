import type { CitizenshipUpdateText, FaqContent, LegalContent } from "../../contentTypes";

export const soCitizenshipUpdate: CitizenshipUpdateText = {
    title: "Cusboonaysiinta xeerarka jinsiyadda 2026",
    source: "Ku salaysan macluumaadka Migrationsverket",
    summary: "Xeerarka cusub ee jinsiyadda 2026 waxay bilaabmeen Juun. Dadka qaar waxay yeelan karaan waddo ka fudud oo deganaansho joogto ah.",
    intro: "Laga bilaabo 6 Juun 2026, codsiyada jinsiyadda Iswiidhan waxaa lagu qiimeeyaa shuruudo adag. Dad badan oo waaweyn waxaa laga rabaa:",
    bullets: [
      "saldhig deganaansho oo sax ah",
      "muddo cayiman oo lagu noolaa Iswiidhan",
      "aqoon af Iswiidhish iyo bulshada Iswiidhan",
      "awood aad naftaada ku masruufto",
      "nolol nidaamsan oo sharciga la ixtiraamo"
    ],
    note: "Laga bilaabo 12 Luulyo 2026, dadka qaar oo leh oggolaansho deganaansho ku-meelgaar ah waxaa laga yaabaa in laga dhaafo shuruudda deganaanshaha joogtada ah. Xaaladdaada gaarka ah waxaa qiimeeya Migrationsverket.",
    migrationsverketLink: "Ka hubi shuruudaha Migrationsverket",
    uhrLink: "Wax ku baro Sverige i fokus"
  };

export const soFaqContent: FaqContent = {
    title: "Su'aalo badan la isweydiiyo",
    intro: "Jawaabo kooban oo loogu talagalay isticmaalayaasha hore.",
    items: [
      { question: "App-kan ma yahay adeeg rasmi ah?", answer: "Maya. Swedish Civics Test Preparation waa qalab waxbarasho oo madax-bannaan. Lama xiriirno UHR, Skolverket, Migrationsverket, ama imtixaanka rasmiga ah." },
      { question: "Su'aalahan ma yihiin su'aalo imtixaan rasmi ah?", answer: "Maya. Waa su'aalo tababar oo asal ah, kuna salaysan mawduucyada waxbarashada ee dadweynaha ee Sverige i fokus." },
      { question: "Maxay su'aaluhu u yihiin Iswiidhish?", answer: "Su'aalaha waxaan ku haynaa Iswiidhish si ay ugu ekaadaan habka waxbarashada, laakiin sharaxaad iyo caawin luqadeed ayaan ku siinnaa luqadda aad doorato." },
      { question: "Xaggee horumarkayga lagu kaydiyaa?", answer: "Noocan tijaabada ah, horumarka wuxuu ku kaydsan yahay browser-ka qalabkan oo keliya. Xisaabo ma jiraan weli." },
      { question: "Ma bilaash baa?", answer: "Haa, noocan hore waa bilaash inta aan ka ururinayno jawaab-celin ardayda dhabta ah." },
      { question: "Ma leeyahay imtixaan 60 su'aal ah?", answer: "Weli maya. Hadda waa tababar mawduucyo ah. Imtixaan isku-dhafan wuxuu iman karaa marka bangiga su'aalaha weynaado." }
    ]
  };

export const soLegalContent: LegalContent = {
    homeLink: "Ku noqo bogga hore",
    privacyLink: "Shuruudaha & asturnaanta",
    footerNote: "Su'aalo tababar oo asal ah oo ku salaysan mawduucyo waxbarasho oo dadweyne. Ma aha su'aalo imtixaan rasmi ah.",
    title: "Shuruudaha & Asturnaanta",
    updated: "La cusbooneysiiyay: 10 Agoosto 2026",
    intro: "Boggan wuxuu sharxayaa sida Swedish Civics Test Preparation u shaqeeyo maanta. Waa kooban yahay sababtoo ah noocan tijaabada ah ma laha xisaabo, lacag-bixin, database backend, ama xayeysiis raadraac.",
    sections: [
      { title: "Qalab waxbarasho oo madax-bannaan", body: ["Swedish Civics Test Preparation waa hage tababar oo madax-bannaan. Lama xiriirno UHR, Skolverket, Migrationsverket, ama imtixaanka rasmiga ah.", "Su'aalaha tababarku waa asal, waxayna ku salaysan yihiin mawduucyada dadweynaha ee Sverige i fokus. Ma nuqulno ama ma sheeganno su'aalo rasmi ah."] },
      { title: "Isticmaalka app-ka", body: ["Waxaad u isticmaali kartaa waxbarashadaada gaarka ah oo aad nala wadaagi kartaa jawaab-celin.", "Fadlan ha xoqin, dib ha u daabicin, hana iibin bangiga su'aalaha, sharaxaadaha, tarjumaadaha, ama naqshadda."] },
      { title: "Asturnaanta nooca tijaabada ah", body: ["Noocan tijaabada ah kuma jiraan xisaabo, lacag-bixin, foomam xiriir oo server ah, analytics pixels, ama profiles backend lagu kaydiyo.", "Horumarkaaga iyo luqadda aad doorato waxaa lagu kaydiyaa browser-kaaga adigoo adeegsanaya localStorage."] },
      { title: "Isbeddello mustaqbalka", body: ["Haddii aan ku darno xisaabo, lacag-bixin, analytics, email login, ama sync horumar cloud, siyaasaddan waa in la cusbooneysiiyaa.", "Boggan waa hagitaan product, ma aha talo sharci. Dib-u-eegis GDPR ayaa weli mudan ka hor launch weyn."] }
    ]
  };
