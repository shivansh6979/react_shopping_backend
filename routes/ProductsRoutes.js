const {
  createProducts,
  fetchCategories,
} = require("../controllers/ProductsController");

const router = require("express").Router();

router.post("/createProducts", createProducts);
router.get("/categorylist", fetchCategories);

module.exports = router;
