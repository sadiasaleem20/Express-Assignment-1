const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/express";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

app.use(bodyParser.json());
app.use(cors());

const userRoute = require("./routes/user.route");
const categoryRoute = require("./routes/category.route");
const productRoute = require("./routes/product.route");
const saleRoute = require("./routes/sale.route");
const productSaleRoute = require("./routes/productSale.route");

app.use("/api/users", userRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/products", productRoute);
app.use("/api/sales", saleRoute);
app.use("/api/productSales", productSaleRoute);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
