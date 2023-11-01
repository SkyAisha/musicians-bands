const { DataTypes } = require("sequelize");
const { Sequelize, sequelize } = require("../db");

// TODO - define the Song model
let Song = sequelize.define(
  "song",
  {
    title: DataTypes.STRING,
    year: DataTypes.NUMBER,
    length: DataTypes.NUMBER,
  },
  {
    sequelize: sequelize,
    modelname: "song",
  }
);

module.exports = {
  Song,
};
