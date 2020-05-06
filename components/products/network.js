const express = require("express");
const router = express.Router();
const { verifyTokenFromCookies } = require("../helpers");
const response = require("../../routes/response");

const controller = require("./controller");

router.post("/new", verifyTokenFromCookies, async (req, res) => {
  const product = req.body;

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

router.get("/list", async (req, res) => {
  try {
    const product = await controller.getProducts();
    response.success(req, res, {
      data: product,
      model: "products",
      filter: "sendAll",
      status: 200,
    });
  } catch (error) {
    throw new Error(error.message);
  }
});

router.get("/filtered", async (req, res) => {
  const { filter } = req.body;

  try {
    const product = await controller.getFiltered(filter);
    response.success(req, res, {
      data: product,
      model: "products",
      filter: "sendAll",
      status: 200,
    });
  } catch (error) {
    throw new Error(error.message);
  }
});

router.get("/:productId", async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await controller.getProduct(productId);

    response.success(req, res, {
      data: product,
      model: "products",
      filter: "sendOne",
      status: 200,
    });
  } catch (error) {
    throw new Error(error.message);
  }
});

router.post("/filter/search", async (req, res) => {
  const { search } = req.body;

  try {
    const products = await controller.getSearched(search);

    response.success(req, res, {
      data: products,
      model: "products",
      filter: "sendAll",
      status: 200,
    });
  } catch (error) {
    throw new Error(error.message);
  }
});

module.exports = router;
