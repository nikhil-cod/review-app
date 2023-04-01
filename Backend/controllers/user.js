const UserSchema = require("../models/user");
const EmailVerificationToken = require("../models/emailVerificationToken");
const { isValidObjectId } = require("mongoose");
const User = require("../models/user");
const { madeOTP, generateMailTransporter } = require("../utils/mail");
const PasswordResetToken = require("../models/passwordResetToken");
const { sendError, generateRandomByte } = require("../utils/helper");

exports.createUser = async (req, resp) => {
  const { name, email, password } = req.body;

  //To check the user is already saved
  const olduser = await UserSchema.findOne({ email });
  if (olduser) return resp.status(401).json({ error: "User Already Exists!" });

  //Else Below code will be run id user doesnot exists
  const newUser = new UserSchema({ name, email, password });
  await newUser.save();

  //Generate 6 digit OTP
  let OTP = madeOTP(6);

  //Store OTP insider our DB
  const newEmailVerification = new EmailVerificationToken({
    owner: newUser._id,
    token: OTP,
  });

  await newEmailVerification.save();

  //Send OTP to user

  var transport = generateMailTransporter();

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

  // if (!user) return res.json({ error: "User Not Found!" });
  if (!user) return sendError(res, "User Not Found!");

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

  var transport = generateMailTransporter();
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

exports.resendEmailVerificationToken = async (req, res) => {
  console.log("Request ===> ", req.body);
  const { userId } = req.body;

  const user = await User.findById(userId);

  if (!user) return sendError(res, "User not found", 404);

  if (user.isVerified)
    return res.json({
      error: "This email is already verified",
    });

  const token = await EmailVerificationToken.findOne({
    owner: userId,
  });

  if (token)
    res.json({
      error: "Only after one hour you can request for another token.",
    });

  let OTP = "";
  for (let i = 0; i <= 5; i++) {
    const randomVal = Math.round(Math.random() * 9);
    OTP += randomVal;
  }

  var transport = generateMailTransporter();

  transport.sendMail({
    from: "verify@reviewapp.com",
    to: user.email,
    subject: "Email Verification",
    html: `
    <h3>Your OTP is ${OTP}
    </h3>
    `,
  });
  res.json({
    message: "OTP sent to your Mail",
  });
};

exports.forgetPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) return sendError(res, "email is missing!");

  const user = await User.findOne({ email });
  if (!user) return sendError(res, "User not found!", 404);

  const alreadyHasToken = await PasswordResetToken.findOne({ owner: user._id });
  if (alreadyHasToken)
    return sendError(
      res,
      "Only after one hour you can request for another token!"
    );

  const token = await generateRandomByte();
  const newPasswordResetToken = await PasswordResetToken({
    owner: user._id,
    token,
  });
  await newPasswordResetToken.save();

  const resetPasswordUrl = `http://localhost:3000/reset-password?token=${token}&id=${user._id}`;

  const transport = generateMailTransporter();

  transport.sendMail({
    from: "security@reviewapp.com",
    to: user.email,
    subject: "Reset Password Link",
    html: `
      <p>Click here to reset password</p>
      <a href='${resetPasswordUrl}'>Change Password</a>
    `,
  });

  res.json({ message: "Link sent to your email!" });
};