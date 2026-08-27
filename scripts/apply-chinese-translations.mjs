import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const draftsDir = path.join(rootDir, "src", "content", "drafts");
const inputPath = process.argv[2] ? path.resolve(process.argv[2]) : path.join(rootDir, "content", "translation-batches", "approved.zh-translations.json");

if (!fs.existsSync(inputPath)) {
  console.error("Translation file not found: " + inputPath);
  process.exit(1);
}

const translations = JSON.parse(fs.readFileSync(inputPath, "utf8"));
if (!Array.isArray(translations)) {
  console.error("Translation file must be a JSON array.");
  process.exit(1);
}

const byId = new Map();
const issues = [];
for (const item of translations) {
  if (!item?.id) {
    issues.push("Translation item missing id.");
    continue;
  }
  if (byId.has(item.id)) issues.push("Duplicate translation id: " + item.id);
  if (!item.questionZh?.trim()) issues.push(item.id + " missing questionZh");
  if (!Array.isArray(item.optionsZh) || item.optionsZh.length !== 4 || item.optionsZh.some((option) => !option?.trim())) {
    issues.push(item.id + " must have exactly 4 non-empty optionsZh values");
  }
  if (!item.explanationZh?.trim()) issues.push(item.id + " missing explanationZh");
  byId.set(item.id, item);
}

if (issues.length > 0) {
  console.error("Found " + issues.length + " translation issue(s):");
  issues.forEach((issue) => console.error("- " + issue));
  process.exit(1);
}

let applied = 0;
const missingIds = new Set(byId.keys());

for (const file of fs.readdirSync(draftsDir).filter((name) => name.endsWith(".json")).sort()) {
  const filePath = path.join(draftsDir, file);
  const questions = JSON.parse(fs.readFileSync(filePath, "utf8"));
  let changed = false;

  for (const question of questions) {
    const translation = byId.get(question.id);
    if (!translation) continue;

    question.questionZh = translation.questionZh.trim();
    question.optionsZh = translation.optionsZh.map((option) => option.trim());
    question.explanationZh = translation.explanationZh.trim();
    missingIds.delete(question.id);
    applied += 1;
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, JSON.stringify(questions, null, 2) + "\n");
  }
}

if (missingIds.size > 0) {
  console.error("Could not find " + missingIds.size + " translated id(s) in drafts:");
  [...missingIds].slice(0, 20).forEach((id) => console.error("- " + id));
  process.exit(1);
}

console.log("Applied " + applied + " Chinese translations from " + path.relative(rootDir, inputPath) + ".");
