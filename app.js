const express = require("express");
const fs = require("fs");
const app = express();
const cors = require("cors");


const cartProductsPath = 'cart-products.json';

app.use(express.json()); // for parsing application/json
app.use(cors());

const dataPath = 'categories-data.json';
const productDataPath = 'product-data.json';

app.get("/api/categories", (request, response) => {
  fs.readFile(dataPath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      response.status(500).send("Error reading data from file");
    } else {
      const categories = JSON.parse(data);
      response.json(categories);
    }
  });
});

app.get("/api/products", (request, response) => {
  fs.readFile(productDataPath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      response.status(500).send("Error reading data from file");
    } else {
      const products = JSON.parse(data);
      response.json(products);
    }
  });
});


app.post("/api/cart-products", (request, response) => {
  const newCartProducts = request.body; // Assuming the request body contains an array of products

  // Read existing cart products data
  fs.readFile(cartProductsPath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      response.status(500).send("Error reading cart products data from file");
    } else {
      try {
        let cartProducts = JSON.parse(data);

        // Ensure cartProducts is an array, or initialize it as an empty array if it's not
        if (!Array.isArray(cartProducts)) {
          cartProducts = [];
        }

        // Add new cart products to cartProducts array
        cartProducts.push(...newCartProducts);

        // Write updated cart products data back to the file
        fs.writeFile(cartProductsPath, JSON.stringify(cartProducts), (err) => {
          if (err) {
            console.error(err);
            response.status(500).send("Error writing cart products data to file");
          } else {
            response.status(200).send("Cart products updated successfully");
          }
        });
      } catch (parseError) {
        console.error(parseError);
        response.status(500).send("Error parsing existing cart products data");
      }
    }
  });
});


app.post("/api/products", (request, response) => {
  const newProducts = request.body; // Assuming the request body contains an array of products

  // Read existing cart products data
  fs.readFile(productDataPath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      response.status(500).send("Error reading cart products data from file");
    } else {
      try {
        let products = JSON.parse(data);

        // Ensure cartProducts is an array, or initialize it as an empty array if it's not
        if (!Array.isArray(products)) {
          products = [];
        }

        // Add new cart products to cartProducts array
        products.push(newProducts);

        // Write updated cart products data back to the file
        fs.writeFile(productDataPath, JSON.stringify(products), (err) => {
          if (err) {
            console.error(err);
            response.status(500).send("Error writing cart products data to file");
          } else {
            response.status(200).send("Cart products updated successfully");
          }
        });
      } catch (parseError) {
        console.error(parseError);
        response.status(500).send("Error parsing existing cart products data");
      }
    }
  });
});

// GET endpoint to retrieve cart products
app.get("/api/cart-products", (request, response) => {
  // Read cart products data from the file
  fs.readFile(cartProductsPath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      response.status(500).send("Error reading cart products data from file");
    } else {
      try {
        const cartProducts = JSON.parse(data);
        response.status(200).json(cartProducts);
      } catch (parseError) {
        console.error(parseError);
        response.status(500).send("Error parsing cart products data");
      }
    }
  });
});


app.delete("/api/cart-products/:id", (req, res) => {
  // Handle removing item from the cart based on its ID
  const itemId = req.params.id;
  const cartProducts = JSON.parse(fs.readFileSync(cartProductsPath, "utf8"));
  const updatedCartProducts = cartProducts.filter((item) => item.id !== itemId);
  fs.writeFileSync(cartProductsPath, JSON.stringify(updatedCartProducts));
  res.status(204).send(); // Send a success response with no content
});



const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
