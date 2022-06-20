const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shop');

router.get('/', shopController.getIndex);
router.get('/products', shopController.getProducts);
router.get('/products/:productId', shopController.getProductsDetails);
// router.get('/products/delete/:productId', shopController.deleteItemCart);
// router.post('/orders/create', shopController.postOrder);
// router.get('/orders', shopController.getOrders);
// router.get('/cart', shopController.getCart);
// router.post('/cart', shopController.postCart);
// router.get('/checkout', shopController.getCheckout);

module.exports = router;
