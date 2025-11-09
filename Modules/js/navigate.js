import { getLoaderEl } from './components.js'
//выбор и отрисовка Новой карточки или Таблицы

export async function navigate(cardName, item, obj){
    const appEl = document.getElementById("app")
    appEl.innerHTML = ''

    const loaderEl = getLoaderEl()
    appEl.append(loaderEl)

    switch (cardName) {
        case "card":
            const itemCard = await import ('./itemCard.js')
            itemCard.default(appEl)
            loaderEl.remove()
            break
        case "edit":
            const editCard = await import ('./editCard.js')
            editCard.default(appEl, item)
            loaderEl.remove()
            break
        default:
            const tableCard = await import ('./tableCard.js')
            tableCard.default(appEl)
            loaderEl.remove()
    }

}