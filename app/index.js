const express = require("express");
const { ddbClient } = require("../db/ddbClient");
const { GetItemCommand } = require("@aws-sdk/client-dynamodb");

const app = express();

app.post("/login", async (req, res) => {
  const username = req.body?.username;
  const password = req.body?.password;
  ddbClient
    .send(
      new GetItemCommand({
        TableName: "tinyoauth_user",
        Key: { user_id: { S: username } },
      })
    )
    .then((val) => {
      res.send({
        result: "succeeded" ? val.password === password : "failed",
      });
    })
    .catch((err) => {
      console.error(err);
      res.send(err)
    });
});

module.exports.app = app;
