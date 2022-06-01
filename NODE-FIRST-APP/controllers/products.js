const productModel = require("../models/product");

const getAddProduct = (req, res, next) => {
    res.render("add-product", {pageTitle:"Add new productsss"});
};

const postAddProduct = (req, res, next) => {
    const product = new productModel(req.body.title);
    product.save();
    res.redirect("/");
};

const getProducts = (req, res, next) => {
    const products = productModel.fetchAll();
    console.log(products);
    res.render("shop", {
      pageTitle: "shop",
      titleListOfProducts: "My list of products : ",
      products: products,
    });
  };

module.exports = {
    getAddProduct: getAddProduct,
    postAddProduct: postAddProduct,
    getProducts:getProducts,

}