import Command from './command.js';
import { store } from '../../store/store.js';
import { getServerURL } from '../../helpers/parser.js';
import { getCookie } from '../../util/session_util.js';
class Field extends Command {
  constructor(results, cmd){
    super(results);
    this.cmd = cmd;
    this.store = store;
    this.createField = this.createField.bind(this);
    this.updateField = this.updateField.bind(this);
    this.createFieldOptions = this.createFieldOptions.bind(this);
    this.defaultHash = {
      'command': "",
      'sObjectName': "",
      'fieldName': "",
      'dataType': "",
      'typeLength': "",
      'rightDecimals': 0,
      'leftDecimals': 0,
      'picklistValues': null,
       'referenceTo': null,
       'visibleLines': null
    };
    this.createField();
  }

  updateField(cmd)
  {
    let ftClient = this.store.get('ft-cli');
    let options = this.createFieldOptions(cmd);
    let { fieldName, sObjectName } = options;
    ftClient.queryByName('CustomField', fieldName, sObjectName, function(success) {
          addSuccess(success);
          field = new  forceTooling.CustomFields.CustomField(...options);
          ftClient.update('CustomField', fieldMeta,
            function(success) {
              console.log(success);
              addSuccess(success);
            },
            function(error) {
              console.log(error);
              addError(error.responseJSON);
            });
        },
          function(error)
          {
            addError(error.responseJSON);
          });
  }

  createField(cmd) {
    let options = this.createFieldOptions(cmd);
    let field = forceTooling.CustomFields.CustomField(...options);
    let sfapi = this.store.get('SFAPI_VERSION');
    let url = getServerURL();
    let sid = getCookie('sid');
    ftClient.setSessionToken(sid, SFAPI_VERSION, `${url} `);
    ftClient.create('CustomField', field,
      function(success) {
        console.log(success);
        this.createOutcomeMsg([], {
          name: 'success',
          title: 'Success! Field created!'
        });
      },
      function(error) {
        console.log(error);
        this.createOutcomeMsg([error.responseJSON], {
          name: 'error',
          title: 'Error!'
        });
      });
  }
  // hideLoadingIndicator();
  // need to come to loader in responses..


  createFieldOptions(cmd) {
    let vals = cmd.split(' ');
    let valHash = this.defaultHash;
    Object.keys(valHash).forEach((key, i) => {
      let val = vals[i];
      switch(key) {
        case 'command':
          break;
        case 'sObjectName':
          // if(typeof customObjects[sObjectName.toLowerCase()] !== 'undefined')
          //   {
          //     sObjectId = customObjects[sObjectName.toLowerCase()].Id;
          //     sObjectName += '__c';
          //   }
          break;
        case 'dataType':
          valHash[key] = META_DATATYPES[val.toUpperCase()].name;
          break;
        case 'rightDecimals':
          if(parseInt(val) !== NaN) {
            valHash[key] = parseInt(val);
          }
          break;
        case 'leftDecimals':
          if(valHash['rightDecimals'] !== 0) {
            valHash[key] = parseInt(valHash['typeLength']);
          }
          break;
        case default:
          valHash[key] = val;
          break;
      }
    });
    return Object.values(valHash);
  }
}

export default Field;
