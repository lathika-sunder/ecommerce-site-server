const Product = require('../models/productsModel');

async function getProducts() {
  try {
    const products = await Product.find({}).exec();
    return products;
  } catch (error) {
    throw error;
  }
}

async function addProduct(newProduct) {
  try {
    const product = new Product(newProduct);
    await product.save();
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getProducts,
  addProduct,
};
