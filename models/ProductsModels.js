const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required,
    unique,
  },
  price: {
    type: Number,
    required,
  },
  description: {
    type: String,
    required,
  },
  StockStatus: {
    type: Number,
    required,
  },
  filedata: {
    type: Uint8Array,
  },
});

const Product = mongoose.model("products", productSchema);
module.exports = Product;
