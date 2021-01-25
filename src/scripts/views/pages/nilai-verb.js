import { createNilaiVerbPageTemplate } from '../templates/template-creator';

const nilaiVerb = {
  async render() {
    return createNilaiVerbPageTemplate();
  },

  async afterRender() {
    //
  },
};

export default nilaiVerb;
