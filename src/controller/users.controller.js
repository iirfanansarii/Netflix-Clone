const CryptoJS = require('crypto-js');
const User = require('../models/user.model');

const {
  userNotRegistered,
  userRegistered,
  loginSuccess,
  invalidPass,
  invalidUser,
  loginFailed,
} = require('../cosntants/error.message');

exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  const newUser = new User({
    username,
    email,
    password: CryptoJS.AES.encrypt(password, process.env.SECRET_KEY).toString(),
  });
  try {
    const user = await newUser.save();
    return res.status(201).json({
      message: userRegistered,
      user,
    });
  } catch (err) {
    return res.status(400).json({
      message: userNotRegistered,
      error: err,
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
      const originalText = bytes.toString(CryptoJS.enc.Utf8);

      if (originalText === password) {
        return res.status(200).json({
          message: loginSuccess,
          user,
        });
      }
      return res.status(404).json({
        message: invalidPass,
      });
    }
    return res.status(404).json({
      message: invalidUser,
    });
  } catch (err) {
    return res.status(500).json({
      message: loginFailed,
      error: err,
    });
  }
};
