const { DAYS_FORMAT } = require('../global/config');

const DaysHelper = {
  isItDay(text) {
    return DAYS_FORMAT.includes(text);
  },
};

module.exports = DaysHelper;
