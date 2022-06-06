const productModel = require('../models/product');

const getAddProduct = (req, res, next) => {
  res.render('admin/add-product', {
    pageTitle: 'Add new productsss',
    path: '/admin/add-product',
  });
};

const postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  const product = new productModel(title, imageUrl, price, description);
  product.save();
  res.redirect('/');
};

const getProducts = (req, res, next) => {
  productModel.fetchAll((productsFromFile) => {
    res.render('admin/products', {
      pageTitle: 'Admin Products',
      products: productsFromFile,
      path: '/admin/products',
      titleListOfProducts: 'List of products in the stores : '
    });
  });
};

module.exports = {
    getAddProduct: getAddProduct,
    postAddProduct: postAddProduct,
    getProducts: getProducts
}