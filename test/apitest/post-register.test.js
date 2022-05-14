const axios = require("axios");
const { expect } = require("chai");

describe("Given guest try to register tinyoauth", () => {
  describe("When post /register api with username and password", () => {
    it("Then should get proper reponse", async () => {
      const res = await axios.post("/register", {
        username: "user",
        password: "xxx",
      });
      expect(res.status).to.be.equal(200);
      expect(res.data.result).to.be.equal("succeeded");
    });
  });
});
