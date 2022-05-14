const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");

/**
 * @constructor
 * @param {DynamoDBClient} dynamodb
 */
function register_repository(dynamodb) {
  this.ddbclient = dynamodb;
}

register_repository.prototype.create_user = function (username, passowrd) {
  this.ddbclient.send(new PutItemCommand({
    TableName: "tinyoauth_user",
    Item: {
      username: { S: username },
      password: { S: passowrd },
      user_status: { S: "online" },
      operation_time: { S: "Wed, 14 Jun 2017 07:00:00 GMT" },
    },
  }));
};

exports.RegisterRepository = register_repository;
