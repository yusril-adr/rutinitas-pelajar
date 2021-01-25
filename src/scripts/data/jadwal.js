import OnlineResource from './online-resource';
import LocalResource from './local-resource-idb';

const Jadwal = {
  async getDayList(day) {
    if (navigator.onLine && await OnlineResource.isLogin()) {
      return (await OnlineResource.get.jadwalDayList(day)).sort((a, b) => {
        if (a.jam < b.jam) {
          return -1;
        }
        if (a.jam > b.jam) {
          return 1;
        }

        return 0;
      });
    }

    return (await LocalResource.get.jadwalDayList(day)).sort((a, b) => {
      if (a.jam < b.jam) {
        return -1;
      }
      if (a.jam > b.jam) {
        return 1;
      }

      return 0;
    });
  },

  async getPelajaran(id) {
    if (navigator.onLine && await OnlineResource.isLogin()) {
      return OnlineResource.get.jadwal(id);
    }
    return LocalResource.get.jadwal(id);
  },

  async putPelajaran(pelajaran) {
    pelajaran.__v += 1;

    if (('_id' in pelajaran)) {
      const local = await LocalResource.get.jadwal(pelajaran._id);
      if (local) pelajaran.local_id = local.local_id;
    }

    if (navigator.onLine && await OnlineResource.isLogin()) {
      const online = await OnlineResource.put.jadwal(pelajaran);
      if (online) await LocalResource.put.jadwal(online);
      return online;
    }
    return LocalResource.put.jadwal(pelajaran);
  },

  async deletePelajaran(id) {
    if (navigator.onLine && await OnlineResource.isLogin()) {
      await LocalResource.delete.jadwalByOnline(id);
      return OnlineResource.delete.jadwal(id);
    }
    const deletedPelajaran = await LocalResource.get.jadwal(id);

    if (('_id' in deletedPelajaran)) {
      const deletedList = await LocalResource.get.deletedList();
      await deletedList.jadwal.push(deletedPelajaran._id);
      await LocalResource.put.deletedList(deletedList);
    }
    // eslint-disable-next-line max-len
    return await LocalResource.delete.jadwalByOnline(id) || await LocalResource.delete.jadwalByLocal(id);
  },

  async syncronJadwal() {
    try {
      if (await OnlineResource.isLogin() && navigator.onLine) {
        const onlineList = await OnlineResource.get.jadwalList();
        await onlineList.forEach(async (online) => {
          const local = await LocalResource.get.jadwal(online._id);

          if (local) {
            if (online.__v > local.__v) {
              await LocalResource.put.jadwal(online);
            }

            if (online.__v < local.__v) await OnlineResource.put.jadwal(local);
          }
        });

        const localList = await LocalResource.get.jadwalList();
        await localList.forEach(async (local) => {
          if (!('_id' in local)) {
            const localId = local.local_id;
            const result = await OnlineResource.put.jadwal(local);
            await LocalResource.delete.jadwalByLocal(localId);
            await LocalResource.put.jadwal(result);
          }
        });

        const deletedList = await LocalResource.get.deletedList();
        await deletedList.jadwal.forEach(async (deletedId) => {
          const online = await OnlineResource.get.jadwal(deletedId);
          if (online) await OnlineResource.delete.jadwal(deletedId);
        });

        deletedList.jadwal = [];
        await LocalResource.put.deletedList(deletedList);
      }

      if ((await LocalResource.get.jadwalList()).length <= 0) this._initLocal();

      return false;
    } catch (error) {
      return error;
    }
  },

  async _initLocal() {
    if (await OnlineResource.isLogin()) {
      const jadwalList = await OnlineResource.get.jadwalList();
      return jadwalList.forEach(async (jadwal) => {
        await LocalResource.put.jadwal(jadwal);
      });
    }

    return false;
  },
};

export default Jadwal;
