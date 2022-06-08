const fs = require('fs');
const path = require('path');
const rootPath = require('../util/path');

const saveCartPath = path.join(rootPath, 'data', 'cart.json');

const getCartFromFile = callBack => {
    fs.readFile(saveCartPath, (error, fileContent) =>{
        if(!error){
            callBack(JSON.parse(fileContent));
        }
        else{
            callBack(null);
        }
    });
}

const saveCartToFile = (cartToSave) => {
    fs.writeFile(saveCartPath, JSON.stringify(cartToSave), err => {
        // print if there is an error
        if(err){
            console.log('writeFile Error : ', err);
        }
    })
}

module.exports = class CartModel{

static addProduct(id, productPrice){
    let cart = {products: [], totalPrice:0};
    let existingProductsIndex;
    let existingProducts;
    let updatedProducts;
    // Fetch the previous cart
    getCartFromFile(productsInCart =>{
        // Analyze the cart => Find the existing product
        if(productsInCart != null){
            cart = productsInCart;
        }

        if(cart != null){
            existingProductsIndex = cart.products.findIndex(prod => prod.id === id);
            existingProducts = cart.products[existingProductsIndex];
        }
        // Add new product or increase quantity
        if(existingProducts){
            updatedProducts = {...existingProducts};
            updatedProducts.qty = updatedProducts.qty + 1;
            cart.products = [...cart.products];
            cart.products[existingProductsIndex] = updatedProducts;
        }else{
            updatedProducts = {id: id, qty: 1};
            cart.products = [...cart.products, updatedProducts];
        }
        cart.totalPrice = cart.totalPrice + +productPrice;
        saveCartToFile(cart);
    });

}

    constructor(productId){
        this.products = [];
        this.totalPrice = 0;
    }

    getCart(callBack){
        getCartFromFile(callBack);
    }

}