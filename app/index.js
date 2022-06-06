/**
 * primary module of tinyoauth
 * @module app
 */

const express = require("express");
const { login } = require("./login");
const { register } = require("./register");

const app = express();
app.use(express.json());

app.post("/login", login);
app.post("/register", register);
app.get("/authorize", authorize);

/**
 * express application
 * @type {Express}
 */
module.exports.app = app;
