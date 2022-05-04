const {
  GetItemCommand,
  UpdateItemCommand,
} = require("@aws-sdk/client-dynamodb");

const login_repository = function (dynamodb, docClient, timeSuppiler) {
  this.ddbClient = dynamodb;
  this.ddbDocClient = docClient;
  this.timeSuppiler = timeSuppiler;
};

login_repository.prototype.find_user_by_user_name = async function (username) {
  const user = await this.ddbClient.send(
    new GetItemCommand({
      TableName: "tinyoauth_user",
      Key: { username: { S: username } },
    })
  );

  return user.Item.username ? user.Item : null;
};

login_repository.prototype.update_user_status = async function (
  username,
  islogin
) {
  await this.ddbDocClient.send(
    new UpdateItemCommand({
      TableName: "tinyoauth_user",
      Key: {
        username: username,
      },
      UpdateExpression: "set status = :s, operation_time = :u",
      ExpressionAttributeValues: {
        ":s": { S: islogin ? "online" : "offline" },
        ":u": { S: this.timeSuppiler.utc_now },
      },
    })
  );
};

exports.LoginRepository = login_repository;
