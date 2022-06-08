/**
 * post client api handler
 * @function
 * @param {request} req - express request
 * @param {response} res - express response
 * @see ClientIdController#handler
 */
exports.clientid = (req, res) => {
  if (!req.header("Authorization")) {
    res.status(401);
  }
  res.send("");
};
