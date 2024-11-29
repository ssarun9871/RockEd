const db = require("../database/connection");
const { DataTypes, ValidationError } = require("sequelize");

const User = db.define("user", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  email:{
    type:DataTypes.STRING,
    allowNull:false,
    unique:true
  },
  name:{
    type:DataTypes.STRING,
    allowNull:false
  }
});

module.exports = User