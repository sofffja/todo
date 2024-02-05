import { displayTasks } from "./DOMHandler";
import { listsArray } from "./listsArray";
import { populateStorage } from "./populateStorage";

const dialog = document.querySelector('dialog');
const submitBtn = document.querySelector('#submit');
const closeModalBtn = document.querySelector('.close');

const titleInput = document.querySelector('#title');
const descriptionInput = document.querySelector('#description');
const dueDateInput = document.querySelector('#due-date');
const priorityInput = document.querySelector('#priority');

export const openModal = () => {
  dialog.showModal();
}

closeModalBtn.addEventListener('click', () => {
  dialog.close();
});

submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  
  listsArray.addToCurrent(titleInput.value, descriptionInput.value, dueDateInput.value, priorityInput.value)
  displayTasks();
  populateStorage();

  dialog.close();
  document.querySelector('form').reset();
});