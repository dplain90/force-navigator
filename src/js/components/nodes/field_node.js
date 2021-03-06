import CommandNode from './command_node.js';


const METADATA_KEYS = {
  'AUTONUMBER': [],
  'CHECKBOX': [],
  'CURRENCY': [],
  'DATE': [],
  'DATETIME': [],
  'EMAIL': [],
  'PHONE': [],
  'PICKLIST': [],
  'PICKLISTMS': [],
  'URL': [],
  'CURRENCY': ['scale','precision'],
  'FORMULA': null, // was empty
  'GEOLOCATION': ['scale'],
  'HIERARCHICALRELATIONSHIP': null, // was empty
  'LOOKUP': ['lookupObj'],
  'MASTERDETAIL': null, // was empty
  'NUMBER': ['scale', 'precision'],
  'PERCENT': ['scale', 'precision'],
  'ROLLUPSUMMARY': null, // was empty
  'TEXT': ['length'],
  'TEXTENCRYPTED': null, // was empty
  'TEXTAREA': ['length'],
  'TEXTAREALONG': ['length', 'visible'],
  'TEXTAREARICH': ['length', 'visible']
};

class FieldNode extends CommandNode {
  constructor(txt, parent, type){
    super(txt, parent);
    this.values = [];
    Object.keys(data).forEach((key) => {
      this[key] = data[key] === undefined ? null : data[key] ;
      this.values.push(this[key]);
    }, this);
  };

  execute(params) {
    let field = new Field(params);
    let result = field.createField();
  }

  isValid(nodes) {
    CustomFields[nodes[1].txt]
  }

  static setupTree(rootNode) {
    
  }

}

export default FieldNode;
