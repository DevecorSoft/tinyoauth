const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");

/**
 * @constructor
 * @param {DynamoDBClient} dynamodb
 * @param {import("../login/repository").TimeSupplier} time_suppiler - time supplier
 */
function register_repository(dynamodb, time_suppiler) {
  this.ddbclient = dynamodb;
  this.time_suppiler = time_suppiler;
}

/**
 * put user info as an item into dynamodb
 * @param {String} username
 * @param {String} passowrd
 */
register_repository.prototype.create_user = async function (
  username,
  passowrd,
  user_id
) {
  await this.ddbclient.send(
    new PutItemCommand({
      TableName: "tinyoauth_user",
      Item: {
        username: { S: username },
        user_id: { S: user_id },
        password: { S: passowrd },
        user_status: { S: "online" },
        operation_time: { S: this.time_suppiler.utc_now },
        creation_time: { S: this.time_suppiler.utc_now },
      },
    })
  );
};

exports.RegisterRepository = register_repository;
