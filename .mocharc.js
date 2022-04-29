const axios = require("axios");

axios.defaults.baseURL = "http://localhost:3333";

module.exports = {
  require: "test/hooks.js",
};
