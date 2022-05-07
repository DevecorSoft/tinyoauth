exports.time_suppiler = {
  get utc_now() {
    return new Date().toUTCString();
  },
};
