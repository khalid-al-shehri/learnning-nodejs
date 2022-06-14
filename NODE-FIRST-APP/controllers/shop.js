const { redirect } = require('express/lib/response');
const productModel = require('../models/product');
const cartModel = require('../models/cart');

const getProducts = (req, res, next) => {
  productModel.fetchAll()
  .then(([rows, filedData]) => {
    res.render('shop/product-list', {
      pageTitle: 'All products',
      titleListOfProducts: 'My list of products : ',
      products: rows,
      path: '/products',
    });
  })
  .catch();
};

const getProductsDetails = (req, res, next) => {
  const productId = req.params.productId;
  productModel.fetchProdcut(productId)
  .then(([row, filedData]) => {
    res.render('shop/product-details', {
      product: row[0],
      pageTitle: row[0].title,
      path: '/products',
    });
  })
  .catch();
};

const getIndex = (req, res, next) => {
  productModel.fetchAll()
  .then(([rows, filedData]) => {
    res.render('shop/index', {
      pageTitle: 'shop',
      products: rows,
      path: '/',
      titleListOfProducts: 'My list of products : ',
    });
  })
  .catch();
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
  postCart: postCart,
};
