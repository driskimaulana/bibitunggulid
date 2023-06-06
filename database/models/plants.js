'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class plants extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  plants.init({
    localName: DataTypes.STRING,
    about: DataTypes.STRING,
    scienceName: DataTypes.STRING,
    family: DataTypes.STRING,
    kingdom: DataTypes.STRING,
    order: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'plants',
  });
  return plants;
};