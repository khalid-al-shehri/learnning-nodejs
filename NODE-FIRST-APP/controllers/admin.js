const getAddProduct = (req, res, next) => {
  res.render("admin/add-product", {
    pageTitle: "Add new productsss",
    path: "/admin/add-product",
  });
};

const postAddProduct = (req, res, next) => {
    const product = new productModel(req.body.title);
    product.save();
    res.redirect("/");
  };

module.exports = {
    getAddProduct: getAddProduct,
    postAddProduct: postAddProduct
}