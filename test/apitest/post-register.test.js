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
    });

    it("Then should get proper reponse", async () => {
      const res = await axios.post("/register", {
        username: "user",
        password: "xxx",
      });
      expect(res.status).to.be.equal(200);
      expect(res.data.result).to.be.equal("succeeded");

      await new Promise((resolve) => {
        setTimeout(() => resolve(), 500);
      });

      const user_item = await ddbClient.send(
        new GetItemCommand({
          TableName: "tinyoauth_user",
          Key: { username: { S: "user" } },
        })
      );
      expect(user_item.Item).to.be.not.undefined;
    });
  });
});
