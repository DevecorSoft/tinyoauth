const { DynamoDBDocumentClient } = require("@aws-sdk/client-dynamodb");
const { ddbClient } = require("./ddbClient");

const marshallOptions = {
  convertEmptyValues: false,
  removeUndefinedValues: false,
  convertClassInstanceToMap: false,
};

const unmarshallOptions = {
  wrapNumbers: false,
};

const translateConfig = { marshallOptions, unmarshallOptions };

const ddbDocClient = DynamoDBDocumentClient.from(ddbClient, translateConfig);

exports.ddbDocClient = ddbDocClient;
