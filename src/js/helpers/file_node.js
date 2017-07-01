class FileNode {
  constructor(txt, link, parent) {
    this.txt = txt;
    this.link = link;
    if(parent !== null && parent.parent !== null ) {
      this.path = `${parent.path} > ${this.txt}`;
    } else {
      this.path = this.txt;
    }
    this.children = [];
    this.parent = parent;
    this.addChild = this.addChild.bind(this);
    this.eachChild = this.eachChild.bind(this);
  }

  addChild(child) {
    this.children.push(child);
  }

  eachChild(callback) {
    this.children.forEach((child) => (callback(child)), this);
  }

}

export default FileNode;
