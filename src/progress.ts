import type { Progress } from "./types";

const PROGRESS_STORAGE_KEY = "swedish-civics-practice-progress-v1";

function getTodayKey() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function loadProgress(): Progress {
  const empty = { todayKey: getTodayKey(), today: 0, total: 0, answeredIds: [], answers: {} };

  try {
    const raw = localStorage.getItem(PROGRESS_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : null;

    if (!parsed || typeof parsed !== "object") {
      return empty;
    }

    const todayKey = getTodayKey();
    return {
      todayKey,
      today: parsed.todayKey === todayKey ? Number(parsed.today || 0) : 0,
      total: Number(parsed.total || 0),
      answeredIds: Array.isArray(parsed.answeredIds) ? parsed.answeredIds : [],
      answers: parsed.answers && typeof parsed.answers === "object" ? parsed.answers : {}
    };
  } catch {
    return empty;
  }
}

export function saveProgress(progress: Progress) {
  localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
}

export function recordAnswered(questionId: string, isCorrect: boolean) {
  const progress = loadProgress();
  progress.today += 1;
  progress.total += 1;

  if (!progress.answeredIds.includes(questionId)) {
    progress.answeredIds.push(questionId);
  }

  const current = progress.answers[questionId] || { attempts: 0, correct: 0, wrong: 0, lastCorrect: false };
  progress.answers[questionId] = {
    attempts: current.attempts + 1,
    correct: current.correct + (isCorrect ? 1 : 0),
    wrong: current.wrong + (isCorrect ? 0 : 1),
    lastCorrect: isCorrect
  };

  saveProgress(progress);
  return progress;
}

export function resetProgress() {
  const progress: Progress = { todayKey: getTodayKey(), today: 0, total: 0, answeredIds: [], answers: {} };
  saveProgress(progress);
  return progress;
}
