export type Topic = {
  id: string;
  nameSv: string;
  nameEn: string;
  descriptionEn: string;
};

export type Chapter = {
  id: string;
  number: number;
  nameSv: string;
  topicId: string;
};

export type ExplanationLanguage = "sv" | "en" | "ar" | "fa" | "so" | "ti" | "zh";

export type UiLanguage = "sv" | "en" | "ar" | "fa" | "so" | "ti" | "zh";

export type Question = {
  id: string;
  topicId: string;
  chapterId: string;
  questionSv: string;
  options: string[];
  correctIndex: number;
  translations?: Partial<Record<UiLanguage, {
    question: string;
    options: string[];
  }>>;
  explanations: Partial<Record<ExplanationLanguage, string>>;
};

export type Lesson = {
  id: string;
  topicId: string;
  chapterNumbers: number[];
  titleSv: string;
  titles: Partial<Record<UiLanguage, string>> & { en: string };
  studyText: Partial<Record<UiLanguage, string[]>> & { en: string[] };
  takeaways: Partial<Record<UiLanguage, string[]>> & { en: string[] };
  vocabulary: {
    sv: string;
    translations: Partial<Record<UiLanguage, string>> & { en: string };
  }[];
  questionIds: string[];
};

export type Progress = {
  todayKey: string;
  today: number;
  total: number;
  answeredIds: string[];
  answers: Record<string, {
    attempts: number;
    correct: number;
    wrong: number;
    lastCorrect: boolean;
  }>;
};
