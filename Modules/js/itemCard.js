import {
    getCardEl,
    getTitleEl,
    getFormEl,
    getInputEl,
    getButtonEl
} from './components.js'
import { navigate } from './navigate.js'

//создание объекта записи
export function createObject() {
    const name = document.querySelector('[name=titleItem]').value;
    const location = document.querySelector('[name=location]').value;
    const weight = document.querySelector('[name=weight]').value;
    const datePlace = document.querySelector('[name=datePlace]').value;

    return {
        name,
        location,
        weight,
        datePlace,
    }
}
//создание рандомного id
function generateRandomId(length = 4) {
    const digits = '0123456789'
    let res = ''
    for (let i = 0; i < length; i++) {
        const min = Math.floor(Math.random() * digits.length)
        res += digits.substring(min, min+1)
        
    }
    return res
}

// Создание записи
export default function createCard(containerEl) {
    const cardEl = getCardEl()
    const titleEl = getTitleEl('Добавить запись')
    const formEl = getFormEl()
    const titleInputEl = getInputEl('text', 'titleItem', 'Название') 
    const locationInputEl = getInputEl('text', 'location', "Полка") 
    const weightInputEl = getInputEl('number', 'weight', 'Вес') 
    const dateInputEl = getInputEl('date', 'datePlace', 'дд.мм.гггг') 
    const buttonEl = getButtonEl("Добавить запись")

    formEl.append(titleInputEl, locationInputEl, weightInputEl, dateInputEl, buttonEl)
    cardEl.append(titleEl, formEl)
    containerEl.append(cardEl)
    
    formEl.addEventListener('submit', async (e) => {
        e.preventDefault()
        let item = createObject()
        item.id = generateRandomId()
    
        const localStorageObj = await import ('./localStorage.js')
        localStorageObj.default(item)
        navigate('table')
    })
}

