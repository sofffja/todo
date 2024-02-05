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

  set priority(value) {
    if(value !== 1 || value !== 2 || value !== 3) {
      console.error('Priority must be 1, 2 or 3');
    }

    this._priority = value;
  }

  get priority() {
    return this._priority;
  }
}