const { default: axios } = require("axios");
const { expect } = require("chai");

describe("Given a 3rdparty resource server (client) want to integrate our system", () => {
  describe("When register a client", () => {
    it.only("Then should return 401 after authentication failed", (done) => {
      axios
        .post("/client", {
          name: "web app",
          authorization_grant_type: "authorization code",
        })
        .then((data) => {
          done(data);
        })
        .catch((res) => {
          try {
            expect(res.response.status).to.be.equal(401);
            done();
          } catch (err) {
            done(err);
          }
        });
    });
  });
});
