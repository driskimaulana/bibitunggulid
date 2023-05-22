/* eslint-disable no-unused-vars */
const { Model } = require('sequelize');
/**
 * @swagger
 * components:
 *  schemas:
 *      Shipper:
 *          type: object
 *          required:
 *              - companyName
 *              - contactFName
 *              - contactLName
 *              - addressId
 *              - email
 *              - bio
 *              - logo
 *              - isOnline
 *          properties:
 *              id:
 *                  type: int
 *                  description: The auto-increment data
 *              companyName:
 *                  type: string
 *                  description: The name of seller company
 *              contactFName:
 *                  type: string
 *                  description: The first name of company contact
 *              contactLName:
 *                  type: string
 *                  description: The last name of company contact
 *              addressId:
 *                  type: int
 *                  description: The id of address of seller
 *              email:
 *                  type: string
 *                  description: The email of seller
 *              bio:
 *                  type: string
 *                  description: The bio of seller store
 *              logo:
 *                  type: string
 *                  description: The public url of image in cloud storage
 *              isOnline:
 *                  type: boolean
 *                  description: The status of seller store
 *              createdAt:
 *                  type: date
 *                  description: The date cart created
 *              updatedAt:
 *                  type: date
 *                  description: The latest cart being updated date
 *          example:
 *              id: 0
 *              companyName: Toko Bunga
 *              contactFName: Nico
 *              contactLName: Robin
 *              addressId: 0
 *              email: nicorobin@gmail.com
 *              bio: Ini adalah toko nico robin
 *              isOnline: true
 *              createdAt: 2020-03-10T04:05:06.157Z
 *              updatedAt: 2020-03-10T04:05:06.157Z
 */

module.exports = (sequelize, DataTypes) => {
  class Supplier extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Supplier.hasMany(models.Address, {
        foreignKey: 'addressId',
        as: 'addresses',
        onDelete: 'CASCADE',
      });
    }
  }
  Supplier.init({
    companyName: DataTypes.STRING,
    contactFName: DataTypes.STRING,
    contactLName: DataTypes.STRING,
    addressId: DataTypes.INTEGER,
    email: DataTypes.STRING,
    bio: DataTypes.STRING,
    logo: DataTypes.STRING,
    isOnline: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Supplier',
  });
  return Supplier;
};
