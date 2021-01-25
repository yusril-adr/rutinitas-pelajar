import OnlineResource from './online-resource';
import LocalResource from './local-resource-idb';

const Tugas = {
  async getSelesai() {
    if (navigator.onLine && await OnlineResource.isLogin()) {
      return OnlineResource.get.tugasSelesai();
    }
    return LocalResource.get.tugasSelesai();
  },

  async getBelumSelesai() {
    if (navigator.onLine && await OnlineResource.isLogin()) {
      return OnlineResource.get.tugasBelumSelesai();
    }
    return LocalResource.get.tugasBelumSelesai();
  },

  async getTugas(id) {
    if (navigator.onLine && await OnlineResource.isLogin()) {
      return OnlineResource.get.tugas(id);
    }
    return LocalResource.get.tugas(id);
  },

  async putTugas(tugas) {
    tugas.__v += 1;

    if (('_id' in tugas)) {
      const local = await LocalResource.get.tugas(tugas._id);
      if (local) tugas.local_id = local.local_id;
    }

    if (navigator.onLine && await OnlineResource.isLogin()) {
      const result = await OnlineResource.put.tugas(tugas);
      if (result) await LocalResource.put.tugas(result);
      return result;
    }
    return LocalResource.put.tugas(tugas);
  },

  async deleteTugas(id) {
    if (navigator.onLine && await OnlineResource.isLogin()) {
      await LocalResource.delete.tugasByOnline(id);
      return OnlineResource.delete.tugas(id);
    }
    const deletedTugas = await LocalResource.get.tugas(id);

    if (('_id' in deletedTugas)) {
      const deletedList = await LocalResource.get.deletedList();
      await deletedList.tugas.push(deletedTugas._id);
      await LocalResource.put.deletedList(deletedList);
    }
    // eslint-disable-next-line max-len
    return await LocalResource.delete.tugasByOnline(id) || await LocalResource.delete.tugasByLocal(id);
  },

  async syncronTugas() {
    try {
      if (await OnlineResource.isLogin() && navigator.onLine) {
        const onlineList = await OnlineResource.get.tugasList();
        await onlineList.forEach(async (online) => {
          const local = await LocalResource.get.tugas(online._id);

          if (local) {
            if (online.__v > local.__v) {
              await LocalResource.put.tugas(online);
            }

            if (online.__v < local.__v) await OnlineResource.put.tugas(local);
          }
        });

        const localList = await LocalResource.get.tugasList();
        await localList.forEach(async (local) => {
          if (!('_id' in local)) {
            const result = await OnlineResource.put.tugas(local);
            await LocalResource.delete.tugasByLocal(local.local_id);
            await LocalResource.put.tugas(result);
          }
        });

        const deletedList = await LocalResource.get.deletedList();
        await deletedList.tugas.forEach(async (deletedId) => {
          const online = await OnlineResource.get.tugas(deletedId);
          if (online) await OnlineResource.delete.tugas(deletedId);
        });

        deletedList.tugas = [];
        await LocalResource.put.deletedList(deletedList);
      }

      if ((await LocalResource.get.tugasList()).length <= 0) this._initLocal();

      return false;
    } catch (error) {
      return error;
    }
  },

  async _updateLocal() {
    const onlineList = await OnlineResource.get.tugasList();
    const allOnlineId = [];
    onlineList.forEach(async (tugas) => {
      await LocalResource.put.Tugas(tugas);
      if (!allOnlineId.includes(tugas._id)) allOnlineId.push(tugas._id);
    });

    const localList = await LocalResource.get.tugasList();
    localList.forEach(async (tugas) => {
      if (!allOnlineId.includes(tugas._id)) LocalResource.delete.tugas(tugas.local_id);
    });
  },

  async _updateOnline() {
    const list = await LocalResource.get.tugasList();
    list.forEach(async (tugas) => {
      await OnlineResource.put.Tugas(tugas);
    });

    await this._updateLocal();
  },

  async _initLocal() {
    if (await OnlineResource.isLogin()) {
      const tugasList = await OnlineResource.get.tugasList();
      return tugasList.forEach(async (tugas) => {
        await LocalResource.put.tugas(tugas);
      });
    }

    return false;
  },
};

export default Tugas;
