const mongoose = require('mongoose');
const ModelHelper = require('./model-helper');
const ResponseHelper = require('./response-helper');

const ApiHelper = {
  user: {
    get() {
      const exec = async (request, response) => {
        ResponseHelper.sendAPIRespond({ respond: request.user, response });
      };

      return { exec };
    },
    getAll(User) {
      const exec = async (request, response) => {
        const userId = request.user._id;

        const tugasList = await User.findById(userId, 'tugas')
          .populate('tugas')
          .exec();
        const jadwalList = await User.findById(userId, 'jadwal')
          .populate('jadwal')
          .exec();
        const nilaiList = await User.findById(userId, 'nilai')
          .populate('nilai')
          .exec();
        const resolusiList = await User.findById(userId, 'resolusi')
          .populate('resolusi')
          .exec();

        const respond = request.user;
        respond.tugas = tugasList.tugas;
        respond.jadwal = jadwalList.jadwal;
        respond.nilai = nilaiList.nilai;
        respond.resolusi = resolusiList.resolusi;

        return ResponseHelper.sendAPIRespond({ respond, response });
      };

      return { exec };
    },
    put(User) {
      const exec = async (request, response) => {
        const userId = request.user._id;

        try {
          await User.updateOne({ _id: userId }, { $set: request.body });
          const document = await User.findById(userId).exec();
          return ResponseHelper.sendAPIRespond({ respond: document, response });
        } catch (error) {
          console.log(error);
          return ResponseHelper.sendError(error.message, response);
        }
      };

      return { exec };
    },
  },
  arrayField: {
    get(Model) {
      const exec = async (request, response) => ModelHelper.sendDocumenstByUserId(
        { id: request.user._id },
        { Model, response },
      );
      return { exec };
    },

    post(model, { Model, User }) {
      const exec = async (request, response) => {
        const userId = request.user._id;
        request.body.user_id = userId;

        const newModel = new Model(request.body);

        try {
          const respond = await newModel.save();

          const user = await User.findById(userId).exec();
          if (!user[model].includes(newModel._id)) await user[model].push(newModel._id);
          await user.save();

          return ResponseHelper.sendAPIRespond({ respond, response });
        } catch ({ message }) {
          return ResponseHelper.sendError(message, response);
        }
      };

      return { exec };
    },

    put(model, { Model, User }) {
      const exec = async (request, response) => {
        try {
          const userId = request.user._id;
          const modelId = request.headers.id || mongoose.Types.ObjectId();
          request.body.user_id = userId;

          const document = await ModelHelper.findOrCreateWithCallback({
            filter: { _id: modelId },
            data: request.body,
          }, {
            Model,
            callback: async (error, result) => {
              if (error) return new Error(error);

              const user = await User.findById(userId).exec();
              if (!user[model].includes(result._id)) await user[model].push(result._id);
              await user.save();

              return result; // To keep the value of document variabel
            },
          });
          await document.updateOne(request.body);

          const result = await Model.findById(document._id).exec();
          return await ResponseHelper.sendAPIRespond({ respond: result, response });
        } catch ({ message }) {
          return ResponseHelper.sendError(message, response);
        }
      };

      return { exec };
    },

    patch(Model) {
      const exec = async (request, response) => {
        const modelId = request.headers.id;

        try {
          await Model.updateOne({ _id: modelId }, request.body);

          const tugas = await Model.findById(modelId).exec();
          return ResponseHelper.sendAPIRespond({ respond: tugas, response });
        } catch ({ message }) {
          return ResponseHelper.sendError(message, response);
        }
      };

      return { exec };
    },

    delete(model, { Model, User }) {
      const exec = async (request, response) => {
        const userId = request.user._id;
        const modelId = request.headers.id;

        try {
          await Model.findByIdAndDelete(modelId).exec();

          const user = await User.findById(userId).exec();
          if (await user[model].includes(modelId)) await user[model].pull(modelId);
          await user.save();

          return ResponseHelper.sendAPIRespond({ respond: `${model} berhasil dihapus`, response });
        } catch ({ message }) {
          return ResponseHelper.sendError(message, response);
        }
      };

      return { exec };
    },
  },
  jadwal: {
    get(Jadwal, User) {
      const exec = async (request, response) => {
        const userId = request.user._id;
        const [senin, selasa, rabu, kamis, jumat, sabtu] = [];

        try {
          const document = await ModelHelper.findOrCreate(
            {
              filter: { user_id: userId },
              data: {
                user_id: userId,
                senin,
                selasa,
                rabu,
                kamis,
                jumat,
                sabtu,
              },
            }, { Model: Jadwal },
          );

          const user = await User.findById(userId).exec();
          if (await user.jadwal !== document._id) user.jadwal = await document._id;
          await user.save();

          return ResponseHelper.sendAPIRespond({ respond: document, response });
        } catch ({ message }) {
          return ResponseHelper.sendError(message, response);
        }
      };

      return { exec };
    },
    post(Jadwal) {
      const exec = async (request, response) => {
        const userId = request.user._id;
        const property = request.headers.day;

        try {
          const document = await Jadwal.findOne({ user_id: userId });
          await document[property].push(request.body);
          await document.save();

          return ResponseHelper.sendAPIRespond({ respond: document, response });
        } catch ({ message }) {
          return ResponseHelper.sendError(message, response);
        }
      };

      return { exec };
    },
    put(Jadwal) {
      const exec = async (request, response) => {
        try {
          const userId = request.user._id;
          const property = request.headers.day;
          const itemId = request.headers.id || mongoose.Types.ObjectId();

          const document = await Jadwal.findOne({ user_id: userId });
          const item = await document[property].id(itemId);

          // Find
          if (await item) {
            item.nama = await request.body.nama || item.nama;
            item.jam = await request.body.jam || item.jam;
            await document.save();
            return ResponseHelper.sendAPIRespond({ respond: document, response });
          }

          // Create
          await document[property].push(request.body);
          await document.save();

          return ResponseHelper.sendAPIRespond({ respond: document, response });
        } catch ({ message }) {
          return ResponseHelper.sendError(message, response);
        }
      };

      return { exec };
    },
    patch(Jadwal) {
      const exec = async (request, response) => {
        const userId = request.user._id;
        const property = request.headers.day;
        const itemId = request.headers.id;

        try {
          const document = await Jadwal.findOne({ user_id: userId });
          const item = await document[property].id(itemId);
          item.nama = await request.body.nama || item.nama;
          item.jam = await request.body.jam || item.jam;
          await document.save();

          return ResponseHelper.sendAPIRespond({ respond: document, response });
        } catch ({ message }) {
          return ResponseHelper.sendError(message, response);
        }
      };

      return { exec };
    },
    delete(Jadwal) {
      const exec = async (request, response) => {
        const userId = request.user._id;
        const property = request.headers.day;
        const itemId = request.headers.id;

        try {
          const document = await Jadwal.findOne({ user_id: userId });

          if (await document[property].id(itemId)) {
            await Jadwal.findOneAndUpdate(
              { user_id: userId },
              {
                $pull: {
                  [property]: { _id: itemId },
                },
              },
              { safe: true, upsert: true },
            );
          }

          return ResponseHelper.sendAPIRespond({ respond: 'jadwal berhasil dihapus', response });
        } catch ({ message }) {
          return ResponseHelper.sendError(message, response);
        }
      };

      return { exec };
    },
  },
  nilai: {
    get(Nilai, User) {
      const exec = async (request, response) => {
        const userId = request.user._id;

        try {
          const document = await ModelHelper.findOrCreate(
            {
              filter: { user_id: userId },
              data: {
                user_id: userId,
                list: [],
              },
            }, { Model: Nilai },
          );

          const user = await User.findById(userId).exec();
          if (await user.nilai !== document._id) user.nilai = await document._id;
          await user.save();

          return ResponseHelper.sendAPIRespond({ respond: document, response });
        } catch ({ message }) {
          return ResponseHelper.sendError(message, response);
        }
      };

      return { exec };
    },
    post(Nilai) {
      const exec = async (request, response) => {
        const userId = request.user._id;

        try {
          const document = await Nilai.findOne({ user_id: userId });
          await document.list.push(request.body);
          await document.save();

          return ResponseHelper.sendAPIRespond({ respond: document, response });
        } catch ({ message }) {
          return ResponseHelper.sendError(message, response);
        }
      };

      return { exec };
    },
    put(Nilai) {
      const exec = async (request, response) => {
        try {
          const userId = request.user._id;
          const itemId = request.headers.id || mongoose.Types.ObjectId();

          const document = await Nilai.findOne({ user_id: userId });
          const item = await document.list.id(itemId);

          // find and update
          if (await item) {
            item.nama = await request.body.nama || item.nama;
            item.nilai = await request.body.nilai || item.nilai;
            item.semester = await request.body.semester || item.semester;
            await document.save();

            return ResponseHelper.sendAPIRespond({ respond: document, response });
          }

          // create
          await document.list.push(request.body);
          await document.save();

          return ResponseHelper.sendAPIRespond({ respond: document, response });
        } catch ({ message }) {
          return ResponseHelper.sendError(message, response);
        }
      };

      return { exec };
    },
    patch(Nilai) {
      const exec = async (request, response) => {
        const userId = request.user._id;
        const itemId = request.headers.id;

        try {
          const document = await Nilai.findOne({ user_id: userId });
          const item = await document.list.id(itemId);
          item.nama = await request.body.nama || item.nama;
          item.nilai = await request.body.nilai || item.nilai;
          item.semester = await request.body.semester || item.semester;
          await document.save();

          return ResponseHelper.sendAPIRespond({ respond: document, response });
        } catch ({ message }) {
          return ResponseHelper.sendError(message, response);
        }
      };

      return { exec };
    },
    delete(Nilai) {
      const exec = async (request, response) => {
        const userId = request.user._id;
        const itemId = request.headers.id;

        try {
          const document = await Nilai.findOne({ user_id: userId });

          if (await document.list.id(itemId)) {
            await Nilai.findOneAndUpdate(
              { user_id: userId },
              {
                $pull: {
                  list: { _id: itemId },
                },
              },
              { safe: true, upsert: true },
            );
          }

          return ResponseHelper.sendAPIRespond({ respond: 'nilai berhasil dihapus', response });
        } catch ({ message }) {
          return ResponseHelper.sendError(message, response);
        }
      };

      return { exec };
    },
    semester(Nilai) {
      const exec = async (request, response) => {
        const userId = request.user._id;

        try {
          const document = await Nilai.findOne(
            { user_id: userId },
            {
              list: {
                $elemMatch: {
                  semester: { $eq: request.params.semester },
                },
              },
            },
          );

          return ResponseHelper.sendAPIRespond({ respond: document.list, response });
        } catch ({ message }) {
          return ResponseHelper.sendError(message, response);
        }
      };

      return { exec };
    },
  },
  pengaturan: {
    get() {
      const exec = async (request, response) => {
        ResponseHelper.sendAPIRespond({ respond: request.user.pengaturan, response });
      };

      return { exec };
    },
    putOrPatch(User) {
      const exec = async (request, response) => {
        const userId = request.user._id;
        const {
          target_nilai: nilai = undefined,
          target_semester: semester = undefined,
        } = request.body;

        try {
          const user = await User.findById(userId);
          user.pengaturan = {
            target_nilai: await nilai || user.pengaturan.target_nilai,
            target_semester: await semester || user.pengaturan.target_semester,
          };
          await user.save();

          return ResponseHelper.sendAPIRespond({ respond: user.pengaturan, response });
        } catch ({ message }) {
          return ResponseHelper.sendError(message, response);
        }
      };

      return { exec };
    },
  },
};

module.exports = ApiHelper;
