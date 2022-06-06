const productModel = require('../models/product');

const getAddProduct = (req, res, next) => {
  res.render('admin/add-product', {
    pageTitle: 'Add new productsss',
    path: '/admin/add-product',
  });
};

const postAddProduct = (req, res, next) => {
  const product = new productModel(req.body.title);
  product.save();
  res.redirect('/');
};

const getProducts = (req, res, next) => {
  productModel.fetchAll((productsFromFile) => {
    res.render('admin/products', {
      pageTitle: 'Admin Products',
      products: productsFromFile,
      path: '/admin/products',
    });
  });
};

module.exports = {
    getAddProduct: getAddProduct,
    postAddProduct: postAddProduct,
    getProducts: getProducts
}