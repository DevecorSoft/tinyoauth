const { expect } = require("chai");
const sinon = require("sinon");
const { RegisterService } = require("../../../../app/register/service");

describe("Given guest sign up with user name and password", () => {
  describe("When this service called by high layer controller", () => {
    it("Then should call repository layer", async () => {
      const fake_repo = {
        create_user: sinon.fake(),
      };
      const register_service = new RegisterService(fake_repo);
      await register_service.register("user", "my pass");

      expect(fake_repo.create_user.calledOnce).to.be.true;
    });
    it("Then should return true indicate that register successfully", async () => {
      const fake_repo = {
        create_user: () => {},
      };
      const register_service = new RegisterService(fake_repo);
      const res = await register_service.register("user", "my pass");

      expect(res).to.be.true;
    });
  });
});
