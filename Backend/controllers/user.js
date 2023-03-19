const UserSchema = require("../models/user");
const nodemailer = require("nodemailer");
const EmailVerificationToken = require("../models/emailVerificationToken");
const { isValidObjectId } = require("mongoose");
const User = require("../models/user");

exports.createUser = async (req, resp) => {
  const { name, email, password } = req.body;

  //To check the user is already saved
  const olduser = await UserSchema.findOne({ email });
  if (olduser) return resp.status(401).json({ error: "User Already Exists!" });

  //Else Below code will be run id user doesnot exists
  const newUser = new UserSchema({ name, email, password });
  await newUser.save();

  //Generate 6 digit OTP

  let OTP = "";
  for (let i = 0; i <= 5; i++) {
    const randomVal = Math.round(Math.random() * 9);
    OTP += randomVal;
  }

  //Store OTP insider our DB
  const newEmailVerification = new EmailVerificationToken({
    owner: newUser._id,
    token: OTP,
  });

  await newEmailVerification.save();

  //Send OTP to user

  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "c157121cc5b7d8",
      pass: "5ae6381e0987f5",
    },
  });
  console.log("OTP ==>", OTP);
  transport.sendMail({
    from: "verify@reviewapp.com",
    to: newUser.email,
    subject: "Email Verification",
    html: `
    <h3>Your OTP is ${OTP}
    </h3>
    `,
  });

  resp.status(201).json({ message: "OTP has been sent to your email" });
};

exports.verifyEmail = async (req, res) => {
  const { userId, OTP } = req.body;

  if (!isValidObjectId(userId))
    return res.json({
      error: "Invalid User Id",
    });

  const user = await User.findById(userId);

  if (!user) return res.json({ error: "User Not Found!" });

  if (user.isVerified)
    return res.json({
      error: "User is already verified!",
    });

  const token = await EmailVerificationToken.findOne({ owner: userId });

  if (!token) return res.json({ error: "Token not found!" });

  const isMatced = await token.compareToken(OTP);

  if (!isMatced)
    return res.json({
      error: "Please Submit a valid OTP",
    });

  user.isVerified = true;

  await user.save();

  EmailVerificationToken.findByIdAndDelete(token._id);

  res.json({
    message: "Your email is verified",
  });

  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "c157121cc5b7d8",
      pass: "5ae6381e0987f5",
    },
  });
  transport.sendMail({
    from: "verify@reviewapp.com",
    to: user.email,
    subject: "Verification Successful!",
    html: `
    <h2>Welcome to review app!!
    </h2>
    `,
  });
};
