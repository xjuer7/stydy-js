import {
    getCardEl,
    getTitleEl,
    getButtonEl,
    getCenterWrapEl,
    getTrElem,
    getTableEl,
    getInputEl,
} from "./components.js";
import { navigate } from "./navigate.js";
import { setDataAndSort } from './sort.js';
import { renderFilter } from "./filter.js";


//отрисовка строк таблицы
export async function renderTable() {
    const list = JSON.parse(localStorage.getItem("list")) || [];
    const listTableBody = document.getElementById("list-tbody");
    listTableBody.innerHTML = "";

    list.forEach((goods) => {
        const row = getTrElem(
            goods.name,
            goods.location,
            goods.weight,
            goods.datePlace
        );
        row.classList.add("list-tr");

        const td = document.createElement("td");
        const divEl = getCenterWrapEl();
        divEl.classList.add('buttons-group')
        const buttonDelete = document.createElement("button");
        const buttonEdit = document.createElement("button");
        buttonDelete.classList.add("button-delete");
        buttonDelete.classList.add("button-delete-main");
        buttonDelete.textContent = "Удалить";
        buttonEdit.classList.add("button-edit");
        buttonEdit.classList.add("button-edit-main");
        buttonEdit.textContent = "Редактировать";
    
        divEl.append(buttonDelete, buttonEdit);
        td.append(divEl);
        row.append(td);
        listTableBody.append(row);

        buttonDelete.onclick = function(e) {
            if (e.target.classList.contains('button-delete-main')) {
                const newListArr = list.filter(elem => elem !== goods);
                localStorage.setItem("list", JSON.stringify(newListArr));
                renderTable();
            } 
        }
    
        buttonEdit.onclick =  function(e) {
            if (e.target.classList.contains('button-edit-main')) {
                console.log('main');
                navigate("edit", goods);
            }
        }
    });


    if (!listTableBody.innerHTML) {
        document.querySelector(".table").style.display = "none";
        const desc = document.createElement("p");
        desc.classList.add("description");
        desc.textContent = "Склад пока пустой";
        document.querySelector(".card").append(desc);
    }
}

// компановка страницы с таблицей
export default function createTable(containerEl) {
    const cardEl = getCardEl();
    const divEl = getCenterWrapEl();
    const titleEl = getTitleEl("Склад");
    const buttonReturnEl = getButtonEl("Добавить запись");
    const searchInput = getInputEl('text', 'searchValue', 'Поиск по названию')
    const tableEl = getTableEl();

    cardEl.classList.add("card-table");
    searchInput.classList.add ('search-input')

    divEl.append(titleEl, buttonReturnEl);
    cardEl.append(divEl, searchInput, tableEl);
    containerEl.append(cardEl);

    buttonReturnEl.addEventListener("click", () => {
        navigate("card");
    });

    searchInput.addEventListener('input', (e) => {
        e.preventDefault();
        
        renderFilter()
        // console.log(searchInput.value);
    })

    

    renderTable();
    setDataAndSort()
}
