
const products = [];

const getAddProduct = (req, res, next) => {
    res.render("add-product", {pageTitle:"Add new productsss"});
};

const postAddProduct = (req, res, next) => {
    console.log(req.body["title"]);
    products.push({title: req.body.title});
    res.redirect("/");
};

const getProducts = (req, res, next) => {
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
    products: products
}