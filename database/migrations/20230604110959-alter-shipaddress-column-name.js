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
    return Promise.all([
      queryInterface.renameColumn('ShipAddresses', 'shipProvince', 'province'),
      queryInterface.renameColumn('ShipAddresses', 'shipCity', 'city'),
      queryInterface.renameColumn('ShipAddresses', 'shipSubDistrict', 'subDistrict'),
      queryInterface.renameColumn('ShipAddresses', 'shipAddress', 'fullAddress'),
      queryInterface.renameColumn('ShipAddresses', 'shipPostalCode', 'postalCode'),
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
