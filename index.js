import {
  drawPage, drawKeybord, addStyle, showKeys,
} from './assets/js/function.js';
// import keyboard from './js/keyboard.js';
// import Element from './js/addElement.js';

let lang = window.localStorage.getItem('lang') || 'en';
window.addEventListener('beforeunload', () => {
  window.localStorage.setItem('lang', `${lang}`);
});

async function loadPage() {
  await addStyle();
  await drawPage();
  await drawKeybord();
  await showKeys();
}
loadPage();

function changeLang() {
  lang = (lang === 'en') ? 'ru' : 'en';
}

function keyPress(e) {
  if (e.altKey && e.ctrlKey) {
    changeLang();
    showKeys(lang);
  }
}

window.addEventListener('keydown', keyPress);
