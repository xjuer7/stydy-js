
import { getTrElem, getCenterWrapEl } from "./components.js";
import { navigate } from "./navigate.js";
import { deleteIntoLocalStorage } from "./localStorage.js";

export function renderFilter() {
    const list = JSON.parse(localStorage.getItem("list")) || [];
    let newArr;
    const res = document.querySelector(".search-input").value;

    if (res.length !== "") {
        newArr = filterItems(list, res);
    }
    renderFindItems(newArr);
}

//функция фильтрации 
function filterItems(arr, val) {
    const result = [],
        listCopy = [...arr];

    listCopy.forEach((item) => {
        const findName = item.name;
        if (String(findName).includes(val)) {
            result.push(item);
        }
    });

    return result;
}

//  отрисовка найденных элементов
function renderFindItems(arr) {
    const listTableBody = document.getElementById("list-tbody");
    listTableBody.innerHTML = "";

    arr.forEach((el) => {
        const row = getTrElem(el.name, el.location, el.weight, el.datePlace);
        row.classList.add("list-tr");

        const td = document.createElement("td");
        const divEl = getCenterWrapEl();
        divEl.classList.add("buttons-group");
        const buttonDelete = document.createElement("button");
        const buttonEdit = document.createElement("button");
        buttonDelete.classList.add("button-delete");
        buttonDelete.classList.add("button-delete-filter");
        buttonDelete.textContent = "Удалить";
        buttonEdit.classList.add("button-edit");
        buttonEdit.classList.add("button-edit-filter");
        buttonEdit.textContent = "Редактировать";

        divEl.append(buttonDelete, buttonEdit);
        td.append(divEl);
        row.append(td);
        listTableBody.append(row);

        buttonDelete.onclick = function (e) {
        if (e.target.classList.contains("button-delete-filter")) {
            //удаляем в отражении поиска
            const newListArr = arr.filter((elem) => elem !== el);
            renderFindItems(newListArr);

            //удаляем из лс
            deleteIntoLocalStorage(el.id);
            buttonDelete.classList.remove("button-delete-filter");
            navigate("table");
        }
        };

        buttonEdit.onclick = function (e) {
        if (e.target.classList.contains("button-edit-filter")) {
            navigate("edit", el);
        }
        };
  });
}
