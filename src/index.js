import './style.css'
import Todo from './todoItem'
import List from './list.js'

const defaultList = new List('default');

for (let i = 1; i <= 5; i++) {
  const defaultTodo = new Todo(`task ${i}`, `description ${i}`, '19-02-24', 1);
  defaultList.todos.push(defaultTodo);
}


const todos = function() {
  function add(title, description, dueDate, priority) {
    defaultList.todos.push(new Todo(title, description, dueDate, priority));
    DOMHandler.displayTodos();
  }

  return { add }
}();

const DOMHandler = function() {
  const todosDiv = document.querySelector('#todos');
  const listsDiv = document.querySelector('#lists');
  displayTodos();

  function displayTodos() {
    todosDiv.textContent = '';
    for (const todo of defaultList.todos) {
      const newItem = createTodo(todo);
      newItem.setAttribute('index', defaultList.todos.indexOf(todo));
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
      defaultList.todos.splice(index, 1);
      displayTodos();
    })

    btnsDiv.classList.add('todo-btns')
    btnsDiv.append(done, deleteTodo);

    newItem.classList.add('todo-item');
    newItem.append(title, description, dueDate, priority, btnsDiv);

    return newItem;
  }

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