/* eslint-disable no-unused-vars */
const { Model } = require('sequelize');

/**
 * @swagger
 * components:
 *  schemas:
 *      Product:
 *          type: object
 *          required:
 *              - supplierId
 *              - productName
 *              - productDescription
 *              - categoryId
 *              - unitPrice
 *              - unitWeight
 *              - unitInStock
 *              - isAvailable
 *              - pictures
 *          properties:
 *              id:
 *                  type: int
 *                  description: The auto-increment data
 *              supplierId:
 *                  type: int
 *                  description: The id of supplier service
 *              productName:
 *                  type: string
 *                  description: The name of product
 *              productDescription:
 *                  type: string
 *                  description: The description of product
 *              categoryId:
 *                  type: int
 *                  description: The id of category
 *              unitPrice:
 *                  type: double
 *                  description: The price by unit of product
 *              unitWeight:
 *                  type: float
 *                  description: The weight by unit of product
 *              unitInStock:
 *                  type: int
 *                  description: The quantity of available stock
 *              isAvailable:
 *                  type: boolean
 *                  description: The status of product
 *              pictures:
 *                  type: array[string]
 *                  description: The picrutes of product
 *              createdAt:
 *                  type: date
 *                  description: The date cart created
 *              updatedAt:
 *                  type: date
 *                  description: The latest cart being updated date
 *          example:
 *              id: 0
 *              supplierId: 0
 *              productName: Bunga Dahlia
 *              productDescription: Ini bunga dahlia
 *              categoryId: 0
 *              unitPrice: 10000
 *              unitWeight: 0.3
 *              unitInStock: 100
 *              isAvailable: true
 *              pictures: ["dahlia-1.png", "dahlia-2.png"]
 *              createdAt: 2020-03-10T04:05:06.157Z
 *              updatedAt: 2020-03-10T04:05:06.157Z
 */

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Supplier, {
        foreignKey: 'supplierId',
        as: 'suppliers',
        onDelete: 'CASCADE',
      });
      Product.hasOne(models.Category, {
        foreignKey: 'categoryId',
        as: 'categories',
        onDelete: 'CASCADE',
      });
    }
  }
  Product.init({
    supplierId: DataTypes.INTEGER,
    productName: DataTypes.STRING,
    productDescription: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    unitPrice: DataTypes.DOUBLE,
    unitWeight: DataTypes.FLOAT,
    unitInStock: DataTypes.INTEGER,
    isAvailable: DataTypes.BOOLEAN,
    pictures: DataTypes.ARRAY(DataTypes.STRING),
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};
