import App from './components/app';
import Store from './store/store.js';
import * as SessionUtil from './util/session_util.js';
import * as Parser from './helpers/parser.js';
let s = new Store();

this.ice = s;

export const store = s;
export const main = () => {
  let app = new App();
  let sid = SessionUtil.getCookie('sid')
  let validCkie = sid !== undefined && sid.split('!').length === 2;
  let serverURL = Parser.getServerURL();
  if(serverURL && validCkie) app.init();
};
