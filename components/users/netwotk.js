const express = require("express");
const router = express.Router();
const response = require("../../routes/response");
const controller = require("./controller");
const jwt = require("jsonwebtoken");

const verifyTokenFromCookies = async (req, res, next) => {
  if (req.cookies.session) {
    const token = req.cookies.session;
    // Check if token has expired
    const { userId, exp } = await jwt.verify(token, process.env.JWT_SECRET);
    if (exp < Date.now().valueOf() / 1000) {
      response.error(req, res, "Auth error", "JWT has expired", 401);
    }

    // Save user to res.locals
    res.locals.loggedInUser = await controller
      .getUser(userId)
      .catch((e) => console.log(e));
    next();
  } else {
    next();
  }
};

router.post("/signup", async function (req, res) {
  const { username, password, role } = req.body;

  try {
    // get new user and send it to the reponse object
    const newUser = await controller.signup(username, password, role);
    response.success(req, res, {
      data: newUser,
      model: "users",
      filter: "sendOne",
      status: 201,
    });
  } catch (e) {
    response.error(req, res, "Unexpected Error", e.message, 500);
  }
});

router.post("/login", async function (req, res) {
  const { username, password } = req.body;
  try {
    const user = await controller.login(username, password);
    response.success(req, res, {
      data: user,
      model: "users",
      filter: "sendOne",
      status: 200,
    });
  } catch (err) {
    response.error(req, res, "Unexpected Error", err.message, 404);
  }
});

router.post(
  "/logout",
  controller.allowIfLoggedin,
  verifyTokenFromCookies,
  function (req, res) {
    try {
      response.success(req, res, {
        data: {},
        model: "cookies",
        filter: "destroyCookie",
        status: 200,
      });
    } catch (err) {
      response.error(req, res, "Unexpected Error", err, 404);
    }
  }
);
// read one user
router.get(
  "/:userId",
  controller.allowIfLoggedin,
  verifyTokenFromCookies,
  controller.grantAccess("readOwn", "profile"),
  async function (req, res) {
    const currentUser = res.locals.loggedInUser;
    const userId = req.params.userId;

    try {
      const user = await controller
        .getUser(userId, currentUser)
        .catch((e) => console.log(e));
      response.success(req, res, {
        data: user,
        model: "users",
        filter: "sendOne",
        status: 200,
      });
    } catch (e) {
      response.error(req, res, "Unexpected Error", e, 500);
    }
  }
);

module.exports = {
  verifyTokenFromCookies,
  router,
};
