import { QUESTION_INFO_MAP, MOCK_TYPESCRIPT } from "./helper.js";
import { replaceCode, replaceItalicTag, replaceImage } from "./markup.js";

const EXPRESSIONS_MAP = {
  content: {
    "pt-BR": /---\n/g,
    default: "######",
  },
};

export function markdownConvert(content) {
  return replaceImage(replaceCode(replaceItalicTag(content)));
}

function getExpression(key, lang) {
  const category = EXPRESSIONS_MAP[key];
  return lang in category ? category[lang] : category["default"];
}

function replaceGrade(content) {
  return content.replace(/"grade":("Grades\.\w+")/g, function (v1, v2) {
    const grade = v2.slice(1, -1);
    return `"grade":${grade}`;
  });
}

function replaceTheme(content) {
  return content.replace(/"theme":("Themes\.\w+")/g, function (v1, v2) {
    const theme = v2.slice(1, -1);
    return `"theme":${theme}`;
  });
}

export function prepareFileContent(content) {
  if (process.env.NODE_ENV === "production") {
    return `import { Grades, Themes } from "../../model";\n\nconst questions = ${replaceTheme(
      replaceGrade(content)
    )}; export default questions;`;
  } else {
    return `${MOCK_TYPESCRIPT}\n\nconst questions = ${replaceTheme(
      replaceGrade(content)
    )}; export default questions;`;
  }
}

export function mapAnswer(answer) {
  const MAP = {
    A: 1,
    B: 2,
    C: 3,
    D: 4,
    E: 5,
  };
  return MAP[answer];
}

export function parseTestContent(data, lang) {
  const expression = getExpression("content", lang);
  return data.split(expression);
}

const DEFAULT_GRADE = "Grades.Middle";
export function getGrade(data, index) {
  return QUESTION_INFO_MAP[index].grade || DEFAULT_GRADE;
}

const DEFAULT_THEME = "Themes.BASICS";
export function getTheme(data, index) {
  return QUESTION_INFO_MAP[index].theme || DEFAULT_THEME;
}

export function getCode(data) {
  const codeRegExp = data.match(/```javascript(.|\n)*?```/g);
  if (!codeRegExp) return null;
  const code = codeRegExp[0].slice(14, -3);
  if (!code.length) return null;
  return code.trim();
}

export function getQuestion(data) {
  const regExp = data.match(/\d+\.\s?(?<question>.+)/);
  if (!regExp) return null;
  const result = regExp.groups.question;
  if (!result.length) return null;
  return result.trim();
}

export function getAnswer(data) {
  const regExp = data.match(/####\s.+[：:]?\s?(?<answer>[ABCDE])/);
  if (!regExp) return null;
  const result = regExp.groups.answer;
  if (!result.length) return null;
  return result.trim();
}

export function getExplanation(data) {
  const regExp = data.match(
    /####\s.+[：:]?\s?[ABCDE](?<explanation>(.|\n)*)<\/p>/
  );
  if (!regExp) return null;
  const result = regExp.groups.explanation;
  if (!result.length) return null;
  return result.trim();
}

export function getVariants(data) {
  const regExpA = data.match(/-\s+A:\s(?<variant>.+)/);
  const regExpB = data.match(/-\s+B:\s(?<variant>.+)/);
  const regExpC = data.match(/-\s+C:\s(?<variant>.+)/);
  const regExpD = data.match(/-\s+D:\s(?<variant>.+)/);
  const regExpE = data.match(/-\s+E:\s(?<variant>.+)/);

  const A = regExpA && regExpA.groups.variant;
  const B = regExpB && regExpB.groups.variant;
  const C = regExpC && regExpC.groups.variant;
  const D = regExpD && regExpD.groups.variant;
  const E = regExpE && regExpE.groups.variant;

  const result = [
    ...(A ? [A] : []),
    ...(B ? [B] : []),
    ...(C ? [C] : []),
    ...(D ? [D] : []),
    ...(E ? [E] : []),
  ];

  if (!result.length) return null;
  return result;
}
