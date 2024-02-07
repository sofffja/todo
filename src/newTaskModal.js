import List from "./list";
import { displayTasks } from "./DOMHandler";
import { populateStorage } from "./localStorage";

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
  List.addToCurrent(titleInput.value, descriptionInput.value, dueDateInput.value, selectedPriority)
  displayTasks();
  populateStorage();

  dialog.close();
  document.querySelector('#task-form').reset();
});

export default openModal;