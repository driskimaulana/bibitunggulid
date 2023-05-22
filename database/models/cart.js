/* eslint-disable no-unused-vars */
const { Model } = require('sequelize');

/**
 * @swagger
 * components:
 *  schemas:
 *      Cart:
 *          type: object
 *          required:
 *              - productId
 *              - customerId
 *              - count
 *          properties:
 *              id:
 *                  type: int
 *                  description: The auto-increment data
 *              productId:
 *                  type: int
 *                  description: The product id of cart
 *              customerId:
 *                  type: int
 *                  description: The customer id of user that have customer
 *              count:
 *                  type: string
 *                  description: The product count in cart
 *              createdAt:
 *                  type: date
 *                  description: The date cart created
 *              updatedAt:
 *                  type: date
 *                  description: The latest cart being updated date
 *          example:
 *              id: 0
 *              productId: 0
 *              customerId: 0
 *              count: 1
 *              createdAt: 2020-03-10T04:05:06.157Z
 *              updatedAt: 2020-03-10T04:05:06.157Z
 */

module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart.belongsTo(models.Product, {
        foreignKey: 'supplierId',
        as: 'suppliers',
        onDelete: 'CASCADE',
      });

      Cart.belongsTo(models.Customers, {
        foreignKey: 'customerid',
        as: 'customers',
        onDelete: 'CASCADE',
      });
    }
  }
  Cart.init({
    productid: DataTypes.INTEGER,
    customerId: DataTypes.INTEGER,
    count: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};
