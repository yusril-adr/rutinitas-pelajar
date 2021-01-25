import { createJadwalPageTemplate } from '../templates/template-creator';

const jadwal = {
  async render() {
    return createJadwalPageTemplate();
  },

  async afterRender() {
    //
  },
};

export default jadwal;
