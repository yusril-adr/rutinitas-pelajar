import API_ENDPOINT from '../global/api-endpoint';

const OnlineResource = {
  async daftar(user) {
    const request = await fetch(API_ENDPOINT.DAFTAR, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });

    const response = await request.json();
    if (response.status === 'error') throw new Error(response.message);

    return response;
  },

  async login(user) {
    const request = await fetch(API_ENDPOINT.MASUK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });

    const response = await request.json();
    if (response.status === 'error') throw new Error(response.message);

    return response;
  },

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

    async jadwalList() {
      try {
        const request = await fetch(API_ENDPOINT.JADWAL);
        const response = await request.json();
        if (response.status === 'error') return new Error(response.message);

        return response.result;
      } catch (error) {
        return error;
      }
    },

    async jadwalDayList(day) {
      try {
        const request = await fetch(API_ENDPOINT.JADWAL);
        const response = await request.json();
        if (response.status === 'error') return new Error(response.message);

        const list = response.result;
        return list.filter((jadwal) => jadwal.hari.toLowerCase() === day.toLowerCase());
      } catch (error) {
        return error;
      }
    },

    async jadwal(id) {
      try {
        const request = await fetch(API_ENDPOINT.JADWAL);
        const response = await request.json();
        if (response.status === 'error') return new Error(response.message);

        const list = response.result;
        const filteredList = await list.filter((jadwal) => jadwal._id === id);
        return filteredList[0];
      } catch (error) {
        return error;
      }
    },

    async nilaiList() {
      try {
        const request = await fetch(API_ENDPOINT.NILAI);
        const response = await request.json();
        if (response.status === 'error') return new Error(response.message);

        return response.result;
      } catch (error) {
        return error;
      }
    },

    async nilaiSemesterList(semester) {
      try {
        const request = await fetch(API_ENDPOINT.NILAI);
        const response = await request.json();
        if (response.status === 'error') return new Error(response.message);

        const list = response.result;
        return list.filter((nilai) => nilai.semester === semester);
      } catch (error) {
        return error;
      }
    },

    async nilai(id) {
      try {
        const request = await fetch(API_ENDPOINT.NILAI);
        const response = await request.json();
        if (response.status === 'error') return new Error(response.message);

        const list = response.result;
        const filteredList = await list.filter((nilai) => nilai._id === id);
        return filteredList[0];
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
        if (('local_id' in newTugas)) delete newTugas.local_id;

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

    async jadwal(newJadwal) {
      try {
        if (('local_id' in newJadwal)) delete newJadwal.local_id;

        const requestOptions = {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newJadwal),
        };

        if (('_id' in newJadwal)) requestOptions.headers.id = newJadwal._id;

        const request = await fetch(API_ENDPOINT.JADWAL, requestOptions);

        const response = await request.json();
        if (response.status === 'error') return new Error(response.message);

        return response.result;
      } catch (error) {
        return error;
      }
    },

    async nilai(newNilai) {
      try {
        if (('local_id' in newNilai)) delete newNilai.local_id;

        const requestOptions = {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newNilai),
        };

        if (('_id' in newNilai)) requestOptions.headers.id = newNilai._id;

        const request = await fetch(API_ENDPOINT.NILAI, requestOptions);

        const response = await request.json();
        if (response.status === 'error') return new Error(response.message);

        return response.result;
      } catch (error) {
        return error;
      }
    },

    async resolusi(newResolusi) {
      try {
        if (('local_id' in newResolusi)) delete newResolusi.local_id;

        const requestOptions = {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newResolusi),
        };

        if (('_id' in newResolusi)) requestOptions.headers.id = newResolusi._id;

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

    async jadwal(id) {
      try {
        const request = await fetch(API_ENDPOINT.JADWAL, {
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

    async nilai(id) {
      try {
        const request = await fetch(API_ENDPOINT.NILAI, {
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
