function getCode(data) {
  const codeRegExp = data.match(/\`\`\`javascript(.|\n)*\`\`\`/g);
  if (!codeRegExp) return null;
  const code = codeRegExp[0].slice(14, -3);
  if (!code.length) return null;
  return code.trim();
}

function getQuestion(data) {
  const regExp = data.match(/\d+\.\s(?<question>.+)/);
  if (!regExp) return null;
  const result = regExp.groups.question;
  if (!result.length) return null;
  return result.trim();
}

module.exports.getCode = getCode;
module.exports.getQuestion = getQuestion;
