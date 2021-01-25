import { createNilaiPageTemplate } from '../templates/template-creator';

const nilai = {
  async render() {
    return createNilaiPageTemplate();
  },

  async afterRender() {
    //
  },
};

export default nilai;
