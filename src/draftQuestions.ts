import chapter01 from "./content/drafts/chapter-01-sweden-as-country.json";
import chapter02 from "./content/drafts/chapter-02-democratic-system.json";
import chapter03 from "./content/drafts/chapter-03-how-sweden-is-governed.json";
import chapter04 from "./content/drafts/chapter-04-political-elections-and-parties.json";
import chapter05 from "./content/drafts/chapter-05-law-and-justice.json";
import chapter06 from "./content/drafts/chapter-06-role-of-media.json";
import chapter07 from "./content/drafts/chapter-07-human-rights.json";
import chapter08 from "./content/drafts/chapter-08-work-economy.json";
import chapter09 from "./content/drafts/chapter-09-welfare-society.json";
import chapter10 from "./content/drafts/chapter-10-modern-history.json";
import chapter11 from "./content/drafts/chapter-11-sweden-and-world.json";
import chapter12 from "./content/drafts/chapter-12-secular-state.json";
import chapter13 from "./content/drafts/chapter-13-traditions.json";
export type DraftQuestionStatus = "draft" | "approved" | "needs_edit" | "rejected";
export type DraftQuestionDifficulty = "easy" | "medium" | "hard";

export type DraftQuestion = {
  id: string;
  chapterId: string;
  chapterNumber: number;
  topicId: string;
  difficulty: DraftQuestionDifficulty;
  tags: string[];
  source?: string;
  questionSv: string;
  questionEn: string;
  options: string[];
  optionsEn: string[];
  correctIndex: number;
  explanationEn: string;
  reviewerNote?: string;
  status: DraftQuestionStatus;
};

export const DRAFT_QUESTIONS: DraftQuestion[] = [
  ...(chapter01 as DraftQuestion[]),
  ...(chapter02 as DraftQuestion[]),
  ...(chapter03 as DraftQuestion[]),
  ...(chapter04 as DraftQuestion[]),
  ...(chapter05 as DraftQuestion[]),
  ...(chapter06 as DraftQuestion[]),
  ...(chapter07 as DraftQuestion[]),
  ...(chapter08 as DraftQuestion[]),
  ...(chapter09 as DraftQuestion[]),
  ...(chapter10 as DraftQuestion[]),
  ...(chapter11 as DraftQuestion[]),
  ...(chapter12 as DraftQuestion[]),
  ...(chapter13 as DraftQuestion[])
];
