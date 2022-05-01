exports.login = (req, res) => {
  const username = req.body?.username;
  const password = req.body?.password;
  res.json({
    result: "succeeded"
  })
};
