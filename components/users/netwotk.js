const express = require("express");
const router = express.Router();
const controller = require("./controller");
const { verifyTokenFromCookies } = require("../helpers");

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
      body: {
        _id: newUser._id,
        username: newUser.username,
        role: newUser.role,
      },
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
      body: {
        username: user.username,
        _id: user._id,
      },
    });
  } catch (error) {
    res.status(500).send({ error: error.message, body: [] });
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
      body: "logout successful",
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
      body: {
        _id: currentUser._id,
        username: currentUser.username,
        role: currentUser.role,
      },
    });
  } catch (e) {
    res.status(500).send({ error: error.message, body: [] });
  }
});

module.exports = {
  verifyTokenFromCookies,
  router,
};
