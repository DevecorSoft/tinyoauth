const { default: axios } = require("axios");
const { expect } = require("chai");
const jsonwebtoken = require("jsonwebtoken");

describe("Given a 3rdparty resource server (client) want to integrate our system", () => {
  describe("When defend against attack", () => {
    it("Then should verify jwt signature", (done) => {
      process.env.SECRET_OF_JWT = "mysecretpassword";

      axios
        .post(
          "/client",
          {
            name: "web app",
            authorization_grant_type: "authorization code",
          },
          {
            headers: {
              Authorization: `Bearer xxxxx`,
            },
          }
        )
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

  describe("When user didn't login", () => {
    it("Then should set http status with 401", (done) => {
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

  describe("When register a client", () => {
    it("Then should return 401 after authentication failed", (done) => {
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
    it("Then should issue client id and secret", (done) => {
      process.env.SECRET_OF_JWT = "mysecretpassword";
      axios
        .post(
          "/client",
          {
            name: "web app",
            client_type: "public",
            authorization_grant_type: "authorization code",
            redirect_urls: ["url"],
          },
          {
            headers: {
              Authorization: `Bearer ${jsonwebtoken.sign(
                { user_id: "the fake user id" },
                "mysecretpassword"
              )}`,
            },
          }
        )
        .then((data) => {
          try {
            expect(data.status).to.be.equal(200);
          } catch (err) {
            done(err);
            return;
          }
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });
});
