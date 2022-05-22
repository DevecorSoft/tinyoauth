const axios = require("axios");
const { expect } = require("chai");
const { ddbClient } = require("../../db/ddbClient");
const {
  CreateTableCommand,
  GetItemCommand,
} = require("@aws-sdk/client-dynamodb");

describe("Given guest try to register tinyoauth", () => {
  describe("When post /register api with username and password", () => {
    beforeEach(async () => {
      console.log(
        await ddbClient.send(
          new CreateTableCommand({
            TableName: "tinyoauth_user",
            KeySchema: [{ AttributeName: "username", KeyType: "HASH" }],
            AttributeDefinitions: [
              { AttributeName: "username", AttributeType: "S" },
            ],
            ProvisionedThroughput: {
              ReadCapacityUnits: 1,
              WriteCapacityUnits: 1,
            },
          })
        )
      );
    });

    it("Then should get proper reponse", async () => {
      const res = await axios.post("/register", {
        username: "user",
        password: "xxx",
      });
      expect(res.status).to.be.equal(200);
      expect(res.data.result).to.be.equal("succeeded");

      const user_item = await ddbClient.send(
        new GetItemCommand({
          TableName: "tinyoauth_user",
          Key: { username: { S: "user" } },
        })
      );
      expect(user_item.Item).to.be.an.instanceof(Object);
      expect(user_item.Item?.user_id.S).to.have.lengthOf(36)
      expect(user_item.Item?.username.S).to.be.equal("user")
      expect(user_item.Item?.password.S).to.be.equal("xxx")
    });
  });
});
