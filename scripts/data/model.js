const { model } = require('mongoose');
const userSchema = require('./schema/user-schema');
const tugasSchema = require('./schema/tugas-schema');
const jadwalSchema = require('./schema/jadwal-schema');
const nilaiSchema = require('./schema/nilai-schema');
const resolusiSchema = require('./schema/resolusi-schema');

const User = model('user', userSchema);
const Tugas = model('tugas', tugasSchema);
const Jadwal = model('jadwal', jadwalSchema);
const Nilai = model('nilai', nilaiSchema);
const Resolusi = model('resolusi', resolusiSchema);

module.exports = {
  User,
  Tugas,
  Jadwal,
  Nilai,
  Resolusi,
};
