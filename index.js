const serverless = require("serverless-http");
const express = require("express");
const { DynamoDB } = require("@aws-sdk/client-dynamodb");

const app = express();

app.get("/login", routes.site.loginForm);

app.post("/login", (req, res) => {});

module.exports.handler = serverless(app);
app.listen(4000, () => {});
