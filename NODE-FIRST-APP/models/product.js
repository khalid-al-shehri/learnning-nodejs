const fs = require('fs');
const path = require('path');
const rootPath = require('../util/path');

const saveProductPath = path.join(rootPath, 'data', 'products.json');

const getProductsFromFile = callBack => {
    fs.readFile(saveProductPath, (error, fileContent) =>{
        if(error){
            callBack([]);
        }else{
            callBack(JSON.parse(fileContent));
        }
    });
}

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
    this.id = (Math.floor(Math.random() * 9999999)).toString();
  }

  save() {
    getProductsFromFile(productsFromFile=>{
        productsFromFile.push(this);
        fs.writeFile(saveProductPath, JSON.stringify(productsFromFile), err => {
            // print if there is an error
            if(err){
                console.log('writeFile Error : ', err);
            }
        })
    });
  }

  static fetchAll(callBack) {
    getProductsFromFile(callBack);
  }

  static fetchProdcut(prodcutID, callBack){
    getProductsFromFile(Products => {
      const prodcut = Products.find(p => p.id === prodcutID);
      callBack(prodcut);
    });
  }
};
