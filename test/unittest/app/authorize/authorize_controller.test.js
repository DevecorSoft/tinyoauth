const Sinon = require("sinon");
const { AuthorizeController } = require("../../../../app/authorize/controller");

describe("Given resource owner (user) try to access protect resource", () => {
  describe("When user was directed to authorize api", () => {
    it("Then should authenticate user's agent (user's client)", () => {
      const authorize_controller = new AuthorizeController();
      const fake_res = { json: Sinon.fake() };
      // authorize_controller.handler(null, fake_res);
    });
  });
});
