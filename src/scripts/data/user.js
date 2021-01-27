import OnlineResource from './online-resource';
import LocalResource from './local-resource-idb';

const User = {
  async isExist() {
    if (await OnlineResource.isLogin()) return true;
    if (await LocalResource.isUserExist()) return true;
    return false;
  },

  async isLogin() {
    if (await OnlineResource.isLogin()) return true;
    if (await LocalResource.isLogin()) return true;
    return false;
  },

  async getUser() {
    if (navigator.onLine && await OnlineResource.isLogin()) return OnlineResource.get.user();
    return LocalResource.get.user();
  },

  async getPengaturan() {
    if (navigator.onLine && await OnlineResource.isLogin()) return OnlineResource.get.pengaturan();
    return LocalResource.get.pengaturan();
  },

  async daftar(user) {
    return OnlineResource.daftar(user);
  },

  async logIn(user) {
    return OnlineResource.login(user);
  },

  async logOut() {
    await this._initLocalUser();
    location.href = '/keluar';
  },

  async syncronUser() {
    try {
      if (await OnlineResource.isLogin() && navigator.onLine && await LocalResource.isUserExist()) {
        const onlineVersion = (await OnlineResource.get.user()).__v;
        const localVersion = (await LocalResource.get.user()).__v;

        if (onlineVersion >= localVersion) {
          return this._updateLocal();
        }

        if (onlineVersion < localVersion && await this._checkUsername()) {
          return this._updateOnline();
        }

        if (onlineVersion === 0) {
          const online = await this._updateOnline();
          return await LocalResource.put.user(online);
        }
      }

      if (!(await LocalResource.isUserExist())) this._initLocalUser();

      return false;
    } catch (error) {
      return error;
    }
  },

  async _checkUsername() {
    const online = await OnlineResource.get.user();
    const local = await LocalResource.get.user();
    return online.username === local.username || local.us;
  },

  async _updateLocal() {
    const user = await OnlineResource.get.user();
    return LocalResource.put.user(user);
  },

  async _updateOnline() {
    const user = await LocalResource.get.user();
    return await OnlineResource.put.user(user);
  },

  async _initLocalUser() {
    if (await OnlineResource.isLogin()) {
      const onlineUser = await OnlineResource.get.user();
      return LocalResource.initUser(onlineUser);
    }

    return LocalResource.initUser();
  },

  async updatePengaturan(pengaturan) {
    if (navigator.onLine && await OnlineResource.isLogin()) {
      const result = await OnlineResource.put.pengaturan(pengaturan);
      const user = await OnlineResource.get.user();
      user.__v += 1;
      await OnlineResource.put.user(user);
      await this._updateLocal();

      return result;
    }

    const user = await LocalResource.get.user();
    user.__v += 1;
    await LocalResource.put.user(user);

    return LocalResource.put.pengaturan(pengaturan);
  },
};

export default User;
