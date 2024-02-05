import List from './list.js';
import Task from './task.js'

export const listsArray = function () {
  const array = [];
  let currentList;

  const addList = (title) => {
    array.push(new List(title));
  };

  const removeList = (index) => {
    console.log(array)
    array.splice(index, 1)
  }

  const addToCurrent = (title, description, dueDate, priority) => {
    currentList.addTask(new Task(title, description, dueDate, priority));
  }

  const getCurrent = () => currentList;

  const setCurrent = (index) => {
    currentList = array[index];
  };

  return { array, addToCurrent, setCurrent, getCurrent, addList, removeList };
}();
