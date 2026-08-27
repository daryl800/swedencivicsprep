# Traditional Chinese wording review

Review the attached generated Traditional Chinese file for a Swedish civics practice app.

The Simplified Chinese translation has already been accepted. The Traditional Chinese text was generated from Simplified Chinese, so your job is to improve Traditional Chinese tone and wording only where needed.

## Rules

- Return valid JSON only. No markdown.
- Only include items that need changes. If an item is acceptable, omit it.
- Keep every id exactly unchanged.
- Do not change the Swedish question or answer meaning.
- Do not change answer order.
- Use natural Traditional Chinese for Hong Kong/Taiwan readers, but keep wording broadly understandable.
- Prefer clear learner-friendly wording over formal legalese, unless a legal/civic term needs precision.
- Keep Swedish institution names when useful, for example Riksdagen, Försäkringskassan, Migrationsverket, UHR.
- Fix Mainland-style terms, awkward conversion artifacts, unnatural rhythm, and regionally odd phrases.

## Output schema

Return an array of corrections only:

[
  {
    "id": "draft-ch01-001",
    "questionZhHant": "...",
    "optionsZhHant": ["...", "...", "...", "..."],
    "explanationZhHant": "...",
    "issues": ["Short reason for change"]
  }
]

If only one field needs changing, still include the full corrected question/options/explanation for that id.
