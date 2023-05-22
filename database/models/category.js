/* eslint-disable no-unused-vars */
const { Model } = require('sequelize');

/**
 * @swagger
 * components:
 *  schemas:
 *      Category:
 *          type: object
 *          required:
 *              - categoryName
 *              - description
 *          properties:
 *              id:
 *                  type: int
 *                  description: The auto-increment data
 *              categoryName:
 *                  type: string
 *                  description: The name of category
 *              description:
 *                  type: string
 *                  description: Category description
 *              createdAt:
 *                  type: date
 *                  description: The date cart created
 *              updatedAt:
 *                  type: date
 *                  description: The latest cart being updated date
 *          example:
 *              id: 0
 *              categoryName: Tanaman Hias
 *              description: Tanaman hias untuk rumahan
 *              createdAt: 2020-03-10T04:05:06.157Z
 *              updatedAt: 2020-03-10T04:05:06.157Z
 */

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Category.init({
    categoryName: DataTypes.STRING,
    description: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};
