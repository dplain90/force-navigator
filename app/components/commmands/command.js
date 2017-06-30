import { handleURL, handleCommand } from './command_controller';

class Command {
  constructor(results) {
    this.errorEl = errorEl;
    this.results = results;

  }



  createErrorDOM(err, txt) {
    err.appendChild(document.createTextNode(txt));
    err.appendChild(document.createElement('br'));
  }

  addError(txt)
  {
    this.result.clearOutput();
    let err = document.createElement("div");
    err.className = 'sfnav_child sfnav-error-wrapper';
    this.createErrorDOM(err, 'Error! ');
    txt.forEach((e) => (this.createErrorDOM(err, e.message)), this);
    /*
       var ta = document.createElement('textarea');
       ta.className = 'sfnav-error-textarea';
       ta.value = JSON.stringify(text, null, 4);

       err.appendChild(ta);
     */
    this.results.addEl(err);
    let mainNav = document.getElementById("sfnav_shadow");
    this.results.setVisible("visible", mainNav);
  }
}
