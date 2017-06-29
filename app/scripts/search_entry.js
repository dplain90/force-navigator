class SearchEntry {
  constructor(cmd, word) {
    this.cmd = cmd;
    this.word = word;
    this.validAtr = this.validAtr.bind(this);
    this.setup = this.setup.bind(this);
    this.mouseHandler = this.mouseHandler.bind(this);
    this.mouseHandlerOut = this.mouseHandlerOut.bind(this);
    this.mouseClick = this.mouseClick.bind(this);
    this.setListeners = this.setListeners.bind(this);
    this.createEl = this.createEl.bind(this);
    this.setId = this.setId.bind(this);
    this.mouseClickLoginAs = this.mouseClickLoginAs.bind(this);
    this.outp = document.getElementById("sfnav_output");
    this.domEl = document.createElement("div");
    this.setup();
  }

  setup() {
    this.createEl();
    this.setId();
    this.setListeners();

  }

  setListeners() {
    this.domEl.onmouseover = this.mouseHandler;
    this.domEl.onmouseout = this.mouseHandlerOut;
    this.domEl.onclick = this.mouseClick;
    if(this.id && this.domEl.length > 0){ // whats w length?
      this.domEl.onclick = this.mouseClickLoginAs;
    }
  }

  mouseClickLoginAs(e) {
      loginAsPerform(this.id);
      return true;
  }

  mouseHandler(e)
    {
      this.domEl.classList.add('sfnav_selected');
      mouseClickLoginAsUserId = this.id;
      return true;
    }

  mouseHandlerOut(e) {
      this.classList.remove('sfnav_selected');
      return true;
    }

  mouseClick(e) {
      document.getElementById("sfnav_quickSearch").value = this.firstChild.nodeValue;
      setVisible("hidden");
      posi = -1;
      oldins = this.firstChild.nodeValue;
      setVisibleSearch("hidden");
      setVisible("hidden");
      invokeCommand(this.firstChild.nodeValue,false,'click');
      return true;
  }


  createEl() {
    if(this.validAtr('url')) {
      this.domEl = document.createElement("a");
      this.domEl.setAttribute("href", this.cmd.url);
    } else {
      this.domEl = document.createElement("div");
    }

    this.domEl.classList.add('sfnav_child');
    this.domEl.appendChild(document.createTextNode(this.word));
    return this.domEl;
  }

  setId() {
    if (validAtr('id')) {
      this.id = this.cmd.id;
      this.domEl.id = this.id;
    }
  }

  validAtr(atr) {
    let cmd = this.cmd;
    return cmd !== null && cmd[atr] !== null && cmd[atr] !== "";
  }


}

export default SearchEntry;
