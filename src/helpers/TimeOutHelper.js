const TimeOutHelper = {
  async startTimeout(milliseconds) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, milliseconds);
    });
  },
};

export default TimeOutHelper;
