import OnlineResource from './online-resource';
import LocalResource from './local-resource-idb';

const Nilai = {
  async getNilaiSemester(semester) {
    if (navigator.onLine && await OnlineResource.isLogin()) {
      // eslint-disable-next-line arrow-body-style
      return OnlineResource.get.nilaiSemesterList(semester);
    }

    // eslint-disable-next-line arrow-body-style
    return LocalResource.get.nilaiSemesterList(semester);
  },

  async getNilai(id) {
    if (navigator.onLine && await OnlineResource.isLogin()) {
      return OnlineResource.get.nilai(id);
    }
    return LocalResource.get.nilai(id);
  },

  async putNilai(nilai) {
    nilai.__v += 1;

    if (('_id' in nilai)) {
      const local = await LocalResource.get.nilai(nilai._id);
      if (local) nilai.local_id = local.local_id;
    }

    if (navigator.onLine && await OnlineResource.isLogin()) {
      const online = await OnlineResource.put.nilai(nilai);
      if (online) await LocalResource.put.nilai(online);
      return online;
    }
    return LocalResource.put.nilai(nilai);
  },

  async deleteNilai(id) {
    if (navigator.onLine && await OnlineResource.isLogin()) {
      await LocalResource.delete.nilaiByOnline(id);
      return OnlineResource.delete.nilai(id);
    }
    const deletedNilai = await LocalResource.get.nilai(id);

    if (('_id' in deletedNilai)) {
      const deletedList = await LocalResource.get.deletedList();
      await deletedList.nilai.push(deletedNilai._id);
      await LocalResource.put.deletedList(deletedList);
    }
    // eslint-disable-next-line max-len
    return await LocalResource.delete.nilaiByOnline(id) || await LocalResource.delete.nilaiByLocal(id);
  },

  async syncronNilai() {
    try {
      if (await OnlineResource.isLogin() && navigator.onLine) {
        const onlineList = await OnlineResource.get.nilaiList();
        await onlineList.forEach(async (online) => {
          const local = await LocalResource.get.nilai(online._id);

          if (local) {
            if (online.__v > local.__v) {
              await LocalResource.put.nilai(online);
            }

            if (online.__v < local.__v) await OnlineResource.put.nilai(local);
          }
        });

        const localList = await LocalResource.get.nilaiList();
        await localList.forEach(async (local) => {
          if (!('_id' in local)) {
            const localId = local.local_id;
            const result = await OnlineResource.put.nilai(local);
            await LocalResource.delete.nilaiByLocal(localId);
            await LocalResource.put.nilai(result);
          }
        });

        const deletedList = await LocalResource.get.deletedList();
        await deletedList.nilai.forEach(async (deletedId) => {
          const online = await OnlineResource.get.nilai(deletedId);
          if (online) await OnlineResource.delete.nilai(deletedId);
        });

        deletedList.nilai = [];
        await LocalResource.put.deletedList(deletedList);
      }

      if ((await LocalResource.get.nilaiList()).length <= 0) this._initLocal();

      return false;
    } catch (error) {
      return error;
    }
  },

  async _initLocal() {
    if (await OnlineResource.isLogin()) {
      const nilaiList = await OnlineResource.get.nilaiList();
      return nilaiList.forEach(async (nilai) => {
        await LocalResource.put.nilai(nilai);
      });
    }

    return false;
  },
};

export default Nilai;
