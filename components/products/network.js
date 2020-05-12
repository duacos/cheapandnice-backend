const express = require("express");
const router = express.Router();
const { verifyTokenFromCookies } = require("../helpers");
const { productModel } = require("../helpers/model");
const controller = require("./controller");

router.post("/new", verifyTokenFromCookies, async (req, res) => {
  const product = req.body;

  try {
    const newProduct = await controller.addNewProduct(product);

    res.status(201).send({
      error: "",
      body: productModel(newProduct, "sendOne"),
    });
  } catch (error) {
    res.status(500).send({ error: error.message, body: [] });
  }
});

router.get("/list", async (req, res) => {
  try {
    const products = await controller.getProducts();
    res.status(200).send({
      error: "",
      body: productModel(products, "sendAll"),
    });
  } catch (error) {
    res.status(500).send({ error: error.message, body: [] });
  }
});

router.get("/:productId", async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await controller.getProduct(productId);

    res.status(200).send({
      error: "",
      body: productModel(product, "sendOne"),
    });
  } catch (error) {
    res.status(500).send({ error: error.message, body: [] });
  }
});

router.post("/filter/search", async (req, res) => {
  const searchBody = req.body.search;
  const searchQuery = req.query.search;

  try {
    const products = await controller.getSearched(searchBody, searchQuery);

    res.status(200).send({
      error: "",
      body: productModel(products, "sendAll"),
    });
  } catch (error) {
    res.status(500).send({ error: error.message, body: [] });
  }
});

module.exports = router;
