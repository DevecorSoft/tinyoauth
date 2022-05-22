const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");

const config = process.env.NODE_ENV === "production"
  ? { region: "ap-southeast-1" }
  : {
      region: "ap-southeast-1",
      endpoint: `${process.env.HOST_NAME}:3330`,
    };

/**
 * an instance of dynamodb client
 * @type {DynamoDBClient}
 */
module.exports.ddbClient = new DynamoDBClient(config);
