const sinon = require("sinon");
const { expect } = require("chai");
const { ClientService } = require("../../../../app/login/service");

describe("Given user try to login our system", () => {
  describe("When user password authenticated", async () => {
    const fake_supplier = {
      generate_cid: sinon.fake.returns("my client id"),
      generate_secret: sinon.fake.returns("my client secret"),
    };
    const fake_repo = {
      create_client_identifier: sinon.fake(),
    };
    const client_service = new ClientService(fake_supplier, fake_repo);
    const client_identifier = await client_service.issue_identifier("user id");

    it("Then should issue client identifier", () => {
      expect(fake_supplier.generate_cid.calledOnce).to.be.true;
      const generate_cid_args = fake_supplier.generate_cid.getCall(0).args[0];
      expect(generate_cid_args.user_id).to.be.equal("user id");
      expect(generate_cid_args.id.length).to.be.equal(36);

      expect(fake_supplier.generate_secret.calledOnce).to.be.true;
      expect(client_identifier).to.be.deep.equal({
        client_id: "my client id",
        client_secret: "my client secret",
      });
    });

    it("Then should save generated client identifier into db via repository", () => {
      expect(fake_repo.create_client_identifier.calledOnce).to.be.true;
      const create_client_identifier_args =
        fake_repo.create_client_identifier.getCall(0).args;

      expect(create_client_identifier_args).to.be.deep.equal([
        {
          user_id: "user id",
          client_id: "my client id",
          client_secret: "my client secret",
        },
      ]);
    });
  });
});
