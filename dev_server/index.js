const { app } = require("../app");
const server = app.listen(3333);
require("process").on("SIGTERM", () => {
  console.log("SIGTERM signal received: closing HTTP server");
  server.close(() => {
    console.log("HTTP server closed");
  });
});
console.log("tinyoauth is avaliable on http://localhost:3333");

module.exports.app = app;
module.exports.server = server;
