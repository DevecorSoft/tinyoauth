const { expect } = require("chai");
const sinon = require("sinon");
const { LoginController } = require("../../../../app/login/controller");

describe("Given a user with correct password", () => {
  describe("When this user try to login", async () => {
    const fake_login_service = {
      verify: sinon.fake.returns("my uuid"),
      set_status: sinon.fake.returns(true),
      issue_jwt: sinon.fake.returns("the jwt token")
    };
    const fake_res = { json: sinon.fake() };
    const login_controller = new LoginController(
      fake_login_service
    );

    await login_controller.handler(
      { body: { username: "user", password: "my pass" } },
      fake_res
    );
    it("Then should verify user and mark it as online", () => {
      expect(fake_login_service.verify.calledOnce).to.be.true;
      expect(fake_login_service.set_status.calledOnce).to.be.true;
      const verify_args = fake_login_service.verify.getCall(0).args;
      const set_status_args = fake_login_service.set_status.getCall(0).args;
      expect(verify_args).to.be.deep.equal(["user", "my pass"]);
      expect(set_status_args).to.be.deep.equal(["user", true]);
    });

    it("Then should issue jwt token with user id", () => {
      expect(fake_login_service.issue_jwt.calledOnce).to.be.true;
      const issue_jwt_args = fake_login_service.issue_jwt.getCall(0).args
      expect(issue_jwt_args).to.be.deep.equal(["my uuid"])
    })

    it("Then should set response body with success message and authenticator", () => {
      expect(fake_res.json.calledOnce).to.be.true;
      const json_args = fake_res.json.getCall(0).args[0];
      expect(json_args).to.be.deep.equal({
        result: "succeeded",
        authenticator: "the jwt token"
      });
    });
  });
});

describe("Given a invalid user", () => {
  describe("When this user play with login api", async () => {
    const fake_service = {
      verify: sinon.fake.returns(false),
      set_status: sinon.fake(),
    };
    const fake_res = { json: sinon.fake() };

    const login_controller = new LoginController(fake_service);

    await login_controller.handler(
      { body: { username: "user", password: "my pass" } },
      fake_res
    );

    it("Then should verify user and don't set status", () => {
      expect(fake_service.verify.calledOnce).to.be.true;
      expect(fake_service.set_status.notCalled).to.be.true;
      const verify_args = fake_service.verify.getCall(0).args;
      expect(verify_args).to.be.deep.equal(["user", "my pass"]);
    });

    it("Then should set response body with failed message", () => {
      expect(fake_res.json.calledOnce).to.be.true;
      const json_args = fake_res.json.getCall(0).args[0];
      expect(json_args).to.be.deep.equal({
        result: "failed",
        authenticator: null
      });
    });
  });
});
