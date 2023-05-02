import {
  drawPage, drawKeybord, addStyle, showKeys, caps, keyClick,
} from './assets/js/function.js';

let lang = window.localStorage.getItem('lang') || 'en';
window.addEventListener('beforeunload', () => {
  window.localStorage.setItem('lang', `${lang}`);
});

async function loadPage() {
  await addStyle();
  await drawPage();
  await drawKeybord();
  await showKeys(false);
  const input = document.querySelector('.input');
  input.addEventListener('focusout', () => { input.focus(); });
  const textarea = document.querySelector('.textarea');
  textarea.addEventListener('click', () => { input.focus(); });
  const keyboard = document.querySelector('.keyboard');
  keyboard.addEventListener('click', (e) => {
    const key = e.target.closest('.key');
    if (key) keyClick(key.id);
  });
}
loadPage();

function changeLang() {
  lang = (lang === 'en') ? 'ru' : 'en';
}

function keyPress(e) {
  const { code } = e;
  const keyHtml = document.querySelector(`#${code}`);

  if (e.key === 'CapsLock') {
    caps();
    keyHtml.classList.toggle('pressed');
    return;
  }

  keyHtml.classList.add('pressed');

  if (e.key === 'Shift') showKeys(true);

  if (e.altKey && e.ctrlKey) {
    changeLang();
    showKeys();
  }

  keyClick(code);
}

function keyUp(e) {
  const { code } = e;
  const keyHtml = document.querySelector(`#${code}`);
  if (e.key === 'CapsLock') { return; }
  keyHtml.classList.remove('pressed');
  if (e.key === 'Shift') showKeys(false);
}

window.addEventListener('keydown', keyPress);
window.addEventListener('keyup', keyUp);
