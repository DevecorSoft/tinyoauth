const express = require("express");
const session = require("express-session");
const compression = require("compression");
const { DynamoDB } = require("@aws-sdk/client-dynamodb");
const { createPageRenderer } = require("vite-plugin-ssr");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;

var dynamodb = new DynamoDB({
  region: "ap-southeast-1",
  endpoint: "http://localhost:8000",
});

const isProduction = process.env.NODE_ENV === "production";
const root = `${__dirname}`;

module.exports.createServer = async function () {
  const app = express();

  app.use(compression());

  let viteDevServer;
  if (isProduction) {
    app.use(express.static(`${root}/dist/client`));
  } else {
    const vite = require("vite");
    viteDevServer = await vite.createServer({
      root,
      server: { middlewareMode: "ssr" },
    });
    app.use(viteDevServer.middlewares);
  }

  app.use(express.json());

  passport.use(
    new localStrategy(function (username, password, done) {
      if (username === "devecor" && password === "pwd") {
        done(null, "something from local strategy");
      } else {
        done(null, false);
      }
    })
  );
  app.use(
    session({ secret: "keyboard cat", resave: false, saveUninitialized: false })
  );
  app.use(passport.initialize());
  app.use(passport.session());

  app.get(
    "/image",
    passport.authenticate("local", {
      successReturnToOrRedirect: "/image",
      failureRedirect: "/login",
    }),
    (req, res) => {
      res.send("Congratulation! you got the image.");
    }
  );
  app.post("/login", (req, res) => {
    dynamodb
      .getItem({
        TableName: "tinyoauth",
        Key: {
          user: { S: req.body.username },
        },
      })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
    res.json(req.body);
  });

  const renderPage = createPageRenderer({ viteDevServer, isProduction, root });
  app.get("*", async (req, res, next) => {
    const url = req.originalUrl;
    const pageContextInit = {
      url,
    };
    const pageContext = await renderPage(pageContextInit);
    const { httpResponse } = pageContext;
    if (!httpResponse) return next();
    const { body, statusCode, contentType } = httpResponse;
    res.status(statusCode).type(contentType).send(body);
  });

  return app;
};

module.exports.handler = serverless(this.createServer());
