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
  userNotUpdated,
  unAuthorised,
  userUpdated,
  userDeleted,
  canNotDeleted,
  userFetched,
  notAllowToSeeAllUsers,
  userStatsFetched,
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

exports.updateUser = async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRET_KEY
      ).toString();
    }
    try {
      const user = await User.findByIdAndUpdate(
        { _id: req.params.id },
        { $set: req.body }
      );
      return res.status(201).json({
        message: userUpdated,
        user,
      });
    } catch (err) {
      return res.status(500).json({
        error: err.message,
      });
    }
  } else {
    return res.status(403).json({
      message: unAuthorised,
    });
  }
};

exports.deleteUser = async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      return res.status(201).json({
        message: userDeleted,
      });
    } catch (err) {
      return res.status(500).json({
        error: err.message,
      });
    }
  } else {
    return res.status(403).json({
      message: canNotDeleted,
    });
  }
};

exports.findUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id, {
      username: 1,
      email: 1,
      isAdmin: 1,
      profilePic: 1,
    }).lean();
    return res.status(200).json({
      message: userFetched,
      user,
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

exports.findAllUsers = async (req, res) => {
  const query = req.query.new;
  if (req.user.isAdmin) {
    try {
      const users = query
        ? await User.find().sort({ _id: -1 }).limit(2)
        : await User.find();
      return res.status(200).json({
        message: userFetched,
        records: users.length,
        users,
      });
    } catch (err) {
      return res.status(500).json({
        error: err.message,
      });
    }
  } else {
    return res.status(403).json({
      message: notAllowToSeeAllUsers,
    });
  }
};

exports.userStats = async (req, res) => {
  const today = new Date();
  const lastYear = today.setFullYear(today.setFullYear() - 1);
  const monthsArray = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  try {
    const data = await User.aggregate([
      {
        $project: {
          month: { $month: '$createdAt' },
        },
      },
      {
        $group: {
          _id: '$month',
          total: { $sum: 1 },
        },
      },
    ]);
    return res.status(200).json({
      message: userStatsFetched,
      stats: data,
    });
  } catch (err) {
    return res.status(500).json(err.message);
  }
};
