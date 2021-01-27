const CONFIG = {
  LOCAL_DATABASE: {
    NAME: 'Rutinitas Pelajar',
    VERSION: 1,
  },
  CACHE_NAME: 'Utilities',
  CACHE_EXP: 30 * 24 * 60 * 60, // 30 Days
  DATE: {
    DAY: [
      'Senin',
      'Selasa',
      'Rabu',
      'Kamis',
      'Jum\'at',
      'Sabtu',
      'Minggu',
    ],
    MONTH: [
      'Januari',
      'Februari',
      'Maret',
      'April',
      'Mei',
      'Juni',
      'Juli',
      'Agustus',
      'Oktober',
      'Septemer',
      'November',
      'Desember',
    ],
  },
  DEFAULT_USER_SETTING: {
    NILAI: 89,
    SEMESTER: 5,
  },
  TEXT_LIMIT: {
    TUGAS: {
      TUGAS: 10,
      PELAJARAN: 25,
    },
    JADWAL: 20,
    NILAI: 20,
    DISPLAY_NAME: 15,
  },
};

export default CONFIG;
