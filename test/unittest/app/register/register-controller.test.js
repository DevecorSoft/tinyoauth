const { expect } = require("chai");
const sinon = require("sinon");
const { RegisterController } = require("../../../../app/register/controller");

describe("Given guest try to register tinyoauth", () => {
  describe("When register successfully", () => {
    it("Then should just invoke service", () => {
      const fake_service = {
        register: sinon.fake(),
      };
      const register_controller = new RegisterController(fake_service);

      const fake_res = { json: () => {} };

      register_controller.handler(
        { body: { username: "user", password: "my pass" } },
        fake_res
      );

      expect(fake_service.register.calledOnce).to.be.true;
      const resgiter_args = fake_service.register.getCall(0).args;
      expect(resgiter_args).to.be.deep.equal(["user", "my pass"]);
    });

    it("Then should return a successfull result as response", async () => {
      const fake_service = {
        register: sinon.fake.returns(true),
      };
      const register_controller = new RegisterController(fake_service);

      const fake_res = { json: sinon.fake() };

      await register_controller.handler(
        { body: { username: "user", password: "my pass" } },
        fake_res
      );

      expect(fake_res.json.calledOnce).to.be.true;
      const res = fake_res.json.getCall(0).args[0];
      expect(res).to.be.deep.equal({
        result: "succeeded",
      });
    });
  });

  describe("When register fails for some reason", () => {

    it("Then should return a failure result as response", async () => {
      const fake_service = {
        register: sinon.fake.returns(false),
      };
      const register_controller = new RegisterController(fake_service);

      const fake_res = { json: sinon.fake() };

      await register_controller.handler(
        { body: { username: "user", password: "my pass" } },
        fake_res
      );

      expect(fake_res.json.calledOnce).to.be.true;
      const res = fake_res.json.getCall(0).args[0];
      expect(res).to.be.deep.equal({
        result: "failed",
      });
    });
  });
});


describe("Given the mandatory fields are not met", () => {
  describe("When username is missing", () => {
    it("Then should reply a bad request", async () => {
      const fake_res = { send: sinon.fake() };
      fake_res.status = sinon.fake.returns(fake_res);

      const register_controller = new RegisterController();

      await register_controller.handler({ body: {} }, fake_res);

      expect(fake_res.status.calledOnce).to.be.true;
      expect(fake_res.status.getCall(0).args).to.be.deep.equal([400]);
      expect(fake_res.send.calledOnce).to.be.true;
      expect(fake_res.send.getCall(0).args).to.be.deep.equal([""]);
    });
  });

  describe("When password is missing", () => {
    it("Then should reply a bad request", async () => {
      const fake_res = { send: sinon.fake() };
      fake_res.status = sinon.fake.returns(fake_res);

      const register_controller = new RegisterController();

      await register_controller.handler({ body: { username: "user" } }, fake_res);

      expect(fake_res.status.calledOnce).to.be.true;
      expect(fake_res.status.getCall(0).args).to.be.deep.equal([400]);
      expect(fake_res.send.calledOnce).to.be.true;
      expect(fake_res.send.getCall(0).args).to.be.deep.equal([""]);
    });
  });
});