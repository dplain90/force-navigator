class DOMElement {
  constructor(selector){
    this.el = document.querySelector(selector);
    bindAll(['hidden', 'show', 'val', 'clear', 'style']);
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
