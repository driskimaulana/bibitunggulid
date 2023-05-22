/* eslint-disable no-unused-vars */
const { Model } = require('sequelize');

/**
 * @swagger
 * components:
 *  schemas:
 *      Order:
 *          type: object
 *          required:
 *              - customerid
 *              - paymentId
 *              - orderDate
 *              - shipperId
 *              - shipDate
 *              - shipLimitDate
 *              - freight
 *              - orderStatusId
 *              - paymentDate
 *          properties:
 *              id:
 *                  type: int
 *                  description: The auto-increment data
 *              customerId:
 *                  type: int
 *                  description: The id of customer
 *              paymentId:
 *                  type: int
 *                  description: The payment id of order
 *              orderDate:
 *                  type: date
 *                  description: The date order being created
 *              shipperId:
 *                  type: int
 *                  description: The shipper service id
 *              shipDate:
 *                  type: date
 *                  description: The order being send
 *              shipLimitDate:
 *                  type: date
 *                  description: The limit for suppliers to send the product
 *              freight:
 *                  type: double
 *                  description: The ongkir for sending package
 *              orderStatusId:
 *                  type: int
 *                  description: The order status id
 *              paymentDate:
 *                  type: date
 *                  description: The dat of order being paid
 *              createdAt:
 *                  type: date
 *                  description: The date cart created
 *              updatedAt:
 *                  type: date
 *                  description: The latest cart being updated date
 *          example:
 *              id: 0
 *              paymentId: 0
 *              customerId: 0
 *              orderDate: 2020-03-10T04:05:06.157Z
 *              shipperId: 0
 *              shipDate: 2020-03-10T04:05:06.157Z
 *              shipLimitDate: 2020-03-10T04:05:06.157Z
 *              freight: 14000
 *              orderStatusId: 0
 *              paymentDate: 2020-03-10T04:05:06.157Z
 *              createdAt: 2020-03-10T04:05:06.157Z
 *              updatedAt: 2020-03-10T04:05:06.157Z
 */

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.hasMany(models.OrderDetail, {
        foreignKey: 'orderId',
        as: 'orders',
        onDelete: 'CASCADE',
      });
      Order.hasOne(models.Shipper, {
        foreignKey: 'shipperId',
        as: 'shippers',
        onDelete: 'CASCADE',
      });
      Order.hasOne(models.Payment, {
        foreignKey: 'paymentId',
        as: 'payments',
        onDelete: 'CASCADE',
      });
      Order.hasOne(models.OrderStatus, {
        foreignKey: 'orderStatusId',
        as: 'orderStatuses',
        onDelete: 'CASCADE',
      });
    }
  }
  Order.init({
    customerid: DataTypes.INTEGER,
    paymentId: DataTypes.INTEGER,
    orderDate: DataTypes.DATE,
    shipperId: DataTypes.INTEGER,
    shipDate: DataTypes.DATE,
    shipLimitDate: DataTypes.DATE,
    freight: DataTypes.DOUBLE,
    orderStatusId: DataTypes.INTEGER,
    paymentDate: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};
