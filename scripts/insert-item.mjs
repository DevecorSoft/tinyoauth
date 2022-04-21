import { DynamoDB } from "@aws-sdk/client-dynamodb";

var dynamodb = new DynamoDB({
  region: "ap-southeast-1",
  endpoint: "http://localhost:8000",
});

var params = {
  TableName: "tinyoauth",
  Item: {
    user: { S: "devecor" },
    password: { S: "guemqnzusmernsbxzaiwmmahwksmdxye" },
  },
};

dynamodb.describeTable(
  {
    TableName: "tinyoauth",
  },
  function (err, data) {
    if (err) {
      console.error(err);
    } else {
      console.log(JSON.stringify(data, null, 2));
    }
  }
);

dynamodb.putItem(params, function (err, data) {
  if (err) {
    console.error(
      "Unable to add item. Error JSON:",
      JSON.stringify(err, null, 2)
    );
  } else {
    console.log("Added item:", JSON.stringify(data, null, 2));
  }
});
