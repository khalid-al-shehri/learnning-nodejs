const Sequelize = require("sequelize").Sequelize;
const sequelize = require("../util/database");

const User = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowedNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowedNull: false,
  },
  phone_number: {
    type: Sequelize.STRING,
    allowedNull: false,
  },
});

module.exports = User;