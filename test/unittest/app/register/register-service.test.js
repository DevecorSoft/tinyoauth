const { expect } = require("chai");
const sinon = require("sinon");
const { RegisterService } = require("../../../../app/register/service");

describe("Given guest sign up with user name and password", () => {
  describe("When this service called by high layer controller", () => {
    it("Then should call repository layer", async () => {
      const fake_repo = {
        create_user: sinon.fake(),
      };
      const fake_user_id_supplier = {
        generate_user_id: sinon.fake.returns("my user id"),
      };
      const register_service = new RegisterService(fake_repo, fake_user_id_supplier);
      await register_service.register("user", "my pass");

      expect(fake_repo.create_user.calledOnce).to.be.true;
      const create_user_args = fake_repo.create_user.getCall(0).args;

      expect(create_user_args).to.be.deep.equal([
        "user",
        "my pass",
        "my user id",
      ]);
    });
    it("Then should return true indicate that register successfully", async () => {
      const fake_repo = {
        create_user: () => {},
      };
      const fake_user_id_supplier = {
        generate_user_id: sinon.fake.returns("my user id"),
      };
      const register_service = new RegisterService(fake_repo, fake_user_id_supplier);
      const res = await register_service.register("user", "my pass");

      expect(res).to.be.true;
    });
  });
});
