class Command {
  constructor() {

  }


invokeCommand(cmd, newtab, event) {
  if(event != 'click' && typeof cmds[cmd] != 'undefined' && (cmds[cmd].url != null || cmds[cmd].url == ''))
    {
      if(newtab)
        {
          var w = window.open(cmds[cmd].url, '_newtab');
          w.blur();
          window.focus();
        } else {
          window.location.href = cmds[cmd].url;
        }

      return true;
    }
  if(cmd.toLowerCase() == 'refresh metadata')
    {
      showLoadingIndicator();
      getAllObjectMetadata();
      setTimeout(function() {
        hideLoadingIndicator();
      }, 30000)
      return true;
    }
  if(cmd.toLowerCase() == 'setup')
    {
      window.location.href = serverInstance + '/ui/setup/Setup';
      return true;
    }
  if(cmd.toLowerCase().substring(0,3) == 'cf ')
    {
      createField(cmd);
      return true;
    }
  if(cmd.toLowerCase().substring(0,9) == 'login as ')
    {
      loginAs(cmd);
      return true;
    }

  return false;
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

function addError(text)
{
  clearOutput();
  var err = document.createElement("div");
  err.className = 'sfnav_child sfnav-error-wrapper';

  var errorText = '';
  err.appendChild(document.createTextNode('Error! '));
  err.appendChild(document.createElement('br'));
  for(var i = 0;i<text.length;i++)
    {
      err.appendChild(document.createTextNode(text[i].message));
      err.appendChild(document.createElement('br'));
    }

  /*
     var ta = document.createElement('textarea');
     ta.className = 'sfnav-error-textarea';
     ta.value = JSON.stringify(text, null, 4);

     err.appendChild(ta);
   */
  outp.appendChild(err);

  setVisible("visible");
}
}
