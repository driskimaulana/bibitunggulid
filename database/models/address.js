/* eslint-disable no-unused-vars */

const { Model } = require('sequelize');

/**
 * @swagger
 * components:
 *  schemas:
 *      Address:
 *          type: object
 *          required:
 *              - province
 *              - city
 *              - subDistrict
 *              - address
 *              - postalCode
 *          properties:
 *              id:
 *                  type: int
 *                  description: The auto-generated id by mongodb
 *              province:
 *                  type: string
 *                  description: The province of address
 *              city:
 *                  type: string
 *                  description: The city of address
 *              subDistrict:
 *                  type: string
 *                  description: The subdistrict of address
 *              address:
 *                  type: string
 *                  description: The full address
 *              postalCode:
 *                  type: string
 *                  description: The postal code of address
 *              createdAt:
 *                  type: date
 *                  description: The date user created thir account
 *              updatedAt:
 *                  type: date
 *                  description: The latest data being updated date
 *          example:
 *              id: 0
 *              province: East Blue
 *              city: Grand Line
 *              subDistrict: Shimotsuki
 *              address: Rt:03/01
 *              postalCode: 44181
 *              createdAt: 2020-03-10T04:05:06.157Z
 *              updatedAt: 2020-03-10T04:05:06.157Z
 */

module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Address.belongsTo(models.Customers, {
      //   foreignKey: 'addressId',
      //   as: 'addresses',
      //   onDelete: 'CASCADE',
      // });
    }
  }
  Address.init({
    province: DataTypes.STRING,
    city: DataTypes.STRING,
    subdistrict: DataTypes.STRING,
    address: DataTypes.STRING,
    postalcode: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Address',
  });
  return Address;
};
