const { exec } = require("child_process");
const axios = require("axios");
const expect = require("chai").expect;

describe("Given a correct pair of username and password", () => {
  let app;
  before(() => {
    // require("../../server")
    app = exec("pwd && node -v && node dev_server", );
    console.log("before ended")
  });

  describe("When it post /login api", () => {
    it("Then response code should be 200", async () => {
      res = await axios.post("/login", {
        username: "test",
        password: "pwd for test",
      });

      expect(res.status).to.be.equal(200);
    });
  });

  after(() => {
    console.log("after started")
    axios.get('/shutdown').then(data => {
      console.log(data)
    })

    app.kill()
    console.log("after ended")
  });
});
