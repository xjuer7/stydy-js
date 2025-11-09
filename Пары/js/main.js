import Card from './script.js'
let cardsCount;
let newArr;
let cardsArr;
let firstCard;
let secondCard;
let timeBox;
let time = null;
let timer = null;

//чтобы не запускать таймер несколько раз, нужно сделать это 1 раз

function createForm(container) {
    let form = document.createElement('form');
    let label1 = document.createElement('label');
    let label2 = document.createElement('label');
    let input = document.createElement('input');
    let button = document.createElement('button');

    label1.textContent = 'Задайте четное количество карточек для создания поля и найдите все пары чисел.';
    label2.textContent = 'На игру отводится 1 минута :)';
    label1.classList.add('label');
    label2.classList.add('label');
    input.placeholder = 'Ваше число пар';
    input.setAttribute("type", "number");
    button.textContent = 'Начать игру';

    form.classList.add('input-group', 'mb-3');
    input.classList.add('form-control');
    input.min = 4;

    form.append(label1);
    form.append(label2);
    form.append(input);
    form.append(button);
    container.append(form);

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        if (input.value === '' || Number(input.value) % 2 !== 0) {
            input.value = '';
            input.placeholder = 'Внимательнее, можно ввести только четное число 😎';
        } else {
            newGame(document.getElementById('game'), input.value);
            container.removeChild(form);
    
            timeBox = document.createElement('div');
            document.getElementById('game').prepend(timeBox);
            timeBox.setAttribute("id", "countdown");
            timeBox.textContent = time;//счетчик времени
            time = 59;
            timer = setInterval(() => {
                if (time > 0) {
                    timeBox.textContent = `${time--} сек`;
                } else if (time <= 0) {
                    clearInterval(timer);
                    time = null;
                    document.getElementById('game').innerHTML = '';
                    newArr = [];
                    cardsArr = [];
                    firstCard = null;
                    secondCard = null;
                    alert('Время истекло. Попробуйте снова')
                    createForm(document.getElementById('start'));
                }
            }, 1000);
        }


    })
        
    return {
        input,
        button,
        form,
    }
}
createForm(document.getElementById('start'));




function newGame(container, cardsCount) {
//создаем игровое поле 
    let newArr = [],
    cardsArr = [],
    firstCard = null,
    secondCard = null

    const generatedArr = () => { 
        //генерируем массив пар
        for (let i = 1; i <= cardsCount/2; i++) {
            newArr.push(i)
            newArr.push(i)
        }
        return newArr
    }
    generatedArr();
    
    //перемешиваем массив
    const shuffle = () => {
        let j, temp;
        for (let i = newArr.length - 1; i > 0; i--) {
            j = Math.floor(Math.random()*(i + 1));
            temp = newArr[j];
            newArr[j] = newArr[i];
            newArr[i] = temp;
        }
        return newArr;
    };
    
    let numArr = shuffle(newArr);

    for (const cardNumber of numArr) {
        cardsArr.push(new Card(container, cardNumber, flip))
    }

//логика игры
    function flip(card) {
        //проверка, если открытые карточки не совпали - сбрасываем и закрываем
        if (firstCard !== null && secondCard !== null) {
            if (firstCard.number !== secondCard.number) {
                firstCard.open = false
                secondCard.open = false
                firstCard = null
                secondCard = null
            }
        }

        //заполняем карточки
        if (firstCard == null) {
            firstCard = card
        } else {
            if (secondCard == null) {
                secondCard = card
            }
        }
        // открываем и проверяем на совпадение
        if (firstCard !== null && secondCard !== null) {
            if (firstCard.number == secondCard.number) {
                firstCard.success = true
                secondCard.success = true
                firstCard = null //обнуление последующих карточек
                secondCard = null
            }
        }
        
        if (document.querySelectorAll('.card.success').length == cardsArr.length) {
            document.getElementById('title').hidden = true;
            clearInterval(timer);
            document.getElementById('game').removeChild(timeBox);

            document.getElementById('game').innerHTML = '';
            newArr = [];
            cardsArr = [];
            firstCard = null;
            secondCard = null;

            document.getElementById('game').classList.add('game-success');

            let winnerText1 = document.createElement('h2');
            let winnerText2 = document.createElement('h2');
            let resetButton = document.createElement('button');
            winnerText1.classList.add('win_descr');
            winnerText2.classList.add('win_descr')
            resetButton.classList.add('restart-btn');
            winnerText1.textContent = `🏆 Вы молодец! 🏆`;
            winnerText2.textContent = `Справились за ${59 - time} сек`;
            resetButton.textContent = 'Начать игру снова';
            time = null;
            document.getElementById('game').prepend(winnerText1);
            document.getElementById('game').prepend(winnerText2);
            document.getElementById('game').prepend(resetButton);
            
            resetButton.addEventListener('click', function() {
                document.getElementById('game').removeChild(winnerText1);
                document.getElementById('game').removeChild(winnerText2);
                document.getElementById('game').removeChild(resetButton);
                document.getElementById('title').hidden = false;
                document.getElementById('game').classList.remove('game-success');
                createForm(document.getElementById('start'));
            })

            // alert('Игра завершена! Вы молодец');
             //срабатывает, только есть объявлять глобально

            //обнуляем поле до формы
        }
}
}

newGame(document.getElementById('game'), cardsCount)