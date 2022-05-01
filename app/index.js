const express = require("express");
const { login } = require("./login");

const app = express();
app.use(express.json());

app.post("/login", login);

module.exports.app = app;
