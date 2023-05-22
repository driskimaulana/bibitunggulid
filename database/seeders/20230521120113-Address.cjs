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

    await queryInterface.bulkInsert('Addresses', [
      {
        province: 'East Blue',
        city: 'Grand Line',
        subdistrict: 'Shimotsuki',
        address: 'Rt:03/01',
        postalcode: '44181',
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
    await queryInterface.bulkDelete('Address', null, {});
  },
};
