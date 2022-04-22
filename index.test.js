// import questions_AR from "./dist/ar-AR";
// import questions_EG from "./dist/ar-EG";
import questions_BS from "./dist/bs-BS";
import questions_DE from "./dist/de-DE";
import questions_ES from "./dist/es-ES";
import questions_FR from "./dist/fr-FR";
import questions_ID from "./dist/id-ID";
import questions_JA from "./dist/ja-JA";
import questions_KR from "./dist/ko-KR";
import questions_NL from "./dist/nl-NL";
import questions_BR from "./dist/pt-BR";
import questions_RU from "./dist/ru-RU";
import questions_TH from "./dist/th-TH";
import questions_TR from "./dist/tr-TR";
import questions_UA from "./dist/uk-UA";
import questions_VI from "./dist/vi-VI";
import questions_CN from "./dist/zh-CN";
import questions_TW from "./dist/zh-TW";

const LANGUAGES_MAP = {
  // "ar-AR": { data: questions_AR, count: 63 },
  // "ar-EG": { data: questions_EG, count: 43 },
  "bs-BS": { data: questions_BS, count: 43 },
  "de-DE": { data: questions_DE, count: 133 },
  "es-ES": { data: questions_ES, count: 116 },
  "fr-FR": { data: questions_FR, count: 64 },
  "id-ID": { data: questions_ID, count: 155 },
  "ja-JA": { data: questions_JA, count: 86 },
  "ko-KR": { data: questions_KR, count: 155 },
  "nl-NL": { data: questions_NL, count: 144 },
  "pt-BR": { data: questions_BR, count: 71 },
  "ru-RU": { data: questions_RU, count: 137 },
  "th-TH": { data: questions_TH, count: 108 },
  "tr-TR": { data: questions_TR, count: 101 },
  "uk-UA": { data: questions_UA, count: 43 },
  "vi-VI": { data: questions_VI, count: 155 },
  "zh-CN": { data: questions_CN, count: 155 },
  "zh-TW": { data: questions_TW, count: 155 },
};

describe("Вопросы создались корректно", () => {
  it("Создался массив", () => {
    for (let language in LANGUAGES_MAP) {
      try {
        expect(Array.isArray(LANGUAGES_MAP[language].data)).toBe(true);
      } catch (e) {
        throw new Error(`Ошибка с языком ${language}\n${e.message}`);
      }
    }
  });

  it("Массив не пустой", () => {
    for (let language in LANGUAGES_MAP) {
      try {
        expect(LANGUAGES_MAP[language].data.length).toBeGreaterThan(0);
      } catch (e) {
        throw new Error(`Ошибка с языком ${language}\n${e.message}`);
      }
    }
  });

  it("Количество вопросов верное", () => {
    for (let language in LANGUAGES_MAP) {
      try {
        expect(LANGUAGES_MAP[language].data.length).toBe(
          LANGUAGES_MAP[language].count
        );
      } catch (e) {
        throw new Error(`Ошибка с языком ${language}\n${e.message}`);
      }
    }
  });
});

