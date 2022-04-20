const { questions } = require("./dist/ru-RU");

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
