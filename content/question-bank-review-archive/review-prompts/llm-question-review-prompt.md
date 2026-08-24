# LLM Review Prompt: Swedish Citizenship Civics Draft Questions

You are reviewing draft practice questions for an independent Swedish citizenship civics practice app. These are NOT official exam questions and must not copy official question wording. They should be original practice questions based on public study themes from UHR's Sverige i fokus.

Review the attached JSON file for:

1. Factual accuracy about Swedish society and democracy.
2. Swedish wording quality: natural, clear, B1/B2-friendly, no awkward machine translation.
3. Correct answer validity: exactly one option should be clearly best.
4. Distractor quality: wrong answers should be plausible but clearly wrong after study.
5. Difficulty: flag questions that are too easy, too hard, or mislabeled.
6. Ambiguity: flag if multiple options could be interpreted as correct.
7. Independence: flag anything that sounds like copied official exam wording.
8. Explanation quality: concise, accurate, and aligned with the correct answer.

Return feedback as JSON array:

[
  {
    "id": "draft-ch02-001",
    "verdict": "approve | needs_edit | reject",
    "issues": ["..."],
    "suggestedQuestionSv": "optional",
    "suggestedOptions": ["optional"],
    "suggestedCorrectIndex": 0,
    "suggestedExplanationEn": "optional",
    "difficultySuggestion": "easy | medium | hard"
  }
]
