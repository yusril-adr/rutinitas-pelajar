const { Schema } = require('mongoose');

const nilaiSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  list: [{
    nama: String,
    nilai: Number,
    semester: String,
  }],
});

module.exports = nilaiSchema;
