const { Schema } = require('mongoose');

const jadwalSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  nama: String,
  jam: String,
  hari: String,
});

module.exports = jadwalSchema;
