
import SearchResults from './search_result.js';
import Nav from '../nav.js';
import { store } from '../../main.js';

class Search extends Nav {
  constructor(results, nav) {
    super();
    this.domEl = document.getElementById("sfnav_quickSearch");
    this.searchBox = document.getElementById("sfnav_search_box");
    this.handleChange = this.handleChange.bind(this);
    this.domEl.oninput = this.handleChange;
    this.addElements = this.addElements.bind(this);
    this.addVisibleWord = this.addVisibleWord.bind(this);
    this.compileWords = this.compileWords.bind(this);
    this.handleCfStr = this.handleCfStr.bind(this);
    this.addWord = this.addWord.bind(this);
    this.getWords = this.getWords.bind(this);
    this.setVisibility = this.setVisibility.bind(this);
    this.nav = nav;
    this.results = results;
    this.store = store;
  }

  addElements(ins)
  {
    let posi = null;

    let cmds = this.store.get('cmds');
    if(ins.substring(0,9) === 'login as ') {
        addVisibleWord('Usage: login as <FirstName> <LastName> OR <Username>');
      }
    else if(ins.substring(0,3) === 'cf ') {
        let posi = this.handleCfStr(ins);
      }
    else {
        let words = this.getWords(ins, cmds);
        if (words.length > 0){
          this.results.clearOutput();
          for (let i=0; i< words.length; ++i) this.addWord(words[i]);
          this.nav.setVisibility("visible");
          input = document.getElementById("sfnav_quickSearch").value;
        } else {
          this.results.clearOutput();
          this.nav.setVisibility("hidden");
          posi = -1;
        }
    }

    let firstEl = document.querySelector('#sfnav_output :first-child');
    if(posi && firstEl) {
      firstEl.className = "sfnav_child sfnav_selected";
    }
    this.store.update('posi', posi);
  }

  compileWords(words, wordArray) {
    let o = {
      scale: '<scale>',
      lookupObj: '<lookup sObjectName>',
      length: '<length>',
      visible: '<visible lines>',
      precision: '<precision>'
    }


    let finalWords = [];
    let meta_keys = this.store.get('METADATA_KEYS');
    words.forEach((word) => {

      let key = word.toUpperCase();
      let options = METADATA_KEYS[key];

      if(options) {
        options = options.map((optKey) => o[optKey]);
        wordEntry = [wordArray[0]]
          .concat([key], options)
          .join(' ');
        finalWords.push(wordEntry);
      }
    });
    finalWords = finalWords.length < 1 ? null : finalWords;
    return finalWords;
  }

  addVisibleWord(word) {
    this.results.clearOutput();
    this.addWord(word);
    this.nav.setVisibility('visible');
  }


  getWords(val, types) {
    let filteredResults = [];
    const keys = Object.keys(types);
    const results = types;
    debugger
    if(results === {} && val !== ""){
      return [];
    } else if( val === "") {
      keys.forEach( (key) => {
        filteredResults.push(results[key]);
      });
      return filteredResults;
    }
    else {
      keys.forEach( (key) => {
        let resultStr = key.substring(0, val.length).toLowerCase();
        if( resultStr === val.toLowerCase()) {
          filteredResults.push(results[key]);
          console.log(filteredResults);
        }
      });
      return filteredResults;
    }
  }

  handleCfStr(ins){
    let META_DATATYPES = this.store.get('META_DATATYPES');
    let wordQty = ins.length;
    if(wordQty < 4) {
      this.addVisibleWord('Usage: cf <Object API Name> <Field Name> <Data Type>');
    }
    else if(wordQty >= 4) {
      this.results.clearOutput();
      let wordArray = ins.split(' ');
      let words = this.getWords(wordArray[1], META_DATATYPES);

      let finalWords = this.compileWords(words, wordArray);
      if (finalWords){
        this.results.clearOutput();
        finalWords.forEach((word) => (this.addWord(word)), this);
        this.nav.setVisibility("visible");
        input = document.getElementById("sfnav_quickSearch").value;
      } else {
        this.nav.setVisibility("hidden");
        this.store.update('posi', -1);
        return posi = -1;
      }
      /*
         for(var i=0;i<Object.keys(META_DATATYPES).length;i++)
         {
         addWord(Object.keys(META_DATATYPES)[i]);
         }
       */
      this.nav.setVisibility('visible');
    } else {
      this.results.clearOutput();
    }
    return null;
  }


  addWord(word){
    let cmds = this.store.get('cmds');
    if(cmds[word]) {
      let result = new SearchResult(cmds[word], word);
      this.results.addEl(result.domEl, result);
    }
  }

  setVisibility(val) {
    this.searchBox.style.visibility = val;
    if(val === 'visible') this.domEl.focus();
  }

  handleChange(e){
    let newSearchVal = document.getElementById('sfnav_quickSearch').value
    if (newSearchVal !== '') {
      this.addElements(newSearchVal);
    }
    else{
      document.querySelector('#sfnav_output').innerHTML = '';
      this.nav.setVisibility("hidden");
      this.store.update('posi', -1);
    }
  }
}

export default Search;
