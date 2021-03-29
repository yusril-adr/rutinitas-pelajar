import Jadwal from '../../data/jadwal';
import CONFIG from '../../global/config';
import {
  createLoadingTemplate,
  createJadwalPageTemplate,
  createJadwalDayTemplate,
  createJadwalPelajaranTemplate,
  createPelajaranEmptyTemplate,
} from '../templates/template-creator';

const jadwal = {
  async render() {
    return createJadwalPageTemplate();
  },

  async afterRender() {
    await this._renderList();
  },

  async _renderList() {
    const section = document.querySelector('section.list');
    section.innerHTML = createLoadingTemplate();

    const container = document.createElement('div');
    container.classList.add('jadwal-container');
    container.classList.add('row');

    const dayName = CONFIG.DATE.DAY.filter((day) => day !== 'Minggu');

    dayName.forEach(async (day) => {
      const dayElement = document.createElement('div');
      dayElement.classList.add('col');
      dayElement.classList.add('s12');
      dayElement.classList.add('m6');
      dayElement.id = day.toLowerCase();
      dayElement.innerHTML = createJadwalDayTemplate(day);

      const pelajaranContainer = dayElement.querySelector('ul.list-pelajaran');
      const jadwalList = await Jadwal.getDayList(day);
      if (jadwalList.length > 0) {
        await jadwalList.forEach(async (pelajaran) => {
          const pelajaranElement = document.createElement('li');
          pelajaranElement.innerHTML = createJadwalPelajaranTemplate(pelajaran);

          await pelajaranContainer.appendChild(pelajaranElement);
        });
      } else {
        pelajaranContainer.innerHTML = createPelajaranEmptyTemplate();
      }

      container.appendChild(dayElement);
    });
    section.innerHTML = '';
    section.appendChild(container);
  },
};

export default jadwal;
