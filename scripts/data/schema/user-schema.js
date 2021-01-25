const { Schema } = require('mongoose');

const userSchema = new Schema({
  username: String,
  display_name: String,
  google_id: String,
  pengaturan: {
    target_nilai: {
      type: Number,
      default: 89,
    },
    target_semester: {
      type: Number,
      default: 5,
    },
  },
  tugas: [{
    type: Schema.Types.ObjectId,
    ref: 'tugas',
  }],
  jadwal: [{
    type: Schema.Types.ObjectId,
    ref: 'jadwal',
  }],
  nilai: [{
    type: Schema.Types.ObjectId,
    ref: 'nilai',
  }],
  resolusi: [{
    type: Schema.Types.ObjectId,
    ref: 'resolusi',
  }],
});

module.exports = userSchema;
