const { expect } = require("chai");
const Sinon = require("sinon");
const { ClientIdController } = require("../../../../app/clientid/controller");

describe("Given to handle a client issuing request", () => {
  describe("When user didn't login", () => {
    it("Then should set http status with 401", () => {
      const fake_res = { json: Sinon.fake(), status: Sinon.fake() };
      const fake_req = {
        header: Sinon.fake.returns(undefined),
      };
      const client_id_controller = new ClientIdController();
      client_id_controller.handler(fake_req, fake_res);

      expect(fake_res.status.calledOnce).to.be.true;
      expect(fake_res.status.getCall(0).args).to.be.deep.equal([401]);
    });
  });

  describe("When user did login", () => {
    it("Then should set http status with 400 in case of missing name", () => {
      const fake_res = { json: Sinon.fake(), status: Sinon.fake() };
      const fake_req = {
        body: {},
        header: Sinon.fake.returns("Bearer xxx"),
      };
      const client_id_controller = new ClientIdController();
      client_id_controller.handler(fake_req, fake_res);

      expect(fake_res.status.calledOnce).to.be.true;
      expect(fake_res.status.getCall(0).args).to.be.deep.equal([400]);
    });
  });
});
