
import { store } from '../main.js';
import * as APIUtil  from '../util/api_util.js';
import * as SessionUtil from '../util/session_util.js';
import Search from './search/search.js';
import { Mouse } from './mouse_trap.js';
import { eachKey } from '../helpers/iterator.js';
import forceTooling from '../forceTooling.js';
import NodeBase from './nodes/node_base.js';
import LoginNode from './nodes/login_node.js';
import FieldNode from './nodes/file_node.js'
import DOMElement from './nodes/dom/dom_el.js';

const METADATA_KEYS = {
  'AUTONUMBER': [],
  'CHECKBOX': [],
  'CURRENCY': [],
  'DATE': [],
  'DATETIME': [],
  'EMAIL': [],
  'PHONE': [],
  'PICKLIST': [],
  'PICKLISTMS': [],
  'URL': [],
  'CURRENCY': ['scale','precision'],
  'FORMULA': null, // was empty
  'GEOLOCATION': ['scale'],
  'HIERARCHICALRELATIONSHIP': null, // was empty
  'LOOKUP': ['lookupObj'],
  'MASTERDETAIL': null, // was empty
  'NUMBER': ['scale', 'precision'],
  'PERCENT': ['scale', 'precision'],
  'ROLLUPSUMMARY': null, // was empty
  'TEXT': ['length'],
  'TEXTENCRYPTED': null, // was empty
  'TEXTAREA': ['length'],
  'TEXTAREALONG': ['length', 'visible'],
  'TEXTAREARICH': ['length', 'visible']
};

class App {
  constructor() {
    this.Mousetrap = Mouse;
    this.store = store;
    //
    this.init = this.init.bind(this);
    this.setDefaultSession = SessionUtil.setDefaultSession;
    this.setupSearchBox = this.setupSearchBox.bind(this);
    this.initShortcuts = this.initShortcuts.bind(this);
    this.bindShortcuts = this.bindShortcuts.bind(this);
    this.wrapShortcuts = this.wrapShortcuts.bind(this);
    this.setShortcut = this.setShortcut.bind(this);
    this.newShortcut = this.newShortcut.bind(this);
    this.setupResultTree = this.setupResultTree.bind(this);
    this.rootNode = new NodeBase(null);
    this.store.add('root', this.rootNode);
    this.setupSearchBox();
    //
    this.nav = new DOMElement("sfnav_shadow");
    this.search = new Search(this.rootNode);
    this.wraps = {
      'enter': this.search.handleSelect(1),
      'down': this.search.handleSelect(-1),
      'backspace': function() { console.log('backspace') },
      'enter': this.search.handleSubmit,
      'ctrl+enter': this.search.handleSubmit,
      'command+enter': this.search.handleSubmit,
      'shift+enter': this.search.handleSubmit
    };


    this.globals = {
      'open': ['shift+space', this.search.show],
      'close': ['esc', this.search.hide]
    };
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
    this.ftClient = new forceTooling.Client();
    this.setDefaultSession(this.ftClient);
    this.setupResultTree();
    // this.initShortcuts();
    // this.store.add(['ft-cli', ftClient, 'loader', loader, 'results', this.resultContainer, 'root', this.rootNode]);
    // loader.hide();
    // this.search = new Search(this.resultContainer, this.nav);
  }

  setupResultTree() {

    APIUtil.getAllData(this.rootNode);
    let LoginRoot = new LoginNode('login', this.rootNode, 'cmd');
    let username = new LoginNode('', LoginRoot, 'variable');
    let rootField = new FieldNode('cf', this.rootNode, 'cmd');
    Object.keys(METADATA_KEYS).forEach((key) => {
      let nameNode = new FieldNode(key, rootField, 'static');
      let links = METADATA_KEYS[key];
      let lastLink = nameNode;
      if(links) {
        for (let i = 0; i < links.length; i++) {
          let link = links[i];
          lastLink = new FieldNode(link, lastLink, 'variable');
        }
      }
    });
  }

  newShortcut(shortcut){
    return this.globals['open'][0] !== shortcut;
  }

  setShortcut(shortcut) {
    this.globals['open'] = [shortcut, this.globals['open'][1]];
  }

  initShortcuts() {
    let msg = {'action':'Get Settings'};
    let callback = (response) => { this.bindShortcuts(response['shortcut']);
    };
    chrome.extension.sendMessage(msg, callback);
  }

  wrapShortcuts(openCmd){
    if(openCmd && this.newShortcut(openCmd)) this.setShortcut(openCmd);
    let searchBar = this.search.searchDOM.el;
    eachKey(this.wraps, this, (key) => {
      this.Mousetrap.wrap(searchBar).bind(key, this.wraps[key]);
    });
  }

  bindShortcuts() {
    this.wrapShortcuts();
    eachKey(this.globals, this, (key) => {
      let shortcut = this.globals[key][0];
      let callback = this.globals[key][1];
      this.Mousetrap.bindGlobal(shortcut, callback);
    });
  }
}

export default App;
