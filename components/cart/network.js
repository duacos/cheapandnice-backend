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
    res.status(500).send({ error: error.message, body: {} });
  }
});
// get shopping cart by user id
router.get("/", verifyTokenFromCookies, async (req, res) => {
  const userId = res.locals.loggedInUser._id;
  try {
    const items = await controller.getItems(userId);
    res.status(200).send({
      error: "",
      body: items,
    });
  } catch (error) {
    res.status(500).send({ error: error.message, body: {} });
  }
});

router.patch("/remove/product", verifyTokenFromCookies, async (req, res) => {
  const { cartId, productId } = req.body;

  try {
    const cart = await controller.removeItem(cartId, productId);
    res.status(200).send({
      error: "",
      body: cart,
    });
  } catch (error) {
    res.status(500).send({ error: error.message, body: {} });
  }
});

module.exports = router;
