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
      queryInterface.addColumn('Products', 'adminId', {
        type: Sequelize.INTEGER,
        allowNull: false,
      }),
      queryInterface.addColumn('Products', 'planId', {
        type: Sequelize.INTEGER,
        allowNull: true,
      }),
      queryInterface.addColumn('Products', 'slug', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.removeColumn('Products', 'isAvailable'),
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
