import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const draftsDir = path.join(rootDir, "src", "content", "drafts");
const expectedChapterCount = 13;
const expectedQuestionCount = 1000;
const chapterTopicIds = new Map([
  ["country", "everyday"],
  ["democratic-system", "democracy"],
  ["governance", "authorities"],
  ["elections", "democracy"],
  ["law", "rights"],
  ["media", "rights"],
  ["human-rights", "rights"],
  ["work-economy", "everyday"],
  ["welfare", "everyday"],
  ["modern-history", "everyday"],
  ["world", "authorities"],
  ["secular-state", "everyday"],
  ["traditions", "everyday"]
]);
const expectedPublicTopicIds = new Set(["democracy", "rights", "everyday", "authorities"]);
const publicTopicCounts = new Map();
const issues = [];
const ids = new Set();

const files = fs.readdirSync(draftsDir)
  .filter((file) => file.endsWith(".json"))
  .sort();

const questions = files.flatMap((file) => {
  const items = JSON.parse(fs.readFileSync(path.join(draftsDir, file), "utf8"));
  if (!Array.isArray(items)) {
    issues.push(`${file} must contain a JSON array`);
    return [];
  }
  return items.map((item) => ({ ...item, file }));
});

questions.forEach((question, index) => {
  const label = question.id || `item #${index + 1}`;

  if (!question.id) issues.push(`${question.file}: item #${index + 1} is missing id`);
  if (ids.has(question.id)) issues.push(`Duplicate question id: ${question.id}`);
  ids.add(question.id);

  if (!question.topicId) issues.push(`${label} is missing draft topicId`);
  if (!question.chapterId) issues.push(`${label} is missing chapterId`);

  if (!chapterTopicIds.has(question.chapterId)) {
    issues.push(`${label} has unknown chapterId: ${question.chapterId}`);
  }

  const publicTopicId = chapterTopicIds.get(question.chapterId) || question.topicId;
  publicTopicCounts.set(publicTopicId, (publicTopicCounts.get(publicTopicId) || 0) + 1);
  if (!expectedPublicTopicIds.has(publicTopicId)) {
    issues.push(`${label} maps to unknown public topicId: ${publicTopicId}`);
  }
  if (!Number.isInteger(question.chapterNumber)) issues.push(`${label} is missing numeric chapterNumber`);
  if (!question.questionSv?.trim()) issues.push(`${label} is missing Swedish question text`);
  if (!question.questionEn?.trim()) issues.push(`${label} is missing English question help`);
  if (!Array.isArray(question.options) || question.options.length !== 4) {
    issues.push(`${label} must have exactly 4 Swedish options`);
  }
  if (!Array.isArray(question.optionsEn) || question.optionsEn.length !== 4) {
    issues.push(`${label} must have exactly 4 English option helpers`);
  }
  if (!Number.isInteger(question.correctIndex) || question.correctIndex < 0 || question.correctIndex > 3) {
    issues.push(`${label} has invalid correctIndex: ${question.correctIndex}`);
  }
  if (!question.explanationEn?.trim()) issues.push(`${label} is missing English explanation`);
});

if (files.length !== expectedChapterCount) {
  issues.push(`Expected ${expectedChapterCount} chapter files, found ${files.length}`);
}

if (questions.length !== expectedQuestionCount) {
  issues.push(`Expected ${expectedQuestionCount} public-source questions, found ${questions.length}`);
}

for (const topicId of expectedPublicTopicIds) {
  if (!publicTopicCounts.has(topicId)) {
    issues.push(`No public questions mapped to topicId: ${topicId}`);
  }
}

if (issues.length > 0) {
  console.error(`Found ${issues.length} question bank issue(s):`);
  issues.forEach((issue) => console.error(`- ${issue}`));
  process.exit(1);
}

console.log(`Checked ${questions.length} public-source questions across ${files.length} chapter files.`);
