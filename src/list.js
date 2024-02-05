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
}