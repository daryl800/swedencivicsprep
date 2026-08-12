import { arUiText } from "./locales/ar";
import { enUiText } from "./locales/en";
import { faUiText } from "./locales/fa";
import { soUiText } from "./locales/so";
import { svUiText } from "./locales/sv";
import { tiUiText } from "./locales/ti";
import { zhUiText } from "./locales/zh";
import type { UiLanguage } from "../types";
import type { CoreUiLanguage, UiText } from "./uiTextTypes";

export type { CoreUiLanguage, UiText } from "./uiTextTypes";

export const UI_TEXT_BASE: Record<CoreUiLanguage, UiText> = {
  sv: svUiText,
  en: enUiText,
  ar: arUiText,
  zh: zhUiText
};

export const UI_TEXT: Record<UiLanguage, UiText> = {
  ...UI_TEXT_BASE,
  so: soUiText,
  fa: faUiText,
  ti: tiUiText
};

export const SUPPORTED_LANGUAGES: { id: UiLanguage; label: string; nativeLabel: string; flag: string; shortLabel: string }[] = [
  { id: "sv", label: "Swedish", nativeLabel: "Svenska", flag: "🇸🇪", shortLabel: "SV" },
  { id: "en", label: "English", nativeLabel: "English", flag: "🇬🇧", shortLabel: "EN" },
  { id: "so", label: "Somali", nativeLabel: "Soomaali", flag: "🇸🇴", shortLabel: "SO" },
  { id: "fa", label: "Dari / Persian (Farsi)", nativeLabel: "دری / فارسی", flag: "🇦🇫", shortLabel: "FA" },
  { id: "ti", label: "Tigrinya", nativeLabel: "ትግርኛ", flag: "🇪🇷", shortLabel: "TI" },
  { id: "ar", label: "Arabic", nativeLabel: "العربية", flag: "🌍", shortLabel: "AR" },
  { id: "zh", label: "Chinese", nativeLabel: "中文", flag: "🇨🇳", shortLabel: "ZH" }
];
