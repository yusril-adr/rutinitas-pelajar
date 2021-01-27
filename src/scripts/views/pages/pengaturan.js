import Swal from 'sweetalert2';
import CONFIG from '../../global/config';
import User from '../../data/user';
import FullLoadingInitiator from '../../utils/full-loading-initiator';
import {
  createPengaturanPageTemplate,
  createMasukButtonTemplate,
  createKeluarButtonTemplate,
} from '../templates/template-creator';

const pengaturan = {
  async render() {
    return createPengaturanPageTemplate();
  },

  async afterRender() {
    await this._renderValue();
    if (await User.isLogin()) await this._initLogOutButton();
    else await this._initLogInButton();

    await this._setEditEvent();
  },

  async _renderValue(pengaturanBaru = undefined) {
    const pengaturanValue = pengaturanBaru || await User.getPengaturan();
    const { target_nilai, target_semester } = await pengaturanValue;

    document.querySelector('#target-nilai').innerHTML = (await target_nilai).toFixed(2);
    document.querySelector('#target-semester').innerHTML = await target_semester;
  },

  async _initLogInButton() {
    const container = document.querySelector('.card-action');
    container.innerHTML = createMasukButtonTemplate();

    const masukBtn = document.querySelector('button.masuk');
    masukBtn.addEventListener('click', async (event) => {
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

    const daftarBtn = document.querySelector('button.daftar');
    daftarBtn.addEventListener('click', async (event) => {
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
  },

  async _initLogOutButton() {
    const container = document.querySelector('.card-action');
    container.innerHTML = createKeluarButtonTemplate();

    const button = document.querySelector('#keluar');
    button.addEventListener('click', async (event) => {
      event.stopPropagation();
      const confirmation = await Swal.fire({
        title: 'Apa anda yakin ingin keluar ?',
        text: 'Data-data anda lokal anda akan terhapus.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#4caf50',
        cancelButtonColor: '#f44336',
        confirmButtonText: 'Ya',
        cancelButtonText: 'Tidak',
      });

      if (!navigator.onLine) {
        await Swal.fire({
          title: 'Gagal Keluar !',
          text: 'Tolong cek koneksi internet kamu ya.',
          icon: 'error',
          confirmButtonColor: '#4caf50',
        });
      }
      if (confirmation.isConfirmed && navigator.onLine) {
        location.href = '/keluar';
      }
    });
  },

  async _setEditEvent() {
    const buttonNilai = document.querySelector('button#edit-nilai');
    buttonNilai.addEventListener('click', async (event) => {
      event.stopPropagation();

      const defaultValue = {
        nilai: parseInt(document.querySelector('#target-nilai').innerHTML),
        semester: parseInt(document.querySelector('#target-semester').innerHTML),
      };

      const { value, isDismissed } = await Swal.fire({
        title: 'Masukkan target nilai',
        input: 'number',
        inputValue: defaultValue.nilai,
        inputAttributes: {
          min: 0,
          max: 100,
        },
        inputValidator: (input) => new Promise((resolve) => {
          if (input === '') {
            resolve('Input tidak boleh kosong');
          }

          if (input > 100 || input < 0) {
            resolve('Nilai tidak sesuai.');
          }

          resolve();
        }),
        showCancelButton: true,
        confirmButtonColor: '#4caf50',
      });

      if (!isDismissed) {
        const pengaturanBaru = {
          target_nilai: parseInt(value) || defaultValue.nilai,
          target_semester: defaultValue.semester,
        };

        await FullLoadingInitiator.init();

        const updatedPengaturan = await User.updatePengaturan(pengaturanBaru);
        await this._renderValue(updatedPengaturan);

        FullLoadingInitiator.remove();
      }
    });

    const buttonSemester = document.querySelector('button#edit-semester');
    buttonSemester.addEventListener('click', async (event) => {
      event.stopPropagation();

      const defaultValue = {
        nilai: parseInt(document.querySelector('#target-nilai').innerHTML),
        semester: parseInt(document.querySelector('#target-semester').innerHTML),
      };

      const { value } = await Swal.fire({
        title: 'Masukkan target semester',
        input: 'number',
        inputValue: defaultValue.semester,
        inputAttributes: {
          min: 0,
        },
        inputValidator: (input) => new Promise((resolve) => {
          if (input === '') {
            resolve('Input tidak boleh kosong');
          }

          if (input < 0) {
            resolve('Semester tidak sesuai.');
          }

          resolve();
        }),
        showCancelButton: true,
        confirmButtonColor: '#4caf50',
      });

      const pengaturanBaru = {
        target_nilai: defaultValue.nilai,
        target_semester: parseInt(value) || defaultValue.semester,
      };

      await FullLoadingInitiator.init();

      const updatedPengaturan = await User.updatePengaturan(pengaturanBaru);
      await this._renderValue(updatedPengaturan);

      FullLoadingInitiator.remove();
    });
  },
};

export default pengaturan;
