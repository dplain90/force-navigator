
import * as APIUtil from '../../util/api_util.js';

export const handleCommand = (cmd, results) => {
    let c = cmd.toLowerCase();
    switch(c) {
      case 'refresh metadata':
        let loader = new Loader();
        loader.show();
        APIUtil.getAllObjectMetadata();
        break;
      case 'setup':
        window.location.href = serverInstance + '/ui/setup/Setup';
        break;
      default:
        if(c.substring(0,3) === 'cf ') new Field(results, cmd);
        if(c.substring(0,9) == 'login as ') new Login(results, cmd);
        break;
    }
  };


function handleURL(cmd, newtab, evt) {
  if(evt !== 'click' && cmd && cmd.url !== (null || '')) {
    if(newtab) {
      let w = window.open(cmd.url, '_newtab');
      w.blur();
      window.focus();
    } else {
      window.location.href = cmd.url;
    }
  }
}
