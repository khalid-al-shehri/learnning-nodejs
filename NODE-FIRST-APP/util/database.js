const Sequelize = require("sequelize");
const sequelize = new Sequelize("node-course", "root", "Kkk0567109909", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;