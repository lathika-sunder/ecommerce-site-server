const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  quantity_unit: {
    type: String,
    // required: true
  },
  category: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  }
});


const CartProduct = mongoose.model('CartProduct', cartSchema, 'cartproducts');

module.exports = CartProduct;
