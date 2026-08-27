import type { CitizenshipUpdateText, FaqContent, LegalContent } from "../../contentTypes";
import { zhCitizenshipUpdate, zhFaqContent, zhLegalContent } from "./zh";
import { toTraditionalChinese } from "../zhHantConvert";

export const zhHantCitizenshipUpdate: CitizenshipUpdateText = toTraditionalChinese(zhCitizenshipUpdate);
export const zhHantFaqContent: FaqContent = toTraditionalChinese(zhFaqContent);
export const zhHantLegalContent: LegalContent = toTraditionalChinese(zhLegalContent);
