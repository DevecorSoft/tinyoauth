const { execSync } = require("child_process");

module.exports.mochaHooks = {
  beforeAll() {
    const res = execSync("docker run -d --name dynamodb -p 3330:8000 amazon/dynamodb-local")
    console.log(String.fromCharCode(...res))
  },
  afterAll() {
    const res = execSync("docker stop dynamodb && docker rm dynamodb")
    console.log(String.fromCharCode(...res))
  },
};
