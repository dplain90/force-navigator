import NodeBase from './node_base.js';

class FileNode extends CommandNode {
  constructor(txt, link, parent) {
    super(txt, parent);
    this.link = link;
    if(parent.parent !== null ) {
      this.path = `${parent.path} > ${this.txt}`;
    } else {
      this.path = this.txt;
    }
  }
}

export default FileNode;
