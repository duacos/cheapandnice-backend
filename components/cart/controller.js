const store = require("./store");

async function addItem({ productId, quantity }, currentUser) {
  return await store.addItemToCart({ productId, quantity }, currentUser);
}

async function removeItem(cartId, productId) {
  if (!cartId) throw new Error("cartId is not defined");
  if (!productId) throw new Error("productId is not defined");
  return await store.removeItemFromCart(cartId, productId).catch((e) => {
    throw new Error(e.message);
  });
}

async function getItems(userId) {
  return store.getAllItems(userId);
}

module.exports = {
  addItem,
  getItems,
  removeItem,
};
