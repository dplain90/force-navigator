import { store } from '../main.js';

export const getServerURL = () => {
  let url = location.origin + "";
  let urlParseArray = url.split(".");
  let i;
  let returnUrl;

  if(url.indexOf("salesforce") != -1)
    {
      returnUrl = url.substring(0, url.indexOf("salesforce")) + "salesforce.com";
      return returnUrl;
    }

  if(url.indexOf("cloudforce") != -1)
    {
      returnUrl = url.substring(0, url.indexOf("cloudforce")) + "cloudforce.com";
      return returnUrl;
    }

  if(url.indexOf("visual.force") != -1)
    {
      returnUrl = 'https://' + urlParseArray[1] + '';
      return returnUrl;
    }
  return returnUrl;
};


export const parseMetaData = (data) => {
    if(data.length == 0) return;
    let metadata = JSON.parse(data);
    let cmds = store.get('cmds');
    debugger
    if(!cmds) cmds = {};
    let mRecord = {};
    let act = {};
    let metaData = {};
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
    });

    store.update('cmds', cmds);
    store.add('meta', metaData);

  };

export const parseCustomObjectTree = (html) => {
  let cmds = store.get('cmds');
  $(html).find('th a').each(function(el) {
    cmds['Setup > Custom Object > ' + this.text] = {url: this.href, key: this.text};
    });

    store.update('cmds', cmds);
  };

export const parseSetupTree = (html) => {
    let cmds = store.get('cmds');
    let textLeafSelector = '.setupLeaf > a[id*="_font"]';
    let all = html.querySelectorAll(textLeafSelector);
    let strName;
    let as;
    let strNameMain;
    [].map.call(all, function(item) {
      let hasTopParent = false, hasParent = false;
      let parent, topParent;
      let parentEl, topParentEl;

      if (item.parentElement != null && item.parentElement.parentElement != null && item.parentElement.parentElement.parentElement != null
          && item.parentElement.parentElement.parentElement.className.indexOf('parent') !== -1) {

        hasParent = true;
        parentEl = item.parentElement.parentElement.parentElement;
        parent = parentEl.querySelector('.setupFolder').innerText;
      }
      if(hasParent && parentEl.parentElement != null && parentEl.parentElement.parentElement != null
         && parentEl.parentElement.parentElement.className.indexOf('parent') !== -1) {
        hasTopParent = true;
        topParentEl = parentEl.parentElement.parentElement;
        topParent = topParentEl.querySelector('.setupFolder').innerText;
      }

      strNameMain = 'Setup > ' + (hasTopParent ? (topParent + ' > ') : '');
      strNameMain += (hasParent ? (parent + ' > ') : '');

      strName = strNameMain + item.innerText;

      if(cmds[strName] == null) cmds[strName] = {url: item.href, key: strName};

    });

    store.update('cmds', cmds);

  };
