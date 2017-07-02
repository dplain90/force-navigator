
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
    val.isSpace() ? addCmd(word) : results = lastCmd.findMatches(word);
  }

  hide(){
    this.resetResults();
    this.searchDOM.hide();
    this.cmdStack = [
  }

  command(){
    return this.cmdStack[0];
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

  handleSubmit(e){
    let { validCmd, executeCmd, lastNode, setSearchStyle } = this;
    validCmd() ? executeCmd() : setSearchStyle();
  }

  nextSelection(dir) {
    return this.results[this.selection + dir];
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


// search_result will be created inside of the Node... this will be the holder of DOM elements, that will be displayed. It manages the behavior of that dom element. and even create error msgs etc.

// it will take the Node el in the constructor so that the event callbacks can call the node's execute fx

// Search will be a combination of search results and search. It'll have a cmd_stack array which stores the all the current nodes that have been officially placed in the search bar.

// It'll take the root node in the constructor and result_options will default as the root node's direct children.

// When a new value comes in, it'll grab the last node in the cmd_stack and grab it's children.

// To get the last el it'll need to compare to existing string to find the difference....

// IF the last entered value, aka I think currentTarget ? was a SPACE, it'll take that value and it will key into that keyNode array from the store and shovel it into place.

// once found it'll iterate over the children looking for matches and shove them into an array.

// A small matches fn in the Node will be what's evaluated against the string value to see if it's the one. This will allow us to have custom fields, where it doesn't necessarily match always.
