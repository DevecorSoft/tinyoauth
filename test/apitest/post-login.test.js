const axios = require("axios");
const expect = require("chai").expect;
const { server } = require("../../dev_server");

describe("Given a correct pair of username and password", () => {
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
    server.close();
  });
});
