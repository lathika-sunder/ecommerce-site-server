const express = require("express");
const router = express.Router();
const categoriesModel = require("../models/categoriesModel");
const productsController = require("../controllers/productController");
const cartController = require("../controllers/cartController");
const Product = require("../models/productsModel");

router.get("/categories", (req, res) => {
  categoriesModel.getCategories((err, categories) => {
    if (err) {
      res.status(500).send("Error reading data from file");
    } else {
      res.json(categories);
    }
  });
});

router.get("/products", (req, res) => {
  productsController.getProducts((err, products) => {
    if (err) {
      res.status(500).send("Error reading data from file");
    } else {
      res.json(products);
    }
  });
});

router.post("/products", async (req, res) => {
  try {
    const {
      name,
      price,
      price_in_inr,
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
      price_in_inr,
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

router.get("/cart-products", cartController.getCartProducts);
router.post("/cart-products", cartController.addCartProduct);

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
