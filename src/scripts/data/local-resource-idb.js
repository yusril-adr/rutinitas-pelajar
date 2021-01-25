/* eslint-disable no-case-declarations */
import { openDB, deleteDB } from 'idb';
import CONFIG from '../global/config';

const dbPromise = openDB(CONFIG.LOCAL_DATABASE.NAME, CONFIG.LOCAL_DATABASE.VERSION, {
  upgrade(database, oldVersion) {
    // eslint-disable-next-line default-case
    switch (oldVersion) {
      case 0:
        database.createObjectStore('user', { keyPath: '_id' });

        const tugasStore = database.createObjectStore('tugas', {
          keyPath: 'local_id',
          autoIncrement: true,
        });
        tugasStore.createIndex('_id', '_id');

        const jadwalStore = database.createObjectStore('jadwal', {
          keyPath: 'local_id',
          autoIncrement: true,
        });
        jadwalStore.createIndex('_id', '_id');

        const nilaiStore = database.createObjectStore('nilai', {
          keyPath: 'local_id',
          autoIncrement: true,
        });
        nilaiStore.createIndex('_id', '_id');

        const resolusiStore = database.createObjectStore('resolusi', {
          keyPath: 'local_id',
          autoIncrement: true,
        });
        resolusiStore.createIndex('_id', '_id');

        database.createObjectStore('deleted', { keyPath: 'id' });
    }
  },
});

