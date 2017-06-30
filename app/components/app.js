import { getServerURL } from '../helpers/parser.js';
import { store } from '../store/store.js';
import * as APIUtil  from '../util/session_util.js';
import { parseMetaData } from '../helpers/parser.js';
import ResultContainer from './search/result_container.js';

class App {
  constructor() {
    let invalidCkie = getCookie('sid').split('!').length != 2)
    this.store = store;
    this.init = this.init.bind(this);
    this.setDefaultSession = APIUtil.setDefaultSession;
    this.serverURL = getServerURL();
    this.setupSearchBox = this.setupSearchBox.bind(this);
    if(this.serverURL || getCookie('sid') && !invalidCkie) this.init();
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
    this.store.add('ft-cli', ftClient);
    this.setDefaultSession();
    this.setupSearchBox();
    this.resultContainer = new ResultContainer();
    hideLoadingIndicator();
    this.initShortcuts();
    this.omnomnom = APIUtil.getCookie('sid');


  }






  getMetadata(_data) {
    if(_data.length == 0) return;
    var metadata = JSON.parse(_data);

    var mRecord = {};
    var act = {};
    metaData = {};
    metadata.sobjects.map( obj => {

      if(obj.keyPrefix != null) {
        mRecord = {label, labelPlural, keyPrefix, urls} = obj;
        metaData[obj.keyPrefix] = mRecord;

        act = {
          key: obj.name,
          keyPrefix: obj.keyPrefix,
          url: serverInstance + '/' + obj.keyPrefix
        }
        cmds['List ' + mRecord.labelPlural] = act;
        cmds['List ' + mRecord.labelPlural]['synonyms'] = [obj.name];

        act = {
          key: obj.name,
          keyPrefix: obj.keyPrefix,
          url: serverInstance + '/' + obj.keyPrefix + '/e',
        }
        cmds['New ' + mRecord.label] = act;
        cmds['New ' + mRecord.label]['synonyms'] = [obj.name];

      }
    })

    store('Store Commands', cmds);
    // store('Store Metadata', metaData)
  }



  getAllObjectMetadata() {

    // session ID is different and useless in VF
    if(location.origin.indexOf("visual.force") !== -1) return;

    sid = "Bearer " + getCookie('sid');
    var theurl = getServerInstance() + '/services/data/' + SFAPI_VERSION + '/sobjects/';

    cmds['Refresh Metadata'] = {};
    cmds['Setup'] = {};
    var req = new XMLHttpRequest();
    req.open("GET", theurl, true);
    req.setRequestHeader("Authorization", sid);
    req.onload = function(response) {
      getMetadata(response.target.responseText);

    }
    req.send();

    getSetupTree();
    // getCustomObjects();
    getCustomObjectsDef();

  }


  initShortcuts() {
    chrome.extension.sendMessage({'action':'Get Settings'},
      function(response) {

        shortcut = response['shortcut'];
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

  function bindShortcut(shortcut) {

    let searchBar = document.getElementById('sfnav_quickSearch');

    Mousetrap.bindGlobal(shortcut, function(e) {
      setVisibleSearch("visible");
      return false;
    });

    Mousetrap.bindGlobal('esc', function(e) {

      if (isVisible() || isVisibleSearch()) {

        searchBar.blur();
        clearOutput();
        searchBar.value = '';

        setVisible("hidden");
        setVisibleSearch("hidden");

      }

    });

}
