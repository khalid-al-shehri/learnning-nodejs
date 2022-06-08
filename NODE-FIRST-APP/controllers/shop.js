const { redirect } = require('express/lib/response');
const productModel = require('../models/product');
const cartModel = require('../models/cart');

const getProducts = (req, res, next) => {
  productModel.fetchAll((productsFromFile) => {
    res.render('shop/product-list', {
      pageTitle: 'All products',
      titleListOfProducts: 'My list of products : ',
      products: productsFromFile,
      path: '/products',
    });
  });
};

const getProductsDetails = (req, res, next) => {
  const productId = req.params.productId;
  productModel.fetchProdcut(productId, productFromFile => {
    res.render('shop/product-details', {
      product: productFromFile,
      pageTitle: productFromFile.title,
      path: '/products',
    });
  });
};

const getIndex = (req, res, next) => {
  productModel.fetchAll((productsFromFile) => {
    res.render('shop/index', {
      pageTitle: 'shop',
      products: productsFromFile,
      path: '/',
      titleListOfProducts: 'My list of products : ',
    });
  });
};

const getCart = (req, res, next) =>{
  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Cart'
  });
};

const postCart = (req, res, next) =>{
  const productID = req.body.productID;
  const productPrice = req.body.productPrice;
  cartModel.addProduct(productID, productPrice);
  res.redirect("/cart");
};

const getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};

const getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Orders'
  });
};

module.exports = {
  getProducts: getProducts,
  getIndex: getIndex,
  getCart: getCart,
  getCheckout: getCheckout,
  getOrders: getOrders,
  getProductsDetails: getProductsDetails,
  postCart: postCart
};
