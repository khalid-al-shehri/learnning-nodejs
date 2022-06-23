
const mongo = require('../util/database');

class User{
  constructor(username, email){
    this.username = username;
    this.email = email;
  }

  save(){
    const db = mongo.getDB();
    return db.collection('users').insertOne(this)
    .then(results => {
      console.log("User created successfully");
    })
    .catch(error => {
      console.log(`Error while createing new user : \n ${error}`);
    })
  }

  static fetchUser(userId){
    const db = mongo.getDB();
    return db.collection('users').findOne({_id: ObjectId(userId)})
    .then(user => {
      console.log(`User (ID: ${userId}) Fetched successfully`);
    })
    .catch(error => {
      console.log(`Error while fetching the user : \n ${error}`);
    })
  }
}

module.exports = User;