const { DataTypes } = require("sequelize");
const { Sequelize, sequelize } = require("../db");

// TODO - define the Band model
let Band = sequelize.define(
  "band",
  {
    name: DataTypes.STRING,
    genre: DataTypes.STRING,
  },
  {
    sequelize: sequelize,
    modelname: "Band",
  }
);

module.exports = {
  Band,
};
