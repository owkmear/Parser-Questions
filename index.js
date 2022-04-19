const fs = require("fs");

const QUESTIONS_FOLDER = "./download";

function main() {
  const folders = getTestDirectories();
  // for (let folder of folders) {
  //   const content = getTestContent(folder);
  // }
  const content = getTestContent(`${QUESTIONS_FOLDER}/ru-RU/README.md`);
  const parsedData = parseTestContent(content);
  // TODO: loop
  const question = parseQuestion(parsedData[5]);
  // console.log("parsedData =", question);
}

main();

function getCode(data) {
  const codeRegExp = data.match(/\`\`\`javascript(.|\n)*\`\`\`/g);
  if (!codeRegExp) return null;
  const code = codeRegExp[0].slice(14, -3);
  if (!code.length) return null;
  return code.trim();
}

function parseQuestion(data) {
  console.log("data = ", data);
  const code = getCode(data);
}

function parseTestContent(data) {
  return data.split("######");
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
