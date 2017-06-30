export const META_DATATYPES = {
  "AUTONUMBER": {name:"AutoNumber",code:"auto", params:0},
  "CHECKBOX": {name:"Checkbox",code:"cb", params:0},
  "CURRENCY": {name:"Currency",code:"curr", params:2},
  "DATE": {name:"Date",code:"d", params:0},
  "DATETIME": {name:"DateTime",code:"dt", params:0},
  "EMAIL": {name:"Email",code:"e", params:0},
  "FORMULA": {name:"FORMULA",code:"form"},
  "GEOLOCATION": {name:"Location",code:"geo"},
  "HIERARCHICALRELATIONSHIP": {name:"Hierarchy",code:"hr" },
  "LOOKUP": {name:"Lookup",code:"look"},
  "MASTERDETAIL": {name:"MasterDetail",code:"md"},
  "NUMBER": {name:"Number",code:"n"},
  "PERCENT": {name:"Percent",code:"per"},
  "PHONE": {name:"Phone",code:"ph"},
  "PICKLIST": {name:"Picklist",code:"pl"},
  "PICKLISTMS": {name:"MultiselectPicklist",code:"plms"},
  "ROLLUPSUMMARY": {name:"Summary",code:"rup"},
  "TEXT": {name:"Text",code:"t"},
  "TEXTENCRYPTED": {name:"EcryptedText",code:"te"},
  "TEXTAREA": {name:"TextArea",code:"ta"},
  "TEXTAREALONG": {name:"LongTextArea",code:"tal"},
  "TEXTAREARICH": {name:"Html",code:"tar"},
  "URL": {name:"Url",code:"url"}
};

export const METADATA_KEYS = {
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
