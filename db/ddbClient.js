const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");

const ddbClient = new DynamoDBClient({
  region: "ap-southeast-1",
  endpoint: "http://localhost:8000",
});

module.exports.ddbClient = ddbClient;
