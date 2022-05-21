const { expect } = require("chai");
const Sinon = require("sinon");
const { ClientRepository } = require("../../../../app/login/repository");

describe("Given user's trying login our system", () => {
  describe("When issue client identifier", () => {
    it("Then should put a client item into dynamodb", () => {
      const fake_db = {
        send: Sinon.fake(),
      };
      const fake_time_suppier = {};
      const fake_utc_now_getter = Sinon.fake.returns(
        "Wed, 14 Jun 2017 07:00:00 GMT"
      );
      Object.defineProperty(fake_time_suppier, "utc_now", {
        get: fake_utc_now_getter,
      });
      const client_repository = new ClientRepository(
        fake_db,
        fake_time_suppier
      );
      client_repository.create_client_identifier({
        user_id: "my user id",
        client_id: "fjewofj324125asxixj",
        client_secret: "xdsfjej",
      });

      expect(fake_db.send.calledOnce).to.be.true;
      expect(fake_utc_now_getter.calledTwice).to.be.true;
      const send_args = fake_db.send.getCall(0).args[0].input;

      expect(send_args).to.be.deep.equal({
        TableName: "tinyoauth_client",
        Item: {
          user_id: { S: "my user id" },
          client_id: { S: "fjewofj324125asxixj" },
          client_secret: { S: "xdsfjej" },
          operation_time: { S: "Wed, 14 Jun 2017 07:00:00 GMT" },
          creation_time: { S: "Wed, 14 Jun 2017 07:00:00 GMT" },
        },
      });
    });
  });
});
