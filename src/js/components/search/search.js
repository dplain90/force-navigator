
import SearchResults from './search_result.js';
import Nav from '../nav.js';
import { store } from '../../main.js';
import { isSpace, lastWord, empty } from '../../helpers/parser.js';
import { bindAll } from '../../helpers/binder.js';
class Search {
  constructor(rootNode) {
    this.cmdStack = [];
    this.root = rootNode;
    this.results = rootNode.children;
    this.invalid = false;
    this.resultDOM = new DOMElement("#sfnav_output");
    this.searchDOM = new DOMElement("#sfnav_quickSearch");
    this.boxDOM = new DOMElement("#sfnav_search_box");
    bindAll(['lastNode', 'validCmd', 'addCmd', 'setResults', 'command', 'params', 'searchVal', 'exactMatch', 'resetResults', 'clearResults', 'setSearchStyle', 'handleChange', 'executeCmd', 'handleSubmit']);
  }

  lastNode(){
    return this.cmdStack.slice(this.cmdStack.length - 1)[0];
  }

  validCmd(){
    return this.command().isValid(this.cmdStack);
  }

  addCmd(word){
    for (let i = 0; i < this.results.length; i++) {
      let node = this.results[i]
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
    let lastCmd = lastNode();
    let word = lastWord(val);
    val.isSpace() ? addCmd(word) : results = lastCmd.findMatches(word, this.resultDOM, this.handleClick);
  }

  hide(){
    this.resetResults();
    this.searchDOM.hide();
    this.cmdStack = [];
  }


  command(){
    return this.cmdStack[this.cmdStack.length - 1];
  }

  params(){
    return this.cmdStack.slice(1);
  }
  searchVal(){
    return this.searchDOM.val();
  }

  exactMatch(node, word){
    return node.doppelganger(word)
  }

  resetResults(){
    this.resultDOM.hide();
    this.results = this.root.children;
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
    let val = searchVal();
    empty(val) ? resetResults() : setResults(lastWord(val));
  }

  executeCmd(node){
    this.command().execute(this.params());
  }

  handleClick(e){
    let id = e.target.getAttribute('id');
    this.cmdStack = this.results[parseInt(id)].getChain();
    this.executeCmd();
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
