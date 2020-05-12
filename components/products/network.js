const express = require("express");
const router = express.Router();
const { verifyTokenFromCookies } = require("../helpers");
const response = require("../../routes/response");

const controller = require("./controller");

router.post("/new", verifyTokenFromCookies, async (req, res) => {
  const product = req.body;

  try {
    const newProduct = await controller.addNewProduct(product);

    res.status(201).send({
      error: "",
      body: {
        _id: newProduct._id,
        title: newProduct.title,
        price: newProduct.price,
        photos: newProduct.photos.map((photoArray) => {
          return {
            fullsize: photoArray[0],
            thumbnail: photoArray[1],
          };
        }),

        description: newProduct.description,
        type: newProduct.type,
      },
    });
  } catch (error) {
    res.status(500).send({ error: error.message, body: [] });
  }
});

router.get("/list", async (req, res) => {
  try {
    const products = await controller.getProducts();
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
  const searchBody = req.body.search;
  const searchQuery = req.query.search;

  try {
    const products = await controller.getSearched(searchBody, searchQuery);

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
