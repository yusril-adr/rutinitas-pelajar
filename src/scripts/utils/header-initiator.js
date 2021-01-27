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
import CONFIG from '../global/config';

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
    } else {
      userContent.innerHTML = createSideNavLoginBtnTemplate();

      const masukBtn = userContent.querySelector('button#masuk');
      masukBtn.addEventListener('click', async (event) => {
        instance.close();
        event.stopPropagation();

        if (navigator.onLine) {
          const { value } = await Swal.mixin({
            confirmButtonText: 'Next &rarr;',
            confirmButtonColor: '#4caf50',
            showCancelButton: true,
            progressSteps: ['1', '2'],
          }).queue([
            {
              title: 'Email',
              input: 'email',
              inputPlaceholder: 'Email kamu ...',
            },
            {
              title: 'Password',
              input: 'password',
              inputPlaceholder: 'Password kamu ...',
              inputAttributes: {
                minlength: 8,
                autocapitalize: 'off',
                autocorrect: 'off',
              },
              inputValidator: (input) => new Promise((resolve) => {
                if (input === '') {
                  resolve('Input tidak boleh kosong');
                }

                if (input.length < 8) {
                  resolve('Password minimal 8 digit.');
                }

                resolve();
              }),
            },
          ]);

          if (value) {
            const [email, password] = value;

            const user = {
              username: email,
              password,
            };

            const loginStatus = await User.logIn(user);

            if (loginStatus === 'error') {
              await Swal.fire({
                title: 'Error !',
                text: 'Cek kembali username dan password kamu',
                icon: 'error',
                confirmButtonColor: '#4caf50',
              });
            } else {
              await FullLoadingInitiator.init();
              location.href = '/?masuk';
            }
          }
        } else {
          await Swal.fire({
            title: 'Kamu sedang offline !',
            text: 'Koneksi internet diperlukan.',
            icon: 'error',
            confirmButtonColor: '#4caf50',
          });
        }
      });

      const daftarBtn = userContent.querySelector('button#daftar');
      daftarBtn.addEventListener('click', async (event) => {
        instance.close();
        event.stopPropagation();

        if (navigator.onLine) {
          const { value } = await Swal.mixin({
            confirmButtonText: 'Next &rarr;',
            confirmButtonColor: '#4caf50',
            showCancelButton: true,
            progressSteps: ['1', '2', '3', '4'],
          }).queue([
            {
              title: 'Nama',
              input: 'text',
              inputPlaceholder: 'Nama kamu ...',
              inputValidator: (input) => new Promise((resolve) => {
                if (input === '') {
                  resolve('Input tidak boleh kosong');
                }

                if (input.length > CONFIG.TEXT_LIMIT.DISPLAY_NAME) {
                  resolve('Text terlalu panjang.');
                }

                resolve();
              }),
            },
            {
              title: 'Email',
              input: 'email',
              inputPlaceholder: 'Email kamu ...',
            },
            {
              title: 'Password',
              input: 'password',
              inputPlaceholder: 'Password kamu ...',
              inputAttributes: {
                minlength: 8,
                autocapitalize: 'off',
                autocorrect: 'off',
              },
              inputValidator: (input) => new Promise((resolve) => {
                if (input === '') {
                  resolve('Input tidak boleh kosong');
                }

                if (input.length < 8) {
                  resolve('Password minimal 8 digit.');
                }

                resolve();
              }),
            },
            {
              title: 'Konfirmasi Password',
              input: 'password',
              inputPlaceholder: 'Konfirmasi password kamu ...',
              inputAttributes: {
                minlength: 8,
                autocapitalize: 'off',
                autocorrect: 'off',
              },
              inputValidator: (input) => new Promise((resolve) => {
                if (input === '') {
                  resolve('Input tidak boleh kosong');
                }

                if (input.length < 8) {
                  resolve('Password minimal 8 digit.');
                }

                resolve();
              }),
            },
          ]);

          if (value) {
            const [display_name, email, password, confirmPassword] = value;

            if (password === confirmPassword) {
              const user = {
                display_name,
                username: email,
                password,
              };

              const daftarStatus = await User.daftar(user);

              if (daftarStatus === 'error') {
                await Swal.fire({
                  title: 'Error !',
                  text: 'Cek kembali username dan password kamu',
                  icon: 'error',
                  confirmButtonColor: '#4caf50',
                });
              } else {
                await FullLoadingInitiator.init();
                location.href = '/?masuk';
              }
            } else {
              await Swal.fire({
                title: 'Gagal !',
                text: 'Password tidak sama dengan konfirmasi',
                icon: 'error',
                confirmButtonColor: '#4caf50',
              });
            }
          }
        } else {
          await Swal.fire({
            title: 'Kamu sedang offline !',
            text: 'Koneksi internet diperlukan.',
            icon: 'error',
            confirmButtonColor: '#4caf50',
          });
        }
      });
    }

    sidenavElem.addEventListener('click', (event) => {
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
