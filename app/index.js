const express = require("express");
const passport = require("passport");
const { Strategy } = require("passport-oauth2");
const oauth2orize = require("oauth2orize");
const { ddbClient } = require("../db/ddbClient.js");
const {
  PutItemCommand,
  GetItemCommand,
  QueryCommand,
} = require("@aws-sdk/client-dynamodb");
const utils = require("../utils")

const server = oauth2orize.createServer();
server.grant(
  oauth2orize.grant.code((client, redirectUri, user, ares, done) => {
    const code = utils.getUid(16);
    ddbClient
      .send(
        new PutItemCommand({
          TableName: "tinyoauth_authorization_code",
          Item: {
            code: { S: code },
            client_id: { S: client.id },
            redirect_url: { S: redirectUri },
            user_id: { S: user.id },
            user_name: { S: user.name },
          },
        })
      )
      .then((data) => {
        console.log("item putted: ", JSON.stringify(data));
        done(null, data);
      })
      .catch((err) => {
        console.error(err);
        done(err);
      });
  })
);

server.exchange(
  oauth2orize.exchange.code((client, code, redirectUri, done) => {
    ddbClient
      .send(
        new GetItemCommand({
          TableName: "tinyoauth_authorization_code",
          Key: { code: { S: code } },
        })
      )
      .then((authCode) => {
        if (client.id !== authCode.client_id) {
          return done(null, false);
        }
        if (redirectUri !== authCode.redirect_url) {
          return done(null, false);
        }
        issueTokens(user.id, client.clientId, done);
      })
      .catch((err) => {
        console.error(err);
        done(err);
      });
  })
);

function issueTokens(userId, clientId, done) {
  ddbClient
    .send(
      new GetItemCommand({
        TableName: "tinyoauth_user",
        Key: { user_id: { S: userId } },
      })
    )
    .then((user) => {
      console.log("item getted: ", user);
      const accessToken = utils.getUid(256);
      const refreshToken = utils.getUid(256);
      ddbClient
        .send(
          new PutItemCommand({
            TableName: "tinyoauth_access_token",
            Item: {
              access_token: { S: accessToken },
              user_id: { S: userId },
              client_id: { S: clientId },
            },
          })
        )
        .then((data) => {
          console.log("item putted: ", data);
          ddbClient
            .send(
              new PutItemCommand({
                TableName: "tinyoauth_refresh_token",
                Item: {
                  refresh_token: { S: refreshToken },
                  user_id: { S: userId },
                  client_id: { S: clientId },
                },
              })
            )
            .then((data) => {
              console.log("item putted: ", data);
              const params = { username: user.name };
              done(null, accessToken, refreshToken, params);
            })
            .catch((err) => {
              console.error(err);
              done(err);
            });
        })
        .catch((err) => {
          console.error(err);
          done(err);
        });
    })
    .catch((err) => {
      console.error(err);
      done(err);
    });
}

const app = express();

passport.use(
  new Strategy(
    {
      authorizationURL: "https://www.example.com/oauth2/authorize",
      tokenURL: "https://www.example.com/oauth2/token",
      clientID: "EXAMPLE_CLIENT_ID",
      clientSecret: "EXAMPLE_CLIENT_SECRET",
      callbackURL: "http://localhost:3000/auth/example/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      User.findOrCreate({ exampleId: profile.id }, function (err, user) {
        return cb(err, user);
      });
    }
  )
);

app.use(express.static("web/dist"));

app.get(
  "/authorize",
  server.authorization(
    (clientId, redirectUri, done) => {
      ddbClient
        .send(
          new GetItemCommand({
            TableName: "tinyoauth_client",
            Key: { client_id: { S: clientId } },
          })
        )
        .then((client) => {
          done(null, client, redirectUri);
        })
        .catch((err) => {
          console.error(err);
          done(err);
        });
    },
    (client, user, done) => {

      if (client.isTrusted) return done(null, true);

      ddbClient
        .send(
          new QueryCommand({
            TableName: "tinyoauth_access_token",
            KeyConditionExpression: "user_id = :u and client_id = :c",
            ExpressionAttributeValues: {
              ":u": { S: user.id },
              ":c": { S: client.id },
            },
          })
        )
        .then((data) => {
          if (data?.length === 1) {
            done(null, true);
          } else {
            done(null, false);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  ),
  (req, res) => {
    console.log("something happen");
  }
);

app.get("/callback", (req, res) => {
  res.send({
    method: req.method,
    headers: req.headers,
    body: req.body,
    remoteAddress: req.remoteAddress,
    url: req.url,
  });
});

app.post("/image", passport.authenticate("oauth2"), (req, res) => {
  res.send("awesome! you got the image!");
});

module.exports.app = app;
