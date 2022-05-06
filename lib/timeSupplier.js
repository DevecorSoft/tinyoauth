exports.timeSuppiler = {
  get utc_now() {
    new Date().toUTCString();
  },
};
