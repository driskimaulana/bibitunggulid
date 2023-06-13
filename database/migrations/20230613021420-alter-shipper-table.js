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
      queryInterface.renameColumn('Orders', 'shipperId', 'shipmentId'),
      queryInterface.addColumn('Orders', 'shipAddressId', {
        type: Sequelize.INTEGER,
        allowNull: true,
      }),
      queryInterface.renameTable('Shippers', 'Shipments'),
      queryInterface.renameColumn('Shipments', 'companyName', 'courierName'),
      queryInterface.addColumn('Shipments', 'delieveryTime', {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn('Shipments', 'estimatedReceiveTime', {
        type: Sequelize.STRING,
      }),

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
