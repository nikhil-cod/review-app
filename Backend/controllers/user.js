exports.createUser = (req, resp) => {
  console.log(req.body)
  resp.send("User router with nodemon");
};

