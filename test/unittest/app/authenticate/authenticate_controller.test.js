const { expect } = require("chai");
const Sinon = require("sinon");
const {
  AuthenticateController,
} = require("../../../../app/authenticate/controller");

describe("Given a public api which is protected by jwt", () => {
  describe("When handle a http call on this api", () => {
    it("Then requset headers should contains Authorization", () => {
      const fake_res = {};
      fake_res.status = Sinon.fake.returns(fake_res);
      fake_res.send = Sinon.fake();
      const fake_req = { header: Sinon.fake() };
      const fake_next = Sinon.fake();

      const authenticate_controller = new AuthenticateController();
      authenticate_controller.handler(fake_req, fake_res, fake_next);

      expect(fake_req.header.calledOnce).to.be.true;
      expect(fake_req.header.getCall(0).args).to.be.deep.equal([
        "Authorization",
      ]);
      expect(fake_res.status.calledOnce).to.be.true;
      expect(fake_res.status.getCall(0).args).to.be.deep.equal([401]);
      expect(fake_res.send.calledOnce).to.be.true;
      expect(fake_res.send.getCall(0).args).to.be.deep.equal([""]);
      expect(fake_next.notCalled).to.be.true;
    });

    it("Then should verify jwt signature", () => {
      const fake_res = {};
      fake_res.status = Sinon.fake.returns(fake_res);
      fake_res.send = Sinon.fake();
      const fake_req = { header: Sinon.fake.returns("Bearer xxxx") };
      const fake_next = Sinon.fake();
      const fake_jwt_supplier = {
        verify: Sinon.fake.returns(false),
      };
      process.env.SECRET_OF_JWT = "my secret";

      const authenticate_controller = new AuthenticateController(
        fake_jwt_supplier
      );
      authenticate_controller.handler(fake_req, fake_res, fake_next);

      expect(fake_req.header.calledOnce).to.be.true;
      expect(fake_req.header.getCall(0).args).to.be.deep.equal([
        "Authorization",
      ]);
      expect(fake_jwt_supplier.verify.calledOnce).to.be.true;
      expect(fake_jwt_supplier.verify.getCall(0).args).to.be.deep.equal([
        "xxxx",
        "my secret",
      ]);
      expect(fake_res.status.calledOnce).to.be.true;
      expect(fake_res.status.getCall(0).args).to.be.deep.equal([401]);
      expect(fake_res.send.calledOnce).to.be.true;
      expect(fake_res.send.getCall(0).args).to.be.deep.equal([""]);
      expect(fake_next.notCalled).to.be.true;
    });

    it("Then should call next if jwt is fulfilled", () => {
      const fake_res = {};
      fake_res.status = Sinon.fake.returns(fake_res);
      fake_res.send = Sinon.fake();
      const fake_req = { header: Sinon.fake.returns("Bearer xxxx") };
      const fake_next = Sinon.fake();
      const fake_jwt_supplier = {
        verify: Sinon.fake.returns(true),
      };
      process.env.SECRET_OF_JWT = "my secret";

      const authenticate_controller = new AuthenticateController(
        fake_jwt_supplier
      );
      authenticate_controller.handler(fake_req, fake_res, fake_next);

      expect(fake_req.header.calledOnce).to.be.true;
      expect(fake_req.header.getCall(0).args).to.be.deep.equal([
        "Authorization",
      ]);
      expect(fake_jwt_supplier.verify.calledOnce).to.be.true;
      expect(fake_jwt_supplier.verify.getCall(0).args).to.be.deep.equal([
        "xxxx",
        "my secret",
      ]);
      expect(fake_res.status.notCalled).to.be.true;
      expect(fake_res.send.notCalled).to.be.true;
      expect(fake_next.calledOnce).to.be.true;
    });
  });
});
