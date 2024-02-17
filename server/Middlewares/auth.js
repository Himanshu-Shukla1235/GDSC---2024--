const jwt = require("jsonwebtoken");
const { UnauthenciatedError } = require("../Errors/index");
const User = require("../Models/User");

const authorizationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new UnauthenciatedError("No token provided"));
  }
  const token = authHeader.split(" ")[1];
  // console.log(token)

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const { userId, username } = decoded;

    const user = await User.find({ _id: userId });
    console.log(user[0]);
    const avatar = user[0].avatar;

    req.user = { userId, username, avatar };

    // console.log(req.user);
  } catch (error) {
    return next(new UnauthenciatedError("No authorized to access this route"));
  }
  // console.log(req.headers.authorization)
  next();
};

module.exports = authorizationMiddleware;
