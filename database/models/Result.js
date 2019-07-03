const { connector, Sequelize } = require("../configuration/dbConfig");
const User = require("./User");

const Result = connector.define("result", {
  barname: Sequelize.STRING,
  address: Sequelize.STRING
});

User.hasMany(Result);
Result.belongsTo(User);

module.exports = Result;
