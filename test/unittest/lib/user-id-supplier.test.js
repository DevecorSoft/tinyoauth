const { expect } = require("chai");
const { user_id_supplier } = require("../../../lib/userIdSupplier");
describe("should generate a uuid as user id", () => {
  const uid = user_id_supplier.generate_user_id();
  expect(typeof uid).to.be.equal("string");
  expect(uid.length).to.be.equal(36);
});
