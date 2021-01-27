import Swal from 'sweetalert2';
import Tugas from '../../data/tugas';
import CONFIG from '../../global/config';
import FullLoadingInitiator from '../../utils/full-loading-initiator';
import TugasHelper from '../../utils/tugas-helper';
import {
  createTugasPageTemplate,
  createTugasContainerTemplate,
  createTugasBelumTemplate,
  createTugasSelesaiTemplate,
  createEmptyListTemplate,
  createLoadingTemplate,
} from '../templates/template-creator';

const tugas = {
  async render() {
    return createTugasPageTemplate();
  },

  async afterRender() {
    await this._renderList();
    await this._initCategoryButton();
    await this._initAddButton();
  },

  async _renderList({ selesai = false } = {}) {
    const section = document.querySelector('section.list');
    const list = selesai ? await Tugas.getSelesai() : await Tugas.getBelumSelesai();

    if (list.length > 0) {
      const deadlines = await TugasHelper.getDeadlines(list);

      section.innerHTML = '';
      await deadlines.forEach(async (deadline) => {
        const container = document.createElement('div');
        container.classList.add('container');
        container.classList.add('tugas-container');

        const date = await TugasHelper.dateConverter(deadline);
        container.innerHTML = createTugasContainerTemplate(date);
        const listElem = container.querySelector('ul');

        const filteredList = list.filter((item) => item.deadline === deadline);

        filteredList.forEach((tugasItem) => {
          const tugasElement = document.createElement('li');
          if (selesai) tugasElement.innerHTML = createTugasSelesaiTemplate(tugasItem);
          else tugasElement.innerHTML = createTugasBelumTemplate(tugasItem);
          listElem.appendChild(tugasElement);
        });

        section.appendChild(container);
      });

      if (selesai) await this._initBelumBtn();
      else await this._initSudahBtn();
      await this._initHapusBtn(selesai);
    } else {
      section.innerHTML = createEmptyListTemplate('Tugas');
    }
  },

  async _initSudahBtn() {
    const buttons = document.querySelectorAll('button.sudah');
    buttons.forEach((button) => {
      button.addEventListener('click', async (event) => {
        event.stopPropagation();
        await FullLoadingInitiator.init();
        const id = button.getAttribute('tugas-id');

        const tugasSelesai = await Tugas.getTugas(id);
        tugasSelesai.selesai = true;
        await Tugas.putTugas(tugasSelesai);
        await Swal.fire({
          title: 'Selamat, Tugas Kamu Selesai !',
          text: 'Asik, ilmu kamu bertambah nih :)',
          icon: 'success',
          confirmButtonColor: '#4caf50',
        });
        FullLoadingInitiator.remove();
        this._renderList({ selesai: false });
      });
    });
  },

  async _initBelumBtn() {
    const buttons = document.querySelectorAll('button.belum');
    buttons.forEach((button) => {
      button.addEventListener('click', async (event) => {
        event.stopPropagation();
        await FullLoadingInitiator.init();
        const id = button.getAttribute('tugas-id');

        const tugasBelum = await Tugas.getTugas(id);
        tugasBelum.selesai = false;
        await Tugas.putTugas(tugasBelum);
        await Swal.fire({
          title: 'Tugas Dipindahkan!',
          text: 'Tetap semangat dan jangan mudah menyerah ya !',
          icon: 'info',
          confirmButtonColor: '#4caf50',
        });
        FullLoadingInitiator.remove();
        this._renderList({ selesai: true });
      });
    });
  },

  async _initHapusBtn(selesai) {
    const buttons = document.querySelectorAll('button.hapus');
    buttons.forEach((button) => {
      button.addEventListener('click', async (event) => {
        event.stopPropagation();

        const { isConfirmed } = await Swal.fire({
          title: 'Apa kamu yakin ?',
          text: 'Tugas yang dihapus tidak akan bisa kembali',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#4caf50',
          cancelButtonColor: '#f44336',
          confirmButtonText: 'Iya',
          cancelButtonText: 'Tidak',
        });

        if (isConfirmed) {
          await FullLoadingInitiator.init();
          const id = button.getAttribute('tugas-id');

          await Tugas.deleteTugas(id);
          Swal.fire({
            title: 'Tugas Dihapus !',
            text: 'Tugas berhasil dihapus.',
            icon: 'success',
            confirmButtonColor: '#4caf50',
          });
          FullLoadingInitiator.remove();
        }

        this._renderList({ selesai });
      });
    });
  },

  async _initCategoryButton() {
    const belumSelesaiBtn = document.querySelector('#belum-selesai');
    const selesaiBtn = document.querySelector('#selesai');

    belumSelesaiBtn.addEventListener('click', (event) => {
      event.stopPropagation();
      selesaiBtn.disabled = false;
      belumSelesaiBtn.disabled = true;

      document.querySelector('section.list').innerHTML = createLoadingTemplate();
      this._renderList();
    });

    selesaiBtn.addEventListener('click', (event) => {
      event.stopPropagation();
      selesaiBtn.disabled = true;
      belumSelesaiBtn.disabled = false;

      document.querySelector('section.list').innerHTML = createLoadingTemplate();
      this._renderList({ selesai: true });
    });
  },

  async _initAddButton() {
    const button = document.querySelector('button.tambah');
    button.addEventListener('click', async (event) => {
      event.stopPropagation();

      const result = await Swal.mixin({
        input: 'text',
        confirmButtonText: 'Next &rarr;',
        confirmButtonColor: '#4caf50',
        showCancelButton: true,
        progressSteps: ['1', '2'],
      }).queue([
        {
          title: 'Tugas',
          inputValidator: (value) => new Promise((resolve) => {
            if (value === '') {
              resolve('Input tidak boleh kosong');
            }

            if (value.length > CONFIG.TEXT_LIMIT.TUGAS.TUGAS) {
              resolve('Teks terlalu panjang.');
            }

            resolve();
          }),
        },
        {
          title: 'Pelajaran',
          inputValidator: (value) => new Promise((resolve) => {
            if (value === '') {
              resolve('Input tidak boleh kosong');
            }

            if (value.length > CONFIG.TEXT_LIMIT.TUGAS.PELAJARAN) {
              resolve('Teks terlalu panjang.');
            }

            resolve();
          }),
        },
      ]);

      if (result.value) {
        const newTugas = {
          selesai: false,
          __v: -1,
        };
        [newTugas.tugas, newTugas.pelajaran] = result.value;

        const deadline = await Swal.mixin({
          title: 'Deadline',
          confirmButtonText: 'Next &rarr;',
          confirmButtonColor: '#4caf50',
          showCancelButton: true,
          progressSteps: ['1', '2', '3'],
        }).queue([
          {
            text: 'Tanggal',
            input: 'number',
            inputValue: new Date().getDate(),
            inputAttributes: {
              min: 1,
              max: 31,
            },
            inputValidator: (input) => new Promise((resolve) => {
              if (input === '') {
                resolve('Input tidak boleh kosong');
              }

              if (input.length > 31 || input.length < 1) {
                resolve('Tanggal tidak sesuai.');
              }

              resolve();
            }),
          },
          {
            text: 'Bulan',
            input: 'select',
            inputValue: CONFIG.DATE.MONTH[new Date().getMonth()],
            inputOptions: {
              Januari: 'Januari',
              Februari: 'Februari',
              Maret: 'Maret',
              April: 'April',
              Mei: 'Mei',
              Juni: 'Juni',
              Juli: 'Juli',
              Agustus: 'Agustus',
              September: 'September',
              Oktober: 'Oktober',
              November: 'November',
              Desember: 'Desember',
            },
            inputValidator: (value) => new Promise((resolve) => {
              if (value === '') {
                resolve('Input tidak boleh kosong');
              }
              resolve();
            }),
          },
          {
            text: 'Tahun',
            input: 'number',
            inputValue: new Date().getFullYear(),
            inputValidator: (value) => new Promise((resolve) => {
              if (value === '') {
                resolve('Input tidak boleh kosong');
              }
              resolve();
            }),
          },
        ]);

        if (deadline.value) {
          const [date, month, year] = deadline.value;
          const deadlineDate = `${date} ${month} ${year}`;
          newTugas.deadline = new Date(deadlineDate).getTime();

          await Tugas.putTugas(newTugas);
          await this._renderList();
        }
      }
    });
  },
};

export default tugas;
