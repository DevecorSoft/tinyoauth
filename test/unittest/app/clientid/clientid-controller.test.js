const { expect } = require("chai");
const Sinon = require("sinon");
const { ClientIdController } = require("../../../../app/clientid/controller");

describe("Given to handle a client issuing request", () => {
  describe("When user didn't login", () => {
    it("Then should set http status with 401", () => {
      const fake_res = {};
      fake_res.send = Sinon.fake();
      fake_res.status = Sinon.fake.returns(fake_res);

      const fake_req = {
        header: Sinon.fake.returns(undefined),
      };
      const client_id_controller = new ClientIdController();
      client_id_controller.handler(fake_req, fake_res);

      expect(fake_res.status.calledOnce).to.be.true;
      expect(fake_res.send.calledOnce).to.be.true;
      expect(fake_res.status.getCall(0).args).to.be.deep.equal([401]);
      expect(fake_res.send.getCall(0).args).to.be.deep.equal([""]);
    });
  });

  describe("When user did login", () => {
    it("Then should set http status with 400 in case of missing name", () => {
      const fake_res = {};
      fake_res.send = Sinon.fake();
      fake_res.status = Sinon.fake.returns(fake_res);

      const fake_req = {
        body: {},
        header: Sinon.fake.returns("Bearer xxx"),
      };
      const client_id_controller = new ClientIdController();
      client_id_controller.handler(fake_req, fake_res);

      expect(fake_res.status.calledOnce).to.be.true;
      expect(fake_res.status.getCall(0).args).to.be.deep.equal([400]);
      expect(fake_res.send.calledOnce).to.be.true;
      expect(fake_res.send.getCall(0).args).to.be.deep.equal([""]);
    });

    it("Then should set http status with 400 in case of missing client_type", () => {
      const fake_res = {};
      fake_res.send = Sinon.fake();
      fake_res.status = Sinon.fake.returns(fake_res);

      const fake_req = {
        body: {
          name: "client name",
        },
        header: Sinon.fake.returns("Bearer xxx"),
      };
      const client_id_controller = new ClientIdController();
      client_id_controller.handler(fake_req, fake_res);

      expect(fake_res.status.calledOnce).to.be.true;
      expect(fake_res.status.getCall(0).args).to.be.deep.equal([400]);
      expect(fake_res.send.calledOnce).to.be.true;
      expect(fake_res.send.getCall(0).args).to.be.deep.equal([""]);
    });

    it("Then should set http status with 400 in case of missing authorization_grant_type", () => {
      const fake_res = {};
      fake_res.send = Sinon.fake();
      fake_res.status = Sinon.fake.returns(fake_res);

      const fake_req = {
        body: {
          name: "client name",
          client_type: "public",
        },
        header: Sinon.fake.returns("Bearer xxx"),
      };
      const client_id_controller = new ClientIdController();
      client_id_controller.handler(fake_req, fake_res);

      expect(fake_res.status.calledOnce).to.be.true;
      expect(fake_res.status.getCall(0).args).to.be.deep.equal([400]);
      expect(fake_res.send.calledOnce).to.be.true;
      expect(fake_res.send.getCall(0).args).to.be.deep.equal([""]);
    });

    it("Then should set http status with 400 in case of missing redirect_urls", () => {
      const fake_res = {};
      fake_res.send = Sinon.fake();
      fake_res.status = Sinon.fake.returns(fake_res);

      const fake_req = {
        body: {
          name: "client name",
          client_type: "public",
          authorization_grant_type: "authorization code"
        },
        header: Sinon.fake.returns("Bearer xxx"),
      };
      const client_id_controller = new ClientIdController();
      client_id_controller.handler(fake_req, fake_res);

      expect(fake_res.status.calledOnce).to.be.true;
      expect(fake_res.status.getCall(0).args).to.be.deep.equal([400]);
      expect(fake_res.send.calledOnce).to.be.true;
      expect(fake_res.send.getCall(0).args).to.be.deep.equal([""]);
    });
  });
});
