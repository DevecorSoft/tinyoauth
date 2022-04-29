const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");

module.exports.ddbClient = new DynamoDBClient(
  { region: "ap-southeast-1" }
    ? process.env.NODE_ENV === "production"
    : {
        region: "ap-southeast-1",
        endpoint: "http://localhost:3330",
      }
);
