/* eslint-disable no-unused-vars */
const { Model } = require('sequelize');

/**
 * @swagger
 * components:
 *  schemas:
 *      OderDetail:
 *          type: object
 *          required:
 *              - orderId
 *              - productId
 *              - price
 *              - quanitity
 *          properties:
 *              id:
 *                  type: int
 *                  description: The auto-increment data
 *              orderId:
 *                  type: int
 *                  description: The id of order
 *              productId:
 *                  type: int
 *                  description: The id of product
 *              price:
 *                  type: double
 *                  description: The product price
 *              quanitity:
 *                  type: int
 *                  description: The quantity of product
 *              createdAt:
 *                  type: date
 *                  description: The date cart created
 *              updatedAt:
 *                  type: date
 *                  description: The latest cart being updated date
 *          example:
 *              id: 0
 *              orderId: 0
 *              productId: 0
 *              price: 30000
 *              quanitity: 2
 *              createdAt: 2020-03-10T04:05:06.157Z
 *              updatedAt: 2020-03-10T04:05:06.157Z
 */

module.exports = (sequelize, DataTypes) => {
  class OrderDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      OrderDetail.belongsTo(models.Order, {
        foreignKey: 'orderId',
        as: 'orders',
        onDelete: 'CASCADE',
      });

      OrderDetail.belongsTo(models.Product, {
        foreignKey: 'productId',
        as: 'products',
        onDelete: 'CASCADE',
      });
    }
  }
  OrderDetail.init({
    orderId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    price: DataTypes.DOUBLE,
    quanitity: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'OrderDetail',
  });
  return OrderDetail;
};
