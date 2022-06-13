/**
 * primary module of tinyoauth
 * @module app
 */

const express = require("express");
const { login } = require("./login");
const { register } = require("./register");
const { authorize } = require("./authorize");
const { clientid } = require("./clientid");
const { authenticate } = require("./authenticate");

const app = express();
app.use(express.json());

app.post("/login", login);
app.post("/register", register);
app.post("/client", authenticate, clientid);
app.get("/authorize", authorize);

/**
 * express application
 * @type {Express}
 */
module.exports.app = app;
