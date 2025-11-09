export default function addToLocalStorage(item) {
    const list = JSON.parse(localStorage.getItem("list")) || [];
    list.push(item)
    localStorage.setItem('list', JSON.stringify(list))
}

export function editIntoLocalStorage(id, item) {
    const list = JSON.parse(localStorage.getItem("list")) || [];
    const position = list.findIndex(el => el.id === id)
    list.splice(position, 1, item)
    localStorage.setItem('list', JSON.stringify(list))
}

export function deleteIntoLocalStorage(id) {
    const list = JSON.parse(localStorage.getItem("list")) || [];
    const position = list.findIndex(el => el.id === id)
    list.splice(position, 1)
    localStorage.setItem('list', JSON.stringify(list))
}
