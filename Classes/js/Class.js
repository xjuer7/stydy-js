
export default class Delivery {
    _name = ''
    _address = ''
    _distance = 0


    constructor(name, address, distance) {
        this.name = name
        this.address = address
        this.distance = distance
    }

    createMainInfo(text) {
        const personData = document.createElement('p');
        personData.classList.add('text-strong')
        personData.textContent = text
        return personData
    }

    createDescrInfo(text) {
        const titleBlock = document.createElement('span');
        titleBlock.classList.add('descr')
        titleBlock.textContent = text
        return titleBlock
    }

    createElement() {
        this.cardEl = document.createElement('div');
        this.cardEl.classList.add('card')

        const titleName = this.createDescrInfo('Имя')
        this.personNameEl = this.createMainInfo(this.name)

        const titleAddress = this.createDescrInfo('Адрес')
        this.personAddressEl = this.createMainInfo(this.address)

        const titleDistance = this.createDescrInfo('Расстояние')
        this.personDistanceEl = this.createMainInfo(`${this.distance} км`)

        this.buttonEl = this.addButtonDeliveryEl()
        
        this.cardEl.append(titleName, this.personNameEl, titleAddress, this.personAddressEl, titleDistance, this.personDistanceEl, this.buttonEl)

        return this.cardEl
    }

    addButtonDeliveryEl() {
        this.buttonEl = document.createElement('button')
        this.buttonEl.classList.add('visually-hidden')
        return this.buttonEl
    }


    set name(value) {
        this._name = value
        if(this.personNameEl) this.personNameEl.textContent = this.name
    }

    get name() {
        return this._name
    }

    set address(value) {
        this._address = value
        if(this.personAddressEl) this.personAddressEl.textContent = this.address
    }

    get address() {
        return this._address
    }

    set distance(value) {
        this._distance = value
        if(this.personDistanceEl) this.personDistanceEl.textContent = `${this.distance} км`
    }

    get distance() {
        return this._distance
    }

}