import storageAvailable from './storageAvailable.js';
import { listsArray } from './listsArray.js';

export function populateStorage() {
  if (storageAvailable('localStorage')) {
    localStorage.setItem('userdata', JSON.stringify(listsArray.array));
  }
}
