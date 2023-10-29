const express = require("express");
const router = express.Router();
const categoriesController = require("../controllers/categoriesController");
const productsController = require("../controllers/productController");
const cartController = require("../controllers/cartController");
const Product = require("../models/productsModel");
const CartProduct = require("../models/cartModel");

router.get("/categories", (req, res) => {
  categoriesController.getCategories((err, categories) => {
    if (err) {
      res.status(500).send("Error reading data from file");
    } else {
      res.json(categories);
    }
  });
});

// Define a route to fetch data from MongoDB
router.get('/products', async (req, res) => {
  try {
      // Fetch products from the MongoDB database
      const products = await Product.find();
      // Send the products as JSON response
      res.json(products);
  } catch (error) {
      // Handle errors, e.g., send an error response
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post("/products", async (req, res) => {
  try {
    const {
      name,
      price,
      description,
      rating,
      quantity,
      quantity_unit,
      category,
      image,
    } = req.body;
    const newProduct = new Product({
      name,
      price,
      description,
      rating,
      quantity,
      quantity_unit,
      category,
      image,
    });
    const savedProduct = newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("Error saving product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/cart-products", async (req, res) => {
  try {
    const {
      name,
      price,
      description,
      rating,
      quantity,
      quantity_unit,
      category,
      image,
    } = req.body;
    const newCartProduct = new CartProduct({
      name,
      price,
      description,
      rating,
      quantity,
      quantity_unit,
      category,
      image,
    });
    const savedCartProduct = newCartProduct.save();
    res.status(201).json(savedCartProduct);
  } catch (error) {
    console.error("Error saving product to cart:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// Define a route to fetch data from MongoDB
router.get('/cart-products', async (req, res) => {
  try {
      // Fetch products from the MongoDB database
      const cartproducts = await CartProduct.find();
      // Send the products as JSON response
      res.json(cartproducts);
  } catch (error) {
      // Handle errors, e.g., send an error response
      res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.delete("/cart-products/:id", (req, res) => {
  const itemId = req.params.id;
  cartController.removeFromCart(itemId, (err) => {
    if (err) {
      res.status(500).send("Error removing item from cart");
    } else {
      res.status(204).send();
    }
  });
});

module.exports = router;
