# Focused Second-Pass Review Prompt: Swedish Citizenship Civics Practice Bank

You are doing a focused second-pass review of a Swedish citizenship civics practice question bank.

This is not a first review. A previous Claude review found 239 issues. We have already applied concrete fixes and replaced the rejected duplicate/low-value questions. HY3 reviewed the 58 replacement questions and approved them after 2 small fixes.

Your job now is to find only remaining high-risk issues.

## Files to review

Review the compiled production candidate files in this folder:

`/Users/daryl/develop/swedenmigrantprep/src/content/compiled/`

Chapter files:

1. `/Users/daryl/develop/swedenmigrantprep/src/content/compiled/chapter-01-sweden-as-country.json`
2. `/Users/daryl/develop/swedenmigrantprep/src/content/compiled/chapter-02-democratic-system.json`
3. `/Users/daryl/develop/swedenmigrantprep/src/content/compiled/chapter-03-how-sweden-is-governed.json`
4. `/Users/daryl/develop/swedenmigrantprep/src/content/compiled/chapter-04-political-elections-and-parties.json`
5. `/Users/daryl/develop/swedenmigrantprep/src/content/compiled/chapter-05-law-and-justice.json`
6. `/Users/daryl/develop/swedenmigrantprep/src/content/compiled/chapter-06-role-of-media.json`
7. `/Users/daryl/develop/swedenmigrantprep/src/content/compiled/chapter-07-human-rights.json`
8. `/Users/daryl/develop/swedenmigrantprep/src/content/compiled/chapter-08-work-economy.json`
9. `/Users/daryl/develop/swedenmigrantprep/src/content/compiled/chapter-09-welfare-society.json`
10. `/Users/daryl/develop/swedenmigrantprep/src/content/compiled/chapter-10-modern-history.json`
11. `/Users/daryl/develop/swedenmigrantprep/src/content/compiled/chapter-11-sweden-and-world.json`
12. `/Users/daryl/develop/swedenmigrantprep/src/content/compiled/chapter-12-secular-state.json`
13. `/Users/daryl/develop/swedenmigrantprep/src/content/compiled/chapter-13-traditions.json`

Helpful context files, if you need them:

- Previous raw Claude findings:
  `/Users/daryl/develop/swedenmigrantprep/src/content/compiled/_review-findings.json`
- Triage/control file showing what was applied, replaced, deferred, or left open:
  `/Users/daryl/develop/swedenmigrantprep/src/content/compiled/_claude-triage.json`
- The 58 replacement questions reviewed by HY3:
  `/Users/daryl/develop/swedenmigrantprep/content/review-batches/claude-replacement-58.json`
- HY3 review of those replacements:
  `/Users/daryl/develop/swedenmigrantprep/content/review-batches/claude-replacement-58.review.json`

## Important context

- Current compiled bank target: 1000 questions.
- All questions are practice questions, not official exam questions.
- Questions and answer options are in Swedish.
- English fields are helper translations/explanations for review and learner support.
- `correctIndex` may be 0 or another valid index. Do not flag answer-position pattern.
- Do not re-report minor suggestions from the previous review unless they are now genuinely production-blocking.

## Review scope

Only report issues that are important enough to fix before production.

Report these:

1. **Factual errors or misleading civic content**
   - Swedish law, institutions, elections, welfare responsibilities, rights, media, history, secular state, traditions.
   - Anything outdated or likely to teach the learner the wrong thing.

2. **Multiple-correct-answer or ambiguous-answer problems**
   - More than one option is defensibly correct.
   - The keyed answer is not clearly the best.

3. **Major Swedish wording problems**
   - Swedish that is ungrammatical, unnatural, or confusing enough to block a B1/B2 learner.
   - Do not report tiny style preferences.

4. **Severe distractor problems**
   - Absurd/joke distractors that make the item useless.
   - Distractors from the wrong category that make the answer trivial.
   - Do not report a distractor merely because it is easier than the correct answer.

5. **High-value duplicate problems**
   - Exact or near-identical duplicates that still remain after the replacement pass.
   - Only report duplicates that add little value and should be replaced.
   - Do not over-report repeated core themes where the scenario or angle differs.

6. **Official-question risk**
   - Anything that appears too close to official exam wording.

Ignore these unless severe:

- Minor polish.
- Small difficulty-label disagreements.
- Repeated concepts with different scenarios.
- The fact that many correct answers are first.
- Suggestions that are merely “could be more nuanced.”

## Output format

Return one JSON array only. Do not include markdown outside the JSON.

Include only issues that need action. If no production-blocking issues remain, return an empty array: `[]`.

Each finding should use this schema:

```json
{
  "id": "question-id",
  "file": "chapter-xx-name.json",
  "verdict": "needs_edit" | "replace",
  "severity": "blocker" | "major",
  "issueType": "factual" | "ambiguous_answer" | "swedish" | "distractor" | "duplicate" | "official_risk" | "other",
  "issues": [
    "Concrete explanation of the issue and why it matters before production."
  ],
  "duplicateOf": "Optional id if this is a duplicate.",
  "suggestedQuestionSv": "Optional replacement Swedish question.",
  "suggestedQuestionEn": "Optional replacement English helper question.",
  "suggestedOptions": [
    "Correct Swedish option first unless you explicitly set another suggestedCorrectIndex.",
    "Wrong option 1.",
    "Wrong option 2.",
    "Wrong option 3."
  ],
  "suggestedOptionsEn": [
    "Correct English helper option.",
    "Wrong option 1 helper.",
    "Wrong option 2 helper.",
    "Wrong option 3 helper."
  ],
  "suggestedCorrectIndex": 0,
  "suggestedExplanationEn": "Optional improved explanation."
}
```

Be strict on true production risks, but do not create a large polish list.
