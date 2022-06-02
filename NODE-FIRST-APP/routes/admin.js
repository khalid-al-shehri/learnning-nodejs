const express = require('express');
const router = express.Router();
const productController = require("../controllers/shop");

// /admin/add-product ==> GET
router.get("/add-product", productController.getAddProduct);

// /admin/products ==> GET
router.post("/products", productController.postAddProduct);

// /admin/add-product ==> POST
router.post("/add-product", productController.postAddProduct);

module.exports = router;