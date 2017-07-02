import Command from './command.js';
import { store } from '../../store/store.js';
import { getServerURL } from '../../helpers/parser.js';
import { getCookie } from '../../util/session_util.js';
class Field extends Command {
  constructor(cmd){
    super();
    this.store = store;
    this.errorEl = errorEl;
    this.results = this.store.get('results');
    this.createField = this.createField.bind(this);
    this.updateField = this.updateField.bind(this);
    this.outcomeMsg = this.outcomeMsg.bind(this);
    this.createMsgDOM = this.createMsgDOM.bind(this);
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

    this.responseMsgs = {
      error: {
        name: 'error',
        title: 'Error!'
      },
      success: {
        name: 'success',
        title: 'Success!'
      }
    };

    this.createField(cmd);
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
              this.createOutcomeMsg([], {
                name: 'success',
                title: 'Success! Field Updated!'
              });
            },
            function(error) {
              console.log(error);
              this.createOutcomeMsg([error.responseJSON], );
            });
        },
          function(error)
          {
            this.createOutcomeMsg([error.responseJSON], {
              name: 'error',
              title: 'Error!'
            });
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

  createMsgDOM(el, txt) {
    el.appendChild(document.createTextNode(txt));
    el.appendChild(document.createElement('br'));
  }

  outcomeMsg(txt, type){
      this.results.clearOutput();
      let el = document.createElement("div");
      el.className = `sfnav_child sfnav-${type.name}-wrapper`;
      this.createMsgDOM(el, type.title);
      txt.forEach((e) => (el = this.createMsgDOM(el, e.message)), this);
      this.results.addEl(err);
      let mainNav = document.getElementById("sfnav_shadow");
      this.results.setVisible("visible", mainNav);
  }

  static validateField(nodes) {
    let name = nodes[1].txt;
    let params = nodes.slice(1);
    return CUSTOM_FIELDS[name].length === params;
  }
}

export default Field;
