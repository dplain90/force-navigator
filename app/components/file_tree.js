class FileTree {
  constructor() {


  }

  parseSetupTree(html)
  {
    var textLeafSelector = '.setupLeaf > a[id*="_font"]';
    var all = html.querySelectorAll(textLeafSelector);
    var strName;
    var as;
    var strNameMain;
    var strName;
    [].map.call(all, function(item) {
      var hasTopParent = false, hasParent = false;
      var parent, topParent;
      var parentEl, topParentEl;

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
    store('Store Commands', cmds);
  }

  getSetupTree() {

    var theurl = serverInstance + '/ui/setup/Setup'
    var req = new XMLHttpRequest();
    req.onload = function() {
      parseSetupTree(this.response);
      hideLoadingIndicator();
    }
    req.open("GET", theurl);
    req.responseType = 'document';

    req.send();
  }

  function getCustomObjects()
  {
    var theurl = serverInstance + '/p/setup/custent/CustomObjectsPage';
    var req = new XMLHttpRequest();
    req.onload = function() {
      parseCustomObjectTree(this.response);
    }
    req.open("GET", theurl);
    req.responseType = 'document';

    req.send();
  }

  function parseCustomObjectTree(html)
  {

    $(html).find('th a').each(function(el) {
      cmds['Setup > Custom Object > ' + this.text] = {url: this.href, key: this.text};
    });

    store('Store Commands', cmds);
  }

}
