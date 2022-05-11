const express = require("express");
const { login } = require("./login");

const app = express();
app.use(express.json());

app.post("/login", login);
app.post("/register", (req, res) => {
  res.json({
      result: "succeeded"
  });
});

module.exports.app = app;
