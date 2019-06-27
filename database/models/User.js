const { connector, Sequelize } = require("../configuration/dbConfig");
module.exports = connector.define("user", {
  email: Sequelize.STRING,
  password: Sequelize.STRING
});
