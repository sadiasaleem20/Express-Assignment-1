const mongoose = require("mongoose");

const productSaleSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  sale: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Sale",
  },
  quantity: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("ProductSale", productSaleSchema);
