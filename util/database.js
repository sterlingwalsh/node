const Sequelize = require("sequelize");

const sequelize = new Sequelize("node-complete", "root", "superPW", {
  dialect: "mysql",
  host: "localhost",
  define: {
    freezeTableName: true
  }
});

module.exports = {
  sequelize
};
