const { ddbClient } = require("../../db/ddbClient");
const { GetItemCommand } = require("@aws-sdk/client-dynamodb");


exports.find_user_by_user_name = async (username) => {
  const user = await ddbClient.send(
    new GetItemCommand({
      TableName: "tinyoauth_user",
      Key: { username: { S: username } },
    })
  );

  return user.Item
}
