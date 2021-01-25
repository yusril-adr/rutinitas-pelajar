const { sendAPIRespond, sendError } = require('./response-helper');

const ModelHelper = {
  async findOrCreate({ filter, data = undefined }, { Model }) {
    try {
      const model = await Model.findOne(filter).exec();
      if (model) return model;
    } catch (error) {
      return error;
    }

    try {
      const newModel = new Model(data || filter);
      await newModel.save();
      return newModel;
    } catch (error) {
      return error;
    }
  },

  async findOrCreateWithCallback({ filter, data = undefined }, { Model, callback }) {
    try {
      const model = await Model.findOne(filter).exec();
      if (model) return callback(undefined, model);
    } catch (error) {
      return callback(error, undefined);
    }

    try {
      const newModel = new Model(data || filter);
      await newModel.save();
      return callback(undefined, newModel);
    } catch (error) {
      return callback(error, undefined);
    }
  },

  async sendDocuments(filter = {}, { Model, response }) {
    try {
      const documents = await Model.find({ filter });
      return sendAPIRespond({ respond: documents, response });
    } catch ({ message }) {
      return sendError(message, response);
    }
  },

  async sendDocumenstByUserId({ id }, { Model, response }) {
    try {
      const documents = await Model.find({ user_id: id });
      return sendAPIRespond({ respond: documents, response });
    } catch ({ message }) {
      return sendError(message, response);
    }
  },
};

module.exports = ModelHelper;
