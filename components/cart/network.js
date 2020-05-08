const express = require("express");
const router = express.Router();
const { verifyTokenFromCookies } = require("../helpers");
const controller = require("./controller");

router.post("/new", verifyTokenFromCookies, async (req, res) => {
  const { productId, quantity } = req.body;
  const currentUser = res.locals.loggedInUser;

  try {
    const newItem = await controller.addItem(
      { productId, quantity },
      currentUser
    );

    res.status(201).send({
      error: "",
      body: newItem,
    });
  } catch (error) {
    throw new Error(error.message);
  }
});

router.get("/", verifyTokenFromCookies, async (req, res) => {
  const userId = res.locals.loggedInUser._id;
  try {
    const items = await controller.getItems(userId);
    res.status(201).send({
      error: "",
      body: items,
    });
  } catch (error) {
    throw new Error(error.message);
  }
});

module.exports = router;
