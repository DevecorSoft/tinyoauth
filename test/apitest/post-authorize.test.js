const axios = require("axios");
const { expect, assert } = require("chai");

describe("Given resource owner (user) try to access protect resource", () => {
  describe("When user was directed to authorize api", () => {
    it.only("Then should return 302 in case authorization fulfilled", async () => {
      try {
        await axios.get("/authorize");
        assert.fail();
      } catch (err) {
        expect(err.response.status).to.be.equal(302);
      }
    });
  });
});
