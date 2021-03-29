import User from '../data/user';
import Nilai from '../data/nilai';

const NilaiHelper = {
  async getSemesterValue(list) {
    const generatedList = list || await Nilai.getAllNilai() || [];
    const semesterList = [];
    generatedList.forEach((nilai) => {
      if (!semesterList.includes(nilai.semester)) semesterList.push(nilai.semester);
    });

    return semesterList;
  },

  async getSemesterNow(list = undefined) {
    if (list && list.length > 0) return Math.max(...(await this.getSemesterValue(list)));
    const generatedList = await Nilai.getAllNilai() || [];
    if (generatedList.length > 0) return Math.max(...(await this.getSemesterValue(generatedList)));
    return Math.max(generatedList);
  },

  async getRekap(list = undefined) {
    const { target_nilai, target_semester } = await User.getPengaturan();
    const totalNilai = await this._getTotalNilai(list);
    const targetNilaiNow = await this._getTargetNilaiNow(list);
    const rekap = {
      target: {
        nilai: target_nilai,
        semester: target_semester,
        nilai_now: targetNilaiNow,
      },
      total_nilai: totalNilai,
    };

    return rekap;
  },

  async _getTotalNilai(list = undefined) {
    const listNilai = list || await Nilai.getAllNilai() || [];
    const listSemester = await this.getSemesterValue() || [];

    let total = 0;
    listSemester.forEach(async (semester) => {
      const filteredNilai = listNilai.filter((nilai) => nilai.semester === semester);
      const meanSemester = await filteredNilai.reduce((a, b) => a + (b.nilai || 0), 0);
      total += meanSemester / filteredNilai.length;
    });

    const semesterNow = await this.getSemesterNow();
    const mean = total / semesterNow;
    return mean > 0 ? mean : 0;
  },

  async _getTargetNilaiNow(list = undefined) {
    const { target_nilai, target_semester } = await User.getPengaturan();
    const targetKeseluruhan = target_nilai * target_semester;

    const semesterNow = await this.getSemesterNow(list);
    const sisaSemester = target_semester - semesterNow;

    const totalNilai = (await this._getTotalNilai(list)) * semesterNow;
    const totalTarget = targetKeseluruhan - totalNilai;

    const targetNilai = totalTarget / sisaSemester;

    return targetNilai > 0 ? targetNilai : 0;
  },
};

export default NilaiHelper;
