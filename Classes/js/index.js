import Delivery from './class.js'
import EditDelivery from './EditDelivery.js';
const app = document.querySelector('#app');


const deliveryArr = [
    new Delivery("Ольга", "ул. Вымыслов, д. 12", 8),
    new EditDelivery("Дмитрий", "ул. Задачная, д. 7", 3, 'canceled'),
    // new EditDelivery("Дмитрий", "ул. Задачная, д. 7", 3, 'delivery'),
    new EditDelivery("Оля", "ул. Ткачей, д. 43", 11, 'delivered')
];

deliveryArr.forEach(el => {
    app.append(el.createElement())
})


app.append(EditDelivery.getTotalDistance(deliveryArr))





