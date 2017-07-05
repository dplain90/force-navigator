
import DOMElement from './dom_el.js';
import { bindAll } from '../../../helpers/binder.js';

class SearchResult extends DOMElement {
  constructor(txt, link) {
    super(null);
    this.txt = txt;
    this.link = link;
    this.createEl();
  }

  setup() {
    this.createEl();
    this.setId();
    this.setListeners();
  }

  addResult(container, onClick) {
    container.appendChild(this.el);
    this.turnOnListeners(onClick);
  }

  turnOnListeners(onClick) {
    this.el.onmouseover = this.mouseHandler;
    this.el.onmouseout = this.mouseHandlerOut;
    this.el.onclick = onClick;
    // if(this.id && this.domEl.length > 0){ // whats w length?
    //   this.domEl.onclick = this.mouseClickLoginAs;
    // }
  }

  mouseClickLoginAs(e) {
      loginAsPerform(this.id);
      return true;
  }

  mouseHandler(e)
    {
      this.addClass('sfnav_selected');
      // mouseClickLoginAsUserId = this.id;
      return true;
    }

  mouseHandlerOut(e) {
      this.removeClass('sfnav_selected');
      return true;
    }

  mouseClick(e) {

      document.getElementById("sfnav_quickSearch").value = this.firstChild.nodeValue;
      setVisible("hidden");
      posi = -1;
      oldins = this.firstChild.nodeValue;
      setVisibleSearch("hidden");
      setVisible("hidden");
      invokeCommand(this.firstChild.nodeValue, false, 'click');
      return true;
  }


  createEl() {
    if(this.link !== '') {
      this.el = document.createElement("a");
      this.el.setAttribute("href", this.link);
    } else {
      this.el = document.createElement("div");
    }

    this.addClass('sfnav_child');
    this.el.appendChild(document.createTextNode(this.txt));
    return this.el;
  }

  // setId() {
  //   if (validAtr('id')) {
  //     this.id = this.cmd.id;
  //     this.domEl.id = this.id;
  //   }
  // }


}

export default SearchResult;
