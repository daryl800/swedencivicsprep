import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const draftsDir = path.join(rootDir, "src", "content", "drafts");
const maxDistance = 0.16;

function normalize(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function shingles(value) {
  const words = normalize(value).split(" ").filter(Boolean);
  if (words.length < 4) {
    return new Set([words.join(" ")]);
  }

  const result = new Set();
  for (let index = 0; index <= words.length - 4; index += 1) {
    result.add(words.slice(index, index + 4).join(" "));
  }
  return result;
}

function jaccardDistance(left, right) {
  const leftSet = shingles(left);
  const rightSet = shingles(right);
  const union = new Set([...leftSet, ...rightSet]);
  if (union.size === 0) {
    return 0;
  }

  let intersection = 0;
  leftSet.forEach((item) => {
    if (rightSet.has(item)) {
      intersection += 1;
    }
  });
  return 1 - intersection / union.size;
}

function listJsonFiles(directory) {
  if (!fs.existsSync(directory)) {
    return [];
  }

  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      return listJsonFiles(entryPath);
    }
    return entry.isFile() && entry.name.endsWith(".json") ? [entryPath] : [];
  });
}

function readDraftFiles() {
  return listJsonFiles(draftsDir)
    .sort()
    .flatMap((filePath) => {
      const file = path.relative(draftsDir, filePath);
      const questions = JSON.parse(fs.readFileSync(filePath, "utf8"));
      return questions
        .filter((question) => question && typeof question.questionSv === "string" && Array.isArray(question.options))
        .map((question) => ({ ...question, file }));
    });
}

const questions = readDraftFiles();
const exactIds = new Map();
const exactQuestionTexts = new Map();
const issues = [];

questions.forEach((question) => {
  const idOwner = exactIds.get(question.id);
  if (idOwner) {
    issues.push(`Duplicate id: ${question.id} in ${idOwner.file} and ${question.file}`);
  }
  exactIds.set(question.id, question);

  const normalizedQuestion = normalize(question.questionSv);
  const textOwner = exactQuestionTexts.get(normalizedQuestion);
  if (textOwner) {
    issues.push(`Duplicate Swedish question: ${question.id} matches ${textOwner.id}`);
  }
  exactQuestionTexts.set(normalizedQuestion, question);
});

for (let leftIndex = 0; leftIndex < questions.length; leftIndex += 1) {
  for (let rightIndex = leftIndex + 1; rightIndex < questions.length; rightIndex += 1) {
    const left = questions[leftIndex];
    const right = questions[rightIndex];
    const distance = jaccardDistance(left.questionSv, right.questionSv);
    if (distance <= maxDistance) {
      issues.push(
        `Near duplicate (${Math.round((1 - distance) * 100)}% similar): ${left.id} and ${right.id}`
      );
    }
  }
}

if (issues.length > 0) {
  console.error(`Found ${issues.length} draft duplicate issue(s):`);
  issues.forEach((issue) => console.error(`- ${issue}`));
  process.exit(1);
}

console.log(`Checked ${questions.length} draft questions. No duplicate ids or near-duplicate question texts found.`);
