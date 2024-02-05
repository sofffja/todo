import { displayTasks } from "./DOMHandler";
import { listsArray } from "./listsArray";
import { populateStorage } from "./populateStorage";

const dialog = document.querySelector('dialog');
const submitBtn = document.querySelector('#submit');
const closeModalBtn = document.querySelector('.close');

const titleInput = document.querySelector('#title');
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

export { openModal }