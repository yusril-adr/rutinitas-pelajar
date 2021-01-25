import API_ENDPOINT from '../global/api-endpoint';

const OnlineResource = {
  async isLogin() {
    try {
      const request = await fetch(API_ENDPOINT.USER);
      const response = await request.json();

      return response.status === 'success';
    } catch (error) {
      return error;
    }
  },

  get: {
    async detail() {
      try {
        const request = await fetch(API_ENDPOINT.ALL);
        const response = await request.json();
        if (response.status === 'error') return new Error(response.message);

        return response.result;
      } catch (error) {
        return error;
      }
    },

    async user() {
      try {
        const request = await fetch(API_ENDPOINT.USER);
        const response = await request.json();
        if (response.status === 'error') return new Error(response.message);

        const {
          display_name,
          username,
          pengaturan,
          __v,
        } = response.result;

        const convertedUser = {
          _id: 0,
          display_name,
          username,
          login: true,
          pengaturan,
          __v,
        };
        return convertedUser;
      } catch (error) {
        return error;
      }
    },

    async name() {
      try {
        const request = await fetch(API_ENDPOINT.USER);
        const response = await request.json();
        if (response.status === 'error') return new Error(response.message);

        return response.result.display_name;
      } catch (error) {
        return error;
      }
    },

    async email() {
      try {
        const request = await fetch(API_ENDPOINT.USER);
        const response = await request.json();
        if (response.status === 'error') return new Error(response.message);

        return response.result.username;
      } catch (error) {
        return error;
      }
    },

    async pengaturan() {
      try {
        const request = await fetch(API_ENDPOINT.USER);
        const response = await request.json();
        if (response.status === 'error') return new Error(response.message);

        return response.result.pengaturan;
      } catch (error) {
        return error;
      }
    },

    async tugasList() {
      try {
        const request = await fetch(API_ENDPOINT.TUGAS);
        const response = await request.json();
        if (response.status === 'error') return new Error(response.message);

        return response.result;
      } catch (error) {
        return error;
      }
    },

    async tugasSelesai() {
      try {
        const request = await fetch(API_ENDPOINT.TUGAS);
        const response = await request.json();
        if (response.status === 'error') return new Error(response.message);

        const list = response.result;
        return list.filter((tugas) => tugas.selesai === true);
      } catch (error) {
        return error;
      }
    },

    async tugasBelumSelesai() {
      try {
        const request = await fetch(API_ENDPOINT.TUGAS);
        const response = await request.json();
        if (response.status === 'error') return new Error(response.message);

        const list = response.result;
        return list.filter((tugas) => tugas.selesai === false);
      } catch (error) {
        return error;
      }
    },

    async tugas(id) {
      try {
        const request = await fetch(API_ENDPOINT.TUGAS);
        const response = await request.json();
        if (response.status === 'error') return new Error(response.message);

        const list = response.result;
        const filteredList = await list.filter((tugas) => tugas._id === id);
        return filteredList[0];
      } catch (error) {
        return error;
      }
    },

    async jadwal(hari = undefined) {
      try {
        const request = await fetch(API_ENDPOINT.JADWAL);
        const response = await request.json();
        if (response.status === 'error') return new Error(response.message);

        return response.result[hari] || response.result;
      } catch (error) {
        return error;
      }
    },

    async nilaiList() {
      try {
        const request = await fetch(API_ENDPOINT.NILAI);
        const response = await request.json();
        if (response.status === 'error') return new Error(response.message);

        return response.result.list;
      } catch (error) {
        return error;
      }
    },

    async nilai(semester) {
      try {
        const request = await fetch(API_ENDPOINT.NILAI);
        const response = await request.json();
        if (response.status === 'error') return new Error(response.message);

        return response.result.list.filter((list) => list.semester === semester);
      } catch (error) {
        return error;
      }
    },

    async resolusiList() {
      try {
        const request = await fetch(API_ENDPOINT.RESOLUSI);
        const response = await request.json();
        if (response.status === 'error') return new Error(response.message);

        return response.result;
      } catch (error) {
        return error;
      }
    },

    async resolusiTercapai() {
      try {
        const request = await fetch(API_ENDPOINT.RESOLUSI);
        const response = await request.json();
        if (response.status === 'error') return new Error(response.message);

        const list = response.result;
        return list.filter((resolusi) => resolusi.tercapai === true);
      } catch (error) {
        return error;
      }
    },

    async resolusiBelumTercapai() {
      try {
        const request = await fetch(API_ENDPOINT.RESOLUSI);
        const response = await request.json();
        if (response.status === 'error') return new Error(response.message);

        const list = response.result;
        return list.filter((resolusi) => resolusi.tercapai === false);
      } catch (error) {
        return error;
      }
    },

    async resolusi(id) {
      try {
        const request = await fetch(API_ENDPOINT.RESOLUSI);
        const response = await request.json();
        if (response.status === 'error') return new Error(response.message);

        const list = response.result;
        const filteredList = await list.filter((resolusi) => resolusi._id === id);
        return filteredList[0];
      } catch (error) {
        return error;
      }
    },
  },

  put: {
    async detail(detail) {
      try {
        const {
          pengaturan, tugas, jadwal, nilai, resolusi,
        } = detail;

        await this.pengaturan(pengaturan);
        await this.tugas(tugas);
        await this.jadwal(jadwal);
        await this.nilai(nilai);
        await this.resolusi(resolusi);

        return true;
      } catch (error) {
        return error;
      }
    },

    async user(user) {
      try {
        const {
          pengaturan,
          __v,
        } = user;

        const convetedUser = {
          pengaturan,
          __v,
        };

        const request = await fetch(API_ENDPOINT.USER, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(convetedUser),
        });

        const response = await request.json();
        if (response.status === 'error') return new Error(response.message);

        return response.result;
      } catch (error) {
        return error;
      }
    },

    async pengaturan(newPengaturan) {
      try {
        const request = await fetch(API_ENDPOINT.PENGATURAN, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newPengaturan),
        });

        const response = await request.json();
        if (response.status === 'error') return new Error(response.message);

        return response.result;
      } catch (error) {
        return error;
      }
    },

    async tugas(newTugas) {
      try {
        if (!('local_id' in newTugas)) delete newTugas.local_id;

        const requestOptions = {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newTugas),
        };

        if (('_id' in newTugas)) requestOptions.headers.id = newTugas._id;

        const request = await fetch(API_ENDPOINT.TUGAS, requestOptions);

        const response = await request.json();
        if (response.status === 'error') return new Error(response.message);

        return response.result;
      } catch (error) {
        return error;
      }
    },

    async jadwal(newJadwalItem, day) {
      try {
        const request = await fetch(API_ENDPOINT.JADWAL, {
          method: 'PUT',
          headers: {
            day,
            id: newJadwalItem._id,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newJadwalItem),
        });

        const response = await request.json();
        if (response.status === 'error') return new Error(response.message);

        return response.result;
      } catch (error) {
        return error;
      }
    },

    async nilai(newNilai) {
      try {
        const request = await fetch(API_ENDPOINT.NILAI, {
          method: 'PUT',
          headers: {
            id: newNilai._id,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newNilai),
        });

        const response = await request.json();
        if (response.status === 'error') return new Error(response.message);

        return response.result;
      } catch (error) {
        return error;
      }
    },

    async resolusi(newResokusi) {
      try {
        if (!('local_id' in newResokusi)) delete newResokusi.local_id;

        const requestOptions = {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newResokusi),
        };

        if (('_id' in newResokusi)) requestOptions.headers.id = newResokusi._id;

        const request = await fetch(API_ENDPOINT.RESOLUSI, requestOptions);

        const response = await request.json();
        if (response.status === 'error') return new Error(response.message);

        return response.result;
      } catch (error) {
        return error;
      }
    },
  },

  delete: {
    async tugas(id) {
      try {
        const request = await fetch(API_ENDPOINT.TUGAS, {
          method: 'DELETE',
          headers: {
            id,
            'Content-Type': 'application/json',
          },
        });

        const response = await request.json();
        if (response.status === 'error') return new Error(response.message);

        return response.result;
      } catch (error) {
        return error;
      }
    },

    async resolusi(id) {
      try {
        const request = await fetch(API_ENDPOINT.RESOLUSI, {
          method: 'DELETE',
          headers: {
            id,
            'Content-Type': 'application/json',
          },
        });

        const response = await request.json();
        if (response.status === 'error') return new Error(response.message);

        return response.result;
      } catch (error) {
        return error;
      }
    },
  },
};

export default OnlineResource;
