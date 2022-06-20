const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let db;

const mongoConnect = callback => {
  MongoClient.connect('mongodb+srv://khalid09909:Kkk0567109909@cluster0.58bg8.mongodb.net/shop?retryWrites=true&w=majority')
  .then(clinet => {
    console.log("MongoDB Connected Successfully!");
    db = clinet.db();
    callback();
  })
  .catch(error => {
    console.log("MongoClient Connect Error : \n", error);
    throw error;
  });
};

const getDB = () => {
  if(db){
    return db;
  }
  throw "No database found";
}

module.exports = {
  mongoConnect: mongoConnect,
  getDB: getDB
};