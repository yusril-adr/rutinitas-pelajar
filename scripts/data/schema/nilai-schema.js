const { Schema } = require('mongoose');

const nilaiSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  nama: String,
  nilai: Number,
  semester: Number,
});

module.exports = nilaiSchema;
