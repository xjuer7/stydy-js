import { renderTable } from "./tableCard.js"

//установка дата атрибута 
export function setDataAndSort() {
    const btnThead = document.querySelectorAll('.thead td')

    for (let i = 0; i < btnThead.length - 1; i++) {
        btnThead[0].dataset.sort = 'name'
        btnThead[1].dataset.sort = 'location'
        btnThead[2].dataset.sort = 'weight'
        btnThead[3].dataset.sort = 'date'
    }
    sortItems()
}
//сортировка элементов
function sortItems() {
    const list = JSON.parse(localStorage.getItem("list")) || [];

    const allDataItems = document.querySelectorAll('[data-sort]');
    allDataItems.forEach(item => {
        item.addEventListener('click', () => {
            let arr = [];
            if (item.dataset.sort == 'name') {
                arr = list.sort(byFieldSort('name'))
            } else if (item.dataset.sort == 'location') {
                arr = list.sort(byFieldSort('location'))
            } else if (item.dataset.sort == 'weight') {
                arr = list.sort(byFieldSort('weight'))
            } else if (item.dataset.sort == 'date') {
                arr = list.sort(byFieldSort('datePlace'))
            }

            localStorage.setItem('list', JSON.stringify(arr))
            renderTable();
        })
    })
}

//функция сортировки по возрастанию
function byFieldSort(field) {
    if (field == 'weight') {
        return (a,b) => +a[field] > +b[field] ? 1 : -1;
    } return (a,b) => a[field] > b[field] ? 1 : -1;
}