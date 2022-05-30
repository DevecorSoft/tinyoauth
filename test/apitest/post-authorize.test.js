const axios = require("axios");
const { expect, assert } = require("chai");

describe("Given resource owner (user) try to access protect resource", () => {
  describe("When user was directed to authorize api", () => {
    it.only("Then should authenticate user's agent (user's client)", async () => {
      try {
        await axios.get("/authorize");
        assert.fail();
      } catch (err) {
        expect(err.response.status).to.be.equal(302);
      }
    });
  });
});
