import { displayCurrentList, displayLists } from "./DOMHandler";
import { listsArray } from "./listsArray";
import { populateStorage } from "./populateStorage";

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
  
  listsArray.addList(titleInput.value);
  displayLists();
  populateStorage();
  listsArray.setCurrent(listsArray.array.length - 1);
  displayCurrentList();

  dialog.close();
  document.querySelector('form').reset();
});

export default openModal;