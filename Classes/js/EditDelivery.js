import Delivery from "./class.js";

export default class EditDelivery extends Delivery {

    _delivery;

    constructor(name, address, distance, delivery) {
        super(name, address, distance)
        this.delivery = delivery
    }

    static getTotalDistance(arr) {
        const abortController = new AbortController()
        const summaryWrapEl = document.createElement('div')
        summaryWrapEl.classList.add('summary-wrap')

        this.summaryBtn = document.createElement('button');
        this.summaryBtn.classList.add('form-btn')
        this.summaryBtn.textContent = 'Общее расстояние'

        this.summaryBtn.addEventListener('click', () => {
            let sum = 0;
            arr.forEach(element => {
                if (element._delivery !== 'canceled') {
                    sum += element._distance
                }
            });
     
            this.summaryInfo = document.createElement('p')
            this.summaryInfo.classList.add('text-strong')
            this.summaryInfo.textContent = `Общее расстояние: ${sum} км`

            summaryWrapEl.append(this.summaryInfo)
            abortController.abort()
        }, {signal: abortController.signal})

        summaryWrapEl.prepend(this.summaryBtn)
        return summaryWrapEl
    }
   
    createForm() {
        this.cardWrapEl = document.createElement('div');
        this.cardWrapEl.classList.add('form-wrap')
        this.cardWrapItems = document.createElement('div')
        this.cardWrapItems.classList.add("wrapper-items")
        this.titleForm = document.createElement('p');
        this.titleForm.classList.add("text-strong")
        this.titleForm.textContent = 'Изменить'
        this.buttonExit = document.createElement('button');
        this.buttonExit.classList.add('form-exit')

        this.cardWrapItems.append(this.titleForm, this.buttonExit)

        this.form = document.createElement('form');
        this.form.classList.add('person-info')
        this.inputName = document.createElement('input');
        this.inputName.classList.add('input')
        this.inputName.setAttribute('id', 'input-name')
        this.inputName.placeholder = 'Имя'
        this.inputAddress = document.createElement('input');
        this.inputAddress.classList.add('input')
        this.inputAddress.setAttribute('id', 'input-address')
        this.inputAddress.placeholder = 'Адрес'
        this.inputDistance = document.createElement('input');
        this.inputDistance.classList.add('input')
        this.inputDistance.setAttribute('id', 'input-distance')
        this.inputDistance.placeholder = 'Расстояние'
        this.select = document.createElement('select');
        this.select.classList.add('custom-select')
        this.select.name = 'status-delivery'
        this.optionsFirst = document.createElement('option');
        this.optionsFirst.value = "delivery"
        this.optionsFirst.textContent = 'Доставляется'
        this.optionsSecond = document.createElement('option');
        this.optionsSecond.value = "delivered"
        this.optionsSecond.textContent = 'Доставлен'
        this.optionsThird = document.createElement('option');
        this.optionsThird.value = "canceled"
        this.optionsThird.textContent = 'Отменён'

        this.select.append(this.optionsFirst, this.optionsSecond, this.optionsThird)
        this.btnSubmit = document.createElement('button');
        this.btnSubmit.classList.add('form-btn')
        this.btnSubmit.textContent = 'Сохранить'

        this.form.append(this.inputName, this.inputAddress, this.inputDistance, this.select, this.btnSubmit)
        this.cardWrapEl.append(this.cardWrapItems, this.form)
        return this.cardWrapEl
    }

    addButtonDeliveryEl() {
        this.buttonChangedEl = super.addButtonDeliveryEl()
        this.buttonChangedEl.classList.add('card__change-btn')
        this.buttonChangedEl.classList.toggle('visually-hidden')
        this.buttonChangedEl.textContent = 'Изменить'

        this.checkStatus()
        console.log(this.cardEl);

        this.buttonChangedEl.addEventListener('click', () => {
            this.cardEl.classList.toggle('card-open')
            document.querySelector('.app').append(this.createForm())
            this.cardWrapEl.classList.toggle('shadow')

            document.querySelector('#input-name').value = this.name
            document.querySelector('#input-address').value = this.address
            document.querySelector('#input-distance').value = this.distance
            document.querySelector('.custom-select').value = this.delivery

            this.form.addEventListener('submit', (e) => {
                e.preventDefault()

                this.name = document.querySelector('#input-name').value
                this.address = document.querySelector('#input-address').value
                this.distance = document.querySelector('#input-distance').value
                this.delivery = document.querySelector('.custom-select').value

                this.checkStatus()
                this.form.reset()
                this.cardWrapEl.remove()
                this.cardEl.classList.remove('card-open')
            })

            this.buttonExit.addEventListener('click', () => {
                this.form.reset()
                this.cardEl.classList.remove('card-open')
                this.cardWrapEl.remove()
            })
        })
        return this.buttonChangedEl
    }

    checkStatus() {
        if (this._delivery == 'delivered') {
            this.cardEl.classList.add('is-delivered')
            if (this.cardEl.classList.contains('is-canceled')) this.cardEl.classList.remove('is-canceled')
        } else if (this._delivery == 'canceled') {
            this.cardEl.classList.add('is-canceled')
            if (this.cardEl.classList.contains('is-delivered')) this.cardEl.classList.remove('is-delivered')
        } else {
            this.cardEl.classList.remove('is-delivered') || this.cardEl.classList.remove('is-canceled')
        }
    }

    set delivery(value) {
        this._delivery = value
        // if (!this.buttonChangedEl) {
        //     this.addButtonDeliveryEl(); // создаем кнопку, если она еще не была создана

        // статус в консоли обновляется, в разметке нет 
        //     switch(value) {
        //         case 'delivered':
        //             this.buttonChangedEl.classList.add('is-delivered')
        //             if (this.buttonChangedEl.classList.contains('is-canceled')) this.buttonChangedEl.classList.remove('is-canceled')
        //             break;
        //         case 'canceled':
        //             this.buttonChangedEl.classList.add('is-canceled')
        //             if (this.buttonChangedEl.classList.contains('is-delivered')) this.buttonChangedEl.classList.remove('is-delivered')
        //             break;
        //     }
        // }
    }

    get delivery() {
        return this._delivery
    }
}