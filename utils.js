import { QUESTION_INFO_MAP } from "./helper.js";

const EXPRESSIONS_MAP = {
  content: {
    "pt-BR": /---\n/g,
    default: "######",
  },
};

// функция `setTimeout` вызывается => функция \`setTimeout\` вызывается
export function replaceSelection(content) {
  return content.replace(/`.+?`/g, function (v1, v2) {
    return `\\${v2}\\`;
  });
}

// функция _setTimeout_ вызывается => функция *setTimeout* вызывается
export function replaceItalic(content) {
  return content.replace(/_.+?_/g, function (v1, v2) {
    return `_${v2}_`;
  });
}

// функция **setTimeout** вызывается => функция **setTimeout** вызывается
export function replaceBold(content) {
  return content.replace(/\*\*.+?\*\*/g, function (v1, v2) {
    return `**${v2}**`;
  });
}

/*

```javascript
console.log(info);
```

\`\`\` js
console.log(info);
\`\`\`

 */
export function replaceCode(content) {
  return content.replace(/```javascript(.|\n)+?```/g, function (v1, v2) {
    const match = v2.slice(13, -3);
    return `\`\`\` js${match}\`\`\``;
  });
}

/*
<img src="https://i.imgur.com/NSnDZmU.png" width="200">
![Image](https://i.imgur.com/NSnDZmU.png)
 */
export function replaceImage(content) {
  return content;
}

/*
[пост в блоге](https://www.theavocoder.com/complete-javascript/2018/12/21/by-value-vs-by-reference)
[пост в блоге](https://www.theavocoder.com/complete-javascript/2018/12/21/by-value-vs-by-reference)
 */
export function replaceLink(content) {
  return content;
}

export function markdownConvert(content) {
  return replaceCode(replaceSelection(content));
}

function getExpression(key, lang) {
  const category = EXPRESSIONS_MAP[key];
  return lang in category ? category[lang] : category["default"];
}

export function prepareFileContent(content) {
  return `const questions = ${content}; export default questions;`;
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
  const codeRegExp = data.match(/```javascript(.|\n)*```/g);
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
