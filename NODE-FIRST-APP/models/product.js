const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Product = sequelize.define(
  'product',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowedNull: false,
      primaryKey: true,
    },
    title: {
      type: Sequelize.STRING,
      allowedNull: false,
    },
    price:{
      type: Sequelize.DOUBLE,
      allowedNull: false,
    },
    imageUrl:{
      type: Sequelize.STRING,
      allowedNull: false
    },
    description:{
      type: Sequelize.STRING,
      allowedNull: false,
    }
  }
);

module.exports = Product;