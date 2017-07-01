import Command from './command.js';
import { store } from '../../store/store.js';

class Field extends Command {
  constructor(results, cmd){
    super(results);
    this.cmd = cmd;
    this.store = store;
    this.createField = this.createField.bind(this);
    this.updateField = this.updateField.bind(this);
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

  function updateField(cmd)
  {
    let arrSplit = cmd.split(' ');
    let dataType = '';
    let fieldMetadata;
    let META_DATATYPES = this.store.get('META_DATATYPES');
    let ftClient = this.store.get('ft-cli');

    if(arrSplit.length >= 3)
      {
        for(let key in META_DATATYPES)
          {
            if(META_DATATYPES[key].name.toLowerCase() === arrSplit[3].toLowerCase())
              {
                dataType = META_DATATYPES[key].name;
                break;
              }
          }

        let sObjectName = arrSplit[1];
        let fieldName = arrSplit[2];
        let helpText = null;
        let typeLength = arrSplit[4];
        let rightDecimals, leftDecimals;
        if(parseInt(arrSplit[5]) != NaN )
          {
            rightDecimals = parseInt(arrSplit[5]);
            leftDecimals = typeLength;
          }
        else
          {
            leftDecimals = 0;
            rightDecimals = 0;
          }

        ftClient.queryByName('CustomField', fieldName, sObjectName, function(success) {
          addSuccess(success);
          fieldMeta = new  forceTooling.CustomFields.CustomField(arrSplit[1], arrSplit[2], dataType, null, arrSplit[4], parseInt(leftDecimals),parseInt(rightDecimals),null);

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
  }

  createField(cmd) {
    let options = this.createFieldOptions(cmd);
    let field = forceTooling.CustomFields.CustomField(...options);
    ftClient.setSessionToken(getCookie('sid'), SFAPI_VERSION, serverInstance + '');
    ftClient.create('CustomField', field,
      function(success) {
        console.log(success);
        hideLoadingIndicator();
        addSuccess(success);
      },
      function(error) {
        console.log(error);
        hideLoadingIndicator();
        addError(error.responseJSON);
      });
  }


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
}

export default Field;
