let yearsStep = 50;
let columnWidth = 50;

const DPI = 2;
const startYearLineX = 10;
const deltaYears = 10;
const yearsLinesWidth = 3;

let table = new Table(1770, 2021, 1, 20);
let DB = new Data();

function shuffle(array) {
  const copy = [...array];
  copy.sort(() => Math.random() - 0.5);
  return copy;
}

DB.updateFilters();
const options = {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    login: "coreAdmin",
    password: "VladCoreAdmin",
  }),
};

fetch("http://localhost:3000/auth/login", options);

const options2 = {
  method: "GET",
};

fetch("http://localhost:3000/instance/", options2)
  .then(async (res) => await res.json())
  .then((data) => {
    // DB.addNote(
    //   1,
    //   "Шалавинский Влад",
    //   2001,
    //   2023,
    //   "Личность",
    //   "Просто человек",
    //   "Типа прогер",
    //   vlad_img,
    //   null
    // );
    // DB.addNote(9, "Томас Эдисон", 1847, 1931, "", "", "", edison_img, null);
    // DB.addNote(
    //   10,
    //   "Джордж Вашингтон",
    //   1732,
    //   1799,
    //   "",
    //   "",
    //   "",
    //   vashington_img,
    //   null
    // );
    // DB.addNote(
    //   11,
    //   "Наполеон Бонапарт",
    //   1769,
    //   1821,
    //   "",
    //   "",
    //   "",
    //   napoleon_img,
    //   null
    // );
    // DB.addNote(
    //   12,
    //   "Авраам Линкольн",
    //   1809,
    //   1865,
    //   "",
    //   "",
    //   "",
    //   linkoln_img,
    //   null
    // );
    // DB.addNote(
    //   13,
    //   "Отто фон Бисмарк",
    //   1815,
    //   1898,
    //   "",
    //   "",
    //   "",
    //   bismark_img,
    //   null
    // );
    // DB.addNote(14, "Стив Джобс", 1955, 2011, "", "", "", steve_jobs_img, null);
    // DB.addNote(15, "Илон Маск", 1971, 2023, "", "", "", mask_img, null);
    // DB.addNote(
    //   16,
    //   "Джон Рокфеллер",
    //   1839,
    //   1937,
    //   "",
    //   "",
    //   "",
    //   rockfeller_img,
    //   null
    // );

    data = shuffle(data);

    data.forEach((instance) =>
      DB.addNote(
        instance.id,
        instance.name,
        instance.fromYear,
        instance.toYear,
        instance.type,
        instance.subtype[0],
        null,
        instance.img,
        null
      )
    );
    DB.filter(table.fromYear, table.toYear);
    DB.structuring(table.toYear, table.yearHeight, columnWidth);
    DB.addToTable(table.container, table.containerH, table.yearHeight);
  });
