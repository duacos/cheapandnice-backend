const express = require("express");
const router = express.Router();
const response = require("../../routes/response");
const controller = require("./controller");
const { verifyTokenFromCookies } = require("../helpers");

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

router.post("/logout", verifyTokenFromCookies, function (req, res) {
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
});
// read one user
router.get("/store", verifyTokenFromCookies, async function (req, res) {
  const username = req.body.username;
  const currentUser = res.locals.loggedInUser;

  try {
    const user = await controller.getUser(username, currentUser);

    response.success(req, res, {
      data: user,
      model: "users",
      filter: "sendOne",
      status: 200,
    });
  } catch (e) {
    response.error(req, res, "Unexpected Error", e.message, 500);
  }
});

module.exports = {
  verifyTokenFromCookies,
  router,
};
