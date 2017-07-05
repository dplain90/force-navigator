import NodeBase from './node_base.js';
import SearchResult from './dom/search_result.js';
class CommandNode extends NodeBase {
  constructor(txt, parent) {
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

  findMatches(val, container, onClick){
    let matches = [];
    this.eachChild((child) => {
      if(child.matches(val)) matches.push(child);
    });
    matches = this.sortMatches(matches);
    this.addToDOM(matches, onClick);
    return matches;
  }

  addToDOM(matches, onClick){
    for (let i = 0; i < matches.length; i++) {
      let resultDOM = matches[i].dom;
      resultDOM.setId(`${i}`);
      resultDOM.addResult(container, onClick);
    }
  }

  sortMatches(matches){
    let sorted = matches.sort(function(a, b) {
        let aVal = a.txt.toUpperCase();
        let bVal = b.txt.toUpperCase();
        return (aVal < bVal) ? -1 : (aVal > bVal) ? 1 : 0;
      });
    return sorted;
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
