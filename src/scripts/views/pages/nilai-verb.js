import Swal from 'sweetalert2';
import Nilai from '../../data/nilai';
import CONFIG from '../../global/config';
import UrlParser from '../../routes/url-parser';
import FullLoadingInitiator from '../../utils/full-loading-initiator';
import NilaiHelper from '../../utils/nilai-helper';
import {
  createPelajaranEmptyTemplate,
  createNilaiVerbPageTemplate,
  createNilaiVerbNilaiTemplate,
} from '../templates/template-creator';

const nilaiVerb = {
  async render() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const semester = parseInt(url.verb);
    return createNilaiVerbPageTemplate(semester);
  },

  async afterRender() {
    await this._checkSemester();
    await this._renderList();
    await this._initAddBtn();
    await this._initDeleteSemesterBtn();
  },

  async _checkSemester() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const semester = parseInt(url.verb);
    const semesterBaru = (await NilaiHelper.getSemesterNow()) + 1;

    if (semester > semesterBaru || semester <= 0) location.pathname = '/nilai/';
  },

  async _renderList() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const semester = parseInt(url.verb);

    const listElement = document.querySelector('.list-pelajaran');
    const listNilai = await Nilai.getNilaiSemester(semester);

    listElement.innerHTML = '';
    if (listNilai.length > 0) {
      console.log(listNilai)
      await listNilai.forEach(async (nilai) => {
        const nilaiElement = document.createElement('li');
        nilaiElement.innerHTML = createNilaiVerbNilaiTemplate(nilai);

        listElement.appendChild(nilaiElement);
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
        const nilai = await Nilai.getNilai(id);

        const { value } = await Swal.mixin({
          confirmButtonText: 'Next &rarr;',
          confirmButtonColor: '#4caf50',
          showCancelButton: true,
          progressSteps: ['1', '2'],
        }).queue([
          {
            title: 'Pelajaran',
            input: 'text',
            inputValue: nilai.nama,
            inputValidator: (input) => new Promise((resolve) => {
              if (input === '') {
                resolve('Input tidak boleh kosong');
              }

              if (input.length > CONFIG.TEXT_LIMIT.NILAI) {
                resolve('Teks terlalu panjang.');
              }

              resolve();
            }),
          },
          {
            title: 'Nilai',
            input: 'number',
            inputValue: nilai.nilai,
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
          },
        ]);

        if (value) {
          const [namaPelajaran, nilaiPelajaran] = value;

          nilai.nama = namaPelajaran;
          nilai.nilai = nilaiPelajaran;

          await Nilai.putNilai(nilai);
          await this._renderList();
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
          text: 'Nilai yang dihapus tidak akan bisa kembali',
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

          await Nilai.deleteNilai(id);
          Swal.fire({
            title: 'Nilai Dihapus !',
            text: 'Nilai berhasil dihapus.',
            icon: 'success',
            confirmButtonColor: '#4caf50',
          });

          FullLoadingInitiator.remove();
        }

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
      const semester = parseInt(url.verb);

      const { value } = await Swal.mixin({
        confirmButtonText: 'Next &rarr;',
        confirmButtonColor: '#4caf50',
        showCancelButton: true,
        progressSteps: ['1', '2'],
      }).queue([
        {
          title: 'Pelajaran',
          input: 'text',
          inputPlaceholder: 'Nama pelajaran ...',
          inputValidator: (input) => new Promise((resolve) => {
            if (input === '') {
              resolve('Input tidak boleh kosong');
            }

            if (input.length > CONFIG.TEXT_LIMIT.NILAI) {
              resolve('Teks terlalu panjang.');
            }

            resolve();
          }),
        },
        {
          title: 'Nilai',
          input: 'number',
          inputPlaceholder: 'Nilai ...',
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
        },
      ]);

      if (value) {
        const [namaPelajaran, nilaiPelajaran] = value;

        const newNilai = {
          nama: namaPelajaran,
          nilai: parseInt(nilaiPelajaran),
          semester,
          __v: -1,
        };

        await Nilai.putNilai(newNilai);
        await this._renderList();
      }

      FullLoadingInitiator.remove();
    });
  },

  async _initDeleteSemesterBtn() {
    const button = document.querySelector('button.hapus-semester');

    button.addEventListener('click', async (event) => {
      event.stopPropagation();

      const { isConfirmed } = await Swal.fire({
        title: 'Apa kamu yakin ?',
        text: 'Semester yang dihapus tidak akan bisa kembali',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#4caf50',
        cancelButtonColor: '#f44336',
        confirmButtonText: 'Iya',
        cancelButtonText: 'Tidak',
      });

      if (isConfirmed) {
        await FullLoadingInitiator.init();

        const url = UrlParser.parseActiveUrlWithoutCombiner();
        const semester = parseInt(url.verb);
        const semesterList = await Nilai.getNilaiSemester(semester);

        await semesterList.forEach(async (nilai) => {
          await Nilai.deleteNilai(nilai._id || nilai.local_id);
        });

        const render = await Swal.fire({
          title: 'Semester Dihapus !',
          text: 'Semester berhasil dihapus.',
          icon: 'success',
          confirmButtonColor: '#4caf50',
        });

        FullLoadingInitiator.remove();

        if (render.isConfirmed) this._renderList();
      }
    });
  },
};

export default nilaiVerb;
