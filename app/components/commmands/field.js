import Command from './command.js';

class Field extends Command {
  constructor(results, cmd){
    super(results);
    this.cmd = cmd;
    this.createField = this.createField.bind(this);
    this.updateField = this.updateField.bind(this);
    this.createField();
  }

  function updateField(cmd)
  {
    var arrSplit = cmd.split(' ');
    var dataType = '';
    var fieldMetadata;

    if(arrSplit.length >= 3)
      {
        for(var key in META_DATATYPES)
          {
            if(META_DATATYPES[key].name.toLowerCase() === arrSplit[3].toLowerCase())
              {
                dataType = META_DATATYPES[key].name;
                break;
              }
          }

        var sObjectName = arrSplit[1];
        var fieldName = arrSplit[2];
        var helpText = null;
        var typeLength = arrSplit[4];
        var rightDecimals, leftDecimals;
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
    var arrSplit = cmd.split(' ');
    var dataType = '';
    var fieldMetadata;
    if(arrSplit.length >= 3)
      {
        //  forceTooling.Client.create(whatever)
        /*
           for(var key in META_DATATYPES)
           {
           if(META_DATATYPES[key].name.toLowerCase() === arrSplit[3].toLowerCase())
           {
           dataType = META_DATATYPES[key].name;
           break;
           }
           }
         */
        dataType = META_DATATYPES[arrSplit[3].toUpperCase()].name;
        var sObjectName = arrSplit[1];
        var sObjectId = null;
        if(typeof customObjects[sObjectName.toLowerCase()] !== 'undefined')
          {
            sObjectId = customObjects[sObjectName.toLowerCase()].Id;
            sObjectName += '__c';
          }
        var fieldName = arrSplit[2];
        var helpText = null;
        var typeLength = arrSplit[4];
        var rightDecimals, leftDecimals;
        if(parseInt(arrSplit[5]) != NaN )
          {
            rightDecimals = parseInt(arrSplit[5]);
            leftDecimals = parseInt(typeLength);
          }
        else
          {
            leftDecimals = 0;
            rightDecimals = 0;
          }

        var fieldMeta;

        switch(arrSplit[3].toUpperCase())
        {
          case 'AUTONUMBER':
          fieldMeta = new  forceTooling.CustomFields.CustomField(sObjectName, sObjectId, fieldName, dataType, null, null, null,null,null,null,null);
          break;
          case 'CHECKBOX':
          fieldMeta = new  forceTooling.CustomFields.CustomField(sObjectName, sObjectId, fieldName, dataType, null, null, null,null,null,null,null);
          break;
          case 'CURRENCY':
          fieldMeta = new  forceTooling.CustomFields.CustomField(sObjectName, sObjectId, fieldName, dataType, null, null, leftDecimals, rightDecimals,null,null,null);
          break;
          case 'DATE':
          fieldMeta = new  forceTooling.CustomFields.CustomField(sObjectName, sObjectId, fieldName, dataType, null, null, null,null,null,null,null);
          break;
          case 'DATETIME':
          fieldMeta = new  forceTooling.CustomFields.CustomField(sObjectName, sObjectId, fieldName, dataType, null, null, null,null,null,null,null);
          break;
          case 'EMAIL':
          fieldMeta = new  forceTooling.CustomFields.CustomField(sObjectName, sObjectId, fieldName, dataType, null, null, null,null,null,null,null);
          break;
          case 'FORMULA':

          break;
          case 'GEOLOCATION':
          fieldMeta = new  forceTooling.CustomFields.CustomField(sObjectName, sObjectId, fieldName, dataType, null, null, null, arrSplit[4],null,null,null);
          break;
          case 'HIERARCHICALRELATIONSHIP':
          fieldMeta = new  forceTooling.CustomFields.CustomField(sObjectName, sObjectId, fieldName, dataType, null, null, null,null,null,arrSplit[4],null);
          break;
          case 'LOOKUP':
          fieldMeta = new  forceTooling.CustomFields.CustomField(sObjectName, sObjectId, fieldName, dataType, null, null, null,null,null,arrSplit[4],null);
          break;
          case 'MASTERDETAIL':
          fieldMeta = new  forceTooling.CustomFields.CustomField(sObjectName, sObjectId, fieldName, dataType, null, null, null,null,null,arrSplit[4],null);
          break;
          case 'NUMBER':
          fieldMeta = new  forceTooling.CustomFields.CustomField(sObjectName, sObjectId, fieldName, dataType, null, null, leftDecimals, rightDecimals,null,null,null);
          break;
          case 'PERCENT':
          fieldMeta = new  forceTooling.CustomFields.CustomField(sObjectName, sObjectId, fieldName, dataType, null, null, leftDecimals, rightDecimals,null,null,null);
          break;
          case 'PHONE':
          fieldMeta = new  forceTooling.CustomFields.CustomField(sObjectName, sObjectId, fieldName, dataType, null, null, null,null,null,null,null);
          break;
          case 'PICKLIST':
          var plVal = [];
          plVal.push(new forceTooling.CustomFields.PicklistValue('CHANGEME'));
          fieldMeta = new  forceTooling.CustomFields.CustomField(sObjectName, sObjectId, fieldName, dataType, null, null, null,null,plVal,null,null);
          break;
          case 'PICKLISTMS':
          var plVal = [];
          plVal.push(new forceTooling.CustomFields.PicklistValue('CHANGEME'));
          fieldMeta = new  forceTooling.CustomFields.CustomField(sObjectName, sObjectId, fieldName, dataType, null, null, null,null,plVal,null,null);
          break;
          case 'ROLLUPSUMMARY':

          break;
          case 'TEXT':
          fieldMeta = new  forceTooling.CustomFields.CustomField(sObjectName, sObjectId, fieldName, dataType, null, typeLength, null,null,null,null,null);
          break;
          case 'TEXTENCRYPTED':
          fieldMeta = new  forceTooling.CustomFields.CustomField(sObjectName, sObjectId, fieldName, dataType, null, null, null,null,null,null,null);
          break;
          case 'TEXTAREA':
          fieldMeta = new  forceTooling.CustomFields.CustomField(sObjectName, sObjectId, fieldName, dataType, null, typeLength, null,null,null,null,null);
          break;
          case 'TEXTAREALONG':
          fieldMeta = new  forceTooling.CustomFields.CustomField(sObjectName, sObjectId, fieldName, dataType, null, typeLength, null,null,null,null,arrSplit[4]);
          break;
          case 'TEXTAREARICH':
          fieldMeta = new  forceTooling.CustomFields.CustomField(sObjectName, sObjectId, fieldName, dataType, null, typeLength, null,null,null,null,arrSplit[4]);
          break;
          case 'URL':
          fieldMeta = new  forceTooling.CustomFields.CustomField(sObjectName, sObjectId, fieldName, dataType, null, null, null,null,null,null,null);
          break;

        }

        ftClient.setSessionToken(getCookie('sid'), SFAPI_VERSION, serverInstance + '');
        showLoadingIndicator();
        ftClient.create('CustomField', fieldMeta,
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

  }
}

export default Field;
