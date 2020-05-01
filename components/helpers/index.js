const jwt = require("jsonwebtoken");
const userController = require("../users/controller");

module.exports.verifyTokenFromCookies = async (req, res, next) => {
  if (req.cookies.session) {
    const token = req.cookies.session;
    // Check if token has expired
    const { userId, exp } = await jwt.verify(token, process.env.JWT_SECRET);

    if (exp < Date.now().valueOf() / 1000) {
      response.error(req, res, "Auth error", "JWT has expired", 401);
    }

    // Save user to res.locals
    res.locals.loggedInUser = await userController
      .getById(userId)
      .catch((e) => console.log(e));
    next();
  } else {
    response.error(req, res, "No JWT provided", "Authentication error", 401);
  }
};
