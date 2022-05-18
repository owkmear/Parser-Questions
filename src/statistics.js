import { QUESTION_INFO_MAP } from "./helper.js";

function main() {
  const gradesMap = {
    "Grades.Junior": 0,
    "Grades.Middle": 0,
    "Grades.Senior": 0,
  };
  const themesMap = {};
  for (let key in QUESTION_INFO_MAP) {
    const question = QUESTION_INFO_MAP[key];
    gradesMap[question.grade]++;
    if (question.theme in themesMap) {
      themesMap[question.theme]++;
    } else {
      themesMap[question.theme] = 1;
    }
  }

  console.log("Статистика грейдов:");
  const totalGrades = Object.keys(gradesMap).reduce(
    (sum, cur) => (sum += gradesMap[cur]),
    0
  );
  Object.keys(gradesMap)
    .sort((a, b) => gradesMap[b] - gradesMap[a])
    .forEach((g) => {
      const percent = Math.round((gradesMap[g] / totalGrades) * 100);
      console.log(`${g}: ${gradesMap[g]} - ${percent}%`);
    });

  console.log("\nСтатистика тем:");
  const totalThemes = Object.keys(themesMap).reduce(
    (sum, cur) => (sum += themesMap[cur]),
    0
  );
  Object.keys(themesMap)
    .sort((a, b) => themesMap[b] - themesMap[a])
    .forEach((t) => {
      const percent = Math.round((themesMap[t] / totalThemes) * 100);
      console.log(`${t}: ${themesMap[t]} - ${percent}%`);
    });
}

main();
