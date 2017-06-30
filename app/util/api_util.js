import { getServerURL } from '../helpers/parser.js';

const SFAPI_VERSION = 'v33.0';

export const httpGet =  (url, callback) =>
{
  let xhr = new XMLHttpRequest();
  let sid = "Bearer " + getCookie('sid');
  xhr.open("GET", url, true);
  xhr.setRequestHeader("Authorization", sid);
  xhr.onload = function(response) {
    callback(response);
  }
  req.send();
};

export const getMetaData = (callback) => {
  // session ID is different and useless in VF
  if(location.origin.indexOf("visual.force") !== -1) return;

  let sid = "Bearer " + getCookie('sid');
  let url = getServerURL() + '/services/data/' + SFAPI_VERSION + '/sobjects/';

  xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.setRequestHeader("Authorization", sid);
  xhr.onload = function(response) {
    callback(response.target.responseText);
    // wonder if this should be currentTarget ?
  }
  xhr.send();
};


export const login = (id) => {
  xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE ) {
      document.write(xhr.responseText );
      document.close();
      setTimeout(function() {
        document.getElementsByName("login")[0].click();
      }, 1000);
    }
  }
  xhr.open("GET", userDetailPage(id), true);
  xhr.send();
};
