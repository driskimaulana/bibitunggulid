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
        province: 'East Blue',
        city: 'Grand Line',
        subDistrict: 'Shimotsuki',
        fullAddress: 'Rt:03/01',
        postalCode: '44181',
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
