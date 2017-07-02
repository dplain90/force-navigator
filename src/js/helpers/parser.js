import { store } from '../main.js';
import FileNode from './file_node.js';
let fileKeys = {};

export const isSpace = (val) => {
  return val.slice(val.length -1) === " ";
}

export const empty = (val) => {
  return val === '';
}

export const lastWord = (words) => {
  return words.split(' ')[words.length - 1];
}
export const getServerURL = () => {
  let url = window.location.href;
  let regX = /^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/\n]+)/;
  let domain = u.match(regX)[1];
  let invalidURL = true
  ["salesforce.com", "cloudforce.com", "visual.force"].forEach((u) => {
    if(domain.includes(u)) invalidURL = false;
  });

  if(invalidURL) return false;
  return 'https://' + doman;
};

export const parseComands = () => {
  case 'refresh metadata':
    let loader = store.get('loader');
    loader.show();
    APIUtil.getAllObjectMetadata();
    break;
  case 'setup':
    window.location.href = serverInstance + '/ui/setup/Setup';
    break;
  default:
    if(c.substring(0,3) === 'cf ') {
      new Field(results, cmd);
    } else if(c.substring(0,9) == 'login as ') {



}


export const parseCustomFields = (data) => {



};


export const parseMetaData = (data) => {
    if(data.length == 0) return;
    let metadata = JSON.parse(data);

    let listParent = new CommandNode("List", root, new Command());
    let newParent = new CommandNode("New", root, new Command());

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
  let rootNode = new CommandNode("", root, new Command());
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
