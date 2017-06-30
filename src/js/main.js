import App from './components/app';
import Store from './store/store.js';

let s = new Store();

export const store = s;

export const main = () => {
  let app = new App();
  app.init();
};
