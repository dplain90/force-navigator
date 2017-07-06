import * as Parse from '../helpers/parser.js';
import { store } from '../main.js';
import { getCookie } from './session_util.js';

const serverUrl = (ending) => `${Parse.getServerURL()}${ending}`;

export const httpGet =  (url, callback) =>
{
  let xhr = new XMLHttpRequest();
  let sid = "Bearer " + getCookie('sid');
  xhr.open("GET", url, true);
  xhr.setRequestHeader("Authorization", sid);
  xhr.onload = function() {
    callback(this.response);
  }
  req.send();
};

export const getMetaData = (callback) => {
  // session ID is different and useless in VF
  if(location.origin.indexOf("visual.force") !== -1) return;

  let sid = "Bearer " + getCookie('sid');
  let ending = `/services/data/${store.get('SFAPI_VERSION')}/sobjects/`;
  let url = serverUrl(ending);

  let xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.setRequestHeader("Authorization", sid);
  xhr.onload = function() {


    callback(this.response);
    getSetupTree();
    // wonder if this should be currentTarget ?
  };
  xhr.send();
};

export const getAllMetaData = (root) => {
  let omnomnom = getCookie('sid');
  let clientId = omnomnom.split('!')[0];
  let hash = clientId + '!' + omnomnom.substring(omnomnom.length - 10, omnomnom.length);
  // chrome.storage.local.get(['Commands','Metadata'], function(results) {
  //     console.log(results);
  // });
  chrome.extension.sendMessage({
    action:'Get Commands', 'key': hash},
    function(response) {
      let cmds = response;
      let metaData;
      if(cmds == null || cmds.length === 0) {
        cmds = {};
        metaData = {};
        getMetaData(Parse.parseMetaData);

      } else {
      }
    });
};


export const getCustomObjects = () =>
{
  let url = serverUrl('/p/setup/custent/CustomObjectsPage');
  let xhr = new XMLHttpRequest();
  xhr.onload = function() {
    Parse.parseCustomObjectTree(this.response);
  }
  xhr.open("GET", url);
  xhr.responseType = 'document';

  xhr.send();
};

export const getSetupTree = () => {
  let url = serverUrl('/ui/setup/Setup');
  let xhr = new XMLHttpRequest();


  xhr.onload = function() {
    Parse.parseTree(this.response);
    getCustomObjects();
  }
  xhr.open("GET", url);
  xhr.responseType = 'document';

  xhr.send();
};

export const login = (id) => {
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE ) {
      document.write(xhr.responseText );
      document.close();
      setTimeout(function() {
        document.getElementsByName("login")[0].click();
      }, 1000);
    }
  }
  xhr.open("GET", userDetailPage(id), true);
  xhr.send();
};

export const getAllData = () => {
  getAllMetaData();
};
