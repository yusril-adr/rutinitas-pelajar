import User from '../data/user';
import Tugas from '../data/tugas';
import Resolusi from '../data/resolusi';
import LocalResource from '../data/local-resource-idb';

const SyncronInitiator = {
  async init() {
    if (!(await LocalResource.get.deletedList())) await LocalResource.initDeletedList();
    await User.syncronUser();
    await Tugas.syncronTugas();
    await Resolusi.syncronResolusi();
  },
};

export default SyncronInitiator;
