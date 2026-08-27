import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const draftsDir = path.join(rootDir, "src", "content", "drafts");
const inputPath = process.argv[2] ? path.resolve(process.argv[2]) : path.join(rootDir, "content", "translation-batches", "all-chapters.zh-Hant-corrections.json");

if (!fs.existsSync(inputPath)) {
  console.error("Traditional Chinese corrections file not found: " + inputPath);
  process.exit(1);
}

const corrections = JSON.parse(fs.readFileSync(inputPath, "utf8"));
if (!Array.isArray(corrections)) {
  console.error("Corrections file must be a JSON array.");
  process.exit(1);
}

const byId = new Map();
const issues = [];
for (const item of corrections) {
  if (!item?.id) {
    issues.push("Correction item missing id.");
    continue;
  }
  if (byId.has(item.id)) issues.push("Duplicate correction id: " + item.id);
  if (!item.questionZhHant?.trim()) issues.push(item.id + " missing questionZhHant");
  if (!Array.isArray(item.optionsZhHant) || item.optionsZhHant.length !== 4 || item.optionsZhHant.some((option) => !option?.trim())) {
    issues.push(item.id + " must have exactly 4 non-empty optionsZhHant values");
  }
  if (!item.explanationZhHant?.trim()) issues.push(item.id + " missing explanationZhHant");
  byId.set(item.id, item);
}

if (issues.length > 0) {
  console.error("Found " + issues.length + " Traditional Chinese correction issue(s):");
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
    const correction = byId.get(question.id);
    if (!correction) continue;

    question.questionZhHant = correction.questionZhHant.trim();
    question.optionsZhHant = correction.optionsZhHant.map((option) => option.trim());
    question.explanationZhHant = correction.explanationZhHant.trim();
    missingIds.delete(question.id);
    applied += 1;
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, JSON.stringify(questions, null, 2) + "\n");
  }
}

if (missingIds.size > 0) {
  console.error("Could not find " + missingIds.size + " corrected id(s) in drafts:");
  [...missingIds].slice(0, 20).forEach((id) => console.error("- " + id));
  process.exit(1);
}

console.log("Applied " + applied + " Traditional Chinese corrections from " + path.relative(rootDir, inputPath) + ".");
