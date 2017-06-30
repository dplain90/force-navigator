class App {
  constructor() {


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

  store(action, payload) {

    var req = {}
    req.action = action;
    req.key = hash;
    req.payload = payload;

    chrome.extension.sendMessage(req, function(response) {

    });

    // var storagePayload = {};
    // storagePayload[action] = payload;
    // chrome.storage.local.set(storagePayload, function() {
    //     console.log('stored');
    // });
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

  function getCookie(c_name)
  {
    var i,x,y,ARRcookies=document.cookie.split(";");
    for (i=0;i<ARRcookies.length;i++)
      {
        x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
        y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
        x=x.replace(/^\s+|\s+$/g,"");
        if (x==c_name)
          {
            return unescape(y);
          }
      }
  }
  function getServerInstance()
  {
    var url = location.origin + "";
    var urlParseArray = url.split(".");
    var i;
    var returnUrl;

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
  }

  function initShortcuts() {

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
