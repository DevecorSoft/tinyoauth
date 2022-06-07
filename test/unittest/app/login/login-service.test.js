const sinon = require("sinon");
const { expect } = require("chai");
const { LoginService } = require("../../../../app/login/service");

describe("Given a valid pair of user name and password", () => {
  describe("When verify password by login service", () => {
    it("Then should return user_id to indicate successful authentication", async () => {
      const repo = {
        find_user_by_user_name: sinon.fake.returns({
          username: { S: "user" },
          user_id: { S: "my uuid" },
          password: { S: "pass" },
          user_status: { S: "offline" },
        }),
      };
      const login_service = new LoginService(repo);
      const res = await login_service.verify("user", "pass");
      expect(res).to.be.equal("my uuid");
    });
  });

  describe("When marking the user as online", () => {
    it("Then should call repository with status", () => {
      const repo = {
        update_user_status: sinon.fake(),
      };

      const login_service = new LoginService(repo);
      login_service.set_status("user", true);

      expect(repo.update_user_status.calledOnce).to.be.true;
      const args = repo.update_user_status.getCall(0).args;
      expect(args).to.be.deep.equal(["user", true]);
    });

    it("Then should return true in case of without any error", async () => {
      const repo = { update_user_status: () => {} };
      const login_service = new LoginService(repo);

      const res = await login_service.set_status("user", true);

      expect(res).to.be.true;
    });

    it("Then should let it throw up in case of any error occurs", async () => {
      const repo = {
        update_user_status: () => {
          throw Error("some error");
        },
      };
      const login_service = new LoginService(repo);

      try {
        await login_service.set_status("user", true);
        expect.fail();
      } catch (err) {
        expect(err.message).to.be.equal("some error");
      }
    });
  });

  describe("When issue jwt", () => {
    const fake_jwt_supplier = {
      sign: sinon.fake.returns("fake jwt token"),
    };
    process.env.SECRET_OF_JWT = "fake secret";

    const login_service = new LoginService(null, fake_jwt_supplier);
    const token = login_service.issue_jwt("fake user id");
    it("Then should let user id to be payload and fetch secret from env", () => {
      expect(fake_jwt_supplier.sign.calledOnce).to.be.true;
      const fake_sign_args = fake_jwt_supplier.sign.getCall(0).args;
      expect(fake_sign_args).to.be.deep.equal([
        {
          user_id: "fake user id",
        },
        "fake secret",
      ]);
    });

    it("Then should return jwt token", () => {
      expect(token).to.be.equal("fake jwt token");
    })
  });
});

describe("Given a invalid pair of user name and password", () => {
  describe("When verify password by login service", () => {
    it("Then should return false to indicate a failed authentication", async () => {
      const repo = {
        find_user_by_user_name: sinon.fake.returns({
          username: { S: "user" },
          password: { S: "pass" },
          user_status: { S: "offline" },
        }),
      };
      const login_service = new LoginService(repo);
      const res = await login_service.verify("user", "wrong password");
      expect(res).to.be.false;
    });
  });
});

describe("Given a non-existent user", () => {
  describe("When verify password by login service", () => {
    it("Then shuld also return false to indicate a failed authentication", async () => {
      const repo = {
        find_user_by_user_name: sinon.fake.returns(null),
      };
      const login_service = new LoginService(repo);
      const res = await login_service.verify("non-existent user", "password");
      expect(res).to.be.false;
    });
  });
});
