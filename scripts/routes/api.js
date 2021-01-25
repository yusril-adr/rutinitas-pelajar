const express = require('express');
const ApiHelper = require('../util/api-helper');
const ResponseHelper = require('../util/response-helper');
const {
  User, Tugas, Jadwal, Nilai, Resolusi,
} = require('../data/model');

const router = express.Router();

router.use(ResponseHelper.checkUser);

router.get('/', ResponseHelper.wrongEndpoint);

router.route('/user')
  .get(ApiHelper.user.get().exec)
  .put(ApiHelper.user.put(User).exec);
router.get('/user/complete', ApiHelper.user.getAll(User).exec);

router.route('/tugas')
  .get(ApiHelper.arrayField.get(Tugas).exec)
  .post(ApiHelper.arrayField.post('tugas', { Model: Tugas, User }).exec)
  .put(ApiHelper.arrayField.put('tugas', { Model: Tugas, User }).exec)
  .patch(ApiHelper.arrayField.patch(Tugas).exec)
  .delete(ApiHelper.arrayField.delete('tugas', { Model: Tugas, User }).exec);

router.route('/jadwal')
  .get(ApiHelper.jadwal.get(Jadwal, User).exec)
  .post(ApiHelper.jadwal.post(Jadwal).exec)
  .put(ApiHelper.jadwal.put(Jadwal).exec)
  .patch(ApiHelper.jadwal.patch(Jadwal).exec)
  .delete(ApiHelper.jadwal.delete(Jadwal).exec);

router.route('/nilai')
  .get(ApiHelper.nilai.get(Nilai, User).exec)
  .post(ApiHelper.nilai.post(Nilai).exec)
  .put(ApiHelper.nilai.put(Nilai).exec)
  .patch(ApiHelper.nilai.patch(Nilai).exec)
  .delete(ApiHelper.nilai.delete(Nilai).exec);

router.get('/nilai/:semester', (ApiHelper.nilai.semester(Nilai).exec));

router.route('/pengaturan')
  .get(ApiHelper.pengaturan.get().exec)
  .put(ApiHelper.pengaturan.putOrPatch(User).exec)
  .patch(ApiHelper.pengaturan.putOrPatch(User).exec);

router.route('/resolusi')
  .get(ApiHelper.arrayField.get(Resolusi).exec)
  .post(ApiHelper.arrayField.post('resolusi', { Model: Resolusi, User }).exec)
  .put(ApiHelper.arrayField.put('resolusi', { Model: Resolusi, User }).exec)
  .patch(ApiHelper.arrayField.patch(Resolusi).exec)
  .delete(ApiHelper.arrayField.delete('resolusi', { Model: Resolusi, User }).exec);

module.exports = router;
