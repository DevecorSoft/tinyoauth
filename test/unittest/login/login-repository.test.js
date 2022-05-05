const expect = require("chai").expect;
const sinon = require("sinon");
const { LoginRepository } = require("../../../app/login/repository");

describe("Given a username that exists in db", () => {
  describe("When find user by username form repository", () => {
    const stubed_db_client = {
      send: sinon.fake.returns({
        Item: { username: "user", password: "pass" },
      }),
    };
    const login_repo = new LoginRepository(stubed_db_client);

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

  describe("When set user online", () => {
    it("Then should tell db set status to online and update operation time", async () => {
      const stubed_db_client = {
        send: sinon.fake(),
      };
      const time_suppiler = {
        get utc_now() {
          return "Wed, 14 Jun 2017 07:00:00 GMT";
        },
      };

      const login_repo = new LoginRepository(
        stubed_db_client,
        time_suppiler
      );

      await login_repo.update_user_status("user", true);

      expect(stubed_db_client.send.calledOnce).to.be.true;
      const args = stubed_db_client.send.getCall(0).args[0].input;
      expect(args).to.be.deep.equal({
        TableName: "tinyoauth_user",
        Key: {
          username: "user",
        },
        UpdateExpression: "set status = :s, operation_time = :u",
        ExpressionAttributeValues: {
          ":s": { S: "online" },
          ":u": { S: "Wed, 14 Jun 2017 07:00:00 GMT" },
        },
      });
    });
  });

  describe("When set user offline", () => {
    it("Then should tell db set status to offline and update operation time", async () => {
      const stubed_db_client = {
        send: sinon.fake(),
      };
      const time_suppiler = {
        get utc_now() {
          return "Wed, 14 Jun 2017 07:00:01 GMT";
        },
      };

      const login_repo = new LoginRepository(
        stubed_db_client,
        time_suppiler
      );

      await login_repo.update_user_status("user2", false);

      expect(stubed_db_client.send.calledOnce).to.be.true;
      const args = stubed_db_client.send.getCall(0).args[0].input;
      expect(args).to.be.deep.equal({
        TableName: "tinyoauth_user",
        Key: {
          username: "user2",
        },
        UpdateExpression: "set status = :s, operation_time = :u",
        ExpressionAttributeValues: {
          ":s": { S: "offline" },
          ":u": { S: "Wed, 14 Jun 2017 07:00:01 GMT" },
        },
      });
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
    const login_repo = new LoginRepository(stubed_db_client);
    it("Then should return just null", async () => {
      const user = await login_repo.find_user_by_user_name("user");

      expect(user).to.be.null;
    });
  });
});
