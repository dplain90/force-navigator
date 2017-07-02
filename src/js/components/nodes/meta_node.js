import FileNode from "./file_node.js";

class MetaNode extends FileNode {
  constructor(obj, parent, link) {
    let {label, labelPlural, keyPrefix, urls, name} = obj;
    let end = labelPlural;
    if (parent.txt === 'New') {
      end = label;
      link += '/e';
    }
    super(`${parent.txt} ${end}`, link, parent);
    this.synonyms = name;
    this.prefix = keyPrefix;
    this.urls = urls;
  }

}

export default MetaNode;
