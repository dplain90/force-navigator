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

export const fieldNullQty = {
  'AUTONUMBER': [sObjectName, sObjectId, fieldName, dataType, null, null, null,null,null,null,null],

  'CHECKBOX': [sObjectName, sObjectId, fieldName, dataType, null, null, null,null,null,null,null],

  'CURRENCY': [sObjectName, sObjectId, fieldName, dataType, null, null, leftDecimals, rightDecimals,null,null,null],

  'DATE':[sObjectName, sObjectId, fieldName, dataType, null, null, null,null,null,null,null],

  'DATETIME': [sObjectName, sObjectId, fieldName, dataType, null, null, null,null,null,null,null],

  'EMAIL':[sObjectName, sObjectId, fieldName, dataType, null, null, null,null,null,null,null],

  'FORMULA': [],

  'GEOLOCATION': [sObjectName, sObjectId, fieldName, dataType, null, null, null, arrSplit[4],null,null,null],

'HIERARCHICALRELATIONSHIP': [sObjectName, sObjectId, fieldName, dataType, null, null, null,null,null,arrSplit[4],null],

'LOOKUP': [sObjectName, sObjectId, fieldName, dataType, null, null, null,null,null,arrSplit[4],null],

'MASTERDETAIL': [sObjectName, sObjectId, fieldName, dataType, null, null, null,null,null,arrSplit[4],null],

'NUMBER': [sObjectName, sObjectId, fieldName, dataType, null, null, leftDecimals, rightDecimals,null,null,null],

'PERCENT': [sObjectName, sObjectId, fieldName, dataType, null, null, leftDecimals, rightDecimals,null,null,null],

'PHONE': [sObjectName, sObjectId, fieldName, dataType, null, null, null,null,null,null,null],

'PICKLIST': [sObjectName, sObjectId, fieldName, dataType, null, null, null,null,plVal,null,null],

'PICKLISTMS': [sObjectName, sObjectId, fieldName, dataType, null, null, null,null,plVal,null,null],

'ROLLUPSUMMARY': [],

'TEXT': [sObjectName, sObjectId, fieldName, dataType, null, typeLength, null,null,null,null,null],

'TEXTENCRYPTED': [sObjectName, sObjectId, fieldName, dataType, null, null, null,null,null,null,null],

'TEXTAREA': [sObjectName, sObjectId, fieldName, dataType, null, typeLength, null,null,null,null,null],

'TEXTAREALONG': [sObjectName, sObjectId, fieldName, dataType, null, typeLength, null,null,null,null,arrSplit[4]],

'TEXTAREARICH': [sObjectName, sObjectId, fieldName, dataType, null, typeLength, null,null,null,null,arrSplit[4]],

'URL': [sObjectName, sObjectId, fieldName, dataType, null, null, null,null,null,null,null]
};
