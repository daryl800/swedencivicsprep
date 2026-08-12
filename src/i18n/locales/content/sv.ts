import type { CitizenshipUpdateText, FaqContent, LegalContent } from "../../contentTypes";

export const svCitizenshipUpdate: CitizenshipUpdateText = {
    title: "Uppdatering av medborgarskapsregler 2026",
    source: "Baserat på information från Migrationsverket",
    summary: "Nya medborgarskapsregler 2026 gäller från juni. Vissa sökande kan ha enklare vägar kring kravet på permanent uppehållstillstånd.",
    intro: "Sedan 6 juni 2026 bedöms ansökningar om svenskt medborgarskap enligt skärpta krav. För många vuxna sökande ingår:",
    bullets: [
      "en giltig grund för vistelse, ofta permanent uppehållstillstånd, uppehållsrätt, uppehållskort eller uppehållsstatus",
      "en viss tid med hemvist i Sverige",
      "kunskaper i svenska och om det svenska samhället",
      "förmåga att försörja sig",
      "ett skötsamt och hederligt levnadssätt"
    ],
    note: "Sedan 12 juli 2026 kan vissa personer med tidsbegränsade uppehållstillstånd undantas från kravet på permanent uppehållstillstånd. Din personliga situation bedöms alltid av Migrationsverket.",
    migrationsverketLink: "Kontrollera kraven hos Migrationsverket",
    uhrLink: "Studera med Sverige i fokus"
  };

export const svFaqContent: FaqContent = {
    title: "FAQ",
    intro: "Korta svar för tidiga användare. Produkten är medvetet enkel medan vi testar vad som hjälper elever mest.",
    items: [
      {
        question: "Är Swedish Civics Test Preparation en officiell provtjänst?",
        answer: "Nej. Swedish Civics Test Preparation är ett oberoende studie- och träningsverktyg. Vi är inte kopplade till UHR, Skolverket, Migrationsverket eller det officiella medborgarskapsprovet."
      },
      {
        question: "Är det här officiella provfrågor?",
        answer: "Nej. Frågorna är originalfrågor skrivna för den här appen. De bygger på offentliga studieteman i Sverige i fokus och är inte kopierade från något officiellt prov."
      },
      {
        question: "Varför är frågorna på svenska?",
        answer: "Det riktiga samhällskunskaps- och medborgarskapsprovet är kopplat till svensk samhällskunskap och svenskspråkigt studiematerial. Därför behåller vi frågorna på svenska och ger stöd och förklaringar på valt språk."
      },
      {
        question: "Var sparas mina framsteg?",
        answer: "I den här förhandsversionen sparas framsteg bara i webbläsaren på den här enheten. Det finns inga konton ännu, så framstegen synkas inte mellan enheter."
      },
      {
        question: "Är det gratis?",
        answer: "Ja, den tidiga versionen är gratis medan vi samlar feedback från riktiga användare. Senare versioner kan lägga till konton, mer innehåll eller betalda funktioner."
      },
      {
        question: "Simulerar appen ett helt prov med 60 frågor?",
        answer: "Inte ännu. Förhandsversionen är ämnesträning. Ett tidsatt blandat provläge är ett bra nästa steg när frågebanken är större."
      }
    ]
  };

export const svLegalContent: LegalContent = {
    homeLink: "Till startsidan",
    privacyLink: "Villkor och integritet",
    footerNote: "Originalfrågor för träning baserade på offentliga studieteman. Inte officiella provfrågor.",
    title: "Villkor och integritet",
    updated: "Senast uppdaterad: 10 augusti 2026",
    intro: "Den här sidan förklarar hur Swedish Civics Test Preparation fungerar idag. Den är avsiktligt kort eftersom förhandsversionen inte har konton, betalningar, backend-databas eller annonsspårning.",
    sections: [
      {
        title: "Oberoende studieverktyg",
        body: [
          "Swedish Civics Test Preparation är en oberoende träningsguide för personer som studerar det svenska samhället. Vi är inte kopplade till UHR, Skolverket, Migrationsverket eller det officiella medborgarskapsprovet.",
          "Träningsfrågorna är original och bygger på offentliga studieteman i Sverige i fokus. Vi kopierar, publicerar eller påstår oss erbjuda officiella provfrågor."
        ]
      },
      {
        title: "Din användning av appen",
        body: [
          "Du får använda appen för dina egna studier och dela feedback med oss.",
          "Skrapa, återpublicera eller sälj inte frågebanken, förklaringarna, översättningarna eller designen som en annan produkt."
        ]
      },
      {
        title: "Integritet i förhandsversionen",
        body: [
          "Det finns inga användarkonton, betalningar, kontaktformulär, analyspixlar eller backend-lagrade profiler i den här förhandsversionen.",
          "Dina träningsframsteg och valt språk sparas lokalt i webbläsaren med localStorage. Datan stannar på din enhet om du inte rensar webbläsarens lagring eller senare väljer att använda en framtida kontofunktion."
        ]
      },
      {
        title: "Framtida ändringar",
        body: [
          "Om vi senare lägger till konton, betalningar, analys, e-postinloggning eller molnsynk av framsteg måste den här policyn uppdateras innan funktionerna släpps.",
          "Den här sidan är produktvägledning, inte juridisk rådgivning. Inför en större publik lansering är en GDPR-granskning fortfarande värd att göra."
        ]
      }
    ]
  };
