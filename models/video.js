const db = require("../database/connection");
const { DataTypes } = require("sequelize");

const Video = db.define("video", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [5, 50],
    },
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  publish_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  thumbnail: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("DRAFT", "PUBLISHED"),
    allowNull: false,
  },
  tags: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  views: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue:0
  },
  deleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue:false
  },
  deletedAt: {
    type: DataTypes.DATE,
  },
});

module.exports = Video;
