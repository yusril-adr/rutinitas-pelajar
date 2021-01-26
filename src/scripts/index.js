import 'regenerator-runtime';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min';
import 'material-design-icons/iconfont/material-icons.css';
import '../styles/style.scss';

import swRegister from './utils/sw-register';
import App from './views/app';

const app = new App({
  header: document.querySelector('header'),
  content: document.querySelector('main'),
});

document.addEventListener('DOMContentLoaded', () => {
  swRegister();
  app.renderPage();
});
