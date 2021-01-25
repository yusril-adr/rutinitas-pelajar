const { Schema } = require('mongoose');

const pelajaranSchema = {
  nama: String,
  jam: String,
};

const jadwalSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  senin: [pelajaranSchema],
  selasa: [pelajaranSchema],
  rabu: [pelajaranSchema],
  kamis: [pelajaranSchema],
  jumat: [pelajaranSchema],
  sabtu: [pelajaranSchema],
});

module.exports = jadwalSchema;
