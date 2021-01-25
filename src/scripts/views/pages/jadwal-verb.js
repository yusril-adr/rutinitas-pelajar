import { createJadwalVerbPageTemplate } from '../templates/template-creator';

const jadwalVerb = {
  async render() {
    return createJadwalVerbPageTemplate();
  },

  async afterRender() {
    //
  },
};

export default jadwalVerb;
