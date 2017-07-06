class NodeBase {
  constructor(parent){
    this.parent = parent;
    this.children = [];
    this.getChain = this.getChain.bind(this);
    this.addChild = this.addChild.bind(this);
    this.eachChild = this.eachChild.bind(this);
    this.findMatches = this.findMatches.bind(this);
    this.addToDOM = this.addToDOM.bind(this);
    this.sortMatches = this.sortMatches.bind(this);
  }

  addChild(child) {
    this.children.push(child);
  }

  eachChild(callback) {
    this.children.forEach((child) => (callback(child)), this);
  }

  getChain(result = []){
    if(this.parent === null) {
      return result;
    }
    this.parent.getChain([this].concat(result));
  }

  findMatches(val, container, onClick){
    let matches = [];
    this.eachChild((child) => {
      if(child.matches(val)) {
        matches.push(child);
      } else {
        if(container.contains(child.dom.el)){
          child.dom.hide();
          container.removeChild(child.dom.el);
        }
      }
    });
    matches = this.sortMatches(matches);
    this.addToDOM(matches, container, onClick);
    return matches;
  }

  addToDOM(matches, container, onClick){
    for (let i = 0; i < matches.length; i++) {
      let resultDOM = matches[i].dom;
      resultDOM.setId(`${i}`);
      resultDOM.addResult(container, onClick);
    }
  }

  sortMatches(matches){
    let sorted = matches.sort(function(a, b) {
        let aVal = a.txt.toUpperCase();
        let bVal = b.txt.toUpperCase();
        return (aVal < bVal) ? -1 : (aVal > bVal) ? 1 : 0;
      });
    return sorted;
  }
}

export default NodeBase;
