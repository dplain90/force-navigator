import { store } from '../../main.js';
import * as Parser from '../../helpers/parser.js';
// { isSpace, lastWord, empty }
import { bindAll } from '../../helpers/binder.js';
import DOMElement from '../nodes/dom/dom_el.js';
import FileNode from '../nodes/file_node.js';
class Search {
  constructor(rootNode) {
    this.cmdStack = [rootNode];
    this.root = rootNode;
    this.results = rootNode.children;
    this.isSpace = Parser.isSpace;
    this.lastWord = Parser.lastWord;
    this.empty = Parser.empty;
    this.invalid = false;
    bindAll(this);
    this.resultDOM = new DOMElement("#sfnav_output");
    this.searchDOM = new DOMElement("#sfnav_quickSearch");
    this.searchDOM.el.oninput = this.handleChange;
    this.searchDOM.style('color', 'black');
    this.boxDOM = new DOMElement("#sfnav_search_box");
    this.loader = document.getElementById('sfnav_loader');
    this.logo = document.getElementById('sfnav_logo');
  }

  lastNode(){
    return this.cmdStack.slice(this.cmdStack.length - 1)[0];
  }

  validCmd(){
    return this.command().isValid(this.cmdStack);
  }

  addCmd(word){
    for (let i = 0; i < this.results.length; i++) {
      let node = this.results[i];
      if(this.exactMatch(node, word)) {
        this.cmdStack.push(node);
        this.clearResults();
        return true;
      }
    }
    return false;
  }

  setResults(val){
    let { setSearchStyle, lastNode, addCmd, results } = this;
    setSearchStyle(true);
    let word = this.lastWord(val);
    let lastCmd = lastNode();
    if(this.isSpace(val)) {
      addCmd(val.split(" ").slice(-2,1)[0])
    } else {
      this.results = lastCmd.findMatches(word, this.resultDOM.el, this.handleClick);
      this.resultDOM.show();
    }
    console.log(this.results);
  }

  hide(){
    this.resetResults();
    this.logo.style.visibility = 'hidden';
    this.searchDOM.hide();
    this.cmdStack = [];
  }

  show(){
    debugger
    this.searchDOM.show();
    this.logo.style.visibility = 'visibile';
    this.logo.style.background = 'white';
    this.loader.style.width = '0px'
  }

  command(){
    return this.cmdStack[this.cmdStack.length - 1];
  }

  params(){
    return this.cmdStack.slice(1);
  }
  searchVal(value){
    return this.searchDOM.val(value);
  }

  exactMatch(node, word){
    return node.doppelganger(word)
  }

  resetResults(){
    this.resultDOM.hide();
    this.results = this.root.children;
    this.resultDOM.show();
  }

  clearResults(){
    this.results = [];
  }

  setSearchStyle(valid){
    // add more here later
    if(valid) {
      this.searchDOM.style('color', 'white');
    } else {
      this.searchDOM.style('color', 'red');
    }
  }

  handleChange(e){
    let { resetResults, searchVal, setResults } = this;
    let val = e.currentTarget.value;
    this.empty(val) ? resetResults() : setResults(val);
  }

  executeCmd(node){
    this.command().execute(this.params());
  }

  handleClick(e){
    let id = e.target.getAttribute('id');
    this.cmdStack = this.results[parseInt(id)].getChain();
    this.executeCmd();
  }

  handleTabSubmit(e){
    let { validCmd, executeCmd, lastNode, setSearchStyle } = this;
    validCmd() ? executeCmd() : setSearchStyle();
  }

  handleSubmit(e){
    let { validCmd, executeCmd, lastNode, setSearchStyle } = this;
    validCmd() ? executeCmd() : setSearchStyle();
  }

  nextSelection(dir) {
    return this.results[this.selection + dir];
  }

  handleEsc(e){
    this.hide();
  }

  changeSelection(node) {
    node.select();
    this.selection.unselect();
    this.selection = node;
  }

  handleSelect(dir) {
    return () => {
      let nextNode = nextSelection(dir);
      if(nextNode) this.changeSelection(nextNode);
    };
  }
}

export default Search;
