const productModel = require("../models/product");



const getProducts = (req, res, next) => {
  productModel.fetchAll((productsFromFile) => {
    res.render("shop/product-list", {
      pageTitle: "shop",
      titleListOfProducts: "My list of products : ",
      products: productsFromFile,
      path: "/",
    });
  });
};

module.exports = {
  getProducts: getProducts,
};
