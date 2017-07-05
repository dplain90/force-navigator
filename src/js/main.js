import App from './components/app';
import Store from './store/store.js';
import * as SessionUtil from './util/session_util.js';
import * as Parser from './helpers/parser.js';
let s = new Store();
//
export const store = s;
export const main = () => {
  let app = new App();
  let sid = SessionUtil.getCookie('sid')
  let validCkie = sid !== undefined && sid.split('!').length === 2;
  let serverURL = Parser.getServerURL();
  console.log(sid);
  console.log(validCkie);
  console.log(serverURL);
  if(serverURL && validCkie) app.init();
};
