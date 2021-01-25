import Swal from 'sweetalert2';
import User from '../../data/user';
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

    document.querySelector('#target-nilai').innerHTML = await target_nilai;
    document.querySelector('#target-semester').innerHTML = await target_semester;
  },

  async _initLogInButton() {
    const container = document.querySelector('.card-action');
    container.innerHTML = createMasukButtonTemplate();

    const button = document.querySelector('#masuk');
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      location.href = '/masuk';
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
        nilai: document.querySelector('#target-nilai').innerHTML,
        semester: document.querySelector('#target-semester').innerHTML,
      };

      const { value, isDismissed } = await Swal.fire({
        title: 'Masukkan target nilai',
        input: 'number',
        inputValue: defaultValue.nilai,
        inputAttributes: {
          min: 0,
          max: 100,
        },
        showCancelButton: true,
        confirmButtonColor: '#4caf50',
      });

      if (!isDismissed) {
        const pengaturanBaru = {
          target_nilai: value || defaultValue.nilai,
          target_semester: defaultValue.semester,
        };

        await this._renderValue(pengaturanBaru);
        await User.updatePengaturan(pengaturanBaru);
      }
    });

    const buttonSemester = document.querySelector('button#edit-semester');
    buttonSemester.addEventListener('click', async (event) => {
      event.stopPropagation();

      const defaultValue = {
        nilai: document.querySelector('#target-nilai').innerHTML,
        semester: document.querySelector('#target-semester').innerHTML,
      };

      const { value } = await Swal.fire({
        title: 'Masukkan target semester',
        input: 'number',
        inputValue: defaultValue.semester,
        inputAttributes: {
          min: 0,
        },
        showCancelButton: true,
        confirmButtonColor: '#4caf50',
      });

      const pengaturanBaru = {
        target_nilai: defaultValue.nilai,
        target_semester: value || defaultValue.semester,
      };

      await this._renderValue(pengaturanBaru);
      await User.updatePengaturan(pengaturanBaru);
    });
  },
};

export default pengaturan;
