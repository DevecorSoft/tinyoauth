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

      expect(fake_res.status.calledOnce);
      expect(fake_res.status.getCall(0).args).to.be.equal([401]);
    });
  });
});
