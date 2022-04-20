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

export function parseTestContent(data) {
  return data.split("######");
}

export function getCode(data) {
  const codeRegExp = data.match(/\`\`\`javascript(.|\n)*\`\`\`/g);
  if (!codeRegExp) return null;
  const code = codeRegExp[0].slice(14, -3);
  if (!code.length) return null;
  return code.trim();
}

export function getQuestion(data) {
  const regExp = data.match(/\d+\.\s(?<question>.+)/);
  if (!regExp) return null;
  const result = regExp.groups.question;
  if (!result.length) return null;
  return result.trim();
}

export function getAnswer(data) {
  const regExp = data.match(/\#\#\#\#\s.+:\s(?<answer>\w)/);
  if (!regExp) return null;
  const result = regExp.groups.answer;
  if (!result.length) return null;
  return result.trim();
}

export function getExplanation(data) {
  const regExp = data.match(/\#\#\#\#\s.+:\s\w(?<explanation>(.|\n)*)<\/p>/);
  if (!regExp) return null;
  const result = regExp.groups.explanation;
  if (!result.length) return null;
  return result.trim();
}

export function getVariants(data) {
  const regExpA = data.match(/-\sA:\s(?<variant>.+)/);
  const regExpB = data.match(/-\sB:\s(?<variant>.+)/);
  const regExpC = data.match(/-\sC:\s(?<variant>.+)/);
  const regExpD = data.match(/-\sD:\s(?<variant>.+)/);
  const regExpE = data.match(/-\sE:\s(?<variant>.+)/);

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
