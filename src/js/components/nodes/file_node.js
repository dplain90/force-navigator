import CommandNode from './command_node.js';
import { bindAll } from '../../helpers/binder.js';
class FileNode extends CommandNode {
  constructor(txt, link, parent) {
    super(txt, parent);
    bindAll(this, []);
    this.link = link;
    if(parent.parent !== null ) {
      this.path = `${parent.path} > ${this.txt}`;
    } else {
      this.path = this.txt;
    }
  }

}

export default FileNode;
