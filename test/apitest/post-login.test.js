const axios = require("axios");
const expect = require("chai").expect;
const { ddbClient } = require("../../db/ddbClient");
const {
  CreateTableCommand,
  PutItemCommand,
  GetItemCommand,
} = require("@aws-sdk/client-dynamodb");

describe("Given a correct pair of username and password", () => {
  beforeEach(async () => {
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
    );
    await ddbClient.send(
      new PutItemCommand({
        TableName: "tinyoauth_user",
        Item: {
          username: { S: "test" },
          password: { S: "pwd for test" },
          user_status: { S: "offline" },
          operation_time: { S: "Wed, 14 Jun 2017 07:00:00 GMT" },
        },
      })
    );
  });

  describe("When it post /login api", () => {
    it.skip("Then response code should be 200", async () => {
      const res = await axios.post("/login", {
        username: "test",
        password: "pwd for test",
      });

      expect(res.status).to.be.equal(200);
      expect(res.data).to.be.deep.equal({
        result: "succeeded",
        client_id: "my client id",
        client_secret: "my client secret",
      });

      await new Promise((resolve) => {
        setTimeout(() => resolve(), 500);
      });

      const user_item = await ddbClient.send(
        new GetItemCommand({
          TableName: "tinyoauth_user",
          Key: { username: { S: "test" } },
        })
      );
      expect(user_item.Item?.user_status.S).to.be.equal("online");
    });
  });
});
