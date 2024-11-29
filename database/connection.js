const Sequelize = require("sequelize");
const { db } = require("../config/environment");

const connection = new Sequelize(db.name, db.user, db.password,{
    dialect: db.dialect,
    host: db.host
})

module.exports = connection;