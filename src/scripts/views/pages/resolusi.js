import Swal from 'sweetalert2';
import Resolusi from '../../data/resolusi';
import FullLoadingInitiator from '../../utils/full-loading-initiator';
import {
  createLoadingTemplate,
  createEmptyListTemplate,
  createResolusiPageTemplate,
  createResolusiTercapaiTemplate,
  createResolusiBelumTemplate,
} from '../templates/template-creator';

const resolusi = {
  async render() {
    return createResolusiPageTemplate();
  },

  async afterRender() {
    await this._renderList();
    await this._initCategoryButton();
    await this._initAddButton();
  },

  async _renderList({ tercapai = false } = {}) {
    const section = document.querySelector('section.resolusi-list');
    const list = tercapai ? await Resolusi.getTercapai() : await Resolusi.getBelumTercapai();

    section.innerHTML = '';
    if (list.length > 0) {
      const container = document.createElement('div');
      container.classList.add('row');
      container.classList.add('resolusi-container');

      await list.forEach((resolusiItem) => {
        const resolusiElement = document.createElement('div');
        resolusiElement.classList.add('col');
        resolusiElement.classList.add('s12');
        resolusiElement.classList.add('m6');
        resolusiElement.classList.add('resolusi');

        if (tercapai) resolusiElement.innerHTML = createResolusiTercapaiTemplate(resolusiItem);
        else resolusiElement.innerHTML = createResolusiBelumTemplate(resolusiItem);
        container.appendChild(resolusiElement);
      });
      section.appendChild(container);

      if (tercapai) await this._initBelumBtn();
      else await this._initTercapaiBtn();
      await this._initUbahBtn();
      await this._initHapusBtn(tercapai);
    } else {
      section.innerHTML = createEmptyListTemplate('Resolusi');
    }
  },

  async _initTercapaiBtn() {
    const buttons = document.querySelectorAll('button.tercapai');
    buttons.forEach((button) => {
      button.addEventListener('click', async (event) => {
        event.stopPropagation();
        await FullLoadingInitiator.init();
        const id = button.getAttribute('resolusi-id');

        const resolusiTercapai = await Resolusi.getResolusi(id);
        resolusiTercapai.tercapai = true;
        await Resolusi.putResolusi(resolusiTercapai);
        await Swal.fire({
          title: 'Selamat, Resolusi Tercapai !',
          text: 'Asik, udah semakin dewasa nih :)',
          icon: 'success',
          confirmButtonColor: '#4caf50',
        });
        FullLoadingInitiator.remove();
        this._renderList({ tercapai: false });
      });
    });
  },

  async _initBelumBtn() {
    const buttons = document.querySelectorAll('button.belum');
    buttons.forEach((button) => {
      button.addEventListener('click', async (event) => {
        event.stopPropagation();
        await FullLoadingInitiator.init();
        const id = button.getAttribute('resolusi-id');

        const resolusiBelum = await Resolusi.getResolusi(id);
        resolusiBelum.tercapai = false;
        await Resolusi.putResolusi(resolusiBelum);
        await Swal.fire({
          title: 'Resolusi Dipindahkan!',
          text: 'Tetap semangat dan jangan mudah menyerah ya !',
          icon: 'info',
          confirmButtonColor: '#4caf50',
        });
        FullLoadingInitiator.remove();
        this._renderList({ tercapai: true });
      });
    });
  },

  async _initUbahBtn(tercapai) {
    const buttons = document.querySelectorAll('button.ubah');
    buttons.forEach((button) => {
      button.addEventListener('click', async (event) => {
        event.stopPropagation();
        await FullLoadingInitiator.init();

        const id = button.getAttribute('resolusi-id');
        const resolusiItem = await Resolusi.getResolusi(id);

        const { value: resolusiText } = await Swal.fire({
          title: 'Resolusi',
          input: 'textarea',
          inputValue: resolusiItem.resolusi,
          inputPlaceholder: 'Tulis resolusimu disini ...',
          inputAttributes: {
            'aria-label': 'Tulis resolusimu disini ...',
          },
          inputValidator: (value) => new Promise((resolve) => {
            if (value === '') {
              resolve('Input tidak boleh kosong');
            }

            resolve();
          }),
          confirmButtonColor: '#4caf50',
          showCancelButton: true,
        });

        if (resolusiText) {
          resolusiItem.resolusi = resolusiText;

          await Resolusi.putResolusi(resolusiItem);
          await this._renderList({ tercapai });
        }

        FullLoadingInitiator.remove();
      });
    });
  },

  async _initHapusBtn(tercapai) {
    const buttons = document.querySelectorAll('button.hapus');
    buttons.forEach((button) => {
      button.addEventListener('click', async (event) => {
        event.stopPropagation();

        const { isConfirmed } = await Swal.fire({
          title: 'Apa kamu yakin ?',
          text: 'Resolusi yang dihapus tidak akan bisa kembali',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#4caf50',
          cancelButtonColor: '#f44336',
          confirmButtonText: 'Iya',
          cancelButtonText: 'Tidak',
        });

        if (isConfirmed) {
          await FullLoadingInitiator.init();
          const id = button.getAttribute('resolusi-id');

          await Resolusi.deleteResolusi(id);
          Swal.fire({
            title: 'Resolusi Dihapus !',
            text: 'Resolusi berhasil dihapus.',
            icon: 'success',
            confirmButtonColor: '#4caf50',
          });
          FullLoadingInitiator.remove();
        }

        this._renderList({ tercapai });
      });
    });
  },

  async _initCategoryButton() {
    const belumTercapaiBtn = document.querySelector('button#belum-tercapai');
    const tercapaiBtn = document.querySelector('button#tercapai');

    belumTercapaiBtn.addEventListener('click', (event) => {
      event.stopPropagation();
      tercapaiBtn.disabled = false;
      belumTercapaiBtn.disabled = true;

      document.querySelector('section.resolusi-list').innerHTML = createLoadingTemplate();
      this._renderList();
    });

    tercapaiBtn.addEventListener('click', (event) => {
      event.stopPropagation();
      tercapaiBtn.disabled = true;
      belumTercapaiBtn.disabled = false;

      document.querySelector('section.resolusi-list').innerHTML = createLoadingTemplate();
      this._renderList({ tercapai: true });
    });
  },

  async _initAddButton() {
    const button = document.querySelector('button.tambah');
    button.addEventListener('click', async (event) => {
      event.stopPropagation();

      const { value: resolusiText } = await Swal.fire({
        title: 'Resolusi',
        input: 'textarea',
        inputPlaceholder: 'Tulis resolusimu disini ...',
        inputAttributes: {
          'aria-label': 'Tulis resolusimu disini ...',
        },
        inputValidator: (value) => new Promise((resolve) => {
          if (value === '') {
            resolve('Input tidak boleh kosong');
          }

          resolve();
        }),
        confirmButtonColor: '#4caf50',
        showCancelButton: true,
      });

      if (resolusiText) {
        const newResolusi = {
          resolusi: resolusiText,
          tercapai: false,
          __v: -1,
        };

        await Resolusi.putResolusi(newResolusi);
        await this._renderList();
      }
    });
  },
};

export default resolusi;
