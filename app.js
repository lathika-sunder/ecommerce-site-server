const express = require("express");
const cors = require("cors");
const apiRoutes = require("./src/routes/apiRoutes");
const connectToDatabase=require("./src/db/db")

const app = express();
app.use(express.json());
app.use(cors());

connectToDatabase()
app.use("/", apiRoutes);



const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
