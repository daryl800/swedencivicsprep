const PROGRESS_STORAGE_KEY = "swedish-civics-practice-progress-v1";

function getTodayKey() {
  return new Date().toISOString().slice(0, 10);
}

function loadProgress() {
  try {
    const raw = localStorage.getItem(PROGRESS_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : null;

    if (!parsed || typeof parsed !== "object") {
      return { todayKey: getTodayKey(), today: 0, total: 0, answeredIds: [] };
    }

    const todayKey = getTodayKey();
    return {
      todayKey,
      today: parsed.todayKey === todayKey ? Number(parsed.today || 0) : 0,
      total: Number(parsed.total || 0),
      answeredIds: Array.isArray(parsed.answeredIds) ? parsed.answeredIds : []
    };
  } catch {
    return { todayKey: getTodayKey(), today: 0, total: 0, answeredIds: [] };
  }
}

function saveProgress(progress) {
  localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
}

function recordAnswered(questionId) {
  const progress = loadProgress();
  progress.today += 1;
  progress.total += 1;

  if (!progress.answeredIds.includes(questionId)) {
    progress.answeredIds.push(questionId);
  }

  saveProgress(progress);
  return progress;
}

function resetProgress() {
  const progress = { todayKey: getTodayKey(), today: 0, total: 0, answeredIds: [] };
  saveProgress(progress);
  return progress;
}
