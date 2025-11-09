import Student from "./student.js";

const serverURL = "http://localhost:3000";

//отображение данных
async function serverLoadStud() {
  let response = await fetch(serverURL + "/api/students", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  let data = await response.json();
  return data;
}

async function serverDeleteStud(id) {
  let response = await fetch(serverURL + "/api/students/" + id, {
    method: "DELETE",
  });
  let data = await response.json();
  return data;
}

//добавить данные на сервер
async function serverAddStud(obj) {
  let response = await fetch(serverURL + "/api/students", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: { "Content-Type": "application/json" },
  });

  let data = await response.json();
  return data;
}
let students = [];

//получаем массив с объектами!
let serverData = await serverLoadStud();
for (const elem of serverData) {
  elem.birthday = new Date(elem.birthday);
  elem.studyStart = Number(elem.studyStart);
}
if (serverData) {
  let res = serverData.map(function (item) {
    students.push(
      new Student(
        item.name,
        item.surname,
        item.lastname,
        item.birthday,
        item.studyStart,
        item.faculty,
        item.id
      )
    );
    return students;
  });
}

let $button = document.getElementById("btn"); //основная кнопка добавления студента
let $form = document.getElementById("add-student");
let $formDiv = document.getElementById("student-form");

// КАРТОЧКА СТУДЕНТА
//появление карточки студента

$button.addEventListener("click", function () {
  showCover();
  $formDiv.style.display == "block"
    ? ($formDiv.style.display = "none")
    : ($formDiv.style.display = "block");
  document.getElementById("birthday").max = new Date().toLocaleDateString(
    "fr-ca"
  );
});

//при нажатии на крестик в карточке студента
document.getElementById("escape").addEventListener("click", function () {
  $crossBtn.style.display == "block"
    ? ($crossBtn.style.display = "none")
    : ($crossBtn.style.display = "block");
  closeMessage();
});
//при нажатии на клавиатуре на Esc
document.onkeydown = function (e) {
  if (e.key == "Escape") {
    $formDiv.style.display == "block"
      ? ($formDiv.style.display = "none")
      : ($formDiv.style.display = "block");
    hideCover();
  }
};

//затемнение фона
function showCover() {
  let coverDiv = document.createElement("div");
  coverDiv.id = "cover-div";
  document.body.style.overflowY = "hidden";
  document.body.append(coverDiv);
}

function hideCover() {
  document.getElementById("cover-div").remove();
  document.body.style.overflowY = "";
}

//утверждаемся, очистить или оставить заполненные поля карточки
let $crossBtn = document.getElementById("prompt-container");
function closeMessage() {
  let $message = document.createElement("div");
  let $question = document.createElement("h3");
  let $removeBtn = document.createElement("button");
  let $closeBtn = document.createElement("button");

  $question.textContent = "Очистить карточку?";
  $question.classList.add("question_title");
  $removeBtn.textContent = "Да";
  $removeBtn.classList.add("ques_btn");
  $closeBtn.classList.add("ques_btn");
  $closeBtn.textContent = "Нет";

  $message.append($question, $removeBtn, $closeBtn);
  $crossBtn.append($message);

  $formDiv.style.display == "block"
    ? ($formDiv.style.display = "none")
    : ($formDiv.style.display = "block");

  //если очищаем поля
  $removeBtn.addEventListener("click", function (event) {
    $form.reset();
    $crossBtn.style.display == "block"
      ? ($crossBtn.style.display = "none")
      : ($crossBtn.style.display = "block");
    hideCover();
    $crossBtn.removeChild($message);
  });

  //если оставляем поля
  $closeBtn.addEventListener("click", function () {
    $crossBtn.style.display == "block"
      ? ($crossBtn.style.display = "none")
      : ($crossBtn.style.display = "block");
    $formDiv.style.display == "block"
      ? ($formDiv.style.display = "none")
      : ($formDiv.style.display = "block");
    $crossBtn.removeChild($message);
  });

  return {
    $message,
    $question,
    $removeBtn,
    $closeBtn,
  };
}

// ТАБЛИЦА
let $studentsList = document.getElementById("students-list"),
  studentsHead = document.querySelectorAll(".students-table th"); //клики по шапке

let column = "fio",
  colDir = true;

//создаем строчку со студентом
function newStudentLine(student) {
  let $studentLine = document.createElement("tr"),
    $FIOCell = document.createElement("td"),
    $facultyCell = document.createElement("td"),
    $birthDateCell = document.createElement("td"),
    $educationStartDateCell = document.createElement("td"),
    $deleteCell = document.createElement("td"),
    $deleteBtn = document.createElement("button");

  $FIOCell.textContent = student.fio;
  $facultyCell.textContent = student.faculty;
  $birthDateCell.textContent =
    student.getBirthDate() + " (" + student.getAge() + ")";
  $educationStartDateCell.textContent =
    `${student.studyStart} - ${student.educationEndDate}` +
    " (" +
    student.getStudyCourse() +
    ")";
  $deleteBtn.textContent = "удалить";
  $deleteBtn.classList.add("btn", "btn-secondary", "btn-sm");

  $deleteCell.append($deleteBtn);
  $studentLine.append(
    $FIOCell,
    $facultyCell,
    $birthDateCell,
    $educationStartDateCell,
    $deleteCell
  );

  $deleteBtn.addEventListener("click", async function () {
    await serverDeleteStud(student.id);
    $studentLine.remove();
  });

  return $studentLine;
}
console.log(students);

