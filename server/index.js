const express = require("express");
const compression = require("compression");
const { DynamoDB } = require("@aws-sdk/client-dynamodb");
const { createPageRenderer } = require("vite-plugin-ssr");

var dynamodb = new DynamoDB({
  region: "ap-southeast-1",
  endpoint: "http://localhost:8000",
});

const isProduction = process.env.NODE_ENV === "production";
const root = `${__dirname}/..`;

startServer();

async function startServer() {
  app = await createServer();

  app.use(express.json());
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

  const port = process.env.PORT || 3001;
  app.listen(port);
  console.log(`Server running at http://localhost:${port}`);
}

async function createServer() {
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
}
