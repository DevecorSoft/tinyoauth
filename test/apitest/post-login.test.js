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
    console.log(
      await ddbClient.send(
        new PutItemCommand({
          TableName: "tinyoauth_user",
          Item: {
            username: { S: "test" },
            user_id: { S: "my user id" },
            password: { S: "pwd for test" },
            user_status: { S: "offline" },
            operation_time: { S: "Wed, 14 Jun 2017 07:00:00 GMT" },
          },
        })
      )
    );
    console.log(
      await ddbClient.send(
        new CreateTableCommand({
          TableName: "tinyoauth_client",
          KeySchema: [{ AttributeName: "user_id", KeyType: "HASH" }],
          AttributeDefinitions: [
            { AttributeName: "user_id", AttributeType: "S" },
          ],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
          },
        })
      )
    );
  });

  describe("When it post /login api", () => {
    it("Then response code should be 200", async () => {
      process.env.SECRET_OF_JWT = "fake secret password"

      const res = await axios.post("/login", {
        username: "test",
        password: "pwd for test",
      });

      expect(res.status).to.be.equal(200);
      expect(res.data.result).to.be.equal("succeeded");
      expect(typeof res.data.authenticator).to.be.equal("string");

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