//функция по поиску совпадения значения в свойстве объекта
function filterStudents(students, prop, value) {
  const result = [],
    studentsCopy = [...students];

  for (const student of studentsCopy) {
    if (String(student[prop]).includes(value)) result.push(student);
  }
  return result;
}

//фильтруем массив
function renderFilter(students) {
  $studentsList.innerHTML = "";

  //присваиваем значения инпутов
  let fioVal = document.getElementById("inp-fio").value.trim(),
    faculVal = document.getElementById("inp-facul").value.trim(),
    dateStartVal = document.getElementById("inp-dateStart").value.trim(),
    dateEndVal = document.getElementById("inp-dateEnd").value.trim();

  let newArr = [...students];

  //фильтруем массив по введенному значению по 4м свойствам
  if (fioVal.length !== "") newArr = filterStudents(students, "fio", fioVal);
  if (faculVal !== "") newArr = filterStudents(students, "faculty", faculVal);
  if (dateStartVal !== "")
    newArr = filterStudents(students, "studyStart", dateStartVal);
  if (dateEndVal !== "")
    newArr = filterStudents(students, "educationEndDate", dateEndVal);

  //цикл отрисовки отфильтрованного студента
  for (let student of newArr) {
    let $newLine = document.createElement("tr"),
      $FIOCell = document.createElement("td"),
      $facultyCell = document.createElement("td"),
      $birthDateCell = document.createElement("td"),
      $educationStartDateCell = document.createElement("td");

    $FIOCell.textContent = student.fio;
    $facultyCell.textContent = student.faculty;
    $birthDateCell.textContent =
      student.getBirthDate() + " (" + student.getAge() + ")";
    $educationStartDateCell.textContent =
      `${student.studyStart} - ${student.educationEndDate}` +
      " (" +
      student.getStudyCourse() +
      ")";

    $newLine.append(
      $FIOCell,
      $facultyCell,
      $birthDateCell,
      $educationStartDateCell
    );
    document.getElementById("students-list").append($newLine);
  }
}
let $filter = document.getElementById("filter-form");

//обработчик на сабмит фильтра
$filter.onsubmit = function (event) {
  event.preventDefault();
  renderFilter(students);
};
//обработчик при очистке фильтра
document
  .getElementById("btn-filt-reset")
  .addEventListener("click", function (event) {
    event.preventDefault();
    $filter.reset();
    createTable();
  });

//сортировка массива, передаем массив, свойство сортировки и направление(по умолчанию false)
function sortStudents(prop, dir = false) {
  const studentsCopy = [...students];
  return studentsCopy.sort(function (a, b) {
    let dirIf = !dir ? a[prop] < b[prop] : a[prop] > b[prop];
    //по убыванию и возрастанию соответственно
    //всегда -1, иначе работать не будет
    if (dirIf) return -1;
  });
}

//отрисовка таблицы
async function createTable() {
  let studentsCopy = [...students];

  //сортированный вид
  studentsCopy = sortStudents(column, colDir);
  $studentsList.innerHTML = ""; //иначе еще список добавится

  for (const student of studentsCopy) {
    $studentsList.append(newStudentLine(student));
  }
}

//создаем клики по шапке таблице
studentsHead.forEach((elem) => {
  elem.addEventListener("click", function () {
    column = this.dataset.column;
    colDir = !colDir;
    createTable(); // вызываем сортировку
  });
});
createTable();

//при нажатии на сабмит заполнение таблицы
$form.addEventListener("submit", async function (event) {
  event.preventDefault();

  let newStudObj = new Student(
    document.getElementById("name").value.trim(),
    document.getElementById("lastname").value.trim(),
    document.getElementById("surname").value.trim(),
    new Date(document.getElementById("birthday").value),
    Number(document.getElementById("studyStart").value),
    document.getElementById("faculty").value.trim()
  );

  let servStudObj = await serverAddStud(newStudObj);
  (servStudObj.birthday = new Date(servStudObj.birthday)),
    (servStudObj.studyStart = Number(servStudObj.studyStart));
  // console.log(servStudObj);//новый объект с сервера

  students.push(
    new Student(
      servStudObj.name,
      servStudObj.surname,
      servStudObj.lastname,
      servStudObj.birthday,
      servStudObj.studyStart,
      servStudObj.faculty,
      servStudObj.id
    )
  );
  //добавляем в массив объект-экземпляр класса с сервера

  createTable();
  event.target.reset();
  $formDiv.style.display == "block"
    ? ($formDiv.style.display = "none")
    : ($formDiv.style.display = "block");
  hideCover();
});
