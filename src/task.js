export default class Task {
  constructor(title, description, dueDate, priority, done) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.done = done ? done : false;
  }

  toggleDone() {
    this.done = this.done ? false : true;
  }

  set title(value) {
    if (value === '') {
      this._title = 'New task';
      return;
    }
    this._title = value
  }

  get title() {
    return this._title;
  }
}