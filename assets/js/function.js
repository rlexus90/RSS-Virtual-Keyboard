import keyboard from './keyboard.js';
import Element from './addElement.js';

let shiftPres = false;
let altPres = false;
let ctrPres = false;

let lang = window.localStorage.getItem('lang') || 'en';
function changeLang() {
  lang = (lang === 'en') ? 'ru' : 'en';
}
window.addEventListener('beforeunload', () => {
  window.localStorage.setItem('lang', `${lang}`);
});

function drawPage() {
  const body = document.querySelector('body');
  const h1 = new Element('h1', 'RSS виртуальная клавиатура');
  body.appendChild(h1.addElement());
  let form = new Element('form', '', 'form');
  body.appendChild(form.addElement());
  form = document.querySelector('.form');
  const textarea = new Element('textarea', '', 'textarea');
  let input = new Element('input', '', 'input');
  form.appendChild(textarea.addElement());
  form.appendChild(input.addElement());
  input = document.querySelector('input');
  input.setAttribute('tabindex', '1');
  input.setAttribute('autofocus', 'autofocus');
  const keyboardElem = new Element('div', '', 'keyboard');
  body.appendChild(keyboardElem.addElement());
  const keyboardHtml = document.querySelector('.keyboard');
  keyboardHtml.setAttribute('tabindex', '2');
  const rows = Object.keys(keyboard);
  rows.forEach((row) => {
    const el = new Element('div', '', ['row', row]);
    keyboardHtml.appendChild(el.addElement());
  });
  let p = new Element('p', 'Клавиатура создана в операционной системе Windows');
  body.appendChild(p.addElement());
  p = new Element('p', 'Для переключения языка комбинация: ctrl + alt');
  body.appendChild(p.addElement());
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

function showKeys(shift) {
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

function caps() {
  const keyboardHtml = document.querySelector('.keyboard');
  keyboardHtml.classList.toggle('caps');
}

function getValue(keyHtml, keyboardHtml) {
  if (keyboardHtml.classList.contains('caps')) {
    if (keyHtml.classList.contains('letter')) {
      if (keyboardHtml.classList.contains('en')) return keyHtml.children[1].innerHTML;
      if (keyboardHtml.classList.contains('ru')) return keyHtml.children[3].innerHTML;
    }
  }
  if (keyboardHtml.classList.contains('en')) return keyHtml.children[0].innerHTML;
  if (keyboardHtml.classList.contains('shift-en')) return keyHtml.children[1].innerHTML;
  if (keyboardHtml.classList.contains('ru')) return keyHtml.children[2].innerHTML;
  if (keyboardHtml.classList.contains('shift-ru')) return keyHtml.children[3].innerHTML;
  return '';
}
function shiftPress(keyHtml) {
  shiftPres = !shiftPres;
  if (shiftPres) {
    keyHtml.classList.add('pressed');
    showKeys(true);
  } else {
    keyHtml.classList.remove('pressed');
    showKeys(false);
  }
}

function shiftUnpress() {
  shiftPres = false;
  const key1 = document.querySelector('#ShiftLeft');
  const key2 = document.querySelector('#ShiftRight');
  key1.classList.remove('pressed');
  key2.classList.remove('pressed');
  showKeys(false);
}

function ctrUnpres() {
  ctrPres = false;
  const key1 = document.querySelector('#ControlLeft');
  const key2 = document.querySelector('#ControlRight');
  key1.classList.remove('pressed');
  key2.classList.remove('pressed');
}

function altUnpres() {
  altPres = false;
  const key1 = document.querySelector('#AltLeft');
  const key2 = document.querySelector('#AltRight');
  key1.classList.remove('pressed');
  key2.classList.remove('pressed');
}

function ctrPress(keyHtml) {
  ctrPres = !ctrPres;
  if (ctrPres) {
    keyHtml.classList.add('pressed');
    if (altPres) {
      changeLang();
      showKeys();
      altUnpres();
      ctrUnpres();
    }
  } else {
    keyHtml.classList.remove('pressed');
  }
}

function altPress(keyHtml) {
  altPres = !altPres;
  if (altPres) {
    keyHtml.classList.add('pressed');
    if (ctrPres) {
      changeLang();
      showKeys();
      altUnpres();
      ctrUnpres();
    }
  } else {
    keyHtml.classList.remove('pressed');
  }
}
function systemKey(keyHtml) {
  const textarea = document.querySelector('.textarea');
  if (keyHtml.id === 'Tab') {
    textarea.value += '    ';
    return;
  }

  if (keyHtml.id === 'Space') {
    textarea.value += ' ';
    return;
  }
  if (keyHtml.id === 'Enter') {
    textarea.value += '\n';
    return;
  }
  if (keyHtml.id === 'ArrowLeft') {
    textarea.value += '←';
    return;
  }
  if (keyHtml.id === 'ArrowDown') {
    textarea.value += '↓';
    return;
  }
  if (keyHtml.id === 'ArrowRight') {
    textarea.value += '→';
    return;
  }
  if (keyHtml.id === 'ArrowUp') {
    textarea.value += '↑';
    return;
  }
  if (keyHtml.id === 'Backspace') {
    textarea.value = textarea.value.slice(0, -1);
  }
}

function keyClick(key) {
  const keyHtml = document.querySelector(`#${key}`);
  const keyboardHtml = document.querySelector('.keyboard');
  const textarea = document.querySelector('.textarea');
  // Shift key press
  if (keyHtml.id === 'ShiftLeft' || keyHtml.id === 'ShiftRight') {
    shiftPress(keyHtml);
    return;
  }
  // Ctr key press
  if (keyHtml.id === 'ControlLeft' || keyHtml.id === 'ControlRight') {
    ctrPress(keyHtml);
    return;
  }
  // alt press
  if (keyHtml.id === 'AltLeft' || keyHtml.id === 'AltRight') {
    altPress(keyHtml);
    return;
  }

  if (keyHtml.id === 'CapsLock') {
    caps();
    keyHtml.classList.toggle('pressed');
    return;
  }

  if (keyHtml.classList.contains('system')) systemKey(keyHtml);

  if (keyHtml.classList.contains('letter')
    || keyHtml.classList.contains('symbol')) textarea.value += getValue(keyHtml, keyboardHtml);
  // shift unpress
  if (shiftPres) shiftUnpress();
  // Ctr unpress
  if (ctrPres) ctrUnpres();
  // Alt unpress
  if (altPres) altUnpres();

  keyHtml.classList.add('pressed');
  setTimeout(() => { keyHtml.classList.remove('pressed'); }, 500);
}

export {
  drawPage, drawKeybord, addStyle, showKeys, caps, keyClick, changeLang,
};
