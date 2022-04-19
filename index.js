const fs = require("fs");

const QUESTIONS_FOLDER = "./javascript-questions";

function main() {
  const folders = getTestDirectories();
  // for (let folder of folders) {
  //   const content = getTestContent(folder);
  // }
  const content = getTestContent(`${QUESTIONS_FOLDER}/ru-RU/README.md`);
  const parsedData = parseTestContent(content);
  // console.log("parsedData =", parsedData);
}

main();

function parseTestContent(data) {
  const questions = data.split("######");
  console.log(questions[5]);
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
