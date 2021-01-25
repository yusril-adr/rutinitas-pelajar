import Swal from 'sweetalert2';
import User from '../data/user';
import UrlParser from '../routes/url-parser';
import FullLoadingInitiator from './full-loading-initiator';
import SyncronInitiator from './syncron-initiator';
import {
  createSideNavTemplate,
  createSideNavSyncronTemplate,
  createSideNavUserTemplate,
  createSideNavLoginBtnTemplate,
  createBackNavTemplate,
  createAboutTemplate,
  createAboutFooterTemplate,
} from '../views/templates/template-creator';

const HeaderInitiator = {
  init({ header, page }) {
    this._header = header;
    this._page = page || 'home';

    this._setTitle();
    this._setSideOrBackNav();
    this._setSyncronBtn();
  },

  async _setTitle() {
    const brand = this._header.querySelector('.brand-logo');
    const title = UrlParser.parseActiveUrlWithoutCombiner().resource || 'Rutinitas';
    brand.innerHTML = title;
  },

  async _setSyncronBtn() {
    if (navigator.onLine && await User.isLogin()) {
      const wrapper = document.querySelector('.nav-wrapper');
      const button = document.createElement('button');
      button.id = 'sinkron';
      button.setAttribute('class', 'waves-effect waves-light right white-text');
      button.setAttribute('aria-label', 'Sinkron data');
      button.innerHTML = createSideNavSyncronTemplate();

      wrapper.appendChild(button);

      await this._setSyncronEvent();
    }
  },

  async _setSyncronEvent() {
    const button = document.querySelector('button#sinkron');

    // eslint-disable-next-line consistent-return
    button.addEventListener('click', async (event) => {
      event.stopPropagation();
      await FullLoadingInitiator.init();

      try {
        if (!navigator.onLine) {
          await FullLoadingInitiator.remove();
          // eslint-disable-next-line no-undef
          return M.toast({ html: 'Sinkronisasi gagal, karena anda sedang offline.' });
        }

        await SyncronInitiator.init();

        await FullLoadingInitiator.remove();

        // eslint-disable-next-line no-undef
        await M.toast({ html: 'Sinkronisasi berhasil' });

        const reload = await Swal.fire({
          title: 'Muat ulang ?',
          text: 'Beberapa perubahan mungkin memerlukannya.',
          icon: 'info',
          showCancelButton: true,
          confirmButtonColor: '#4caf50',
          cancelButtonColor: '#f44336',
          confirmButtonText: 'Iya',
          cancelButtonText: 'Tidak',
        });

        if (reload.isConfirmed) location.reload();
      } catch ({ message }) {
        await FullLoadingInitiator.remove();
        // eslint-disable-next-line no-undef
        return M.toast({ html: message });
      }
    });
  },

  async _setSideOrBackNav() {
    if (this._page !== 'home') await this._initBackNav();
    await this._initSideNav();
  },

  async _initBackNav() {
    const trigger = this._header.querySelector('#trigger-element');
    trigger.innerHTML = createBackNavTemplate();

    await trigger.removeAttribute('data-target');
    await trigger.classList.remove('sidenav-trigger');
    await trigger.classList.add('left');

    trigger.addEventListener('click', (event) => {
      history.back();
      event.stopPropagation();
    });
  },

  async _initSideNav() {
    if (this._page === 'home') {
      const trigger = this._header.querySelector('#trigger-element');
      trigger.innerHTML = createSideNavTemplate();
    }

    const sidenavElem = document.querySelector('.sidenav');
    // eslint-disable-next-line no-undef
    const instance = M.Sidenav.init(sidenavElem);

    const userContent = sidenavElem.querySelector('.user-content');
    if (await User.isLogin()) {
      const user = await User.getUser();
      userContent.innerHTML = createSideNavUserTemplate(user);
    } else userContent.innerHTML = createSideNavLoginBtnTemplate();

    sidenavElem.addEventListener('click', (event) => {
      // const instance = M.Sidenav.getInstance(sidenavElem);
      instance.close();
      event.stopPropagation();
    });

    const aboutButton = document.querySelector('#tentang');
    aboutButton.addEventListener('click', (event) => {
      this._initAbout();
      instance.close();
      event.stopPropagation();
    });
  },

  async _initAbout() {
    await Swal.fire({
      title: 'Rutinitas Pelajar',
      html: createAboutTemplate(),
      footer: createAboutFooterTemplate(),
      imageUrl: 'logo.png',
      imageAlt: 'Rutinitas Pelajar Icon',
      imageWidth: 100,
      imageHeight: 100,
      customClass: {
        confirmButton: 'btn waves-effect waves-light green white-text alert-button',
      },
    });
  },
};

export default HeaderInitiator;
