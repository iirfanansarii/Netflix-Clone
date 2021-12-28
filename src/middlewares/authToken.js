const jwt = require('jsonwebtoken');
const { tokenNotFound } = require('../cosntants/error.message');

const authToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader && authHeader.split(' ')[1];
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) res.status(403).json('Invalid token');
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json({ message: tokenNotFound });
  }
};

module.exports = authToken;
