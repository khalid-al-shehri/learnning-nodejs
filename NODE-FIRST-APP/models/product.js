const fs = require("fs");
const path = require("path");
const rootPath = require("../util/path");

const products = [];

module.exports = class Product {
  constructor(title) {
    this.title = title;
  }

  save() {
    const saveProductPath = path.join(rootPath, "data", "products.json");
    fs.readFile(saveProductPath, (error, fileContent) => {
    let tempProducts = [];
        if(!error){
            tempProducts = JSON.parse(fileContent);
        }
        tempProducts.push(this);
        fs.writeFile(saveProductPath, JSON.stringify(tempProducts), (err) => {
            // print if there is an error
            if(err){
                console.log("writeFile Error : ", err);
            }
        })
    }) ;
  }

  static fetchAll(callBack) {
    const saveProductPath = path.join(rootPath, "data", "products.json");
    fs.readFile(saveProductPath, (error, fileContent) =>{
        if(error){
          callBack([]);
        }else{
          callBack(JSON.parse(fileContent));
        }
    });
  }
};
