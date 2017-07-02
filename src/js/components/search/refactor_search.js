
import SearchResults from './search_result.js';
import Nav from '../nav.js';
import { store } from '../../main.js';
import { isSpace, lastWord, empty } from '../../helpers/parser.js';
class Search extends Nav {
  constructor(rootNode) {
    super();
    this.cmdStack = [];
    this.results = rootNode.children;

    this.resultDOM = new DOMElement("#sfnav_output");
    this.searchDOM = new DOMElement("#sfnav_quickSearch");
    this.boxDOM = new DOMElement("#sfnav_search_box");

    this.handleChange = this.handleChange.bind(this);
    this.lastNode = this.lastNode.bind(this);
    this.addCmd = this.addCmd.bind(this);
    this.searchVal = this.searchVal.bind(this);

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
        this.results = [];
        return true;
      }
    }
    return false;
  }

  setResults(val){
    let lastCmd = this.lastNode();
    let word = lastWord(val);
    if(val.isSpace()){
        this.addCmd(word);
    } else {
      this.results = lastCmd.findMatches(word);
    }
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

  handleChange(e){
    let val = this.searchVal();
    empty(val) ? this.resultDOM.hide() : this.setResults(lastWord(val));
  }

  executeCmd(node){
    this.command().execute();
  }

  handleSubmit(e){
    let { validCmd, executeCmd, lastNode, invalidResponse } = this;
    validCmd() ? executeCmd() : invalidResponse();
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
