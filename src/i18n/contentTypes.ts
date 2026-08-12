export type CitizenshipUpdateText = {
  title: string;
  source: string;
  summary: string;
  intro: string;
  bullets: string[];
  note: string;
  migrationsverketLink: string;
  uhrLink: string;
};

export type FaqContent = { title: string; intro: string; items: { question: string; answer: string }[] };

export type LegalContent = {
  homeLink: string;
  privacyLink: string;
  footerNote: string;
  title: string;
  updated: string;
  intro: string;
  sections: { title: string; body: string[] }[];
};
