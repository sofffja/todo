import { listsArray } from './listsArray.js';
import { populateStorage } from './populateStorage.js';
import Task from './task.js';
import { openModal } from './modalForm.js';

const tasksDiv = document.querySelector('#tasks');
const listsDiv = document.querySelector('#lists');
const currentListH1 = document.querySelector('#current-list');
const newListBtn = document.querySelector('.new-list');
const newTaskBtn = document.querySelector('.new-task')

const initDOM = function () {
  loadDefault();

  if (listsArray.array.length !== 0) {
    displayLists();
    displayCurrentList();
  }

  eventsHandler();
};

function loadDefault() {
  listsArray.addList('Home');
    listsArray.setCurrent(0);

    for (let i = 1; i <= 5; i++) {
      const defaultTask = new Task(`task ${i}`, `description ${i}`, '19-02-24', 1);
      listsArray.getCurrent().addTask(defaultTask);
    }

    populateStorage();
}

function displayCurrentList() {
  currentListH1.textContent = listsArray.getCurrent().title;
  displayTasks();
};

function displayLists() {
  listsDiv.textContent = '';
  for (const list of listsArray.array) {
    const listPara = document.createElement('p');
    listPara.textContent = list.title;

    const listDelete = document.createElement('button');
    listDelete.textContent = 'X';

    const listDiv = document.createElement('div');
    listDiv.setAttribute('index', listsArray.array.indexOf(list));
    listDiv.addEventListener('click', (e) => {
      let index = e.target.closest('[index]').getAttribute('index');
      console.log(index);
      listsArray.setCurrent(index);
      displayCurrentList();
      populateStorage();
    });
    listDiv.append(listPara, listDelete);
    listsDiv.appendChild(listDiv);
  }
};

function displayTasks() {
  tasksDiv.textContent = '';
  if (lists) {
    for (const task of listsArray.getCurrent().tasks) {
      const newItem = createTaskDiv(task);
      newItem.setAttribute('index', listsArray.getCurrent().tasks.indexOf(task));
      tasksDiv.appendChild(newItem);
    }
  }
};

function createTaskDiv(task) {
  const newItem = document.createElement('div');
  const title = document.createElement('h3');
  const description = document.createElement('p');
  const dueDate = document.createElement('p');
  const priority = document.createElement('p');

  const btnsDiv = document.createElement('div');
  const done = document.createElement('button');
  const deleteTask = document.createElement('button');

  title.textContent = task.title;
  description.textContent = task.description;
  dueDate.textContent = task.dueDate;
  priority.textContent = task.priority;

  done.textContent = 'done';
  done.addEventListener('click', (e) => {
    e.target.classList.toggle('done');
    task.toggleDone();
  });

  deleteTask.textContent = 'delete';
  deleteTask.addEventListener('click', (e) => {
    let index = e.target.closest('[index]').getAttribute('index');
    listsArray.getCurrent().removeTask(index);
    displayTasks();
    populateStorage();
  });

  btnsDiv.classList.add('task-btns');
  btnsDiv.append(done, deleteTask);

  newItem.classList.add('task-item');
  newItem.append(title, description, dueDate, priority, btnsDiv);

  return newItem;
}

function eventsHandler() {
  newListBtn.addEventListener('click', (e) => {
    console.log('new list...')
    let title = prompt('list title?', 'New list');
    listsArray.addList(title);
    displayLists();
    populateStorage();
    listsArray.setCurrent(listsArray.array.length - 1);
    displayCurrentList();
  });

  newTaskBtn.addEventListener('click', (e) => {
    openModal();
  });
};

export { initDOM, displayTasks }