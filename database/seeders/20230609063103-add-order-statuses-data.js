/* eslint-disable no-unused-vars */
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('OrderStatuses', [
      {
        statusName: 'Waiting For Payment',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        statusName: 'Waiting For Shipment',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        statusName: 'On Shipping',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        statusName: 'Finish',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
