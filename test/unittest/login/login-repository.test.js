const expect = require("chai").expect;
const sinon = require("sinon");
const { login_repository } = require("../../../app/login/repository");

describe("Given a username that exists in db", () => {
  describe("When find user by username form repository", () => {
    const stubed_db_client = {
      send: sinon.fake.returns({
        Item: { username: "user", password: "pass" },
      }),
    };
    const login_repo = new login_repository(stubed_db_client);

    it("Then should tell db to find in tinyoauth_user table", async () => {
      await login_repo.find_user_by_user_name("user");
      expect(stubed_db_client.send.calledOnce).is.true;
      const db_send_input = stubed_db_client.send.getCall(0).args[0].input;
      expect(db_send_input).to.have.nested.property("Key.username.S", "user");
      expect(db_send_input).to.have.property("TableName", "tinyoauth_user");
    });

    it("Then should return the user's info", async () => {
      const user = await login_repo.find_user_by_user_name("user");
      expect(user).to.have.property("username", "user");
      expect(user).to.have.property("password", "pass");
    });
  });
});

describe("Given a invalid user", () => {
  describe("When find user by username form repository", () => {
    const stubed_db_client = {
      send: sinon.fake.returns({
        Item: {},
      }),
    };
    const login_repo = new login_repository(stubed_db_client);
    it("Then should return just null", async () => {
      const user = await login_repo.find_user_by_user_name("user");

      expect(user).to.be.null;
    });
  });
});
