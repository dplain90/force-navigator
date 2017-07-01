class NodeBase {
  constructor(parent){
    this.parent = parent;
    this.children = [];
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

export default NodeBase;
