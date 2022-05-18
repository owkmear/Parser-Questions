import fs from "fs";
import {
  getCode,
  getQuestion,
  getAnswer,
  getExplanation,
  getVariants,
  mapAnswer,
  prepareFileContent,
  parseTestContent,
  getGrade,
  getTheme,
  markdownConvert,
} from "./utils.js";

const QUESTIONS_FOLDER = "./download";
const RESULT_FOLDER = "./translatedQuestions";
const README_MAP = {
  "bs-BS": "-bs_BS",
  "de-DE": "",
  "en-US": "",
  "es-ES": "-ES",
  "fr-FR": "_fr-FR",
  "id-ID": "",
  "ja-JA": "-ja_JA",
  "ko-KR": "-ko_KR",
  "nl-NL": "",
  "pt-BR": "_pt_BR",
  "ru-RU": "",
  "th-TH": "",
  "tr-TR": "-tr_TR",
  "uk-UA": "",
  "vi-VI": "-vi",
  "zh-CN": "-zh_CN",
  "zh-TW": "_zh-TW",
};
const EXCLUDED_LANGUAGES = ["ar-AR", "ar-EG"];

function main() {
  moveEnglishLanguage();
  const folders = getTestDirectories().filter(
    (folder) => !EXCLUDED_LANGUAGES.includes(folder)
  );
  const questionsArrayMap = {};
  for (let folder of folders) {
    const readmePath = `README${README_MAP[folder]}.md`;
    const content = getTestContent(
      `${QUESTIONS_FOLDER}/${folder}/${readmePath}`
    );
    const parsedData = parseTestContent(content, folder);

    const questionsArray = [];
    for (let i = 1; i < parsedData.length; i++) {
      let question = parseQuestion(parsedData[i], i);
      question = { ...question, id: i };
      questionsArray.push(question);
    }

    questionsArrayMap[folder] = questionsArray;
  }

  creteDist(folders, questionsArrayMap);
}

function moveEnglishLanguage() {
  const englishLanguageFolder = `${QUESTIONS_FOLDER}/en-US`;
  const englishLanguageFile = `${englishLanguageFolder}/README.md`;
  if (fs.existsSync(englishLanguageFile)) return false;
  if (!fs.existsSync(englishLanguageFolder))
    fs.mkdirSync(englishLanguageFolder);
  fs.renameSync(`${QUESTIONS_FOLDER}/README.md`, englishLanguageFile);
}

function creteDist(folders, questionsArrayMap) {
  if (fs.existsSync(RESULT_FOLDER))
    fs.rmSync(RESULT_FOLDER, { recursive: true, force: true });
  fs.mkdirSync(RESULT_FOLDER);

  for (let folder of folders) {
    const filePath = `${RESULT_FOLDER}/${folder}.js`;

    const questionsArray = questionsArrayMap[folder];
    const fileContent = JSON.stringify(questionsArray);
    const parsedFileContent = prepareFileContent(fileContent);

    try {
      fs.writeFileSync(filePath, parsedFileContent);
      console.log(`File ${filePath} is created successfully`);
    } catch (err) {
      console.error(err);
    }
  }
}

function parseQuestion(data, index) {
  const grade = getGrade(data, index);
  const theme = getTheme(data, index);
  const code = getCode(data);
  const question = getQuestion(data);
  const answer = mapAnswer(getAnswer(data));
  const explanation = markdownConvert(getExplanation(data));
  const variants = getVariants(data);

  const record = {
    grade,
    theme,
    question,
    code,
    correctAnswer: answer,
    variants,
    explanation,
  };

  return record;
}

function getTestContent(folderName) {
  return fs.readFileSync(folderName, { encoding: "utf8", flag: "r" });
}

function getTestDirectories() {
  return fs
    .readdirSync(QUESTIONS_FOLDER, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name)
    .filter((name) => name !== ".git");
}

export default main;
