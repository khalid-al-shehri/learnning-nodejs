const productModel = require('../models/product');

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
  getOrders: getOrders
};
