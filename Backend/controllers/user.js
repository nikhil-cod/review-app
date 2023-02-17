const UserSchema = require("../models/user");

exports.createUser =async (req, resp) => {
  const {name,email,password} = req.body;

  const newUser = new UserSchema({name,email,password});

  await newUser.save();
  resp.json({user:newUser})
};

