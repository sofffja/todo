import { listsArray } from './listsArray.js';
import { populateStorage } from './populateStorage.js';
import Task from './task.js';
import openTaskModal from './newTaskModal.js';
import openListModal from './newListModal.js';

const initDOM = function () {
  if (!localStorage.getItem('userdata')) {
    loadDefault();
  } else {
    loadLocalStorage();
  };
  
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

function loadLocalStorage() {
  const userData = JSON.parse(localStorage.getItem('userdata'));
    let i = 0;
    for (const userList of userData) {
      listsArray.addList(userList._title);
      console.log(userList);
      for (const userTask of userList.tasks) {
        listsArray.array[i].addTask(new Task(userTask._title, userTask.description, userTask.dueDate, userTask.priority, userTask.done));
      }
      i++;
    }
    listsArray.setCurrent(0);
}

function displayCurrentList() {
  const currentListH1 = document.querySelector('#current-list');

  currentListH1.textContent = listsArray.getCurrent().title;
  displayTasks();
};

function displayLists() {
  const listsDiv = document.querySelector('#lists');

  listsDiv.textContent = '';
  for (const list of listsArray.array) {
    const listPara = document.createElement('p');
    listPara.textContent = list.title;

    const listDelete = document.createElement('button');
    listDelete.classList.add('list-delete');
    listDelete.textContent = '';
    listDelete.addEventListener('click', (e) => {
      if (listsArray.array.length !== 1) {
        
        let index = listsArray.array.indexOf(list)
        let indexOfCurrent = listsArray.array.indexOf(listsArray.getCurrent());
        
        if (index === 0) {
          listsArray.setCurrent(index + 1);
          displayCurrentList();
        } else if (index === indexOfCurrent) {
          listsArray.setCurrent(index - 1);
          displayCurrentList();
        }
        
        listsArray.removeList(index);
        populateStorage();
        displayLists();
      }
    })

    const listDiv = document.createElement('div');
    listDiv.addEventListener('click', (e) => {
      if (e.target.tagName !== 'BUTTON') {
        let index = listsArray.array.indexOf(list);
        listsArray.setCurrent(index);
        displayCurrentList();
        populateStorage();
      }
    });

    listDiv.append(listPara, listDelete);
    listsDiv.appendChild(listDiv);
  }
};

function displayTasks() {
  const tasksDiv = document.querySelector('#tasks');
  tasksDiv.textContent = '';
  if (lists) {
    for (const task of listsArray.getCurrent().tasks) {
      const newItem = createTaskDiv(task);
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

  description.classList.add('task-description')

  done.textContent = '';
  done.classList.add('task-done')
  if (task.done === true) {
    // done.closest('.task-item').classList.add('done')
  }
  done.addEventListener('click', (e) => {
    task.toggleDone();
    populateStorage();
    e.target.closest('.task-item').classList.toggle('done');
    e.target.classList.toggle('done');
  });

  deleteTask.textContent = '';
  deleteTask.classList.add('task-delete')
  deleteTask.addEventListener('click', (e) => {
    let index = listsArray.getCurrent().tasks.indexOf(task);
    listsArray.getCurrent().removeTask(index);
    displayTasks();
    populateStorage();
  });

  btnsDiv.classList.add('task-btns');
  btnsDiv.append(deleteTask, done);

  newItem.classList.add('task-item');
  newItem.append(done, title, description, priority, dueDate, deleteTask);

  return newItem;
}

function eventsHandler() {
  const newListBtn = document.querySelector('.new-list');
  const newTaskBtn = document.querySelector('.new-task');

  newListBtn.addEventListener('click', (e) => {
    openListModal();
  });

  newTaskBtn.addEventListener('click', (e) => {
    openTaskModal();
  });
};

export { initDOM, displayTasks, displayLists, displayCurrentList }