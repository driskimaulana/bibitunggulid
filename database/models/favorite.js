/* eslint-disable no-unused-vars */
import { Model } from 'sequelize';

/**
 * @swagger
 * components:
 *  schemas:
 *      Favorite:
 *          type: object
 *          required:
 *              - productId
 *              - customerId
 *          properties:
 *              id:
 *                  type: int
 *                  description: The auto-increment data
 *              customerId:
 *                  type: int
 *                  description: The id of customer
 *              productId:
 *                  type: int
 *                  description: The id of product
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
 *              createdAt: 2020-03-10T04:05:06.157Z
 *              updatedAt: 2020-03-10T04:05:06.157Z
 */

export default (sequelize, DataTypes) => {
  class Favorite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Favorite.belongsTo(models.Product, {
        foreignKey: 'productId',
        as: 'products',
        onDelete: 'CASCADE',
      });

      Favorite.belongsTo(models.Customers, {
        foreignKey: 'customerid',
        as: 'customers',
        onDelete: 'CASCADE',
      });
    }
  }
  Favorite.init({
    productId: DataTypes.INTEGER,
    customerId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Favorite',
  });
  return Favorite;
};
