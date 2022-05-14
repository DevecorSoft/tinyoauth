const { expect } = require("chai");
const sinon = require("sinon");
const { RegisterRepository } = require("../../../../app/register/repository");

describe("Given guest's gonna sign up", () => {
  describe("When put user info as an item into dynamodb", () => {
    it("Then call aws-sdk with required user name and password", () => {
      fake_db = {
        send: sinon.fake(),
      };
      const register_repo = new RegisterRepository(fake_db);
      register_repo.create_user("user", "my pass");

      expect(fake_db.send.calledOnce).to.be.true;

      const args = fake_db.send.getCall(0).args[0].input;
      expect(args).to.be.deep.equal({
        TableName: "tinyoauth_user",
        Item: {
          username: { S: "user" },
          password: { S: "my pass" },
          user_status: { S: "online" },
          operation_time: { S: "Wed, 14 Jun 2017 07:00:00 GMT" },
        },
      });
    });
  });
});
