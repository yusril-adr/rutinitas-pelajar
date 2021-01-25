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
        } catch ({ message }) {
          return ResponseHelper.sendError(message, response);
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
