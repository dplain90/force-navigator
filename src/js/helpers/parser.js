import { store } from '../main.js';
import FileNode from './file_node.js';


let fileKeys = {};

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
    let metaRoot = new FileNode("", "", null);
    let listParent = new FileNode("", "List", metaRoot);
    let newParent = new FileNode("", "New", metaRoot);
    metadata.sobjects.map( obj => {
      if(obj.keyPrefix != null) {
        let metaLink =  `${getServerURL()}/` + obj.keyPrefix;
        metaRoot.eachChild((parent) => {
          let child = new MetaNode(obj, parent, metaLink);
          parent.addChild(child);
          fileKey[child.txt] = child;
        }
      }
    };
  };

export const parseCustomObjectTree = (html) => {
  let rootNode = FileNode("Setup > Custom Object", "", null);
  $(html).find('th a').each(function(el) {
    createChildNode(this, rootNode);
  });
};

const createChildNode = (el, parent, selector) => {
  el = selector ? el.querySelector(selector) : el;
  let txt = el.querySelector(selector).innerText;
  let link = el.querySelector(selector).getAttribute("href");
  let childNode = new FileNode(txt, link, parent);
  fileKeys[txt] = childNode;
  parent.addChild(childNode);
  return childNode;
};

const parseBranch = (el, parent) => {
  let children = el.querySelector(".childContainer").children;
  for (let i = 0; i < children.length; i++) {
    let child = children[i];
    if(child.className === 'parent') {
      let childNode = createChildNode(child, parent, ".setupFolder");
      parseBranch(child, childNode);
    } else {
      createChildNode(child, parent, "a");
    }
  }
};

const parseTree = (html) => {
  let root = html.getElementById("AutoNumber5");
  let rootNode = new FileNode("", "", null);
  let rootChildren = root.children;
  for (let i = 0; i < rootChildren.length; i++) {
    let child = rootChildren[i];
    if(child.className === "setupNavtree") {
      createChildNode(child, rootNode, ".setupSection");
    }
    if(child.className === "parent") {

      let parentNode = createChildNode(child, rootNode, ".setupFolder");
      parseBranch(child, parentNode);
    }
  }
  console.log(fileKeys);
  store.add['fileTree'] = fileKeys;
};



// .setupNavtree
  // .setupSection ( the link )
// .parent
  // .setUpFolder ( the link )
  // .childContainer
    // .setupLeaf
      // (the link )
    // .parent ( and so on )


export const parseSetupTree = (html) => {
    parseTree(html);
  };
