const axios = require("axios").default;
const expect = require("chai").expect;
const assert = require("assert");
const { server } = require("../../dev_server");
const { ddbClient } = require("../../db/ddbClient");
const { CreateTableCommand } = require("@aws-sdk/client-dynamodb");

describe("Given a correct pair of username and password", () => {
  before((done) => {
    ddbClient
      .send(
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
      .then((data) => {
        console.log("table created: ", JSON.stringify(data));
        done();
      })
      .catch((err) => {
        done(err);
        assert.fail();
      });
  });

  describe("When it post /login api", () => {
    it("Then response code should be 200", (done) => {
      axios
        .post("/login", {
          username: "test",
          password: "pwd for test",
        })
        .then((res) => {
          expect(res.status).to.be.equal(200);
          expect(res.data.result).to.be.equal("succeeded");
          done();
        })
        .catch((err) => {
          done(err);
          assert.fail();
        });
    });
  });

  after(() => {
    server.close();
  });
});
