const UserSchema = require("../models/user");

exports.createUser =async (req, resp) => {
  const {name,email,password} = req.body;

  //To check the user is already saved
  const olduser = await UserSchema.findOne({email});
  if(olduser) 
    return resp.status(401).json({"error":"User Already Exists!"});

    //Else Below code will be run id user doesnot exists 
  const newUser = new UserSchema({name,email,password});
  await newUser.save();
  resp.status(201).json({user:newUser})
};

