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

    await queryInterface.bulkInsert('Products', [
      {
        supplierId: 0,
        productName: 'Bunga Dahlia',
        productDescription: 'Ini adalah bunga dahlia',
        categoryId: 1,
        unitPrice: 20000,
        unitWeight: 0.3,
        isAvailable: true,
        pictures: ['dahlia.png'],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        supplierId: 0,
        productName: 'Bunga Sepatu',
        productDescription: 'Ini adalah bunga Sepatu',
        categoryId: 1,
        unitPrice: 10000,
        unitWeight: 0.3,
        isAvailable: true,
        pictures: ['dahlia.png'],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        supplierId: 0,
        productName: 'Bunga Bangke',
        productDescription: 'Ini adalah bunga bangke',
        categoryId: 1,
        unitPrice: 50000,
        unitWeight: 0.3,
        isAvailable: true,
        pictures: ['dahlia.png'],
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
