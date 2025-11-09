(function() {
    let key = '';
    let listArr = [];

//функция создает заголовок приложения
    function createAppTitle(title) {
        let appTitle = document.createElement('h2');
        appTitle.innerHTML = title;
        return appTitle;
    }
//функция для создания разметки-строки для ввода и кнопки Добавить
    function createTodoItemForm() {
        let form = document.createElement('form');
        let input = document.createElement('input');
        let buttonWrapper = document.createElement('div');
        let button = document.createElement('button');

        form.classList.add('input-group', 'mb-3');
        input.classList.add('form-control');
        input.placeholder = 'Введите название нового дела';
        buttonWrapper.classList.add('input-group-append');
        button.classList.add('btn', 'btn-primary');
        button.textContent = 'Добавить дело';

        buttonWrapper.append(button);
        form.append(input);
        form.append(buttonWrapper);

        function buttonState() {
            if (input.value === '') {
                button.setAttribute('disabled', '');
                button.textContent = 'Неактивная кнопка';
                // button.classList.add('btn-danger');
            } else {
                button.disabled = false;
                button.textContent = 'Добавить дело';
            }
        };
        buttonState();
        input.addEventListener('input', buttonState);

        return {
            form,
            input,
            button,
        };
    }
//создаем список будущих дел
    function createTodoList() {
        let list = document.createElement('ul');
        list.classList.add('list-group');
        return list;
    }

    //создаем строку в списке дел и вешаем кнопки Готово и Удалить
    function createTodoItem(obj) {
        let item = document.createElement('li');

        let buttonGroup = document.createElement('div');
        let doneButton = document.createElement('button');
        let deleteButton = document.createElement('button');

        item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        item.textContent = obj.name;

        buttonGroup.classList.add('btn-group', 'btn-grounp-sm');
        doneButton.classList.add('btn', 'btn-success');
        doneButton.textContent = 'Готово';
        deleteButton.classList.add('btn', 'btn-danger');
        deleteButton.textContent = 'Удалить';

        if (obj.done == true) item.classList.toggle('list-group-item-success');

         //добавляем обработчики на кнопку
         doneButton.addEventListener('click', function() {
            item.classList.toggle('list-group-item-success');//toggle - добавляем или убираем, бутстрап красит строчку
            //берем не весь текст из li, а только первый текст, который ввели
            for (const listItem of listArr) {
                if(listItem.id == obj.id) listItem.done = !listItem.done
            }  //при клике меняем на противоположное 
    
            addToStorage(listArr, key);
        });

        deleteButton.addEventListener('click', function() {
            //спрашиваем, уверен ли пользователь, что удаляем?
            //вернет true, если пользователь нажмет ДА
            //фильтруем li в массиве по id, если нажата кнопка Удалить 
            if (confirm('Вы уверены?')) {
                item.remove();
                // функция удаляет элемент
                listArr = listArr.filter(item => item.id !== obj.id);
                addToStorage(listArr, key);
            }
            
        });

        buttonGroup.append(doneButton);
        buttonGroup.append(deleteButton);
        item.append(buttonGroup);

        return {
            item,
            doneButton,
            deleteButton,
        };
    }
   
    //функция для записи списка дел в LS 
    function addToStorage(listArr, listName) {
        localStorage.setItem(listName, JSON.stringify(listArr));
    }


//собираем приложение из заголовка, формы занесения дела и списка заданий
function createTodoApp(container, title = 'Список дел', listName) {
 //это функции создания заголовка, строки для ввода и списка дел
    let todoAppTitle = createAppTitle(title);
    let todoItemForm = createTodoItemForm();
    let todoList = createTodoList();
   
    container.append(todoAppTitle);
    container.append(todoItemForm.form);
    container.append(todoList);

    key = listName; //listname доступна только в атрибуте,key - глобальная

        //генерируем новый Id 
    function generatedId(listArr) {
        let max = 0;
        for (let i = 0; i < listArr.length; i++) {
            if (listArr[i].id > max) {
                max = listArr[i].id;
            }
        }
        return max + 1;
        };

        //получаем данные из ЛС
    let localData = localStorage.getItem(key);
    if (localData !== null && localData !== '') {
        listArr = JSON.parse(localData)
    }; //если в хранилище что-то есть, то расшифровываем

        //подгружаем из ЛС данные массива для отображения - li в ul
    for (const itemList of listArr) {
        let todoItem = createTodoItem(itemList);
        todoList.append(todoItem.item);
    }

    //браузер создает событие submit на форме по нажатию Enter или на кнопку
    todoItemForm.form.addEventListener('submit', function(e) {
        //строчка необходима, чтобы предотвратить действия браузера, 
        //например чтобы при отправке формы страница не перезагружалась 
        e.preventDefault();

        //игнорируем создание элемента, если пользователь ничего не ввел в поле
        if(!todoItemForm.input.value) {
            return;
        }

          //обработка объекта 
        const obj = {
            id: generatedId(listArr),
            name: todoItemForm.input.value,
            done: false,
        }

        listArr.push(obj); //пушим данные объекта в массив

     
        
        let todoItem = createTodoItem(obj);//cоздаем введенное дело
       
        
        todoList.append(todoItem.item);//создаем и добавляем в список новое дело с названием из поля ввода
        addToStorage(listArr, key);
        
        todoItemForm.input.value = '';//обнуляем значения в поле, чтобы не стирать его вручную
        todoItemForm.button.disabled = true; //делаем кнопку неактивной
    });
}

window.createTodoApp = createTodoApp;
})();