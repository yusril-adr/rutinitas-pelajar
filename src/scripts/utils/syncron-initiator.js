import User from '../data/user';
import Tugas from '../data/tugas';
import Jadwal from '../data/jadwal';
import Nilai from '../data/nilai';
import Resolusi from '../data/resolusi';
import LocalResource from '../data/local-resource-idb';

const SyncronInitiator = {
  async init() {
    if (!navigator.onLine) {
      // eslint-disable-next-line no-undef
      M.toast({ html: 'Sinkronisasi gagal, karena anda sedang offline.' });
    }

    if (!(await LocalResource.get.deletedList())) await LocalResource.initDeletedList();
    await User.syncronUser();
    await Tugas.syncronTugas();
    await Jadwal.syncronJadwal();
    await Nilai.syncronNilai();
    await Resolusi.syncronResolusi();
  },
};

export default SyncronInitiator;
