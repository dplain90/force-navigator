import NodeBase from './node_base.js';

class FileNode {
  constructor(txt, link, parent) {
    super(parent);
    this.txt = txt;
    this.link = link;
    if(parent !== null && parent.parent !== null ) {
      this.path = `${parent.path} > ${this.txt}`;
    } else {
      this.path = this.txt;
    }
  }
}

export default FileNode;