describe("Вопросы правильно распарсились", () => {
  it("Все вопросы имеют все поля", () => {
    for (let language in LANGUAGES_MAP) {
      LANGUAGES_MAP[language].data.forEach((question, questionIndex) => {
        try {
          expect(question).toHaveProperty("id");
          expect(typeof question.id).toBe("number");

          expect(question).toHaveProperty("grade");
          expect(typeof question.grade).toBe("string");
          expect(["Junior", "Middle", "Senior"]).toContain(question.grade);

          expect(question).toHaveProperty("theme");
          expect(typeof question.theme).toBe("string");

          expect(question).toHaveProperty("question");
          expect(typeof question.question).toBe("string");

          expect(question).toHaveProperty("code");
          expect(["string", "object"]).toContain(typeof question.code);

          expect(question).toHaveProperty("correctAnswer");
          expect(typeof question.correctAnswer).toBe("number");
          expect(question.correctAnswer).toBeGreaterThanOrEqual(1);
          expect(question.correctAnswer).toBeLessThanOrEqual(4);

          expect(question).toHaveProperty("variants");
          expect(Array.isArray(question.variants)).toBeTruthy();

          expect(question).toHaveProperty("explanation");
          expect(typeof question.explanation).toBe("string");
        } catch (e) {
          throw new Error(
            `Ошибка с языком ${language} в вопросе #${questionIndex + 1}\n${
              e.message
            }`
          );
        }
      });
    }
  });

  it("Проверка отдельных вопросов", () => {
    for (let language in QUESTIONS_MAP) {
      for (let number in QUESTIONS_MAP[language]) {
        const receivedQuestion = LANGUAGES_MAP[language].data[number];
        const expectedQuestion = QUESTIONS_MAP[language][number];

        try {
          expect(receivedQuestion.id).toBe(expectedQuestion.id);
          expect(receivedQuestion.grade).toBe(expectedQuestion.grade);
          expect(receivedQuestion.theme).toBe(expectedQuestion.theme);
          expect(receivedQuestion.question).toBe(expectedQuestion.question);
          expect(receivedQuestion.code).toBe(expectedQuestion.code);
          expect(receivedQuestion.correctAnswer).toBe(
            expectedQuestion.correctAnswer
          );
          expect(receivedQuestion.variants).toHaveLength(
            expectedQuestion.variants.length
          );
          for (let i = 0; i < expectedQuestion.variants.length; i++) {
            expect(receivedQuestion.variants[i]).toBe(
              expectedQuestion.variants[i]
            );
          }
          expect(receivedQuestion.explanation).toBe(
            expectedQuestion.explanation
          );
        } catch (e) {
          throw new Error(
            `Ошибка с языком ${language} в вопросе #${Number(number) + 1}\n${
              e.message
            }`
          );
        }
      }
    }
  });
});

const QUESTIONS_MAP = {
  "ru-RU": {
    1: {
      grade: "Middle",
      theme: "Тонкости и неоднозначности языка",
      question: "Что будет в консоли?",
      code: "for (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 1);\n}\n\nfor (let i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 1);\n}",
      correctAnswer: 3,
      variants: ["`0 1 2` и `0 1 2`", "`0 1 2` и `3 3 3`", "`3 3 3` и `0 1 2`"],
      explanation:
        "Из-за очереди событий в JavaScript, функция `setTimeout` вызывается _после_ того как цикл будет завершен. Так как переменная `i` в первом цикле была определена с помощью `var`, она будет глобальной. В цикле мы каждый раз увеличиваем значение `i` на `1`, используя унарный оператор `++`. К моменту выполнения функции `setTimeout` значение `i` будет равно `3` в первом примере.\n\nВо втором цикле переменная `i` определена с помощью `let`. Такие переменные (а также `const`) имеют блочную область видимости (блок это что угодно между `{ }`). С каждой итерацией `i` будет иметь новое значение, и каждое значение будет замкнуто в своей области видимости внутри цикла.",
      id: 2,
    },
  },
  "tr-TR": {
    71: {
      grade: "Middle",
      theme: "Тонкости и неоднозначности языка",
      question: "Çıktısı Nedir?",
      code: "console.log(String.raw`Hello\\nworld`);",
      correctAnswer: 3,
      variants: [
        "`Hello world!`",
        "`Hello` <br />&nbsp; &nbsp; &nbsp;`world`",
        "`Hello\\nworld`",
        "`Hello\\n` <br /> &nbsp; &nbsp; &nbsp;`world`",
      ],
      explanation:
        '`String.raw` kaçış karakterlerinin (`\\n`, `\\v`, `\\t` vb.) göz ardı edildiği bir string döndürür. Ters bölü işareti şöyle bir şey gibi sonuçlanabileceğinden sorun olabilir:\n\n`` const path = `C:\\Documents\\Projects\\table.html` ``\n\nŞöyle sonuçlanır:\n\n`"C:DocumentsProjects able.html"`\n\n`String.raw` ile, kaçış karakteri basitçe göz ardı edilir ve yazdırılır:\n\n`C:\\Documents\\Projects\\table.html`\n\nBu örnekte, string `Hello\\nworld`, dolayısıyla `Hello\\nworld` olarak loglanır.',
      id: 72,
    },
  },
};
