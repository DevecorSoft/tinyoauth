const express = require("express");

const app = express();

app.use(express.static('web/dist'));

app.get("/callback", (req, res) => {
  res.send({
    method: req.method,
    headers: req.headers,
    body: req.body,
    remoteAddress: req.remoteAddress,
    url: req.url,
  });
});

module.exports.app = app
