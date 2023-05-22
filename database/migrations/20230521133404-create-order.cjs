/* eslint-disable no-unused-vars */
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      customerid: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      paymentId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      orderDate: {
        type: Sequelize.DATE,
      },
      shipperId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      shipDate: {
        type: Sequelize.DATE,
      },
      shipLimitDate: {
        type: Sequelize.DATE,
      },
      freight: {
        type: Sequelize.DOUBLE,
      },
      orderStatusId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      paymentDate: {
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Orders');
  },
};
