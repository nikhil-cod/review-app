const crypto = require("crypto");
exports.sendError = (res, error, status = 401) => {
  res.status(status).json({ error });
};

exports.generateRandomByte = () => {
  return new Promise((resolve, reject) => {
      crypto.randomBytes(30, (err, buff) => {
          if (err) reject(err);
          const buffString = buff.toString("hex");
          resolve(buffString);
      });
  });
};
