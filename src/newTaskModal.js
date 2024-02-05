import { displayTasks } from "./DOMHandler";
import { listsArray } from "./listsArray";
import { populateStorage } from "./populateStorage";

const dialog = document.querySelector('#task-dialog');
const submitBtn = document.querySelector('#task-submit');
const closeModalBtn = document.querySelector('#task-close');

const titleInput = document.querySelector('#task-title');
const descriptionInput = document.querySelector('#description');
const dueDateInput = document.querySelector('#due-date');
const priorityInputs = document.querySelectorAll('[name="priority"]');

const openModal = () => {
  dialog.showModal();
}

closeModalBtn.addEventListener('click', () => {
  dialog.close();
});

submitBtn.addEventListener('click', (e) => {
  e.preventDefault();

  let selectedPriority;
  for (const priority of priorityInputs) {
    if (priority.checked) {
      selectedPriority = priority.value;
      break;
    }
  }
  
  listsArray.addToCurrent(titleInput.value, descriptionInput.value, dueDateInput.value, selectedPriority)
  displayTasks();
  populateStorage();

  dialog.close();
  document.querySelector('form').reset();
});

export default openModal;