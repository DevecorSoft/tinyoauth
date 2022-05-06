const axios = require("axios");
const expect = require("chai").expect;
const assert = require("assert");
const { server } = require("../../dev_server");
const { ddbClient } = require("../../db/ddbClient");
const {
  CreateTableCommand,
  PutItemCommand,
  GetItemCommand,
} = require("@aws-sdk/client-dynamodb");

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
      .then(() => {
        ddbClient
          .send(
            new PutItemCommand({
              TableName: "tinyoauth_user",
              Item: {
                username: { S: "test" },
                password: { S: "pwd for test" },
                status: { S: "offline" },
                operation_time: { S: "Wed, 14 Jun 2017 07:00:00 GMT" },
              },
            })
          )
          .then(() => {
            done();
          })
          .catch((err) => {
            done(err);
            assert.fail();
          });
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

          ddbClient
            .send(
              new GetItemCommand({
                TableName: "tinyoauth_user",
                Key: { username: { S: "test" } },
              })
            )
            .then((val) => {
              expect(val.Item?.status.S).to.be.equal("online");
              done();
            })
            .catch((err) => {
              done(err);
              expect.fail(err);
            });
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
