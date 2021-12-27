const jwt = require('jsonwebtoken');

const authToken = (req, res) => {
  const authHeader = req.header.authorization;
  const token = authHeader && authHeader.split()[1];
  return res.send(token);
};

module.exports = authToken;
