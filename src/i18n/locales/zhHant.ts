import { zhUiText } from "./zh";
import type { UiText } from "../uiTextTypes";
import { toTraditionalChinese } from "./zhHantConvert";

export const zhHantUiText: UiText = {
  ...toTraditionalChinese(zhUiText),
  appLanguage: "應用語言",
  appLanguageHint: "題目保持瑞典語。"
};
