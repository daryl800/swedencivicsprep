import type { CitizenshipUpdateText, FaqContent, LegalContent } from "../../contentTypes";

export const svCitizenshipUpdate: CitizenshipUpdateText = {
    title: "Viktiga fakta om medborgarskapsprovet",
    source: "Baserat på information från UHR",
    summary: "Det första provet i samhällskunskap genomfördes i augusti 2026. UHR skriver att provet är på svenska, på papper och består av flervalsfrågor. Offentlig rapportering beskrev det första provet som cirka 60 frågor på 90 minuter.",
    intro: "Det viktigaste för din förberedelse är enkelt:",
    bullets: [
      "samhällskunskapsprovet är på svenska",
      "frågorna är flervalsfrågor med fyra alternativ och ett rätt svar",
      "studiematerialet är Sverige i fokus från UHR och Skolverket",
      "nästa provdatum, antal frågor och provtid meddelas av UHR"
    ],
    note: "Därför fokuserar den här sidan på svenska övningsfrågor, tydliga förklaringar och vad du bör repetera härnäst.",
    migrationsverketLink: "Kontrollera kraven hos Migrationsverket",
    uhrLink: "Studera med Sverige i fokus"
  };

export const svFaqContent: FaqContent = {
    title: "FAQ",
    intro: "Korta svar för tidiga användare. Produkten är medvetet enkel medan vi testar vad som hjälper elever mest.",
    items: [
      {
        question: "Är Swedish Civics Test Preparation en officiell provtjänst?",
        answer: "Swedish Civics Test Preparation är ett oberoende studie- och träningsverktyg. Träningsfrågorna är originalfrågor baserade på offentligt officiellt studiematerial, så att du kan öva på svenska frågor och läsa förklaringar. För provregler, anmälan och ditt eget ärende är UHR och Migrationsverket de officiella källorna."
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
        answer: "Ja. Gratisnivån förblir gratis och innehåller provträning. Större frågebank, provträning och andra funktioner med full åtkomst kan kräva betalning senare."
      },
      {
        question: "Får man olika frågor i varje provträning?",
        answer: "Ja. Varje provträning väljer ett nytt blandat urval från den tillgängliga frågebanken och sprider frågorna över de officiella studiekapitlen, så upprepade försök ger bredare träning."
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
