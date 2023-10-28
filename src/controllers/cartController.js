const { client } = require('../db/db');
const Cart=require("../models/cartModel")
function getCartProducts(callback) {
  
  const db = client.db('products'); 
  const collection = db.collection('cart-products'); 

  collection.find({}).toArray((err, cartProducts) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, cartProducts); // Corrected line: Return cartProducts instead of products
    }
  });
}

function addCartProduct(newCartProduct, callback) {
  const db = client.db('products'); // Replace 'yourdbname' with your database name
  const collection = db.collection('cart-products'); // Assuming your collection name is 'products'

  collection.insertOne(newCartProduct, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null);
    }
  });
}

module.exports = {
  getCartProducts,
  addCartProduct,
};
