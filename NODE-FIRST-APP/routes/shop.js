const path = require("path");
const express = require("express");
const rootDir = require("../util/path");
const router = express.Router();

const adminData = require("./admin");

router.get("/", (req, res, next) => {
  console.log(adminData.products);
  res.render("shop", {
    pageTitle: "shop",
    titleListOfProducts: "My list of products : ",
    products: adminData.products,
  });
});

module.exports = router;
