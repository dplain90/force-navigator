import { bindAll } from  '../../../helpers/binder.js';

class DOMElement {
  constructor(selector){
    if(selector) this.el = document.querySelector(selector);
    bindAll(this, ['hide', 'show', 'val', 'clear', 'style']);
  }

  style(attr, val){
    this.el.style[attr] = val;
  }

  addClass(val){
    this.el.classList.add(val);
  }

  removeClass(val){
    this.el.classList.remove(val);
  }

  setId(val) {
    this.el.setAttribute('id', val);
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
