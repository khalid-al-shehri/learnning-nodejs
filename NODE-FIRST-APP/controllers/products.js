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
    productModel.fetchAll((productsFromFile)=>{
        res.render("shop", {
            pageTitle: "shop",
            titleListOfProducts: "My list of products : ",
            products: productsFromFile,
          });
    });
    
  };

module.exports = {
    getAddProduct: getAddProduct,
    postAddProduct: postAddProduct,
    getProducts:getProducts,

}