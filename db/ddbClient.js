const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");

const config = process.env.NODE_ENV === "production"
  ? { region: "ap-southeast-1" }
  : {
      region: "ap-southeast-1",
      endpoint: "http://localhost:3330",
    };
module.exports.ddbClient = new DynamoDBClient(config);
