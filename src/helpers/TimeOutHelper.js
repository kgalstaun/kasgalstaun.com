const TimeOutHelper = {
  async createCustomTimeout(milliseconds) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, milliseconds);
    });
  },
};

export default TimeOutHelper;
