class CommandNode extends NodeBase {
  constructor(txt, parent) {
    super(parent);
    this.txt = txt;
    this.link = window.location.href;
    this.cmd = 'changeURL';
    this.execute = this.execute.bind(this);
    this.changeURL = this.changeURL.bind(this);
    this.openTab = this.openTab.bind(this);
    this.completeMatch = this.completeMatch.bind(this);
    this.doppelganger = this.doppelganger.bind(this);
    this.matches = this.matches.bind(this);
  }

  execute(params){
    this[this.cmd](...params);
  }

  findMatches(val){
    this.eachChild((child) => {
      let matches = [];
      if(child.matches(val)) matches.push(child);
    });
  }

  completeMatch(txt, val){
    return txt.toLowerCase() === val.toLowerCase();
  }

  doppelganger(val) {
    return this.completeMatch(this.txt, val);
  }
  matches(val){
    return this.completeMatch(this.txt.slice(0, val.length), val);
  }

  openTab(){
    let tab = window.open(this.link, '_newtab');
    tab.blur();
    window.focus();
  }

  changeURL(url) {
    window.location.href = this.link;
  }

  validCmd(params) {
    let lastNode = params[params.length - 1];
    let isValid = lastNode.link ? true : false;
    return isValid;
  }

  select(){
    this.domEl.addClass('sfnav_selected');
  }

  unselect(){
    this.domEl.removeClass('sfnav_selected');
  }
}

export default CommandNode;


// custom field ... then
