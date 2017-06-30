import { getServerURL } from '../helpers/parser.js';
import { store } from '../main.js';
import * as APIUtil  from '../util/api_util.js';
import * as SessionUtil from '../util/session_util.js';
import ResultContainer from './search/result_container.js';
import { Mouse } from './mouse_trap.js';

class App {
  constructor() {
    let sid = SessionUtil.getCookie('sid')
    // let invalidCkie = sid.split('!').length !== 2)
    this.store = store;
    this.init = this.init.bind(this);
    this.setDefaultSession = SessionUtil.setDefaultSession;
    this.serverURL = getServerURL();
    this.setupSearchBox = this.setupSearchBox.bind(this);
    this.kbdCommand = this.kbdCommand.bind(this);
    this.initShortcuts = this.initShortcuts.bind(this);
    this.bindShortcut = this.bindShortcut.bind(this);
    this.escCallback = this.escCallback.bind(this);
    // if(this.serverURL && sid && !invalidCkie) this.init();
  }

  setupSearchBox(){
    let loaderURL = this.store.get('loader_url');
    let logoURL = this.store.get('logo_url');
    let searchBox = document.createElement('div');
    searchBox.setAttribute('id', 'sfnav_search_box');
    searchBox.innerHTML = `
    <div class="sfnav_wrapper">
      <input type="text" id="sfnav_quickSearch" autocomplete="off"/>
      <img id="sfnav_loader" src= "${loaderURL}"/>
      <img id="sfnav_logo" src= "${logoURL}"/>
    </div>
    <div class="sfnav_shadow" id="sfnav_shadow"/>
    <div class="sfnav_output" id="sfnav_output"/>`;

    document.body.appendChild(searchBox);
  }

  init() {
    let ftClient = new forceTooling.Client();
    let loader = new Loader();
    this.store.add('ft-cli', ftClient);
    this.store.add('loader', loader);
    this.kbdCommand = this.kbdCommand.bind(this);
    this.setDefaultSession();
    this.setupSearchBox();
    this.resultContainer = new ResultContainer();
    loader.hide();
    this.omnomnom = SessionUtil.getCookie('sid');
    APIUtil.getAllData();
    this.search = new Search(this.resultContainer);
    this.nav = new Nav();
    this.initShortcuts();
  }

  initShortcuts() {
    chrome.extension.sendMessage({'action':'Get Settings'},
      function(response) {
        let shortcut = response['shortcut'];
        bindShortcut(shortcut);
      }
    );
    // chrome.storage.local.get('settings', function(results) {
    //     if(typeof results.settings.shortcut === 'undefined')
    //     {
    //         shortcut = 'shift+space';
    //         bindShortcut(shortcut);
    //     }
    //     else
    //     {
    //         bindShortcut(results.settings.shortcut);
    //     }
    // });
  }

  escCallback(e){
    if (this.search.isVisible() || this.nav.isVisible()) {
      this.resultContainer.clearOutput();
      this.search.domEl.blur();
      this.search.domEl.value = '';
      this.nav.setVisible("hidden");
      this.search.setVisible("hidden");
    }
  }

  bindShortcut(shortcut) {
    let search = this.search;
    let searchBar = search.domEl;
    let nav = this.nav;
    let store = this.store;

    let selectMove = this.resultContainer.selectMove;
    Mousetrap.bindGlobal(shortcut, function(e) {
      search.setVisibility('visible');
      return false;
    });

    Mousetrap.bindGlobal('esc', this.escCallback);

    Mousetrap.wrap(searchBar).bind('enter', this.kbdCommand);

    for (var i = 0; i < newTabKeys.length; i++) {
      Mousetrap.wrap(searchBar).bind(newTabKeys[i], this.kbdCommand);
    };

    Mousetrap.wrap(searchBar).bind('down', selectMove.bind(this, 'down'));

    Mousetrap.wrap(searchBar).bind('up', selectMove.bind(this, 'up'));


    Mousetrap.wrap(searchBar).bind('backspace', function(e) {
      store.update('posi', -1);
      store.update('oldins', -1);
    });
  }

  kbdCommand(e, key) {
    let position = this.store.get('posi');
    let newText = '';
    let origText = this.search.domEl.value;
    let results = this.resultContainer.domEl;
    let newTabKeys = this.store.get('new_tab_keys');
    if(position < 0) position = 0;

    if(typeof results.childNodes[position] != 'undefined')
      {
        newText = results.childNodes[position].firstChild.nodeValue;
      }

    let newtab = newTabKeys.indexOf(key) >= 0 ? true : false;
    if(!newtab){
      this.resultContainer.clearOutput();
      this.nav.setVisible("hidden");
    }

    if(!invokeCommand(newText, newtab, e, this.resultContainer)) {
      invokeCommand(origText, newtab, e, this.resultContainer);
    }
  }
}

export default App;
