import Swal from 'sweetalert2';
import Jadwal from '../../data/jadwal';
import CONFIG from '../../global/config';
import UrlParser from '../../routes/url-parser';
import FullLoadingInitiator from '../../utils/full-loading-initiator';
import {
  createPelajaranEmptyTemplate,
  createJadwalVerbPageTemplate,
  createJadwalVerbPelajaranTemplate,
} from '../templates/template-creator';

const jadwalVerb = {
  async render() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const { verb: day } = url;
    return createJadwalVerbPageTemplate(day);
  },

  async afterRender() {
    await this._renderList();
    await this._initAddBtn();
  },

  async _renderList() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const { verb: day } = url;

    const listElement = document.querySelector('.list-pelajaran');
    const listPelajaran = await Jadwal.getDayList(day);

    listElement.innerHTML = '';
    if (listPelajaran.length > 0) {
      listPelajaran.forEach(async (pelajaran) => {
        const pelajaranElement = document.createElement('li');
        pelajaranElement.innerHTML = createJadwalVerbPelajaranTemplate(pelajaran);

        listElement.appendChild(pelajaranElement);
      });
    } else {
      listElement.innerHTML = createPelajaranEmptyTemplate();
    }

    await this._initEditBtn();
    await this._initDeleteBtn();
  },

  async _initEditBtn() {
    const buttons = document.querySelectorAll('button.ubah');

    buttons.forEach((button) => {
      button.addEventListener('click', async (event) => {
        event.stopPropagation();
        await FullLoadingInitiator.init();

        const id = button.getAttribute('pelajaran-id');
        const pelajaran = await Jadwal.getPelajaran(id);

        const { value: namaPelajaran } = await Swal.fire({
          title: 'Pelajaran',
          input: 'text',
          inputValue: pelajaran.nama,
          inputValidator: (value) => new Promise((resolve) => {
            if (value === '') {
              resolve('Input tidak boleh kosong');
            }

            if (value.length > CONFIG.TEXT_LIMIT.JADWAL) {
              resolve('Teks terlalu panjang.');
            }

            resolve();
          }),
          confirmButtonColor: '#4caf50',
          showCancelButton: true,
        });

        if (namaPelajaran) {
          const { value } = await Swal.mixin({
            title: 'Jam Pelajaran',
            input: 'number',
            confirmButtonText: 'Next &rarr;',
            confirmButtonColor: '#4caf50',
            showCancelButton: true,
            progressSteps: ['1', '2'],
          }).queue([
            {
              text: 'Jam',
              inputValue: parseInt(pelajaran.jam.slice(0, 2)),
              inputAttributes: {
                min: 0,
                max: 23,
              },
              inputValidator: (input) => new Promise((resolve) => {
                if (input === '') {
                  resolve('Input tidak boleh kosong');
                }

                if (input.length > 23 || input.length < 0) {
                  resolve('Jam tidak sesuai.');
                }

                resolve();
              }),
            },
            {
              text: 'Menit',
              inputValue: parseInt(pelajaran.jam.slice(3, 5)),
              inputAttributes: {
                min: 0,
                max: 59,
              },
              inputValidator: (input) => new Promise((resolve) => {
                if (input === '') {
                  resolve('Input tidak boleh kosong');
                }

                if (input.length > 59 || input.length < 0) {
                  resolve('Menit tidak sesuai.');
                }

                resolve();
              }),
            },
          ]);

          if (value) {
            const jam = value[0].length < 2 ? `0${value[0]}` : value[0];
            const menit = value[1].length < 2 ? `0${value[1]}` : value[1];
            const jamPelajaran = `${jam}:${menit}`;

            pelajaran.nama = namaPelajaran;
            pelajaran.jam = jamPelajaran;

            await Jadwal.putPelajaran(pelajaran);
            await this._renderList();
          }
        }

        FullLoadingInitiator.remove();
      });
    });
  },

  async _initDeleteBtn() {
    const buttons = document.querySelectorAll('button.hapus');
    buttons.forEach((button) => {
      button.addEventListener('click', async (event) => {
        event.stopPropagation();

        const { isConfirmed } = await Swal.fire({
          title: 'Apa kamu yakin ?',
          text: 'Pelajaran yang dihapus tidak akan bisa kembali',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#4caf50',
          cancelButtonColor: '#f44336',
          confirmButtonText: 'Iya',
          cancelButtonText: 'Tidak',
        });

        if (isConfirmed) {
          await FullLoadingInitiator.init();
          const id = button.getAttribute('pelajaran-id');

          await Jadwal.deletePelajaran(id);
          Swal.fire({
            title: 'Pelajaran Dihapus !',
            text: 'Pelajaran berhasil dihapus.',
            icon: 'success',
            confirmButtonColor: '#4caf50',
          });
        }

        FullLoadingInitiator.remove();
        this._renderList();
      });
    });
  },

  async _initAddBtn() {
    const button = document.querySelector('button.tambah');

    button.addEventListener('click', async (event) => {
      event.stopPropagation();
      await FullLoadingInitiator.init();
      const url = UrlParser.parseActiveUrlWithoutCombiner();
      const { verb: day } = url;

      const { value: namaPelajaran } = await Swal.fire({
        title: 'Pelajaran',
        input: 'text',
        inputPlaceholder: 'Nama pelajaran',
        inputValidator: (value) => new Promise((resolve) => {
          if (value === '') {
            resolve('Input tidak boleh kosong');
          }

          if (value.length > CONFIG.TEXT_LIMIT.JADWAL) {
            resolve('Teks terlalu panjang.');
          }

          resolve();
        }),
        confirmButtonColor: '#4caf50',
        showCancelButton: true,
      });

      if (namaPelajaran) {
        const { value } = await Swal.mixin({
          title: 'Jam Pelajaran',
          input: 'number',
          confirmButtonText: 'Next &rarr;',
          confirmButtonColor: '#4caf50',
          showCancelButton: true,
          progressSteps: ['1', '2'],
        }).queue([
          {
            text: 'Jam',
            inputValue: new Date().getHours(),
            inputAttributes: {
              min: 0,
              max: 23,
            },
            inputValidator: (input) => new Promise((resolve) => {
              if (input === '') {
                resolve('Input tidak boleh kosong');
              }

              if (input.length > 23 || input.length < 0) {
                resolve('Jam tidak sesuai.');
              }

              resolve();
            }),
          },
          {
            text: 'Menit',
            inputValue: new Date().getMinutes(),
            inputAttributes: {
              min: 0,
              max: 59,
            },
            inputValidator: (input) => new Promise((resolve) => {
              if (input === '') {
                resolve('Input tidak boleh kosong');
              }

              if (input.length > 59 || input.length < 0) {
                resolve('Menit tidak sesuai.');
              }

              resolve();
            }),
          },
        ]);

        if (value) {
          const jam = value[0].length < 2 ? `0${value[0]}` : value[0];
          const menit = value[1].length < 2 ? `0${value[1]}` : value[1];
          const jamPelajaran = `${jam}:${menit}`;

          const newPelajaran = {
            nama: namaPelajaran,
            jam: jamPelajaran,
            hari: day,
            __v: -1,
          };

          await Jadwal.putPelajaran(newPelajaran);
          await this._renderList();
        }

        FullLoadingInitiator.remove();
      }
    });
  },
};

export default jadwalVerb;
