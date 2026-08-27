import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const draftsDir = path.join(rootDir, "src", "content", "drafts");
const issues = [];
let count = 0;

for (const file of fs.readdirSync(draftsDir).filter((name) => name.endsWith(".json")).sort()) {
  const questions = JSON.parse(fs.readFileSync(path.join(draftsDir, file), "utf8"));
  for (const question of questions) {
    count += 1;
    const label = file + ":" + question.id;
    if (!question.questionZh?.trim()) issues.push(label + " missing questionZh");
    if (!Array.isArray(question.optionsZh) || question.optionsZh.length !== 4) {
      issues.push(label + " must have exactly 4 optionsZh values");
    } else if (question.optionsZh.some((option) => !option?.trim())) {
      issues.push(label + " has empty optionsZh value");
    }
    if (!question.explanationZh?.trim()) issues.push(label + " missing explanationZh");
  }
}

if (issues.length > 0) {
  console.error("Found " + issues.length + " Chinese translation issue(s):");
  issues.slice(0, 80).forEach((issue) => console.error("- " + issue));
  if (issues.length > 80) console.error("...and " + (issues.length - 80) + " more");
  process.exit(1);
}

console.log("Checked Chinese translations for " + count + " draft questions.");
