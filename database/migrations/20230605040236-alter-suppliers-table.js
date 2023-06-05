/* eslint-disable no-unused-vars */

const { query } = require('express');

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
      queryInterface.renameColumn('Suppliers', 'contactFName', 'contactName'),
      queryInterface.renameColumn('Suppliers', 'isOnline', 'isActive'),
      queryInterface.removeColumn('Suppliers', 'contactLName'),
      queryInterface.removeColumn('Suppliers', 'addressId'),
      queryInterface.addColumn('Suppliers', 'contactPhone', {
        type: Sequelize.STRING,
        allowNull: false,
      }),
      queryInterface.addColumn('Suppliers', 'province', {
        type: Sequelize.STRING,
        allowNull: 'false',
      }),
      queryInterface.addColumn('Suppliers', 'city', {
        type: Sequelize.STRING,
        allowNull: 'false',
      }),
      queryInterface.addColumn('Suppliers', 'subDisctrict', {
        type: Sequelize.STRING,
        allowNull: 'false',
      }),
      queryInterface.addColumn('Suppliers', 'fullAddress', {
        type: Sequelize.STRING,
        allowNull: 'false',
      }),
      queryInterface.addColumn('Suppliers', 'postalCode', {
        type: Sequelize.STRING,
        allowNull: 'false',
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
