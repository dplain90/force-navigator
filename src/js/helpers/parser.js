import { store } from '../main.js';
import FileNode from '../components/nodes/file_node.js';
import CommandNode from '../components/nodes/command_node.js';
import MetaNode from '../components/nodes/meta_node.js';

const tree = class Tree {
  constructor(){
    this.fileKeys = {};
    this.nodes = [];
    this.addNode = this.addNode.bind(this);
  }

  addNode(node){
    node.id = this.nodes.length;
    this.fileKeys[node.txt] = node.id;
    this.nodes.push(node);
  }
}

const cmdTree = new tree();

let fileKeys = {};

export const isSpace = (val) => {
  return val.slice(val.length -1) === " ";
}

export const empty = (val) => {
  return val === '';
}

export const lastWord = (words) => {
  let wordArr = words.split(' ');
  return wordArr[wordArr.length - 1];
}
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
// export const getServerURL = () => {
//   let u = window.location.href;
//   let regX = /^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/\n]+)/;
//   let domain = u.match(regX)[1];
//   let invalidURL = true;
//   ["salesforce.com", "cloudforce.com", "visual.force"].forEach((u) => {
//     if(domain.includes(u)) invalidURL = false;
//   });
//
//   if(invalidURL) return false;
//   return 'https://' + domain;
// };

export const parseCustomFields = (data) => {



};


export const parseMetaData = (data) => {
    if(data.length == 0) return;
    let metadata = JSON.parse(data);
    let root = store.get('root');
    let listParent = new CommandNode("List", root);
    let newParent = new CommandNode("New", root);
    root.addChild(listParent);
    root.addChild(newParent);
    metadata.sobjects.map( obj => {
      if(obj.keyPrefix != null) {
        let metaLink =  `${getServerURL()}/` + obj.keyPrefix;
        [listParent, newParent].forEach((parent) => {

          let child = new MetaNode(obj, parent, metaLink);
          cmdTree.addNode(child);
          parent.addChild(child);
        });
      }
    });

  };

export const parseCustomObjectTree = (html) => {
  let root = store.get('root');
  let rootNode = new CommandNode("co", root);
  root.addChild(rootNode);
  $(html).find('th a').each(function(el) {
    createChildNode(this, rootNode);
  });
  store.add('cmd-tree', cmdTree);
  console.log(cmdTree);
};

const createChildNode = (el, parent, selector) => {
  el = selector ? el.querySelector(selector) : el;
  let txt = el.innerText;
  let link = el.getAttribute("href");
  let childNode = new FileNode(txt, link, parent);
  // childNode.id = nodes.length;
  cmdTree.addNode(childNode);

  // nodes.push(childNode);
  parent.addChild(childNode.id);
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

export const parseTree = (html) => {

  let root = html.getElementById("AutoNumber5");
  let rootNode = store.get('root');
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

  store.add['fileTree'] = fileKeys;
  console.log(rootNode);
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
