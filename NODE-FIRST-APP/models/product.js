const db = require('../util/database');
module.exports = class Product {
  constructor(title, imageUrl, description, price, id) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
    this.id = id;
  }

  save() {
    return db.execute('INSERT INTO products (title,price,imageUrl, description) VALUES (?,?,?,?)',
     [this.title, this.price, this.imageUrl, this.description]);
  }

  update() {
    getProductsFromFile(productsFromFile => {
        const existingProductIndex = productsFromFile.findIndex(prod => prod.id === this.id);
        const updatedProducts = [...productsFromFile];
        updatedProducts[existingProductIndex] = this; // this : the product in constructor
        fs.writeFile(saveProductPath, JSON.stringify(updatedProducts), err => {
          // print if there is an error
          if(err){
              console.log('writeFile Error : ', err);
          }
      })
    });
  }

  static delete(productId) {
    
  }

  static fetchAll() {
    return db.execute("SELECT * FROM products");
  }

  static fetchProdcut(prodcutID){
    return db.execute("SELECT * FROM products WHERE products.id = ?", [prodcutID]);
  }
};
