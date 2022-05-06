/**
 * login repository
 * @module login/repository
 */

const {
  GetItemCommand,
  UpdateItemCommand,
  DynamoDBClient,
  GetItemOutput,
} = require("@aws-sdk/client-dynamodb");

/**
 * @typedef TimeSuppiler
 * @type {Object}
 * @property {Function} utc_now - current utc time in format
 */

/**
 * @constructor
 * @param {DynamoDBClient} dynamodb
 * @param {TimeSuppiler} timeSuppiler
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
      UpdateExpression: "set status = :s, operation_time = :u",
      ExpressionAttributeValues: {
        ":s": { S: islogin ? "online" : "offline" },
        ":u": { S: this.timeSuppiler.utc_now },
      },
    })
  );
};

exports.LoginRepository = login_repository;
