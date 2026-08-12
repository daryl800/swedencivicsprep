const POSTHOG_HOST = process.env.POSTHOG_API_HOST || "https://eu.posthog.com";
const POSTHOG_PROJECT_ID = process.env.POSTHOG_PROJECT_ID;
const POSTHOG_PERSONAL_API_KEY = process.env.POSTHOG_PERSONAL_API_KEY;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const TRACKED_EVENTS = [
  "page_viewed",
  "language_changed",
  "topic_selected",
  "study_guide_opened",
  "practice_started",
  "question_answered",
  "question_translation_toggled",
  "topic_completed",
  "feedback_submitted"
];

const QUERIES = {
  visitors: "SELECT count(DISTINCT distinct_id) FROM events WHERE timestamp >= now() - INTERVAL 30 DAY",
  pageViews: "SELECT count() FROM events WHERE event = 'page_viewed' AND timestamp >= now() - INTERVAL 30 DAY",
  questionsAnswered: "SELECT count() FROM events WHERE event = 'question_answered' AND timestamp >= now() - INTERVAL 30 DAY",
  practiceStarts: "SELECT count() FROM events WHERE event = 'practice_started' AND timestamp >= now() - INTERVAL 30 DAY",
  feedbackSubmissions: "SELECT count() FROM events WHERE event = 'feedback_submitted' AND timestamp >= now() - INTERVAL 30 DAY",
  languages:
    "SELECT coalesce(properties.toLanguage, properties.uiLanguage, 'unknown'), count() FROM events WHERE event = 'language_changed' AND timestamp >= now() - INTERVAL 30 DAY GROUP BY coalesce(properties.toLanguage, properties.uiLanguage, 'unknown') ORDER BY count() DESC LIMIT 8",
  topics:
    "SELECT properties.topicId, count() FROM events WHERE event IN ('topic_selected', 'practice_started', 'question_answered') AND timestamp >= now() - INTERVAL 30 DAY GROUP BY properties.topicId ORDER BY count() DESC LIMIT 8",
  correctness:
    "SELECT properties.isCorrect, count() FROM events WHERE event = 'question_answered' AND timestamp >= now() - INTERVAL 30 DAY GROUP BY properties.isCorrect",
  eventCounts:
    `SELECT event, count() FROM events WHERE event IN (${TRACKED_EVENTS.map((eventName) => `'${eventName}'`).join(", ")}) AND timestamp >= now() - INTERVAL 30 DAY GROUP BY event ORDER BY event ASC`
};

export default async function handler(request, response) {
  response.setHeader("Cache-Control", "no-store");

  if (request.method !== "GET") {
    return response.status(405).json({ error: "Method not allowed" });
  }

  const providedPassword = request.headers["x-admin-password"];

  if (!ADMIN_PASSWORD || providedPassword !== ADMIN_PASSWORD) {
    return response.status(401).json({ error: "Unauthorized" });
  }

  if (!POSTHOG_PROJECT_ID || !POSTHOG_PERSONAL_API_KEY) {
    return response.status(503).json({
      error: "PostHog admin API is not configured",
      requiredEnv: ["POSTHOG_PROJECT_ID", "POSTHOG_PERSONAL_API_KEY", "ADMIN_PASSWORD"]
    });
  }

  try {
    const results = await Promise.all(
      Object.entries(QUERIES).map(async ([key, query]) => [key, await runHogQl(query)])
    );
    const data = Object.fromEntries(results);
    const correctnessRows = data.correctness?.results || [];
    const correct = getGroupedCount(correctnessRows, true);
    const incorrect = getGroupedCount(correctnessRows, false);
    const totalAnswers = correct + incorrect;

    return response.status(200).json({
      generatedAt: new Date().toISOString(),
      range: "Last 30 days",
      overview: {
        visitors: getSingleCount(data.visitors),
        pageViews: getSingleCount(data.pageViews),
        questionsAnswered: getSingleCount(data.questionsAnswered),
        practiceStarts: getSingleCount(data.practiceStarts),
        feedbackSubmissions: getSingleCount(data.feedbackSubmissions),
        correctRate: totalAnswers > 0 ? Math.round((correct / totalAnswers) * 100) : 0
      },
      languages: toBreakdown(data.languages),
      topics: toBreakdown(data.topics),
      events: withMissingEvents(toBreakdown(data.eventCounts)),
      configured: true
    });
  } catch (error) {
    return response.status(502).json({
      error: "Could not fetch PostHog stats",
      detail: error instanceof Error ? error.message : "Unknown error"
    });
  }
}

async function runHogQl(query) {
  const url = `${POSTHOG_HOST.replace(/\/$/, "")}/api/projects/${POSTHOG_PROJECT_ID}/query/`;
  const posthogResponse = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${POSTHOG_PERSONAL_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query: {
        kind: "HogQLQuery",
        query
      }
    })
  });

  if (!posthogResponse.ok) {
    const body = await posthogResponse.text();
    throw new Error(`PostHog query failed (${posthogResponse.status}): ${body}`);
  }

  return posthogResponse.json();
}

function getSingleCount(data) {
  return Number(data?.results?.[0]?.[0] || 0);
}

function getGroupedCount(rows, groupValue) {
  const row = rows.find(([value]) => value === groupValue || String(value) === String(groupValue));
  return Number(row?.[1] || 0);
}

function toBreakdown(data) {
  return (data?.results || []).map(([name, count]) => ({
    name: String(name || "unknown"),
    count: Number(count || 0)
  }));
}

function withMissingEvents(eventCounts) {
  const countByName = new Map(eventCounts.map((event) => [event.name, event.count]));

  return TRACKED_EVENTS.map((eventName) => ({
    name: eventName,
    count: countByName.get(eventName) || 0
  }));
}
