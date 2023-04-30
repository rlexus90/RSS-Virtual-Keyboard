import keyboard from './keyboard.js';
import Element from './addElement.js';

let lang = window.localStorage.getItem('lang') || 'en';

function drawPage() {
  const body = document.querySelector('body');
  const keyboardElem = new Element('div', '', 'keyboard');
  body.appendChild(keyboardElem.addElement());
  const keyboardHtml = document.querySelector('.keyboard');
  const rows = Object.keys(keyboard[lang]);
  rows.forEach((row) => {
    const el = new Element('div', '', ['row', row]);
    keyboardHtml.appendChild(el.addElement());
  });
}


const rowsHtml = document.querySelectorAll('.row');

function drawKeybord() {
  rows.forEach((row, index) => {
    Object.values(keyboard[lang][row]).forEach((key) => {
      const el = new Element('div', key.norm, ['key', key.type,
        `${row}-key`], key.code, key.shift);
      rowsHtml[index].appendChild(el.addElement());
    });
  });
}

drawKeybord();

function addStyle() {
  const head = document.querySelector('head');
  const style = document.createElement('link');
  style.href = './style.css';
  style.setAttribute('rel', 'stylesheet');
  head.appendChild(style);
}

