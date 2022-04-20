import { DynamoDB } from "@aws-sdk/client-dynamodb";

var dynamodb = new DynamoDB({
  region: "ap-southeast-1",
  endpoint: "http://localhost:8000",
});

var params = {
  TableName: "tinyoauth",
  KeySchema: [
    { AttributeName: "user", KeyType: "HASH" }, //Partition key
  ],
  AttributeDefinitions: [
    { AttributeName: "user", AttributeType: "S" },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10,
  },
};

dynamodb.createTable(params, function (err, data) {
  if (err) {
    console.error(
      "Unable to create table. Error JSON:",
      JSON.stringify(err, null, 2)
    );
  } else {
    console.log(
      "Created table. Table description JSON:",
      JSON.stringify(data, null, 2)
    );
  }
});
