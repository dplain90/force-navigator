import { META_DATATYPES, METADATA_KEYS } from '../data/meta_data.js';

class Store {
  constructor() {
    this.data = {};
    this.data['META_DATATYPES'] = META_DATATYPES;
    this.data['cmds'] = {};
    this.data['METADATA_KEYS'] = METADATA_KEYS;
    this.data['SFAPI_VERSION'] = 'v33.0';
    this.data['loader_url'] = chrome.extension.getURL("images/ajax-loader.gif");
    this.data['logo_url'] = chrome.extension.getURL("images/128.png");
    this.data['posi'] = -1;
    this.data['new_tab_keys'] = [
      "ctrl+enter",
      "command+enter",
      "shift+enter"
    ];

    this.add = this.add.bind(this);
    this.get = this.get.bind(this);
    this.update = this.update.bind(this);
    this.remove = this.remove.bind(this);

  }

  get(...keys) {
    if(keys.length < 2) return this.data[keys[0]];
    let result = {};
    for (let i = 0; i < keys.length; i) {
      let k = keys[i];
      result[k] = this.data[k];
    }
    return result;
  }

  update(k, v) {
    this.add(k,v);
  }

  add(k, v) {
    this.data[k] = v;
  }

  remove(k) {
    this.data[k] = null;
  }


  // var storagePayload = {};
  // storagePayload[action] = payload;
  // chrome.storage.local.set(storagePayload, function() {
  //     console.log('stored');
  // });
}

export default Store;
