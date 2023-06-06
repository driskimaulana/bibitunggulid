/* eslint-disable no-unused-vars */
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('plants', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      localName: {
        type: Sequelize.STRING,
      },
      about: {
        type: Sequelize.STRING,
      },
      scienceName: {
        type: Sequelize.STRING,
      },
      family: {
        type: Sequelize.STRING,
      },
      kingdom: {
        type: Sequelize.STRING,
      },
      order: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('plants');
  },
};
