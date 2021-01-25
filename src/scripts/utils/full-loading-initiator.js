import { createFullLoadingTemplate } from "../views/templates/template-creator";

const FullLoadingInitiator = {
  async init() {
    const { body } = document;
    const loading = document.createElement('div');
    loading.classList.add('full-loading-container');
    loading.id = 'loading';
    loading.innerHTML = createFullLoadingTemplate();
    body.appendChild(loading);
  },

  async remove() {
    const { body } = document;
    const loading = document.querySelector('#loading');
    body.removeChild(loading);
  },
};

export default FullLoadingInitiator;
