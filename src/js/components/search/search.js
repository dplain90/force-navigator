
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
    this.setVisibility = this.setVisibility.bind(this);
    this.nav = nav;
    this.results = results;
    this.store = store;
  }

  addElements(ins)
  {
    let posi = null;
    let cmds = this.store.get('cmds');
    if(ins.substring(0,9) == 'login as ') {
        addVisibleWord('Usage: login as <FirstName> <LastName> OR <Username>');
      }
    else if(ins.substring(0,3) == 'cf ') {
        let posi = this.handleCfStr(ins);
      }
    else {
        let words = getWord(ins, cmds);
        if (words.length > 0){
          this.results.clearOutput();
          for (let i=0; i< words.length; ++i) this.addWord(words[i]);
          this.nav.setVisible("visible");
          input = document.getElementById("sfnav_quickSearch").value;
        } else {
          this.results.clearOutput();
          this.nav.setVisible("hidden");
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
    this.nav.setVisible('visible');
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
      let words = this.getWord(wordArray[1], META_DATATYPES);
      let finalWords = this.compileWords(words, wordArray);
      if (finalWords){
        this.results.clearOutput();
        finalWords.forEach((word) => this.addWord(word));
        this.nav.setVisible("visible");
        input = document.getElementById("sfnav_quickSearch").value;
      } else {
        this.nav.setVisible("hidden");
        this.store.update('posi', -1);
        return posi = -1;
      }
      /*
         for(var i=0;i<Object.keys(META_DATATYPES).length;i++)
         {
         addWord(Object.keys(META_DATATYPES)[i]);
         }
       */
      this.nav.setVisible('visible');
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
      setVisible("hidden");
      this.store.update('posi', -1);
    }
  }
}

export default Search;
