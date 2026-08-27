import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const draftsDir = path.join(rootDir, "src", "content", "drafts");
const outputDir = path.join(rootDir, "content", "translation-batches");

fs.mkdirSync(outputDir, { recursive: true });

const files = fs.readdirSync(draftsDir)
  .filter((file) => file.endsWith(".json"))
  .sort();

const combined = [];

for (const file of files) {
  const questions = JSON.parse(fs.readFileSync(path.join(draftsDir, file), "utf8"));
  const translationSource = questions.map((question) => ({
    id: question.id,
    chapterId: question.chapterId,
    chapterNumber: question.chapterNumber,
    difficulty: question.difficulty,
    tags: question.tags,
    questionSv: question.questionSv,
    questionEn: question.questionEn,
    optionsSv: question.options,
    optionsEn: question.optionsEn,
    correctIndex: question.correctIndex,
    explanationEn: question.explanationEn
  }));

  combined.push({ file, questions: translationSource });
  const outputPath = path.join(outputDir, file.replace(/\.json$/, ".zh-source.json"));
  fs.writeFileSync(outputPath, JSON.stringify(translationSource, null, 2) + "\n");
}

fs.writeFileSync(path.join(outputDir, "all-chapters.zh-source.json"), JSON.stringify(combined, null, 2) + "\n");
console.log("Wrote " + files.length + " per-chapter translation batches and all-chapters.zh-source.json to " + path.relative(rootDir, outputDir) + ".");
