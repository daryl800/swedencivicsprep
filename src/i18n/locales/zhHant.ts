import { zhUiText } from "./zh";
import type { UiText } from "../uiTextTypes";
import { toTraditionalChinese } from "./zhHantConvert";

export const zhHantUiText: UiText = {
  ...toTraditionalChinese(zhUiText),
  lead: "練習題目全面涵蓋 UHR 官方學習材料主題",
  heroTrustBadge: "題目預設為瑞典語，可隨時切換語言幫助理解 • 練習進度面板，可隨時掌握強弱項 • 無需下載 App，可隨時在手機或電腦上練習 ⭐",
  appLanguage: "應用語言",
  appLanguageHint: "題目預設為瑞典語，可隨時切換語言幫助理解。"
};
