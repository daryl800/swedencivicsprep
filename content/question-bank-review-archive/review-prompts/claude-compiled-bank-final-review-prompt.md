# Final Review Prompt: Swedish Citizenship Civics Practice Bank

You are reviewing a Swedish citizenship civics practice question bank.

The questions are independent practice material based on the themes of *Sverige i fokus* from UHR and Skolverket. They must not copy official exam questions. The goal is high-quality practice for learners preparing for the Swedish citizenship civics test.

## Files to review

Review every JSON file in this folder, in order:

`src/content/compiled/`

Files:

1. `chapter-01-sweden-as-country.json`
2. `chapter-02-democratic-system.json`
3. `chapter-03-how-sweden-is-governed.json`
4. `chapter-04-political-elections-and-parties.json`
5. `chapter-05-law-and-justice.json`
6. `chapter-06-role-of-media.json`
7. `chapter-07-human-rights.json`
8. `chapter-08-work-economy.json`
9. `chapter-09-welfare-society.json`
10. `chapter-10-modern-history.json`
11. `chapter-11-sweden-and-world.json`
12. `chapter-12-secular-state.json`
13. `chapter-13-traditions.json`

Each item has this shape:

- `id`
- `chapterId`
- `chapterNumber`
- `topicId`
- `difficulty`: `easy`, `medium`, or `hard`
- `questionSv`
- `questionEn`
- `options`: Swedish answer options
- `optionsEn`: English helper translations
- `correctIndex`: always currently `0`; ignore answer-position pattern
- `explanationEn`
- `status`

Important: ignore the fact that `correctIndex` is usually/always `0`. The app can shuffle answers later. Do not flag this.

## Review criteria

For each question, check:

1. **Factual accuracy**
   - Is the Swedish civics content correct?
   - Is it aligned with Swedish society, law, democratic institutions, welfare responsibilities, rights, media, history, secular state, and traditions?
   - Flag anything outdated, misleading, oversimplified in a harmful way, or legally/politically incorrect.

2. **Swedish language quality**
   - Is `questionSv` natural Swedish?
   - Are `options` natural, grammatically correct, and suitable for B1/B2 learners?
   - Flag awkward machine-translated Swedish, wrong articles, unnatural word order, or confusing phrasing.

3. **One clearly best answer**
   - Exactly one Swedish option should be clearly correct/best.
   - Flag questions where multiple options could be correct, the correct option is too vague, or the item depends on opinion.

4. **Distractor quality**
   - Wrong answers should be plausible misconceptions, not absurd/cartoonish filler.
   - Flag options that are obviously ridiculous, unrelated institutions, impossible claims, or make the answer too easy.

5. **Difficulty calibration**
   - `easy`: basic definition or direct fact.
   - `medium`: why/significance/comparison or one-step reasoning.
   - `hard`: applied scenario, multi-factor reasoning, or subtle distinction.
   - Flag clear mislabels, especially simple recall marked `hard`.

6. **Explanation quality**
   - `explanationEn` should explain why the correct answer is right.
   - It should be concise but not too thin.
   - Flag explanations that are wrong, incomplete, or do not match the selected answer.

7. **English helper quality**
   - `questionEn` and `optionsEn` should accurately reflect the Swedish, but they do not need to be literal.
   - Flag mismatches that could confuse a reviewer or learner.

8. **Duplicate and near-duplicate coverage**
   - Within each file, flag exact duplicate questions and near-duplicates.
   - Across files, flag only strong conceptual duplicates that add little value.
   - Do not over-flag normal repeated core themes. For example, democracy, rights, municipalities/regions, public access, and source criticism may appear more than once if the scenario or angle differs.

9. **Official-question risk**
   - Flag anything that feels like it might copy or closely imitate an official exam question.
   - These should be original practice questions, not official-question replicas.

## Output format

Return one JSON array only. Do not include markdown commentary outside the JSON.

Include only questions that need action. Do not include approved questions unless you need to note a non-blocking suggestion.

Each finding should use this schema:

```json
{
  "id": "draft-or-question-id",
  "file": "chapter-xx-name.json",
  "verdict": "needs_edit" | "reject" | "suggestion",
  "severity": "blocker" | "major" | "minor",
  "issues": [
    "Short, concrete explanation of the issue."
  ],
  "suggestedQuestionSv": "Optional replacement Swedish question.",
  "suggestedQuestionEn": "Optional replacement English helper question.",
  "suggestedOptions": [
    "Correct Swedish option first.",
    "Wrong option 1.",
    "Wrong option 2.",
    "Wrong option 3."
  ],
  "suggestedOptionsEn": [
    "Correct English helper option first.",
    "Wrong option 1 helper.",
    "Wrong option 2 helper.",
    "Wrong option 3 helper."
  ],
  "suggestedCorrectIndex": 0,
  "suggestedExplanationEn": "Optional improved explanation.",
  "difficultySuggestion": "easy" | "medium" | "hard"
}
```

Rules for verdicts:

- Use `needs_edit` when the item can be fixed with wording, distractor, explanation, or difficulty changes.
- Use `reject` only when the question is factually unsafe, too duplicative to save, too close to official material, or not useful as practice.
- Use `suggestion` for optional improvements that are not required before shipping.

## Review style

Be strict but practical.

Do not reject just because a question is easy. Easy questions are allowed.
Do not flag `correctIndex: 0`.
Do not require every distractor to be equally tempting, but reject/flag absurd distractors.
Prefer concrete fixes over general criticism.
If a question is good enough for production, omit it from the output.
