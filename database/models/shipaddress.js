/* eslint-disable no-unused-vars */
const { Model } = require('sequelize');

/**
 * @swagger
 * components:
 *  schemas:
 *      ShipAddress:
 *          type: object
 *          required:
 *              - name
 *              - phone
 *              - province
 *              - city
 *              - subDistrict
 *              - fullAddress
 *              - postalCode
 *              - customerId
 *          properties:
 *              id:
 *                  type: int
 *                  description: The auto-increment id
 *              name:
 *                  type: string
 *                  description: The name of ship receiver
 *              phone:
 *                  type: int
 *                  description: The phone number of ship receiver
 *              province:
 *                  type: string
 *                  description: The province of ship address
 *              city:
 *                  type: string
 *                  description: The city of address
 *              subDistrict:
 *                  type: string
 *                  description: The subdistrict of address
 *              fullAddress:
 *                  type: string
 *                  description: The full address
 *              postalCode:
 *                  type: string
 *                  description: The postal code of address
 *              customerId:
 *                  type: string
 *                  description: The foreign key for customer
 *              createdAt:
 *                  type: date
 *                  description: The date user created thir account
 *              updatedAt:
 *                  type: date
 *                  description: The latest data being updated date
 *          example:
 *              id: 0
 *              name: Roronoa Zoro
 *              phone: 085156087141
 *              province: East Blue
 *              city: Grand Line
 *              subDistrict: Shimotsuki
 *              fullAddress: Rt:03/01
 *              postalCode: 44181
 *              customerId: 0
 *              createdAt: 2020-03-10T04:05:06.157Z
 *              updateAt: 2020-03-10T04:05:06.157Z
 */

module.exports = (sequelize, DataTypes) => {
  class ShipAddress extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ShipAddress.belongsTo(models.Customers, {
        foreignKey: 'customerId',
        as: 'customers',
        onDelete: 'CASCADE',
      });
    }
  }
  ShipAddress.init({
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    province: DataTypes.STRING,
    city: DataTypes.STRING,
    subDistrict: DataTypes.STRING,
    fullAddress: DataTypes.STRING,
    postalCode: DataTypes.STRING,
    customerId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'ShipAddress',
  });
  return ShipAddress;
};
