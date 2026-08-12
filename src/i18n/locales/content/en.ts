import type { CitizenshipUpdateText, FaqContent, LegalContent } from "../../contentTypes";

export const enCitizenshipUpdate: CitizenshipUpdateText = {
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
  };

export const enFaqContent: FaqContent = {
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
        answer: "For this preview version, progress is saved only in your browser on this device. There are no accounts yet, so progress does not sync across devices."
      },
      {
        question: "Is it free?",
        answer: "Yes, this early version is free while we collect feedback from real learners. Later versions may add accounts, more content, or paid features."
      },
      {
        question: "Does it simulate the full 60-question exam?",
        answer: "Not yet. The preview version is topic practice. A timed mixed mock exam is a good next step once the question bank is larger."
      }
    ]
  };

export const enLegalContent: LegalContent = {
    homeLink: "Back to home",
    privacyLink: "Terms & privacy",
    footerNote: "Original practice questions based on public study themes. Not official exam questions.",
    title: "Terms & Privacy",
    updated: "Last updated: 10 August 2026",
    intro: "This page explains how Swedish Civics Test Preparation works today. It is intentionally short because the preview version has no accounts, payments, backend database, or advertising trackers.",
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
        title: "Privacy in the preview version",
        body: [
          "There are no user accounts, payments, contact forms, analytics pixels, or backend-stored profiles in this preview version.",
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
  };
