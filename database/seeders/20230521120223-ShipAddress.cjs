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
    await queryInterface.bulkInsert('ShipAddresses', [
      {
        name: 'Roronoa Zoro',
        phone: '085156087141',
        shipProvince: 'East Blue',
        shipCity: 'Grand Line',
        shipSubDistrict: 'Shimotsuki',
        shipAddress: 'Rt:03/01',
        shipPostalCode: '44181',
        customerId: 5,
        createdAt: '2020-03-10T04:05:06.157Z',
        updatedAt: '2020-03-10T04:05:06.157Z',
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
    // await queryInterface.bulkDelete('ShipAddress', null, {});
  },
};
