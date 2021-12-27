const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
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
  } catch (error) {
    return res.status(400).json({
      message: userNotRegistered,
      error: error.message,
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne(
      { email },
      { password: 1, isAdmin: 1 }
    ).lean();
    if (user) {
      const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
      const originalText = bytes.toString(CryptoJS.enc.Utf8);
      const accessToken = jwt.sign(
        {
          id: user._id,
          isAdmin: user.isAdmin,
        },
        process.env.SECRET_KEY,
        { expiresIn: '1h' }
      );
      if (originalText === password) {
        return res.status(200).json({
          message: loginSuccess,
          user: { ...user, accessToken },
        });
      }
      return res.status(404).json({
        message: invalidPass,
      });
    }
    return res.status(404).json({
      message: invalidUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: loginFailed,
      error: error.message,
    });
  }
};

// exports.getUser = (req, res) => {
//   const { id } = req.params;
//   const user = User.find({ id });

//   return res.send({
//     message: 'Heloo',
//     user,
//   });
//   // if (user) {
//   //   return res.send(user);
//   // }
// };

/* 
Delete
Update 
get 
get all
get user stats

*/
