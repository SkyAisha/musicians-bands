const { DataTypes } = require("sequelize");
const { Sequelize, sequelize } = require("../db");

// TODO - define the Musician model
let Musician = sequelize.define(
  "musician",
  {
    name: DataTypes.STRING,
    instrument: DataTypes.STRING,
  },
  {
    sequelize: sequelize,
    modelname: "musician",
  }
);

module.exports = {
  Musician,
};
