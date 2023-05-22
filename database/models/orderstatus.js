/* eslint-disable no-unused-vars */
const { Model } = require('sequelize');

/**
 * @swagger
 * components:
 *  schemas:
 *      OrderStatus:
 *          type: object
 *          required:
 *              - statusName
 *          properties:
 *              id:
 *                  type: int
 *                  description: The auto-increment data
 *              statusName:
 *                  type: int
 *                  description: The name of order status
 *              createdAt:
 *                  type: date
 *                  description: The date cart created
 *              updatedAt:
 *                  type: date
 *                  description: The latest cart being updated date
 *          example:
 *              id: 0
 *              statusName: Belum Dibayar
 *              createdAt: 2020-03-10T04:05:06.157Z
 *              updatedAt: 2020-03-10T04:05:06.157Z
 */

module.exports = (sequelize, DataTypes) => {
  class OrderStatus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  OrderStatus.init({
    statusName: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'OrderStatus',
  });
  return OrderStatus;
};
