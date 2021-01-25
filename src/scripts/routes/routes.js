import home from '../views/pages/home';
import tugas from '../views/pages/tugas';
import jadwal from '../views/pages/jadwal';
import jadwalVerb from '../views/pages/jadwal-verb';
import nilai from '../views/pages/nilai';
import nilaiVerb from '../views/pages/nilai-verb';
import resolusi from '../views/pages/resolusi';
import simpan from '../views/pages/simpan';
import pengaturan from '../views/pages/pengaturan';

const routes = {
  '/': home,
  '/tugas': tugas,
  '/jadwal': jadwal,
  '/jadwal/verb': jadwalVerb,
  '/nilai': nilai,
  '/nilai/verb': nilaiVerb,
  '/resolusi': resolusi,
  '/simpan': simpan,
  '/pengaturan': pengaturan,
};

export default routes;
