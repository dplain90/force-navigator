class NodeBase {
  constructor(parent){
    this.parent = parent;
    this.children = [];
    this.getChain = this.getChain.bind(this);
    this.addChild = this.addChild.bind(this);
    this.eachChild = this.eachChild.bind(this);
  }

  addChild(child) {
    this.children.push(child);
  }

  eachChild(callback) {
    this.children.forEach((child) => (callback(child)), this);
  }

  getChain(result = []){
    if(this.parent === null) return result;
    this.parent.getChain(result.concat([this]);
  }
}

export default NodeBase;
