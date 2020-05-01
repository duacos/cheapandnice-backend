const express = require("express");
const router = express.Router();
const { verifyTokenFromCookies } = require("../helpers");
const response = require("../../routes/response");

const controller = require("./controller");

router.post("/new", verifyTokenFromCookies, async (req, res) => {
  const product = req.body;
  console.log(product);

  try {
    const newProduct = await controller.addNewProduct(product);
    response.success(req, res, {
      data: newProduct,
      model: "products",
      filter: "sendOne",
      status: 201,
    });
  } catch (error) {
    throw new Error(error.message);
  }
});

router.get("/list", verifyTokenFromCookies, async (req, res) => {
  try {
    const product = await controller.getProducts();
    response.success(req, res, {
      data: product,
      model: "products",
      filter: "sendAll",
      status: 201,
    });
  } catch (error) {
    throw new Error(error.message);
  }
});

module.exports = router;
