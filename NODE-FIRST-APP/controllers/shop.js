const { redirect } = require('express/lib/response');
const Product = require('../models/product');
const Order = require('../models/order');
const { json } = require('body-parser');

const getProducts = (req, res, next) => {
  Product.findAll()
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
  // Product.findAll({where: {id: productId}})
  return Product.findByPk(productId)
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
  Product.findAll()
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

const getCart = (req, res, next) => {
  req.user.getCart()
  .then(cart => {
    return cart.getProducts();
  })
  .then(products => {
      res.render('shop/cart', {
      path: '/cart',
      pageTitle: 'Cart',
      titleListOfProducts: 'Products in cart :',
      products: products
    });
  })
  .catch();
};

const postCart = (req, res, next) =>{
  const productID = req.body.productID;
  let fetchedCart;
  let newQuantity = 1;
  req.user.getCart()
  .then(cart => {
    fetchedCart = cart;
    return cart.getProducts({where: {id: productID}});
  })
  .then(products => {
    let product;
    if(products.length > 0){
      product = products[0];
    }
    if(product){
      newQuantity += product.cartItem.quantity;
    }
    return Product.findByPk(productID)
  })
  .then(product => {
    return fetchedCart.addProduct(
      product, 
      { 
        through: { 
          quantity : newQuantity
        },
      },
    );
  })
  .then(() => {
    res.redirect("/cart");
  })
  .catch();
};

const deleteItemCart = (req, res, next) => {
  const productID = req.params.productId;
  req.user.getCart()
  .then(cart => {
    return cart.getProducts({where: {id: productID}});
  })
  .then(products => {
    const product = products[0];
    product.cartItem.destroy();
  })
  .then(() =>{
    res.redirect('/cart');
  })
  .catch()
}

const getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};

const postOrder = (req, res, next) => {

  let fetchedProducts;
  let fetchedCart;
  req.user.getCart()
  .then(cart => {
    fetchedCart = cart;
    return cart.getProducts();
  })
  .then(products => {
    fetchedProducts = products;
    return req.user.createOrder();
  })
  .then(order => {
    return order.addProducts(
      fetchedProducts.map(
        product => {
          product.orderItem = { quantity: product.cartItem.quantity };
          return product;
        },
      ),
    );
  })
  .then(() => {
    return fetchedCart.setProducts(null);
  })
  .then(results => {
    res.redirect('/orders');
  })
  .catch();
}

const getOrders = (req, res, next) => {
  req.user.getOrders({include: ['products']})
  .then(orders => {
    res.render('shop/orders', {
      path: '/orders',
      pageTitle: 'Orders',
      orders: orders
    });
  })
  .catch();
  
};

module.exports = {
  getProducts: getProducts,
  getIndex: getIndex,
  getCart: getCart,
  getCheckout: getCheckout,
  getOrders: getOrders,
  getProductsDetails: getProductsDetails,
  postCart: postCart,
  deleteItemCart: deleteItemCart,
  postOrder: postOrder
};
