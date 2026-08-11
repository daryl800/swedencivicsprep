export type Topic = {
  id: string;
  nameSv: string;
  nameEn: string;
  descriptionEn: string;
};

export type ExplanationLanguage = "en" | "ar" | "fa" | "so" | "zh";

export type UiLanguage = "en" | "ar" | "zh";

export type Question = {
  id: string;
  topicId: string;
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
  titles: Record<UiLanguage, string>;
  studyText: Record<UiLanguage, string[]>;
  takeaways: Record<UiLanguage, string[]>;
  vocabulary: {
    sv: string;
    translations: Record<UiLanguage, string>;
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
