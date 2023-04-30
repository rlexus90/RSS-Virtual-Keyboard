import keyboard from './keyboard.js';
import Element from './addElement.js';

function drawPage() {
  const body = document.querySelector('body');
  const keyboardElem = new Element('div', '', 'keyboard');
  body.appendChild(keyboardElem.addElement());
  const keyboardHtml = document.querySelector('.keyboard');
  const rows = Object.keys(keyboard);
  rows.forEach((row) => {
    const el = new Element('div', '', ['row', row]);
    keyboardHtml.appendChild(el.addElement());
  });
}

function drawKeybord() {
  const rows = Object.keys(keyboard);
  const rowsHtml = document.querySelectorAll('.row');
  rows.forEach((row, index) => {
    Object.values(keyboard[row]).forEach((key) => {
      const el = new Element('div', '', ['key', key.type,
        `${row}-key`], key.code, JSON.stringify(key));
      rowsHtml[index].appendChild(el.addElement());
    });
  });
}

function addStyle() {
  const head = document.querySelector('head');
  const style = document.createElement('link');
  style.href = './assets/css/style.css';
  style.setAttribute('rel', 'stylesheet');
  head.appendChild(style);
}

function showKeys(lang, shift) {
  const keyboardHtml = document.querySelector('.keyboard');
  keyboardHtml.classList.remove('en', 'ru', 'shift-en', 'shift-ru');
  if (lang === 'en') {
    if (!shift) {
      keyboardHtml.classList.add('en');
    } else {
      keyboardHtml.classList.add('shift-en');
    }
  } else if (!shift) {
    keyboardHtml.classList.add('ru');
  } else {
    keyboardHtml.classList.add('shift-ru');
  }
}

export {
  drawPage, drawKeybord, addStyle, showKeys,
};
