const axios = require("axios");

axios.defaults.baseURL = "http://localhost:3333";

module.exports =
  process.env.NODE_ENV === "apitest"
    ? {
        require: "test/hooks.js",
      }
    : {};
