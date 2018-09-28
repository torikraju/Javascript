const form = document.querySelector('#task-form');
const tasks = document.querySelector('.collection');
const clearTasks = document.querySelector('.clear-tasks');
const filter = document.querySelector('input#filter');
const inputTask = document.querySelector('input#task');

loadEventListners();

function loadEventListners() {

    form.addEventListener('submit', addTask);

}

function addTask(e) {
    if (inputTask.value === '') {
        alert('Add a task');
    }
    
    tasks.appendChild(createLi(inputTask.value));
    inputTask.value = '';

    e.preventDefault();
}

function createLi(taskvalue) {
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(taskvalue));
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);
    return li;
}

