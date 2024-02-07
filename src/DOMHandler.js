import { populateStorage, loadLocalStorage } from './localStorage.js';
import List from './list.js';
import openTaskModal from './newTaskModal.js';
import openListModal from './newListModal.js';

const initDOM = function () {
  if (!localStorage.getItem('userdata')) {
    loadDefault();
  } else {
    loadLocalStorage();
  };
  
  if (List.array.length !== 0) {
    displayLists();
    displayCurrentList();
  }

  eventsHandler();
};

function loadDefault() {
  List.addList('Home');
  List.setCurrent(0);
  for (let i = 1; i <= 5; i++) {
    List.addToCurrent(`task ${i}`, `description ${i}`, '19-02-24', 1);
  }
  
  populateStorage();
}

function displayCurrentList() {
  const currentListH1 = document.querySelector('#current-list');

  currentListH1.textContent = List.getCurrent().title;
  displayTasks();
};

function deleteList(list) {
  if (List.array.length !== 1) {
        
    let index = List.array.indexOf(list)
    let indexOfCurrent = List.array.indexOf(List.getCurrent());
    
    changeCurrent(index, indexOfCurrent);
    List.removeList(index);
  }

  function changeCurrent(index, indexOfCurrent) {
    if (index === 0) {
      List.setCurrent(index + 1);
      displayCurrentList();
    } else if (index === indexOfCurrent) {
      List.setCurrent(index - 1);
      displayCurrentList();
    }
  }
}

function displayLists() {
  const listsDiv = document.querySelector('#lists');
  listsDiv.textContent = '';

  for (const list of List.array) {
    const listPara = document.createElement('p');
    listPara.textContent = list.title;

    const listDelete = document.createElement('button');
    listDelete.classList.add('list-delete');
    listDelete.textContent = '';
    listDelete.addEventListener('click', () => {
      deleteList(list);
      populateStorage();
      displayLists();
    })

    const listDiv = document.createElement('div');
    listDiv.addEventListener('click', (e) => {
      if (e.target.tagName !== 'BUTTON') {
        let index = List.array.indexOf(list);
        List.setCurrent(index);
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
  
  for (const task of List.getCurrent().tasks) {
    const newItem = createTaskDiv(task);
    tasksDiv.appendChild(newItem);
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
    let index = List.getCurrent().tasks.indexOf(task);
    List.getCurrent().removeTask(index);
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
    
    displayLists();
    populateStorage();
    List.setCurrent(List.array.length - 1);
    displayCurrentList();
  });

  newTaskBtn.addEventListener('click', (e) => {
    openTaskModal();
  });
};

export { initDOM, displayTasks, displayLists, displayCurrentList }