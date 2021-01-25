import { createSimpanPageTemplate } from '../templates/template-creator';

const simpan = {
  async render() {
    return createSimpanPageTemplate();
  },

  async afterRender() {
    //
  },
};

export default simpan;