const LocalResource = {
  async isUserExist() {
    const user = await this.get.user();
    return !!user;
  },

  async isLogin() {
    const user = await this.get.user();
    if (user) return user.login;
    return false;
  },

  async initUser(onlineUser = undefined) {
    const db = await dbPromise;
    const tx = db.transaction('user', 'readwrite');
    const store = tx.objectStore('user');

    const newUser = {
      _id: 0,
      display_name: 'user',
      username: 'user@mail.com',
      login: false,
      pengaturan: {
        target_nilai: CONFIG.DEFAULT_USER_SETTING.NILAI,
        target_semester: CONFIG.DEFAULT_USER_SETTING.SEMESTER,
      },
      __v: 0,
    };
    return store.put(onlineUser || newUser);
  },

  async initDeletedList() {
    const list = {
      id: 0,
      tugas: [],
      jadwal: [],
      nilai: [],
      resolusi: [],
    };

    return this.put.deletedList(list);
  },

  get: {
    async user() {
      const db = await dbPromise;
      const tx = db.transaction('user', 'readonly');
      const store = tx.objectStore('user');
      return store.get(0);
    },

    async pengaturan() {
      const user = await this.user();
      return user.pengaturan;
    },

    async tugasList() {
      const db = await dbPromise;
      const tx = db.transaction('tugas', 'readonly');
      const store = tx.objectStore('tugas');
      return store.getAll();
    },

    async tugasSelesai() {
      const db = await dbPromise;
      const tx = db.transaction('tugas', 'readonly');
      const store = tx.objectStore('tugas');
      const list = await store.getAll();
      return list.filter((tugas) => tugas.selesai === true);
    },

    async tugasBelumSelesai() {
      const db = await dbPromise;
      const tx = db.transaction('tugas', 'readonly');
      const store = tx.objectStore('tugas');
      const list = await store.getAll();
      return list.filter((tugas) => tugas.selesai === false);
    },

    async tugasByLocal(id) {
      const db = await dbPromise;
      const tx = db.transaction('tugas', 'readonly');
      const store = tx.objectStore('tugas');
      return store.get(id);
    },

    async tugasByOnline(id) {
      const db = await dbPromise;
      const tx = db.transaction('tugas', 'readonly');
      const store = tx.objectStore('tugas');
      const index = store.index('_id');
      return index.get(id);
    },

    async tugas(id) {
      return await this.tugasByOnline(id) || await this.tugasByLocal(parseInt(id));
    },

    async jadwalList() {
      const db = await dbPromise;
      const tx = db.transaction('jadwal', 'readonly');
      const store = tx.objectStore('jadwal');
      return store.getAll();
    },

    async jadwalDayList(day) {
      const list = await this.jadwalList();
      return list.filter((jadwal) => jadwal.hari.toLowerCase() === day.toLowerCase());
    },

    async jadwalByLocal(id) {
      const db = await dbPromise;
      const tx = db.transaction('jadwal', 'readonly');
      const store = tx.objectStore('jadwal');
      return store.get(id);
    },

    async jadwalByOnline(id) {
      const db = await dbPromise;
      const tx = db.transaction('jadwal', 'readonly');
      const store = tx.objectStore('jadwal');
      const index = store.index('_id');
      return index.get(id);
    },

    async jadwal(id) {
      return await this.jadwalByOnline(id) || await this.jadwalByLocal(parseInt(id));
    },

    async resolusiList() {
      const db = await dbPromise;
      const tx = db.transaction('resolusi', 'readonly');
      const store = tx.objectStore('resolusi');
      return store.getAll();
    },

    async resolusiTercapai() {
      const db = await dbPromise;
      const tx = db.transaction('resolusi', 'readonly');
      const store = tx.objectStore('resolusi');
      const list = await store.getAll();
      return list.filter((resolusi) => resolusi.tercapai === true);
    },

    async resolusiBelumTercapai() {
      const db = await dbPromise;
      const tx = db.transaction('resolusi', 'readonly');
      const store = tx.objectStore('resolusi');
      const list = await store.getAll();
      return list.filter((resolusi) => resolusi.tercapai === false);
    },

    async resolusiByLocal(id) {
      const db = await dbPromise;
      const tx = db.transaction('resolusi', 'readonly');
      const store = tx.objectStore('resolusi');
      return store.get(id);
    },

    async resolusiByOnline(id) {
      const db = await dbPromise;
      const tx = db.transaction('resolusi', 'readonly');
      const store = tx.objectStore('resolusi');
      const index = store.index('_id');
      return index.get(id);
    },

    async resolusi(id) {
      return await this.resolusiByOnline(id) || await this.resolusiByLocal(parseInt(id));
    },

    async deletedList() {
      const db = await dbPromise;
      const tx = db.transaction('deleted', 'readonly');
      const store = tx.objectStore('deleted');
      return store.get(0);
    },
  },

  put: {
    async user(newUser) {
      const db = await dbPromise;
      const tx = db.transaction('user', 'readwrite');
      const store = tx.objectStore('user');
      const convertedUser = newUser;
      convertedUser._id = 0;

      return store.put(newUser);
    },

    async pengaturan(pengaturanBaru) {
      const user = await LocalResource.get.user();
      const db = await dbPromise;
      const tx = db.transaction('user', 'readwrite');
      const store = tx.objectStore('user');
      user.pengaturan = pengaturanBaru;

      return store.put(user);
    },

    async tugas(tugas) {
      const db = await dbPromise;
      const tx = db.transaction('tugas', 'readwrite');
      const store = tx.objectStore('tugas');

      return store.put(tugas);
    },

    async jadwal(jadwal) {
      const db = await dbPromise;
      const tx = db.transaction('jadwal', 'readwrite');
      const store = tx.objectStore('jadwal');

      return store.put(jadwal);
    },

    async resolusi(resolusi) {
      const db = await dbPromise;
      const tx = db.transaction('resolusi', 'readwrite');
      const store = tx.objectStore('resolusi');

      return store.put(resolusi);
    },

    async deletedList(list) {
      const db = await dbPromise;
      const tx = db.transaction('deleted', 'readwrite');
      const store = tx.objectStore('deleted');

      await store.put(list);
      return LocalResource.get.deletedList();
    },
  },

  delete: {
    async database() {
      return await deleteDB(CONFIG.LOCAL_DATABASE.NAME);
    },

    async tugasByLocal(id) {
      id = parseInt(id);
      const db = await dbPromise;
      const tx = db.transaction('tugas', 'readwrite');
      const store = tx.objectStore('tugas');
      return store.delete(id);
    },

    async tugasByOnline(id) {
      const db = await dbPromise;
      const tx = db.transaction('tugas', 'readwrite');
      const store = tx.objectStore('tugas');
      const index = store.index('_id');
      const tugas = await index.get(id);
      if (tugas) return this.tugasByLocal(tugas.local_id);
      return undefined;
    },

    async jadwalByLocal(id) {
      id = parseInt(id);
      const db = await dbPromise;
      const tx = db.transaction('jadwal', 'readwrite');
      const store = tx.objectStore('jadwal');
      return store.delete(id);
    },

    async jadwalByOnline(id) {
      const db = await dbPromise;
      const tx = db.transaction('jadwal', 'readwrite');
      const store = tx.objectStore('jadwal');
      const index = store.index('_id');
      const jadwal = await index.get(id);
      if (jadwal) return this.jadwalByLocal(jadwal.local_id);
      return undefined;
    },

    async resolusiByLocal(id) {
      id = parseInt(id);
      const db = await dbPromise;
      const tx = db.transaction('resolusi', 'readwrite');
      const store = tx.objectStore('resolusi');
      return store.delete(id);
    },

    async resolusiByOnline(id) {
      const db = await dbPromise;
      const tx = db.transaction('resolusi', 'readwrite');
      const store = tx.objectStore('resolusi');
      const index = store.index('_id');
      const resolusi = await index.get(id);
      if (resolusi) return this.resolusiByLocal(resolusi.local_id);
      return undefined;
    },
  },
};

export default LocalResource;
