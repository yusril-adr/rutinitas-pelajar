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
  .get(ApiHelper.arrayField.get(Jadwal).exec)
  .post(ApiHelper.arrayField.post('jadwal', { Model: Jadwal, User }).exec)
  .put(ApiHelper.arrayField.put('jadwal', { Model: Jadwal, User }).exec)
  .patch(ApiHelper.arrayField.patch(Jadwal).exec)
  .delete(ApiHelper.arrayField.delete('jadwal', { Model: Jadwal, User }).exec);

router.route('/nilai')
  .get(ApiHelper.arrayField.get(Nilai).exec)
  .post(ApiHelper.arrayField.post('nilai', { Model: Nilai, User }).exec)
  .put(ApiHelper.arrayField.put('nilai', { Model: Nilai, User }).exec)
  .patch(ApiHelper.arrayField.patch(Nilai).exec)
  .delete(ApiHelper.arrayField.delete('nilai', { Model: Nilai, User }).exec);

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
