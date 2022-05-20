const { expect } = require("chai");
const {
  clientIdentifierSupplier,
} = require("../../../lib/clientIdentifierSupplier");

describe("Given need to generate a client identifier", () => {
  describe("When call generate_cid function", () => {
    it("Then should got a client id", () => {
      const client_id = clientIdentifierSupplier.generate_cid({
        user: "my user",
        client_id: "my id",
      });
      expect(client_id).to.be.equal("eyJ1c2VyIjoibXkgdXNlciIsImNsaWVudF9pZCI6Im15IGlkIn0=");
    });
  });

  describe("When call generate_secret function", () => {
    it("Then should got a client secret", () => {
      const client_secret = clientIdentifierSupplier.generate_secret();
      expect(typeof client_secret).to.be.equal("string");
    });
  });
});
