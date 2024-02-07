import List from "./list";
import { displayCurrentList, displayLists } from "./DOMHandler";
import { populateStorage } from "./localStorage";

const dialog = document.querySelector('#list-dialog');
const submitBtn = document.querySelector('#list-submit');
const closeModalBtn = document.querySelector('#list-close');

const titleInput = document.querySelector('#list-title');


const openModal = () => {
  dialog.showModal();
}

closeModalBtn.addEventListener('click', () => {
  dialog.close();
});

submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  
  List.addList(titleInput.value);
  displayLists();
  populateStorage();
  List.setCurrent(List.array.length - 1);
  displayCurrentList();

  dialog.close();
  document.querySelector('#list-form').reset();
});

export default openModal;