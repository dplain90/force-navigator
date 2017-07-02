import { handleURL, handleCommand } from './command_controller';

class Command {
  constructor(results) {
    this.errorEl = errorEl;
    this.results = results;
    this.outcomeMsg = this.outcomeMsg.bind(this);
    this.createMsgDOM = this.createMsgDOM.bind(this);
  }

  createMsgDOM(el, txt) {
    el.appendChild(document.createTextNode(txt));
    el.appendChild(document.createElement('br'));
  }

  outcomeMsg(txt, type){
      this.results.clearOutput();
      let el = document.createElement("div");
      el.className = `sfnav_child sfnav-${type.name}-wrapper`;
      this.createMsgDOM(el, type.title);
      txt.forEach((e) => (el = this.createMsgDOM(el, e.message)), this);
      this.results.addEl(err);
      let mainNav = document.getElementById("sfnav_shadow");
      this.results.setVisible("visible", mainNav);
  }

}
export default Command;
