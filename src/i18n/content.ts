import type { UiLanguage } from "../types";
import { arCitizenshipUpdate, arFaqContent, arLegalContent } from "./locales/content/ar";
import { enCitizenshipUpdate, enFaqContent, enLegalContent } from "./locales/content/en";
import { faCitizenshipUpdate, faFaqContent, faLegalContent } from "./locales/content/fa";
import { soCitizenshipUpdate, soFaqContent, soLegalContent } from "./locales/content/so";
import { svCitizenshipUpdate, svFaqContent, svLegalContent } from "./locales/content/sv";
import { tiCitizenshipUpdate, tiFaqContent, tiLegalContent } from "./locales/content/ti";
import { zhCitizenshipUpdate, zhFaqContent, zhLegalContent } from "./locales/content/zh";
import type { CitizenshipUpdateText, FaqContent, LegalContent } from "./contentTypes";

export const CITIZENSHIP_UPDATE: Record<UiLanguage, CitizenshipUpdateText> = {
  sv: svCitizenshipUpdate,
  en: enCitizenshipUpdate,
  so: soCitizenshipUpdate,
  fa: faCitizenshipUpdate,
  ti: tiCitizenshipUpdate,
  ar: arCitizenshipUpdate,
  zh: zhCitizenshipUpdate
};

export const FAQ_CONTENT: Record<UiLanguage, FaqContent> = {
  sv: svFaqContent,
  en: enFaqContent,
  so: soFaqContent,
  fa: faFaqContent,
  ti: tiFaqContent,
  ar: arFaqContent,
  zh: zhFaqContent
};

export const LEGAL_CONTENT: Record<UiLanguage, LegalContent> = {
  sv: svLegalContent,
  en: enLegalContent,
  so: soLegalContent,
  fa: faLegalContent,
  ti: tiLegalContent,
  ar: arLegalContent,
  zh: zhLegalContent
};
