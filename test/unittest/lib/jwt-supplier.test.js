const { expect } = require("chai");
const { JwtSupplier } = require("../../../lib/jwtSupplier");

describe("When to issue jwt token", () => {
  it("Then should sign data with given secret", () => {
    const token = JwtSupplier.sign(
      { user_id: "my user id" },
      "mysecretpassword"
    );
    expect(typeof token).to.be.equal("string");
  });
});
