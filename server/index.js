const createServer = require('../appapp').createServer

startServer();

async function startServer() {
  app = await createServer();

  const port = process.env.PORT || 3001;
  app.listen(port);
  console.log(`Server running at http://localhost:${port}`);
}

