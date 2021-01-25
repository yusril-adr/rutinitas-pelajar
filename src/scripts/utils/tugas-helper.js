import CONFIG from '../global/config';

const { MONTH, DAY } = CONFIG.DATE;

const TugasHelper = {
  async getDeadlines(list) {
    const deadlines = [];

    list.forEach(({ deadline }) => {
      if (!deadlines.includes(deadline)) deadlines.push(deadline);
    });

    return deadlines.sort();
  },

  async dateConverter(date) {
    const now = new Date(date);
    const month = MONTH[now.getMonth()];
    const day = DAY[now.getDay()];
    return `${day}, ${now.getDate()} ${month} ${now.getFullYear()}`;
  },
};

export default TugasHelper;
