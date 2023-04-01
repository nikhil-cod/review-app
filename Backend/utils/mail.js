const nodemailer = require("nodemailer");
exports.madeOTP = (otpLength) => {
  let OTP = "";
  for (let i = 0; i < otpLength; i++) {
    const randomVal = Math.round(Math.random() * 9);
    OTP += randomVal;
  }
  return OTP;
};

exports.generateMailTransporter = () => {
  return nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "c157121cc5b7d8",
      pass: "5ae6381e0987f5",
    },
  });
};
