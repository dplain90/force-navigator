class DOMElement {
  constructor(selector){
    this.el = document.querySelector(selector);
    this.hidden = this.hidden.bind(this);
    this.show = this.show.bind(this);
    this.val = this.val.bind(this);
    this.clear = this.clear.bind(this);
  }

  clear() {
    this.el.innerHTML = '';
    this.el.value = '';
  }

  hide() {
    this.el.style.position = 'relative';
    this.el.style.visibility = 'hidden';
    this.clear();
  }

  show() {
    this.el.style.position = 'relative';
    this.el.style.visibility = 'visible';
  }

  val() {
    return this.el.value;
  }

}

export default DOMElement;
