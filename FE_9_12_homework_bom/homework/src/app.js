const rootNode = document.getElementById('root');
let todoItems = [];
const ZERO = 0;
let current;

window.addEventListener('load', init);
window.addEventListener('hashchange', checkHash, false);

function init() {
    //document.body.innerHTML = markup;
    let wrapper = document.createElement('div');
    wrapper.setAttribute('class', 'wrapper');
    wrapper.innerHTML = markup;
    rootNode.appendChild(wrapper);

    let storedData = localStorage.getItem('toDoListKey');
    if (storedData) {
        todoItems = JSON.parse(storedData);
    }
    parceHTML('Simple TODO application', false, 'Add new task', 'TODO is empty');
}

let markup = `<h1 class='retreat' id='h1'></h1><!--
             --><input type='text' class='inputField' size='40' id ='inputField'><!--
             --><button type='button' class='btn'></button><!--
             --><button type='button' class='btn'></button><!--
             --><h2 class='notification retreat' id='notification'></h2><!--
             --><ul class='toDoList' id='toDoList'></ul>`;

function parceHTML() {
    document.getElementById('h1').innerText = arguments[0];
    const btn = document.getElementsByClassName('btn');
    const inputField = document.getElementById('inputField');
    const notification = document.getElementById('notification');
    let toDoList = document.getElementById('toDoList');

    if (arguments[1]) {
        notification.style.display = 'none';
        inputField.style.display = 'block';
        btn[0].style.display = 'initial';
        btn[0].innerText = 'Cancel';
        btn[0].addEventListener('click', function () {
            redirect();
        });
        btn[1].setAttribute('id', 'save');
        btn[1].innerText = arguments[2];
        toDoList.style.display = 'none';

    } else {
        inputField.style.display = 'none';
        btn[0].style.display = 'none';
        btn[1].innerText = arguments[2];
        btn[1].addEventListener('click', function () {
            window.location.hash = '/add';
        });

        if (todoItems.length === 0) {
            notification.innerText = arguments[3];

        } else {
            toDoList.style.display = 'block';
            parceList(toDoList);

        }
    }


}


function parceList(toDoList) {


    for (let i = 0; i < todoItems.length; i++) {

        let li = document.createElement('li');
        let iconStatus = document.createElement('img');

        if (todoItems[i].isDone === 'false') {
            iconStatus.src = 'assets/img/todo-s.png';
        } else {
            iconStatus.src = 'assets/img/done-s.png';
        }

        iconStatus.addEventListener('click', function () {
            if (todoItems[i].isDone) {
                iconStatus.src = 'assets/img/done-s.png';
                todoItems[i].isDone = !todoItems[i].isDone;
                todoItems[i].id += todoItems.length;
                li.style.backgroundColor = '#ccc';
            }

            localStorage.setItem('toDoListKey', JSON.stringify(todoItems));
        });

        let paragraph = document.createElement('p');
        let text = document.createTextNode(todoItems[i].description);
        paragraph.appendChild(text);

        paragraph.addEventListener('click', function () {
            current = todoItems[i].id;
            window.location.hash = `/modify/${todoItems[i].id}`;
        });

        let iconDelete = document.createElement('img');
        iconDelete.src = 'assets/img/remove-s.jpg';

        iconDelete.addEventListener('click', function () {

            this.parentElement.remove();
            todoItems.splice(current, 1);
            localStorage.setItem('toDoListKey', JSON.stringify(todoItems));
            if (todoItems.length === 0) {
                localStorage.removeItem('toDoListKey');
            }

        });

        li.appendChild(iconStatus);
        li.appendChild(paragraph);
        li.appendChild(iconDelete);
        toDoList.appendChild(li);
    }

}


function checkHash(e) {

    let currentPageBol = e.newURL.endsWith('#/add');
    let value = currentPageBol ? 'Add task' : 'Modify item';

    parceHTML(`${value}`, true, 'Save changes');
    let save = document.getElementById('save');
    save.disabled = currentPageBol;

    let itemDescription = document.getElementById('inputField');
    itemDescription.addEventListener('input', checkInput);

    if (currentPageBol) {
        save.addEventListener('click', addNewItem);
    } else {
        itemDescription.value = todoItems[current].description;
        save.addEventListener('click', modifyItem);
    }

}

function checkInput() {
    let save = document.getElementById('save');
    save.disabled = (this.value.length > ZERO) ? false : true;
}

function redirect() {
    localStorage.setItem('toDoListKey', JSON.stringify(todoItems));
    window.location.href = window.location.href.split('#')[0];
}

function addNewItem() {
    let itemDescription = document.getElementById('inputField');
    let item = {};
    item.isDone = 'false';
    item.id = todoItems.length;
    item.description = itemDescription.value;
    todoItems.push(item);
    redirect();
}

function modifyItem() {
    let itemDescription = document.getElementById('inputField');

    todoItems[current].description = itemDescription.value;
    redirect();
}