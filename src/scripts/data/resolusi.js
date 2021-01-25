import OnlineResource from './online-resource';
import LocalResource from './local-resource-idb';

const Resolusi = {
  async getTercapai() {
    if (navigator.onLine && await OnlineResource.isLogin()) {
      return OnlineResource.get.resolusiTercapai();
    }
    return LocalResource.get.resolusiTercapai();
  },

  async getBelumTercapai() {
    if (navigator.onLine && await OnlineResource.isLogin()) {
      return OnlineResource.get.resolusiBelumTercapai();
    }
    return LocalResource.get.resolusiBelumTercapai();
  },

  async getResolusi(id) {
    if (navigator.onLine && await OnlineResource.isLogin()) {
      return OnlineResource.get.resolusi(id);
    }
    return LocalResource.get.resolusi(id);
  },

  async putResolusi(resolusi) {
    resolusi.__v += 1;

    if (('_id' in resolusi)) {
      const local = await LocalResource.get.resolusi(resolusi._id);
      if (local) resolusi.local_id = local.local_id;
    }

    if (navigator.onLine && await OnlineResource.isLogin()) {
      const online = await OnlineResource.put.resolusi(resolusi);
      if (online) await LocalResource.put.resolusi(online);
      return online;
    }
    return LocalResource.put.resolusi(resolusi);
  },

  async deleteResolusi(id) {
    if (navigator.onLine && await OnlineResource.isLogin()) {
      await LocalResource.delete.resolusiByOnline(id);
      return OnlineResource.delete.resolusi(id);
    }
    const deletedResolusi = await LocalResource.get.resolusi(id);

    if (('_id' in deletedResolusi)) {
      const deletedList = await LocalResource.get.deletedList();
      await deletedList.resolusi.push(deletedResolusi._id);
      await LocalResource.put.deletedList(deletedList);
    }
    // eslint-disable-next-line max-len
    return await LocalResource.delete.resolusiByOnline(id) || await LocalResource.delete.resolusiByLocal(id);
  },

  async syncronResolusi() {
    try {
      if (await OnlineResource.isLogin() && navigator.onLine) {
        const onlineList = await OnlineResource.get.resolusiList();
        await onlineList.forEach(async (online) => {
          const local = await LocalResource.get.resolusi(online._id);

          if (local) {
            if (online.__v > local.__v) {
              await LocalResource.put.resolusi(online);
            }

            if (online.__v < local.__v) await OnlineResource.put.resolusi(local);
          }
        });

        const localList = await LocalResource.get.resolusiList();
        await localList.forEach(async (local) => {
          if (!('_id' in local)) {
            const result = await OnlineResource.put.resolusi(local);
            await LocalResource.delete.resolusiByLocal(local.local_id);
            await LocalResource.put.resolusi(result);
          }
        });

        const deletedList = await LocalResource.get.deletedList();
        await deletedList.resolusi.forEach(async (deletedId) => {
          const online = await OnlineResource.get.resolusi(deletedId);
          if (online) await OnlineResource.delete.resolusi(deletedId);
        });

        deletedList.resolusi = [];
        await LocalResource.put.deletedList(deletedList);
      }

      if ((await LocalResource.get.resolusiList()).length <= 0) this._initLocal();

      return false;
    } catch (error) {
      return error;
    }
  },

  async _initLocal() {
    if (await OnlineResource.isLogin()) {
      const resolusiList = await OnlineResource.get.resolusiList();
      return resolusiList.forEach(async (resolusi) => {
        await LocalResource.put.resolusi(resolusi);
      });
    }

    return false;
  },
};

export default Resolusi;
