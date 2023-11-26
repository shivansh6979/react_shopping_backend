const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  Category: {
    type: String,
  },
  SubCategory: {
    type: String,
  },
  StockStatus: {
    type: Number,
    required: true,
  },
  image: {
    data: Buffer,
  },
});

const Product = mongoose.model("products", productSchema);
module.exports = Product;
