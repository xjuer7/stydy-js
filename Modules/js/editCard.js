import {
    getCardEl,
    getTitleEl,
    getFormEl,
    getInputEl,
    getButtonEl
} from './components.js'
import { createObject } from './itemCard.js'
import { navigate } from './navigate.js'
import { editIntoLocalStorage } from './localStorage.js'

export default function createEditCard(containerEl, item) {
    const cardEl = getCardEl()
    const titleEl = getTitleEl('Изменение записи')
    const formEl = getFormEl()
    const titleInputEl = getInputEl('text', 'titleItem', 'Название') 
    const locationInputEl = getInputEl('text', 'location', "Полка") 
    const weightInputEl = getInputEl('number', 'weight', 'Вес') 
    const dateInputEl = getInputEl('date', 'datePlace', 'дд.мм.гггг') 
    const buttonEl = getButtonEl("Изменить данные")

    titleInputEl.value = item.name
    locationInputEl.value = item.location
    weightInputEl.value = item.weight
    dateInputEl.value = item.datePlace

    formEl.append(titleInputEl, locationInputEl, weightInputEl, dateInputEl, buttonEl)
    cardEl.append(titleEl, formEl)
    containerEl.append(cardEl)

    document.querySelector('.btn-add').setAttribute('id', 'btn-edit')

    document.querySelector('.form').addEventListener('submit', (e)=> {
        e.preventDefault()
        const newGoods = createObject()
        editIntoLocalStorage(item.id, newGoods)
        navigate('table')
    })
   
}

