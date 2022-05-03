const { GetItemCommand } = require("@aws-sdk/client-dynamodb");

const login_repository = function (dynamodb) {
  this.ddbClient = dynamodb;
};

login_repository.prototype.find_user_by_user_name = async function(username) {
  const user = await this.ddbClient.send(
    new GetItemCommand({
      TableName: "tinyoauth_user",
      Key: { username: { S: username } },
    })
  );

  return user.Item.username ? user.Item : null;
};

exports.LoginRepository = login_repository;
