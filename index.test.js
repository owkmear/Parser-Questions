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
  it("Создался массив", () => {
    const expected = true;
    const result = Array.isArray(questions_RU);
    expect(result).toBe(expected);
  });

  it("Массив не пустой", () => {
    const expected = true;
    const result = questions_RU.length > 0;
    expect(result).toBe(expected);
  });
});

describe("Вопросы правильно распарсились", () => {
  it("Все вопросы имеют все поля", () => {
    questions_DE.forEach((question, index) => {
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
        throw new Error(`Ошибка в вопросе #${index + 1}\n${e.message}`);
      }
    });
  });
});
