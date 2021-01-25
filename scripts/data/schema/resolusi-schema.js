const { Schema } = require('mongoose');

const resolusiSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  resolusi: String,
  tercapai: Boolean,
});

module.exports = resolusiSchema;
