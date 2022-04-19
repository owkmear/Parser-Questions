const fs = require("fs");
const {
  getCode,
  getQuestion,
  getAnswer,
  getExplanation,
  getVariants,
} = require("./utils");

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
  console.log(question);
}

main();

function parseQuestion(data) {
  const code = getCode(data);
  const question = getQuestion(data);
  const answer = getAnswer(data);
  const explanation = getExplanation(data);
  const variants = getVariants(data);

  const record = {
    id: 1,
    question,
    code,
    correctAnswer: answer,
    variants,
    explanation,
  };

  return record;
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

const question = {
  id: "54b6bbd5-55a6-4b09-a497-7584ec5b1966",
  grade: "Middle",
  theme: "Тонкости и неоднозначности языка",
  question: `Что НЕ является валидным?`,
  code: `const bird = {
  size: "small"
};

const mouse = {
  name: "Mickey",
  small: true
};`,
  correctAnswer: 1,
  variants: [
    `mouse.bird.size`,
    `mouse[bird.size]`,
    `mouse[bird["size"]]`,
    `Все варианты валидны`,
  ],
  explanation: `В JavaScript все ключи объекта являются строками (кроме Symbol). И хотя мы не набираем их как строки, они всегда преобразовываются к строкам под капотом.

JavaScript интерпретирует (или распаковывает) операторы. При использовании квадратных скобок JS замечает [ и продолжает пока не встретит ]. Только после этого он вычислит то, что находится внутри скобок.

mouse[bird.size]: Сперва определяется bird.size, которое равно "small". mouse["small"] возвращает true.

Но с записью через точку так не происходит. У mouse нет ключа bird. Таким образом, mouse.bird равно undefined. Затем мы запрашиваем ключ size, используя точечную нотацию: mouse.bird.size. Так как mouse.bird это undefined, мы запрашиваем undefined.size. Это не является валидным, и мы получаем ошибку типа Cannot read property "size" of undefined.`,
};
