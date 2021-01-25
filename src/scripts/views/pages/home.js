import LocalResource from '../../data/local-resource-idb';
import User from '../../data/user';
import SyncronInitiator from '../../utils/syncron-initiator';
import { createHomePageTemplate } from '../templates/template-creator';

const home = {
  async render() {
    return createHomePageTemplate();
  },

  async afterRender() {
    await this._syncron();
    await this._initJumbotron();
    await this._logoutAction();
  },

  async _syncron() {
    const params = new URLSearchParams(location.search);
    if (await User.isLogin() && params.has('masuk')) {
      await SyncronInitiator.init();
      location.href = location.pathname;
    }
  },

  async _initJumbotron() {
    let name = 'user';
    if (await User.isExist()) name = await (await User.getUser()).display_name;
    if (name === 'user') name = undefined;

    const section = document.querySelector('.jumbotron');
    const nameElement = section.querySelector('.display-name');
    nameElement.innerHTML = name || '';
  },

  async _logoutAction() {
    const params = new URLSearchParams(location.search);
    if (params.has('keluar')) {
      LocalResource.delete.database();
      location.href = location.pathname;
    }
  },
};

export default home;
