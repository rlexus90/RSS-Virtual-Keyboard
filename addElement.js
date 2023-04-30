class Element {
  constructor(tag, content, className, id, altContent) {
    this.tag = tag;
    this.content = content;
    this.className = Array.isArray(className) ? className : [className];
    this.id = id;
    this.altContent = altContent;
  }

  addElement() {
    const el = document.createElement(this.tag);
    this.className.forEach((e) => {
      el.classList.add(e);
    });
    el.innerText = this.content;
    if (this.id) el.id = this.id;
    if (this.altContent) {
      const span = document.createElement('span');
      span.innerText = this.altContent;
      el.appendChild(span);
    }
    return el;
  }
}

export default Element;
