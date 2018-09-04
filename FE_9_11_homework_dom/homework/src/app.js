window.addEventListener('load', init);
const ZERO = 0;

function init() {
    let task = document.getElementById('input-text');
    task.addEventListener('input', checkInput);
}

function checkInput() {
    let btn = document.getElementById('btn-add');

    if (this.value.length > ZERO) {
        btn.disabled = false;
        btn.addEventListener('click', addNewAction);
    } else {
        btn.disabled = true;
    }
}

function addNewAction() {
    let rootNode = document.getElementById('root');
    const MAX_LIST = 10;

    let task = document.getElementById('input-text');

    if (rootNode.childElementCount === ZERO) {
        let ul = document.createElement('ul');
        rootNode.appendChild(ul);
        ul.setAttribute('id', 'ul-list');
    }

    let ulList = document.getElementById('ul-list');
    ulList.style.listStyleType = 'none';

    if (ulList.childElementCount < MAX_LIST) {

        let li = document.createElement('li');
        li.style.display = 'flex';
        li.style.alignItems = 'center';
        li.style.justifyContent = 'space-between';
        li.style.marginTop = '0.8rem';

        li.setAttribute('draggable', 'true');
        li.addEventListener('dragstart', drag);
        li.addEventListener('drop', drop);
        li.addEventListener('dragover', allowDrop);
        li.setAttribute('id', `item${ulList.childElementCount}`);

        let iconStatus = document.createElement('i');
        iconStatus.className += 'material-icons';
        iconStatus.innerHTML = 'check_box_outline_blank';
        iconStatus.style.cursor = 'pointer';
        iconStatus.style.marginRight = '0.5rem';
        iconStatus.addEventListener('click', doneAction);

        let paragraph = document.createElement('p');
        let text = document.createTextNode(task.value);
        paragraph.appendChild(text);
        paragraph.style.width = '100%';

        let iconDelete = document.createElement('i');
        iconDelete.className += 'material-icons';
        iconDelete.innerHTML = 'delete';
        iconDelete.style.cursor = 'pointer';
        iconDelete.addEventListener('click', deleteAction);

        li.appendChild(iconStatus);
        li.appendChild(paragraph);
        li.appendChild(iconDelete);
        ulList.appendChild(li);

    } else {
        let notification = document.getElementById('max-limit-notification-div');
        let message = document.createElement('h5');
        let textNote = document.createTextNode('Maximum item per list are created');
        message.appendChild(textNote);
        notification.appendChild(message);
        task.disabled = 'true';
        document.getElementById('btn-add').disabled = 'true';
    }
}

function doneAction() {
    this.innerHTML = 'check_box';
}

function deleteAction() {
    this.parentElement.remove();
}

let dragEl = null;
function drag(e) {
    dragEl = this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
}

function drop(e) {
    if (dragEl !== this) {
        dragEl.innerHTML = this.innerHTML;
        this.innerHTML = e.dataTransfer.getData('text/html');
    }
}

function allowDrop(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
}