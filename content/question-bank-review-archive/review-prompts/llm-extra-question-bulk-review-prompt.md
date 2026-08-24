# LLM Bulk Review Prompt: Extra Swedish Citizenship Civics Draft Questions

You are reviewing extra draft practice questions for an independent Swedish citizenship civics practice app. These are NOT official exam questions and must not copy official question wording. They should be original practice questions based on public study themes from UHR's Sverige i fokus.

These are extra expansion questions. Be stricter than usual: the goal is not to keep every question, but to keep only questions that add useful coverage, nuance, scenario practice, or misconception testing. It is acceptable to reject weak questions.

Important draft convention:

- Ignore `correctIndex: 0` as a pattern problem. In these draft files the correct answer is intentionally stored first. The app shuffles answer options at runtime.
- Still check that option 0 is actually correct and that exactly one option is clearly best.

Review all attached JSON files for:

1. Factual accuracy about Swedish society, democracy, institutions, laws, rights, welfare, work, history, religion, traditions, and international cooperation.
2. Swedish wording quality: natural, clear, B1/B2-friendly, no awkward machine translation.
3. Correct-answer validity: exactly one option should be clearly best.
4. Distractor quality: wrong answers should be plausible but clearly wrong after study.
5. Absurd answer detection: flag options that are cartoonish, impossible, unrelated, nonsensical, or so silly that the correct answer is obvious without knowing the topic.
6. Difficulty: flag questions that are too easy, too hard, or mislabeled. Do not force a hard label if the chapter/topic naturally supports mostly easy or medium questions.
7. Ambiguity: flag if multiple options could reasonably be interpreted as correct.
8. Duplication: flag exact or near duplicates within the attached extra files. Also flag questions that look like same-concept repeats of earlier core-bank questions if you remember them or can infer likely overlap.
9. Value-add: reject or edit questions that merely rephrase basic definitions already likely covered in the core bank, unless the new version adds a scenario, comparison, misconception, or sharper nuance.
10. Independence: flag anything that sounds like copied official exam wording.
11. Explanation quality: concise, accurate, and aligned with the correct answer.

Prefer these verdicts:

- `approve`: factually sound, clear Swedish, one correct answer, useful as an extra question.
- `needs_edit`: useful concept, but wording/options/explanation/difficulty should be fixed.
- `reject`: duplicate, too generic, too shallow, factually risky, not enough value-add, or mostly artificial filler.

When suggesting replacement options:

- Keep the correct answer at index 0.
- Give exactly four Swedish options.
- Make distractors plausible real misconceptions, not jokes or obviously impossible claims.
- If you change the meaning of the correct answer, also provide an updated English explanation.

Return JSON only. Do not include prose outside the JSON.

Use this schema:

[{
  "id": "draft-extra-ch01-001",
  "verdict": "approve | needs_edit | reject",
  "issues": ["short, specific issue"],
  "duplicateOf": "optional question id or short description",
  "suggestedQuestionSv": "optional replacement Swedish question",
  "suggestedOptions": ["optional", "exactly", "four", "Swedish options"],
  "suggestedCorrectIndex": 0,
  "suggestedExplanationEn": "optional replacement English explanation",
  "difficultySuggestion": "easy | medium | hard"
}]
