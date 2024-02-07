import List from './list.js';

function populateStorage() {
  if (storageAvailable('localStorage')) {
    localStorage.setItem('userdata', JSON.stringify(List.array));
  }
}

function loadLocalStorage() {
  const userData = JSON.parse(localStorage.getItem('userdata'));
  let i = 0;
  for (const userList of userData) {
    List.addList(userList._title);
    
    for (const userTask of userList.tasks) {
      List.getList(i).addTask(userTask._title, userTask.description, userTask.dueDate, userTask.priority, userTask.done);
    }
    i++;
  }
  List.setCurrent(0);
}

function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      // everything except Firefox
      (e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === "QuotaExceededError" ||
        // Firefox
        e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}

export { loadLocalStorage, populateStorage }