const Product = require("../models/ProductsModels");

const createProducts = async (req, res) => {
  const {
    image,
    StockStatus,
    description,
    price,
    name,
    SubCategory,
    Category,
  } = req.body;
  if (
    !image ||
    !StockStatus ||
    !description ||
    !price ||
    !name ||
    !Category ||
    !SubCategory
  ) {
    return res.status(400).json({
      status: "FAILED",
      msg: "Bad Request! Insufficient Data",
    });
  } else {
    const exists = await Product.find({ name });
    if (exists) {
      return res
        .status(200)
        .json({ status: "FAILED", msg: "ITEM ALREADY EXISTS!" });
    }
    const response = await Product.create({
      name,
      price,
      description,
      StockStatus,
      image,
      Category,
      SubCategory,
    });
    return res.status(201).json({
      status: "SUCCESS",
      msg: "Item Created Successfully",
      response: response._doc,
    });
  }
};

const fetchCategories = async (req, res) => {};

module.exports = {
  createProducts,
  fetchCategories,
};
