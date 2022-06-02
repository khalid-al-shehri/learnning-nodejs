const express = require("express");
const router = express.Router();
const productController = require("../controllers/shop");

router.get("/", productController.getProducts);
router.get("/products", productController.getProducts);
router.get("/cart", productController.getProducts);
router.get("/checkout", productController.getProducts);

module.exports = router;
