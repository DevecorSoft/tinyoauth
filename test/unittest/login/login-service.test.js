const sinon = require("sinon");
const { expect } = require("chai");
const { LoginService } = require("../../../app/login/service");

describe("Given a valid pair of user name and password", () => {
  describe("When verify password by login service", () => {
    it("Then should return true to indicate successful authentication", () => {
      const repo = {
        find_user_by_user_name: sinon.fake.returns({
            username: "user",
            password: "pass",
            status: "offline"
        })
      }
      const login_service = new LoginService(repo);
      const res = login_service.verify("user", "pass")
      expect(res).to.be.true
    });
  });
});
