const { expect } = require("chai");
const jsonwebtoken = require("jsonwebtoken");
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

describe("When get a jwt token from header", () => {
  it("Then should verify its signature and decode", () => {
    const token = jsonwebtoken.sign(
      { user_id: "fake user" },
      "mysecretpassword"
    );
    const plaintext = JwtSupplier.verify(token, "mysecretpassword");
    expect(plaintext).to.be.contains({
      user_id: "fake user",
    });
  });
  it("Then should not throw error for an invalid token", () => {
    const token = "invalid token";
    const plaintext = JwtSupplier.verify(token, "mysecretpassword");
    expect(plaintext).to.be.equal("");
  });
});
