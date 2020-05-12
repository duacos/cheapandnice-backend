const express = require("express");
const router = express.Router();
const controller = require("./controller");
const { verifyTokenFromCookies } = require("../helpers");
const { userModel } = require("../helpers/model");

router.post("/signup", async function (req, res) {
  const { username, password, role } = req.body;

  try {
    const newUser = await controller.signup(username, password, role);

    res.cookie("session", newUser.accessToken, {
      sameSite: false,
      secure: false,
      httpOnly: true,
    });

    res.status(201).send({
      error: "",
      body: userModel(newUser, "sendOne"),
    });
  } catch (e) {
    res.status(500).send({ error: error.message, body: [] });
  }
});

router.post("/login", async function (req, res) {
  const { username, password } = req.body;
  try {
    const user = await controller.login(username, password);

    res.cookie("session", user.accessToken, {
      sameSite: false,
      secure: false,
      httpOnly: true,
    });

    res.status(200).send({
      error: "",
      body: userModel(user, "sendOne"),
    });
  } catch (error) {
    res.status(404).send({
      error: "There was a problem with your authentication",
      body: [],
    });
  }
});

router.delete("/logout", verifyTokenFromCookies, function (req, res) {
  try {
    res.cookie("session", "", {
      expires: new Date(0),
      domain: process.env.DOMAIN,
      path: "/",
    });

    res.status(200).send({
      error: "",
      body: "logout was successful",
    });
  } catch (err) {
    res.status(500).send({ error: error.message, body: [] });
  }
});
// read one user
router.get("/current", verifyTokenFromCookies, async function (req, res) {
  const currentUser = res.locals.loggedInUser;
  try {
    res.status(200).send({
      error: "",
      body: userModel(currentUser, "sendOne"),
    });
  } catch (e) {
    res.status(500).send({ error: error.message, body: [] });
  }
});

module.exports = {
  verifyTokenFromCookies,
  router,
};
