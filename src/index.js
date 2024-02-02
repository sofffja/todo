import './style.css'
import Todo from './todoItem'
import List from './list.js'

const lists = function() {
  const listsArray = [];
  let currentList;
  
  const add = (title) => {
    listsArray.push(new List(title));
  }

  const getCurrent = () => currentList;

  const setCurrent = (index) => {
    currentList = listsArray[index];
  }

  return { listsArray, getCurrent, setCurrent, add }
}();

const todos = function() {
  function add(title, description, dueDate, priority) {
    lists.getCurrent().todos.push(new Todo(title, description, dueDate, priority));
    DOMHandler.displayTodos();
  }

  return { add }
}();

const initDefault = function() {
  lists.add('Home');
  lists.setCurrent(0);

  for (let i = 1; i <= 5; i++) {
    const defaultTodo = new Todo(`task ${i}`, `description ${i}`, '19-02-24', 1);
    lists.getCurrent().todos.push(defaultTodo);
  }
}();

const DOMHandler = function() {
  const todosDiv = document.querySelector('#todos');
  const listsDiv = document.querySelector('#lists');
  const currentListH1 = document.querySelector('#current-list');
  const newListBtn = document.querySelector('.new-list');
  
  const initDOM = function() {
    displayTodos();
    displayLists();
    displayCurrentList();
  }()

  function displayCurrentList() {
    currentListH1.textContent = lists.getCurrent().title;
    console.log(lists.getCurrent().title)
  };

  function displayLists() {
    listsDiv.textContent = '';
    for (const list of lists.listsArray) {
      const listPara = document.createElement('p');
      listPara.textContent = list.title;
      listPara.setAttribute('index', lists.listsArray.indexOf(list));
      listsDiv.appendChild(listPara);

      listsDiv.addEventListener('click', (e) => {
        let index = e.target.getAttribute('index');
        lists.setCurrent(index);
        displayCurrentList();
        displayTodos();
      })
    }
  };

  function displayTodos() {
    todosDiv.textContent = '';
    for (const todo of lists.getCurrent().todos) {
      const newItem = createTodo(todo);
      newItem.setAttribute('index', lists.getCurrent().todos.indexOf(todo));
      todosDiv.appendChild(newItem)
    }
  };

  function createTodo(todo) {
    const newItem = document.createElement('div');
    const title = document.createElement('h3');
    const description = document.createElement('p');
    const dueDate = document.createElement('p');
    const priority = document.createElement('p');

    const btnsDiv = document.createElement('div');
    const done = document.createElement('button');
    const deleteTodo = document.createElement('button');

    title.textContent = todo.title;
    description.textContent = todo.description;
    dueDate.textContent = todo.dueDate;
    priority.textContent = todo.priority;

    done.textContent = 'done';
    done.addEventListener('click', (e) => {
      e.target.classList.toggle('done');
      todo.toggleDone()
    })
    
    deleteTodo.textContent = 'delete';
    deleteTodo.addEventListener('click', (e) => {
      let index = e.target.closest('[index]')
      lists.getCurrent().todos.splice(index, 1);
      displayTodos();
    })

    btnsDiv.classList.add('todo-btns')
    btnsDiv.append(done, deleteTodo);

    newItem.classList.add('todo-item');
    newItem.append(title, description, dueDate, priority, btnsDiv);

    return newItem;
  }

  const eventsHandler = function() {
    newListBtn.addEventListener('click', (e) => {
      let title = prompt('list title?', 'New list')
      lists.add(title);
      displayLists();
    })
  }();

  return { displayTodos }
}();

const modalForm = function() {
  const dialog = document.querySelector('dialog');

  const openModalBtn = document.querySelector('.new-todo');
  const submitBtn = document.querySelector('#submit');
  const closeModalBtn = document.querySelector('.close');

  const titleInput = document.querySelector('#title');
  const descriptionInput = document.querySelector('#description');
  const dueDateInput = document.querySelector('#due-date');
  const priorityInput = document.querySelector('#priority');

  openModalBtn.addEventListener('click', () => {
    dialog.showModal();
  })

  closeModalBtn.addEventListener('click', () => {
    dialog.close();
  })

  submitBtn.addEventListener('click', (e) => {
    e.preventDefault();

    todos.add(titleInput.value, descriptionInput.value, dueDateInput.value, priorityInput.value)

    dialog.close();
    document.querySelector('form').reset();
  })
}();