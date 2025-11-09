// Получение элемента карточки
function getCardEl() {
    const cardEl = document.createElement("div")
    cardEl.classList.add("card")
    return cardEl
}

// Получение элемента блока для центрирования
function getCenterWrapEl() {
    let divWrapEl = document.createElement("div")
    divWrapEl.classList.add("center-wrap")
    return divWrapEl
}

// Получение элемента заголовка
function getTitleEl(text) {
    const titleEl = document.createElement("h1")
    titleEl.textContent = text
    titleEl.classList.add("main-title")
    return titleEl
}
// Получение элемента формы
function getFormEl() {
    const formEl = document.createElement("form")
    formEl.classList.add("form")
    return formEl
}

// Получение элемента текстового поля
function getInputEl(type, name, placeholder) {
    const inputEl = document.createElement("input")
    inputEl.type = type
    inputEl.name = name
    inputEl.placeholder = placeholder
    inputEl.required = true
    inputEl.classList.add("text-field")
    return inputEl
}

// Получение элемента кнопки
function getButtonEl(text) {
    const buttonEl = document.createElement("button")
    buttonEl.textContent = text
    buttonEl.classList.add("btn-add")
    return buttonEl
}
// Получение элемента таблицы
function getTableEl() {
    const tableEl = document.createElement("table")
    const thead = document.createElement("thead")
    const tbody = document.createElement("tbody")
    const td = document.createElement("td")

    tableEl.classList.add("table")
    thead.classList.add("thead")
    thead.classList.add("table-dark")
    td.classList.add('tdEmpty-thead')
    tbody.setAttribute('id', 'list-tbody')

    const row = getTrElem('Название', 'Полка', 'Вес', 'Время хранения');
    row.append(td)
    thead.append(row)
    tableEl.append(thead, tbody)
    
    return tableEl
}

// Получение элемента строки
function getTrElem(name, location, weight, date) {
    const tr = document.createElement("tr")
    const tdName = document.createElement("td")
    const tdLocation = document.createElement("td")
    const tdWeight = document.createElement("td")
    const tdDate = document.createElement("td")

    tdName.textContent = name
    tdLocation.textContent = location
    tdWeight.textContent = weight
    tdDate.textContent = date

    tdName.classList.add('td-el')
    tdLocation.classList.add('td-el')
    tdWeight.classList.add('td-el')
    tdDate.classList.add('td-el')

    tr.append(tdName, tdLocation, tdWeight, tdDate)
    return tr
}

function getButtonGroupEl() {
    const td = document.createElement("td");
    const divEl = getCenterWrapEl();
    divEl.classList.add('buttons-group')
    const buttonDelete = document.createElement("button");
    const buttonEdit = document.createElement("button");
    buttonDelete.classList.add("button-delete");
    buttonDelete.textContent = "Удалить";
    buttonEdit.classList.add("button-edit");
    buttonEdit.textContent = "Редактировать";

    divEl.append(buttonDelete, buttonEdit);
    td.append(divEl);

    return td
}

//Получение лоадера 
function getLoaderEl() {
    const loaderEl = document.createElement('div');
    loaderEl.classList.add('loader')
    return loaderEl
}

export {
    getCardEl,
    getCenterWrapEl,
    getTitleEl,
    getFormEl,
    getInputEl,
    getButtonEl,
    getTableEl,
    getTrElem,
    getLoaderEl,
    getButtonGroupEl
}