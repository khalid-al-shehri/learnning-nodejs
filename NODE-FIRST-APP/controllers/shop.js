const { redirect } = require('express/lib/response');
const productModel = require('../models/product');
const cartModel = require('../models/cart');

const getProducts = (req, res, next) => {
  productModel.findAll()
  .then(products => {
    res.render('shop/product-list', {
      pageTitle: 'All products',
      titleListOfProducts: 'My list of products : ',
      products: products,
      path: '/products',
    });
  })
  .catch();
};

const getProductsDetails = (req, res, next) => {
  const productId = req.params.productId;
  // productModel.findAll({where: {id: productId}})
  productModel.findByPk(productId)
  .then(product => {
    res.render('shop/product-details', {
      product: product,
      pageTitle: product.title,
      path: '/products',
    });
  })
  .catch();
};

const getIndex = (req, res, next) => {
  productModel.findAll()
  .then(products => {
    res.render('shop/index', {
      pageTitle: 'shop',
      products: products,
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
