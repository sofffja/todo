import List from './list';

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

function populateStorage() {
  if (storageAvailable('localStorage')) {
    localStorage.setItem('userdata', JSON.stringify(List.array));
  }
}

function loadLocalStorage() {
  const userData = JSON.parse(localStorage.getItem('userdata'));
  let i = 0;
  
  userData.forEach((userList) => {
    List.addList(userList._title);
    
    userList.tasks.forEach((userTask) => {
      List.getList(i).addTask(userTask._title, userTask.description, userTask.dueDate, userTask.priority, userTask.done);
    })

    i += 1;
  })
  
  List.setCurrent(0);
}

export { loadLocalStorage, populateStorage }