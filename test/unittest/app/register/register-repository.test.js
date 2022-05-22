const { expect } = require("chai");
const sinon = require("sinon");
const { RegisterRepository } = require("../../../../app/register/repository");

describe("Given guest's gonna sign up", () => {
  describe("When put user info as an item into dynamodb", () => {
    it("Then call aws-sdk with required user name and password", () => {
      const fake_db = {
        send: sinon.fake(),
      };
      const time_suppiler = {};
      const fake_utc_now = sinon.fake.returns("Wed, 14 Jun 2017 07:00:00 GMT");
      Object.defineProperty(time_suppiler, "utc_now", {
        get: fake_utc_now,
      });
      const register_repo = new RegisterRepository(fake_db, time_suppiler);
      register_repo.create_user("user", "my pass", "my user id");

      expect(fake_db.send.calledOnce).to.be.true;
      expect(fake_utc_now.calledTwice).to.be.true;

      const args = fake_db.send.getCall(0).args[0].input;
      expect(args).to.be.deep.equal({
        TableName: "tinyoauth_user",
        Item: {
          username: { S: "user" },
          user_id: { S: "my user id" },
          password: { S: "my pass" },
          user_status: { S: "online" },
          operation_time: { S: "Wed, 14 Jun 2017 07:00:00 GMT" },
          creation_time: { S: "Wed, 14 Jun 2017 07:00:00 GMT" },
        },
      });
    });
  });
});
