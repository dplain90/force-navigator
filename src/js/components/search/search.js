
import SearchEntry from './search_entry.js';
import Nav from './nav.js';
import { store } from '../../store/store.js';

class Search extends Nav {
  constructor(results) {
    super();
    this.domEl = document.getElementById("sfnav_quickSearch");
    this.searchBox = document.getElementById("sfnav_search_box");
    this.handleChange = this.handleChange.bind(this);
    this.domEl.oninput = this.handleChange;
    this.addElements = this.addElements.bind(this);
    this.results = results;
  }

  addElements(ins)
  {
    let posi = null;
    if(ins.substring(0,9) == 'login as ') {
        addVisibleWord('Usage: login as <FirstName> <LastName> OR <Username>');
      }
    else if(ins.substring(0,3) == 'cf ') {
        let posi = handleCfStr(ins);
      }
    else {
        let words = getWord(ins, cmds);
        if (words.length > 0){
          this.results.clearOutput();
          for (let i=0; i< words.length; ++i) addWord(words[i]);
          setVisible("visible");
          input = document.getElementById("sfnav_quickSearch").value;
        } else {
          this.results.clearOutput();
          setVisible("hidden");
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
    clearOutput();
    addWord(word);
    setVisible('visible');
  }

  handleCfStr(ins){
    let wordQty = ins.length
    if(wordQty < 4) {
      addVisibleWord('Usage: cf <Object API Name> <Field Name> <Data Type>');
    }
    else if(wordQty >= 4) {
      clearOutput();
      let wordArray = ins.split(' ');
      let words = getWord(wordArray[1], META_DATATYPES);
      let finalWords = compileWords(words, wordArray);
      if (finalWords){
        clearOutput();
        finalWords.forEach((word) => addWord(word));
        setVisible("visible");
        input = document.getElementById("sfnav_quickSearch").value;
      } else {
        setVisible("hidden");
        return posi = -1;
      }
      /*
         for(var i=0;i<Object.keys(META_DATATYPES).length;i++)
         {
         addWord(Object.keys(META_DATATYPES)[i]);
         }
       */
      setVisible('visible');
    } else {
      clearOutput();
    }
    return null;
  }


  addWord(word){
    let d = document.createElement("div");
    let sp;
    if(cmds[word] != null && cmds[word].url != null && cmds[word].url != "") {
      sp = document.createElement("a");
      sp.setAttribute("href", cmds[word].url);

    } else {
      sp = d;
    }

    if(cmds[word] != null && cmds[word].id != null && cmds[word].id != "") {
      sp.id = cmds[word].id;
    }

    sp.classList.add('sfnav_child');
    sp.appendChild(document.createTextNode(word));
    sp.onmouseover = mouseHandler;
    sp.onmouseout = mouseHandlerOut;
    sp.onclick = mouseClick;
    if(sp.id && sp.length > 0){
      sp.onclick = mouseClickLoginAs;
    }
    outp.appendChild(sp);
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