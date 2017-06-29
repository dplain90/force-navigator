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

}
