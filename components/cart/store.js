const Model = require("./model");
const ProductModel = require("../products/model");

async function addItemToCart({ productId, quantity }, currentUser) {
  // find the cart where userId is the current loggedin user
  const cart = await Model.findOne({ userId: currentUser._id });
  const product = await ProductModel.findOne({ _id: productId });
  if (cart) {
    //cart exists for user
    let itemIndex = cart.products.findIndex((p) => p.productId == productId);

    if (itemIndex > -1) {
      //product exists in the cart, update the quantity
      const productItem = cart.products[itemIndex];
      productItem.quantity = quantity;
      cart.products[itemIndex] = productItem;
    } else {
      //product does not exists in cart, add new item
      cart.products.push({
        productId,
        quantity: quantity,
        name: product.title,
        photo: product.photos[0][0],
        price: product.price,
      });
    }
    return await cart.save();
  } else {
    //no cart for user, create new cart
    const newCart = await Model.create({
      userId: currentUser._id,
      products: [
        {
          productId,
          quantity: quantity,
          name: product.title,
          photo: product.photos[0][0],
          price: product.price,
        },
      ],
    });

    return await newCart.save();
  }
}

async function getAllItems(userId) {
  return await Model.findOne({ userId }, { userId: 0 });
}

async function removeItemFromCart(cartId, productId) {
  return await Model.updateOne({
    _id: cartId,
    $pull: { products: { productId: productId } },
  });
}

module.exports = {
  addItemToCart,
  getAllItems,
  removeItemFromCart,
};
