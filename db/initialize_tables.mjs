import { DynamoDBClient, CreateTableCommand } from "@aws-sdk/client-dynamodb";

const ddbClient = new DynamoDBClient({
  region: "ap-southeast-1",
  endpoint: "http://localhost:8000",
});

const tinyoauth_authorization_code = {
  TableName: "tinyoauth_authorization_code",
  KeySchema: [
    { AttributeName: "code", KeyType: "HASH" }, //Partition key
  ],
  AttributeDefinitions: [{ AttributeName: "code", AttributeType: "S" }],
  ProvisionedThroughput: {
    ReadCapacityUnits: 1,
    WriteCapacityUnits: 1,
  },
};

ddbClient
  .send(new CreateTableCommand(tinyoauth_authorization_code))
  .then((data) => {
    console.log("table created: ",  JSON.stringify(data));
  })
  .catch((err) => {
    console.log(err);
  });


