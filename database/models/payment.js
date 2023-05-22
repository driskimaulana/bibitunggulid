/* eslint-disable no-unused-vars */
import { Model } from 'sequelize';

/**
 * @swagger
 * components:
 *  schemas:
 *      Payment:
 *          type: object
 *          required:
 *              - paymentName
 *          properties:
 *              id:
 *                  type: int
 *                  description: The auto-increment data
 *              paymentName:
 *                  type: string
 *                  description: The name of payment service
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

export default (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Payment.init({
    paymentName: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Payment',
  });
  return Payment;
};
