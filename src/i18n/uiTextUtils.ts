import type { UiText } from "./uiTextTypes";

export function createLocalizedUiText(base: UiText, overrides: Partial<UiText>): UiText {
  return {
    ...base,
    ...overrides,
    chapterNames: { ...base.chapterNames, ...overrides.chapterNames },
    chapterSummaries: { ...base.chapterSummaries, ...overrides.chapterSummaries },
    topicNames: { ...base.topicNames, ...overrides.topicNames },
    topicFlavor: { ...base.topicFlavor, ...overrides.topicFlavor },
    topicDescriptions: { ...base.topicDescriptions, ...overrides.topicDescriptions }
  };
}
