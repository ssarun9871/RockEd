
const db = require("../database/connection");
const { DataTypes, } = require("sequelize");

const View = db.define("View", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
});

module.exports = View