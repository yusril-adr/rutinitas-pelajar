const { Schema } = require('mongoose');

const tugasSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  tugas: String,
  pelajaran: String,
  deadline: Number,
  selesai: Boolean,
});

module.exports = tugasSchema;
