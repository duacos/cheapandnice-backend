const Model = require("./model");

async function createProduct(product) {
  const newProduct = new Model(product);
  return await newProduct.save();
}

async function getAllProducts() {
  return await Model.find({});
}

module.exports = {
  createProduct,
  getAllProducts,
};
