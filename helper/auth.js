const { getUser } = require("../service/auth");

const checkUser = (req, res, next) => {
  //   console.log(req);
  const userUid = req.cookies?.uid;
  //   console.log("user : ", userUid);
  if (!userUid) return res.render("login");

  const user = getUser(userUid);
  //   console.log("user : ", user);
  if (!user) return res.render("login");

  req.user = user;
  next();
};

module.exports = {
  checkUser,
};
