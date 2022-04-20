import questions_AR from "./dist/ar-AR";
import questions_EG from "./dist/ar-EG";
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

const QUESTIONS_MAP = {
  "ar-AR": questions_AR,
  "ar-EG": questions_EG,
  "bs-BS": questions_BS,
  "de-DE": questions_DE,
  "es-ES": questions_ES,
  "fr-FR": questions_FR,
  "id-ID": questions_ID,
  "ja-JA": questions_JA,
  "ko-KR": questions_KR,
  "nl-NL": questions_NL,
  "pt-BR": questions_BR,
  "ru-RU": questions_RU,
  "th-TH": questions_TH,
  "tr-TR": questions_TR,
  "uk-UA": questions_UA,
  "vi-VI": questions_VI,
  "zh-CN": questions_CN,
  "zh-TW": questions_TW,
};

describe("Вопросы создались корректно", () => {
  test("Создался массив", () => {
    const expected = true;
    const result = Array.isArray(questions_RU);
    expect(result).toBe(expected);
  });

  test("Массив не пустой", () => {
    const expected = true;
    const result = questions_RU.length > 0;
    expect(result).toBe(expected);
  });
});

describe("Вопросы правильно распарсились", () => {
  test("Все вопросы имеют все поля", () => {
    const questionsThatNoHaveAllFields = [];
    const expected = 0;
    for (let question of questions_RU) {
      if (
        !(
          "id" in question &&
          "grade" in question &&
          "theme" in question &&
          "question" in question &&
          "code" in question &&
          "correctAnswer" in question &&
          "variants" in question &&
          "explanation" in question
        )
      )
        questionsThatNoHaveAllFields.push(question.id);
    }
    const result = questionsThatNoHaveAllFields.length;
    expect(result).toBe(expected);
  });
});
