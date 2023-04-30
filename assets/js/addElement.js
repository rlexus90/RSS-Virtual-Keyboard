class Element {
  constructor(tag, content, className, id, spans) {
    this.tag = tag;
    this.content = content;
    this.spans = spans ? JSON.parse(spans) : null;
    this.className = Array.isArray(className) ? className : [className];
    this.id = id;
  }

  addElement() {
    const el = document.createElement(this.tag);
    this.className.forEach((e) => {
      el.classList.add(e);
    });
    el.innerText = this.content;
    if (this.spans) {
      const span1 = document.createElement('span');
      const span2 = document.createElement('span');
      const span3 = document.createElement('span');
      const span4 = document.createElement('span');
      span1.innerText = this.spans.en.norm;
      span2.innerText = this.spans.en.shift;
      span3.innerText = this.spans.ru.norm;
      span4.innerText = this.spans.ru.shift;
      span1.classList.add('en-norm');
      span2.classList.add('en-shift');
      span3.classList.add('ru-norm');
      span4.classList.add('ru-shift');
      el.appendChild(span1);
      el.appendChild(span2);
      el.appendChild(span3);
      el.appendChild(span4);
    }
    if (this.id) el.id = this.id;
    return el;
  }
}

export default Element;
