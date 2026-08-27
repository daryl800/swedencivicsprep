# Chinese question translation task

Translate the attached Swedish civics practice question batch into Simplified Chinese. The app will derive Traditional Chinese automatically from the Simplified Chinese output, so only return Simplified Chinese fields.

## Important rules

- Return valid JSON only. No markdown, no commentary.
- Keep every `id` exactly unchanged.
- Do not change Swedish text, English text, answer order, `correctIndex`, chapter IDs, tags, or difficulty.
- Ignore the fact that many correct answers are at index 0. The app shuffles options at render time.
- Translate for learners who may not be strong in Swedish. Use clear natural Simplified Chinese, not word-for-word machine style.
- Keep Swedish institution names when useful, with short Chinese meaning if needed. Example: `Riksdagen（瑞典国会）`, `Försäkringskassan（社会保险局）`.
- Preserve legal/civic precision. Do not simplify so much that the meaning changes.
- Avoid absurd or joking phrasing. Distractors should still sound like real possible misunderstandings when translated.
- If a Swedish/English source item is unclear, do not rewrite it. Translate it and add a short `translatorNote` explaining the concern.

## Output schema

Return an array with exactly one item for each input question:

```json
[
  {
    "id": "draft-ch01-001",
    "questionZh": "...",
    "optionsZh": ["...", "...", "...", "..."],
    "explanationZh": "..."
  }
]
```

Optional only when needed:

```json
{ "translatorNote": "..." }
```

## Quality checklist

Before returning, check:

- Every item has `questionZh`, exactly 4 `optionsZh`, and `explanationZh`.
- The Chinese correct option still matches the source correct answer.
- The explanation teaches the concept, not just repeats the answer.
- Terminology is consistent across the batch.
- The output is parseable JSON.
