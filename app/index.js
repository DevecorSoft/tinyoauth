const express = require("express");
const { ddbClient } = require("../db/ddbClient");
const { GetItemCommand } = require("@aws-sdk/client-dynamodb");

const app = express();
app.use(express.json())

app.post("/login", (req, res) => {
  const username = req.body?.username;
  const password = req.body?.password;
  ddbClient
    .send(
      new GetItemCommand({
        TableName: "tinyoauth_user",
        Key: { username: { S: username } },
      })
    )
    .then((val) => {
      res.json({
        result: "succeeded",
      });
    });
});

module.exports.app = app;
