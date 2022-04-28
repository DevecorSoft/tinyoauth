const axios = require("axios");
const expect = require("chai").expect;

describe("Given a correct pair of username and password", () => {
  before(() => {
    require("../../dev_server")
    console.log("before endded")
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
    }).catch((err) => {
      console.log(err)
    })
    console.log("after ended")
  });
});
