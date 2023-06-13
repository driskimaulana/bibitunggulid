/* eslint-disable no-unused-vars */
const { Model } = require('sequelize');

/**
 * @swagger
 * components:
 *  schemas:
 *      Shipment:
 *          type: object
 *          required:
 *              - companyName
 *              - phone
 *          properties:
 *              id:
 *                  type: int
 *                  description: The auto-increment data
 *              companyName:
 *                  type: int
 *                  description: The name of company
 *              phone:
 *                  type: int
 *                  description: The phone number of Shipment service
 *              createdAt:
 *                  type: date
 *                  description: The date cart created
 *              updatedAt:
 *                  type: date
 *                  description: The latest cart being updated date
 *          example:
 *              id: 0
 *              companyName: JNE
 *              phone: 087678876678
 *              createdAt: 2020-03-10T04:05:06.157Z
 *              updatedAt: 2020-03-10T04:05:06.157Z
 */

module.exports = (sequelize, DataTypes) => {
  class Shipment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Shipment.init({
    courierName: DataTypes.STRING,
    phone: DataTypes.STRING,
    delieveryTime: DataTypes.STRING,
    estimatedReceiveTime: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Shipment',
  });
  return Shipment;
};
