import { populateStorage, loadLocalStorage } from './localStorage';
import List from './list';
import openTaskModal from './newTaskModal';
import openListModal from './newListModal';

function loadDefault() {
  List.addList('Home');
  List.setCurrent(0);
  for (let i = 1; i <= 5; i += 1) {
    List.addToCurrent(`task ${i}`, `description ${i}`, '19-02-24', 1);
  }

  populateStorage();
}

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

  description.classList.add('task-description');

  done.textContent = '';
  done.classList.add('task-done');
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
  deleteTask.classList.add('task-delete');
  deleteTask.addEventListener('click', () => {
    const index = List.getCurrent().tasks.indexOf(task);
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

function displayTasks() {
  const tasksDiv = document.querySelector('#tasks');
  tasksDiv.textContent = '';

  List.getCurrent().tasks.forEach((task) => {
    const newItem = createTaskDiv(task);
    tasksDiv.appendChild(newItem);
  });
}

function displayCurrentList() {
  const currentListH1 = document.querySelector('#current-list');

  currentListH1.textContent = List.getCurrent().title;
  displayTasks();
}

function deleteList(list) {
  const changeCurrent = (index, indexOfCurrent) => {
    if (index === 0) {
      List.setCurrent(index + 1);
      displayCurrentList();
    } else if (index === indexOfCurrent) {
      List.setCurrent(index - 1);
      displayCurrentList();
    }
  };

  if (List.array.length !== 1) {
    const index = List.array.indexOf(list);
    const indexOfCurrent = List.array.indexOf(List.getCurrent());

    changeCurrent(index, indexOfCurrent);
    List.removeList(index);
  }
}

function displayLists() {
  const listsDiv = document.querySelector('#lists');
  listsDiv.textContent = '';

  List.array.forEach((list) => {
    const listPara = document.createElement('p');
    listPara.textContent = list.title;

    const listDelete = document.createElement('button');
    listDelete.classList.add('list-delete');
    listDelete.textContent = '';
    listDelete.addEventListener('click', () => {
      deleteList(list);
      populateStorage();
      displayLists();
    });

    const listDiv = document.createElement('div');
    listDiv.addEventListener('click', (e) => {
      if (e.target.tagName !== 'BUTTON') {
        const index = List.array.indexOf(list);
        List.setCurrent(index);
        displayCurrentList();
        populateStorage();
      }
    });

    listDiv.append(listPara, listDelete);
    listsDiv.appendChild(listDiv);
  });
}

function eventsHandler() {
  const newListBtn = document.querySelector('.new-list');
  const newTaskBtn = document.querySelector('.new-task');

  newListBtn.addEventListener('click', () => {
    openListModal();

    displayLists();
    populateStorage();
    List.setCurrent(List.array.length - 1);
    displayCurrentList();
  });

  newTaskBtn.addEventListener('click', () => {
    openTaskModal();
  });
}

const initDOM = () => {
  if (!localStorage.getItem('userdata')) {
    loadDefault();
  } else {
    loadLocalStorage();
  }

  if (List.array.length !== 0) {
    displayLists();
    displayCurrentList();
  }

  eventsHandler();
};

export { initDOM, displayTasks, displayLists, displayCurrentList };
