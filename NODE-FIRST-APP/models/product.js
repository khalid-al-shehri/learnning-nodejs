const mongo = require('../util/database');
const {ObjectId} = require('mongodb');
class Product{
  constructor(title, price, description, imageUrl, id){
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = ObjectId(id);
  }

  
update(){
  const db = mongo.getDB();
  return db.collection('products').updateOne(
    {_id: this._id}, 
    {
      $set: {
      title: this.title,
      description: this.description,
      price: this.price,
      imageUrl: this.imageUrl,
      }
    },
  )
  .then(results => {
    console.log("Product Updated successfully!");
  })
  .catch(error => {
    console.log("Error in updating the product.");
  });
}

  save(){
    const db = mongo.getDB();
    return  db.collection('products').insertOne(this)
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

  static deleteProduct(productId){
    const db = mongo.getDB();
    return db.collection('products').deleteOne({_id: ObjectId(productId)})
    .then(results => {
      console.log(`Product (ID : ${productId}) deleted successfully.`);
    })
    .catch(error => {
      console.log(`Error while deleting product (ID : ${productId}) : \n ${error}`);
    });
  }
}

module.exports = Product;