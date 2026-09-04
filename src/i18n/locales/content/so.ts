import type { CitizenshipUpdateText, FaqContent, LegalContent } from "../../contentTypes";

export const soCitizenshipUpdate: CitizenshipUpdateText = {
    title: "Xaqiiqooyinka muhiimka ah ee imtixaanka jinsiyadda",
    source: "Ku salaysan macluumaadka UHR",
    summary: "Imtixaankii ugu horreeyay ee aqoonta bulshada waxaa la qabtay Agoosto 2026. UHR waxay sheegtay in imtixaanku yahay Iswiidhish, warqad, iyo su'aalo doorasho badan. Warbixinno dadweyne ayaa imtixaankii koowaad ku tilmaamay qiyaastii 60 su'aalood muddo 90 daqiiqo ah.",
    intro: "Waxyaabaha ugu muhiimsan ee diyaar-garowga waa sahlan yihiin:",
    bullets: [
      "imtixaanka aqoonta bulshada wuxuu ku qoran yahay Iswiidhish",
      "su'aaluhu waa doorasho badan: afar jawaabood iyo hal jawaab sax ah",
      "qalabka waxbarasho waa Sverige i fokus oo ka yimid UHR iyo Skolverket",
      "taariikhda xigta, tirada su'aalaha, iyo waqtiga imtixaanka waxaa shaacinaysa UHR"
    ],
    note: "Sidaas darteed boggani wuxuu diiradda saaraa su'aalo tababar oo Iswiidhish ah, sharaxaad cad, iyo waxa aad dib u eegi karto xiga.",
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
      { question: "Ma bilaash baa?", answer: "Haa. Heerka bilaashka ah wuu sii ahaanayaa bilaash wuxuuna leeyahay tababar muunad ah. Bangi su'aalo weyn, imtixaan tijaabo ah, iyo muuqaalada full access waxay u baahan karaan lacag-bixin mustaqbalka." },
      { question: "Imtixaan kasta oo tijaabo ah ma leeyahay su'aalo kala duwan?", answer: "Haa. Imtixaan kasta wuxuu ka soo xushaa set cusub oo isku-dhafan bangiga su'aalaha la heli karo, wuxuuna su'aalaha ku kala fidiyaa cutubyada rasmiga ah ee waxbarashada, sidaas darteed isku-dayo badan waxay bixiyaan tababar ballaaran." }
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
