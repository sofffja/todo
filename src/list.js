export default class List {
  constructor(title) {
    this.title = title;
    this.tasks = []
  }

  addTask(item) {
    this.tasks.push(item);
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