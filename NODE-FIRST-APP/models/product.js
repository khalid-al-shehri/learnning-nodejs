const mongo = require('../util/database');
const {ObjectId} = require('mongodb');
class Product{
  constructor(title, price, description, imageUrl){
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
  }

  
  save(){
    const db = mongo.getDB();
    return db.collection('products').insertOne(this)
    .then(results => {
      console.log("Product inserted successfully!");
    })
    .catch(error => {
      console.log("Error in inserting the product.");
    });
  }

  static fetchAll(){
    const db = mongo.getDB();
    return db.collection('products').find().toArray()
    .then(products => {
      console.log(products);
      console.log("All products fetched successfully!");
      return products;
    })
    .catch(error => {
      console.log("Error in fetching the all products.");
    });
  }
  
  static fetchProduct(productId){
    const db = mongo.getDB();
    return db.collection('products').find({_id: ObjectId(productId)}).next()
    .then(product => {
      console.log(product);
      if(product){
        console.log(`product (ID : ${productId}) fetched successfully!`);
      }else{
        console.log(`product (ID : ${productId}) NOT FOUND`);
      }
      return product;
    })
    .catch(error => {
      console.log("Error in fetching the product.");
    });
  }
}

module.exports = Product;