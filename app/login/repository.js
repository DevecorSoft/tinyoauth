/**
 * login repository
 * @module login/repository
 */

const {
  GetItemCommand,
  UpdateItemCommand,
  DynamoDBClient,
  GetItemOutput,
  PutItemCommand,
} = require("@aws-sdk/client-dynamodb");

/**
 * @typedef TimeSupplier
 * @type {Object}
 * @property {Function} utc_now - current utc time in format
 */

/**
 * @constructor
 * @param {DynamoDBClient} dynamodb
 * @param {TimeSupplier} timeSuppiler
 */
const login_repository = function (dynamodb, timeSuppiler) {
  this.ddbClient = dynamodb;
  this.timeSuppiler = timeSuppiler;
};

/**
 * find user by username from dynamodb
 * @param {String} username - the key of tinyoauth_user table
 * @returns {GetItemOutput.Item|undefined}
 */
login_repository.prototype.find_user_by_user_name = async function (username) {
  const user = await this.ddbClient.send(
    new GetItemCommand({
      TableName: "tinyoauth_user",
      Key: { username: { S: username } },
    })
  );

  return user.Item?.username ? user.Item : null;
};

/**
 * update user status and operation time
 * @param {String} username
 * @param {Boolean} islogin
 */
login_repository.prototype.update_user_status = async function (
  username,
  islogin
) {
  await this.ddbClient.send(
    new UpdateItemCommand({
      TableName: "tinyoauth_user",
      Key: {
        username: { S: username },
      },
      UpdateExpression: "set user_status = :s, operation_time = :u",
      ExpressionAttributeValues: {
        ":s": { S: islogin ? "online" : "offline" },
        ":u": { S: this.timeSuppiler.utc_now },
      },
    })
  );
};

/**
 * @constructor
 * @param {DynamoDBClient} dynamodb - dynamodb client
 * @param {TimeSupplier} timeSuppiler - time supplier
 */
function client_repository(dynamodb, timeSuppiler) {
  this.ddbClient = dynamodb;
  this.timeSuppiler = timeSuppiler;
}

client_repository.prototype.create_client_identifier = async function (identifier) {
  await this.ddbClient.send(
    new PutItemCommand({
      TableName: "tinyoauth_client",
      Item: {
        user_id: { S: identifier.user_id },
        client_id: { S: identifier.client_id },
        client_secret: { S: identifier.client_secret },
        operation_time: { S: this.timeSuppiler.utc_now },
        creation_time: { S: this.timeSuppiler.utc_now },
      },
    })
  );
};

exports.LoginRepository = login_repository;
exports.ClientRepository = client_repository;
