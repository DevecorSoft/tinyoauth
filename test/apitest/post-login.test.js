const axios = require("axios");
const expect = require("chai").expect;
const { server } = require("../../dev_server");

describe("Given a correct pair of username and password", () => {
  describe("When it post /login api", () => {
    it("Then response code should be 200", (done) => {
      axios
        .post("/login", {
          username: "test",
          password: "pwd for test",
        })
        .then((res) => {
          expect(res.status).to.be.equal(200);
          done()
        }).catch(err => {
          done(err)
        });
    });
  });

  after(() => {
    server.close();
  });
});
