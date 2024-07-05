const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

mongoose.connect("mongodb://localhost/mydatabase", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
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

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
