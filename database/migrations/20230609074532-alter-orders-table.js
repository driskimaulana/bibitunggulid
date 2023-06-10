/* eslint-disable no-unused-vars */
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    Promise.all([
      queryInterface.removeColumn('Orders', 'paymentId'),
      queryInterface.changeColumn('Orders', 'shipperId', {
        type: Sequelize.INTEGER,
        allowNull: true,
      }),
      queryInterface.removeColumn('Orders', 'orderDate'),
      queryInterface.removeColumn('OrderDetails', 'price'),

    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
