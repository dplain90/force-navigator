import NodeBase from './node_base.js';

class FieldNode extends NodeBase {
  constructor(data, parent){
    super(parent);
    this.values = [];
    Object.keys(data).forEach((key) => {
      this[key] = data[key] === undefined ? null : data[key] ;
      this.values.push(this[key]);
    }, this);
  };

}

export default FieldNode;
