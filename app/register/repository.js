/**
 * repositories of post register api
 * @module app/register/repository
 */

const { PutItemCommand } = require("@aws-sdk/client-dynamodb");

/**
 * @alias RegisterRepository
 * @constructor
 * @param {DynamoDBClient} dynamodb - dynamodb client
 * @param {TimeSupplier} time_suppiler - time supplier
 */
function register_repository(dynamodb, time_suppiler) {
  this.ddbclient = dynamodb;
  this.time_suppiler = time_suppiler;
}

/**
 * put user info as an item into dynamodb
 * @param {String} username - user name
 * @param {String} passowrd - password
 * @param {String} user_id - generated user id
 * @returns {Promise<void>}
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

/**
 * @class
 */
exports.RegisterRepository = register_repository;
