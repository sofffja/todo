import Task from "./task";

export default class List {
  static #allLists = [];
  static #currentList;

  static addList(title) {
    this.#allLists.push(new List(title));
  }

  static removeList(id) {
    this.#allLists.splice(id, 1);
  }

  static getCurrent = () => this.#currentList;

  static setCurrent = (index) => {
    this.#currentList = this.#allLists[index];
  }

  static get array() {
    return this.#allLists;
  }

  static getList = (index) => this.#allLists[index]

  static addToCurrent = (title, description, dueDate, priority) => {
    this.#currentList.addTask(title, description, dueDate, priority);
  }
  
  constructor(title) {
    this.title = title;
    this.tasks = []
  }

  addTask(title, description, dueDate, priority) {
    this.tasks.push(new Task(title, description, dueDate, priority));
  }

  removeTask(index) {
    this.tasks.splice(index, 1)
  }

  set title(value) {
    if (value === '') {
      this._title = 'New list';
      return;
    }
    this._title = value;
  }

  get title() {
    return this._title;
  }
}