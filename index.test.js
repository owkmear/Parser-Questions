import questions from "./dist/ru-RU";

describe("Вопросы создались корректно", () => {
  test("Создался массив", () => {
    const expected = true;
    const result = Array.isArray(questions);
    expect(result).toBe(expected);
  });

  test("Массив не пустой", () => {
    const expected = true;
    const result = questions.length > 0;
    expect(result).toBe(expected);
  });
});

describe("Вопросы правильно распарсились", () => {
  test("Все вопросы имеют все поля", () => {
    const questionsThatNoHaveAllFields = [];
    const expected = 0;
    for (let question of questions) {
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
