const express = require("express");
const serverless = require("serverless-http");

const app = express()

app.get("*", (req, res) => {
  res.send({
    method: req.method,
    headers: req.headers,
    body: req.body,
    remoteAddress: req.remoteAddress,
    url: req.url,
  })
})

module.exports.handler = serverless(app);
