const { userNotRegister, userRegister } = require("../cosntants/error.message");
const User  = require("../models/user.model");


exports.registerUser = async (req,res)=> {
    const { username,email,password } = req.body;
    try {
        const newUser = new User({ username, email, password });
        await newUser.save();
        return res.status(200).json({
          message: userRegister,
          user: newUser,
        });
    } catch (err) {
      return res.status(400).json({
        message: userNotRegister,
        error: err,
      });
    }
}


