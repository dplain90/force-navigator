
import { store } from '../main.js';
import * as APIUtil  from '../util/api_util.js';
import * as SessionUtil from '../util/session_util.js';
import ResultContainer from './search/result_container.js';
import Search from './search/search.js';
import Nav from './nav.js';
import { Mouse } from './mouse_trap.js';
import Loader from './loader.js';
import forceTooling from '../forceTooling.js';
import NodeBase from './nodes/node_base.js';

class App {
  constructor() {
    this.Mousetrap = Mouse;
    this.store = store;
    this.rootNode = new NodeBase(null);
    this.init = this.init.bind(this);
    this.setDefaultSession = SessionUtil.setDefaultSession;
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
    this.setupSearchBox();
    let ftClient = new forceTooling.Client();
    let loader = new Loader();
    this.nav = new DOMElement("sfnav_shadow");
    this.search = new Search(this.rootNode);
    this.setDefaultSession();
    APIUtil.getAllData();
    this.initShortcuts();


    // this.store.add(['ft-cli', ftClient, 'loader', loader, 'results', this.resultContainer, 'root', this.rootNode]);
    // loader.hide();
    // this.omnomnom = SessionUtil.getCookie('sid');
    // this.search = new Search(this.resultContainer, this.nav);
  }

  initShortcuts() {
    let bindShortcut = this.bindShortcut;

    chrome.extension.sendMessage({'action':'Get Settings'},
      function(response) {
        bindShortcut(response['shortcut']);
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

  bindShortcut(shortcut) {
    if(!shortcut) shortcut = 'shift+space';
    let search = this.search;
    let searchBar = search.domEl;
    let nav = this.nav;

    let store = this.store;
    let newTabKeys = [
      "ctrl+enter",
      "command+enter",
      "shift+enter"
    ];
    let selectMove = this.resultContainer.selectMove;
    this.Mousetrap.bindGlobal(shortcut, function(e) {
      search.setVisibility('visible');
      return false;
    });

    this.Mousetrap.bindGlobal('esc', this.search.handleEsc);

    this.Mousetrap.wrap(searchBar).bind('enter', this.search.handleSubmit);

    for (var i = 0; i < newTabKeys.length; i++) {
      this.Mousetrap.wrap(searchBar).bind(newTabKeys[i], this.kbdCommand);
    };

    this.Mousetrap.wrap(searchBar).bind('down', this.search.handleSelect(1));

    this.Mousetrap.wrap(searchBar).bind('up', this.search.handleSelect(-1));


    this.Mousetrap.wrap(searchBar).bind('backspace', function(e) {
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
