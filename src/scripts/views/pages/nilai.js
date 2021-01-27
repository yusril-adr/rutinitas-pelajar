import Swal from 'sweetalert2';
import Nilai from '../../data/nilai';
import NilaiHelper from '../../utils/nilai-helper';
import {
  createNilaiPageTemplate,
  createNilaiRekapTemplate,
  createNilaiSemesterTemplate,
  createNilaiPelajaranTemplate,
} from '../templates/template-creator';

const nilai = {
  async render() {
    return createNilaiPageTemplate();
  },

  async afterRender() {
    await this._renderList();
    await this._initAddBtn();
  },

  async _renderList() {
    const section = document.querySelector('section.list');

    const container = document.createElement('div');
    container.classList.add('nilai-container');
    container.classList.add('row');

    const nilaiList = await Nilai.getAllNilai();
    const semesterList = (await NilaiHelper.getSemesterValue(nilaiList)).sort().reverse();

    // Render rekap card
    const rekap = await NilaiHelper.getRekap(nilaiList);
    const rekapElement = document.createElement('div');
    rekapElement.classList.add('col');
    rekapElement.classList.add('s12');
    rekapElement.classList.add('m6');
    rekapElement.innerHTML = createNilaiRekapTemplate(rekap);
    await container.appendChild(rekapElement);

    // Render semester card
    await semesterList.forEach(async (semester) => {
      const semesterElement = document.createElement('div');
      semesterElement.classList.add('col');
      semesterElement.classList.add('s12');
      semesterElement.classList.add('m6');
      semesterElement.innerHTML = createNilaiSemesterTemplate(semester);

      const listPelajaranElement = semesterElement.querySelector('ul.list-pelajaran');
      const nilaiSemesterList = await Nilai.getNilaiSemester(semester);

      // render pelajaran in one card
      await nilaiSemesterList.forEach((nilaiPelajaran) => {
        const pelajaranElement = document.createElement('li');
        pelajaranElement.innerHTML = createNilaiPelajaranTemplate(nilaiPelajaran);

        listPelajaranElement.appendChild(pelajaranElement);
      });

      container.appendChild(semesterElement);
    });

    section.innerHTML = '';
    section.appendChild(container);
  },

  async _initAddBtn() {
    const button = document.querySelector('button.tambah');

    button.addEventListener('click', async (event) => {
      event.stopPropagation();

      const listNilai = await Nilai.getAllNilai();
      const semesterNow = await NilaiHelper.getSemesterNow(listNilai);
      const availableSemester = [];

      for (let i = 0; i <= (semesterNow + 1); i += 1) {
        if (i !== 0) availableSemester.push(i);
      }

      const { value } = await Swal.fire({
        title: 'Semester',
        input: 'number',
        inputValue: (semesterNow + 1),
        inputAttributes: {
          min: 1,
          max: (semesterNow + 1),
        },
        inputValidator: (input) => new Promise((resolve) => {
          if (input === '') {
            resolve('Input tidak boleh kosong');
          }

          if (input > (semesterNow + 1) || input <= 0) {
            resolve(`Semester yang bisa ditambahkan: ${[...availableSemester]}.`);
          }

          resolve();
        }),
        showCancelButton: true,
        confirmButtonColor: '#4caf50',
      });

      if (value) {
        location.pathname = `/nilai/${value}`;
      }
    });
  },
};

export default nilai;
