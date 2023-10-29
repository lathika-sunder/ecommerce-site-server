const CartProduct = require('../models/cartModel');

async function getCartProducts() {
  try {
    const cartProducts = await CartProduct.find({});
    return cartProducts;
  } catch (error) {
    throw error;
  }
}

async function addCartProduct(newProduct) {
  try {
    const cartProduct = new CartProduct(newCartProduct);
    await cartProduct.save();
  } catch (error) {
    throw error;
  }
}
// cartController.js

// cartController.js

// cartController.js

const removeFromCart = async (itemId) => {
  try {
    const removedItem = await CartProduct.findByIdAndRemove(itemId);
    return removedItem;
  } catch (error) {
    // Handle errors here
    throw new Error("Error removing item from cart: " + error.message);
  }
};

module.exports = {
  getCartProducts,
  addCartProduct,
  removeFromCart,
};
