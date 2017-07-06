import NodeBase from './node_base.js';
import SearchResult from './dom/search_result.js';
class CommandNode extends NodeBase {
  constructor(txt, parent, link) {
    super(parent);
    this.txt = txt;
    this.link = window.location.href;
    this.cmd = 'changeURL';
    this.execute = this.execute.bind(this);
    this.changeURL = this.changeURL.bind(this);
    this.completeMatch = this.completeMatch.bind(this);
    this.doppelganger = this.doppelganger.bind(this);
    this.matches = this.matches.bind(this);
    this.dom = new SearchResult(this.txt, this.link);
  }

  execute(params){
    this[this.cmd](...params);
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

  changeURL(inTab) {
    inTab ? this.openTab() : window.location.href = this.link;
  }

  isValid(params) {
    let lastNode = params[params.length - 1];
    let valid = lastNode.link ? true : false;
    return valid;
  }

  select(){
    this.dom.addClass('sfnav_selected');
  }

  unselect(){
    this.dom.removeClass('sfnav_selected');
  }

}

export default CommandNode;


// custom field ... then
