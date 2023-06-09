/* eslint-disable no-unused-vars */
const { Model } = require('sequelize');

/**
 * @swagger
 * components:
 *  schemas:
 *      Customer:
 *          type: object
 *          required:
 *              - firstName
 *              - lastName
 *              - phone
 *              - email
 *              - password
 *          properties:
 *              id:
 *                  type: int
 *                  description: The auto-increment id
 *              firstName:
 *                  type: string
 *                  description: The first name of users
 *              lastName:
 *                  type: string
 *                  description: The last name of users
 *              email:
 *                  type: string
 *                  description: The email of users
 *              phone:
 *                  type: string
 *                  description: The telephone number of users
 *              password:
 *                  type: string
 *                  description: The encryted password that users created
 *              createdAt:
 *                  type: date
 *                  description: The date user created thir account
 *              updatedAt:
 *                  type: date
 *                  description: The latest data being updated date
 *          example:
 *              id: 0
 *              firstName: Roronoa
 *              lastName: Zoro
 *              email: roronoazoro@gmail.com
 *              phone: 087786765565
 *              password: asdfghjkl
 *              addressId: 0
 *              createdAt: 2020-03-10T04:05:06.157Z
 *              updateAt: 2020-03-10T04:05:06.157Z
 */

module.exports = (sequelize, DataTypes) => {
  class Customers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Customers.hasMany(models.ShipAddress, {
        foreignKey: 'customerId',
        as: 'customers',
        onDelete: 'CASCADE',
      });
    }
  }
  Customers.init({
    fullName: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Customers',
  });

  return Customers;
};
