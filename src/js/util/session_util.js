import { store } from '../main.js';
import { getServerURL } from '../helpers/parser.js';
export const getCookie = (c_name) =>
{
  let i, x, y, ARRcookies = document.cookie.split(";");
  for (i=0; i < ARRcookies.length; i++)
    {
      x = ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
      y = ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
      x = x.replace(/^\s+|\s+$/g,"");
      if (x === c_name)
        {
          return unescape(y);
        }
    }
};

export const setDefaultSession = () => {
  let version = store.get('SFAPI_VERSION');
  let sid = getCookie('sid');
  let url = getServerURL() + '';
  let ftClient = store.get('ft-cli');
  ftClient.setSessionToken(cookie, version, url);
};

export const setSession = (val) => {
  store.get('ft-cli');
  ftClient.setSessionToken(val);
};
