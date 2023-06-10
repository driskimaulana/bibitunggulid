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
    await queryInterface.bulkInsert('Plants', [{
      localName: 'Lidah Buaya',
      about: 'Lidah Buaya adalah spesies tanaman sukulen dari genus Aloe. Tanaman tahunan yang selalu hijau, berasal dari Semenanjung Arab, tetapi tumbuh liar di iklim tropis, semi-tropis, dan gersang di seluruh dunia.',
      scienceName: 'Aloevera',
      family: 'Asphodelaceae',
      kingdom: 'Plantae',
      order: 'Asparagales',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      localName: 'Bunga Flamingo',
      about: 'Bunga Flamingo adalah spesies tanaman berbunga dalam keluarga Araceae yang berasal dari Kolombia dan Ekuador. Ini adalah pemenang Penghargaan Royal Horticultural Society of Garden Merit.',
      scienceName: 'Anthuriumandreanum',
      family: 'Araceae',
      kingdom: 'Plantae',
      order: 'Water plantains',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      localName: 'Cemara Norfolk',
      about: 'Cemara Norfolk adalah spesies tumbuhan runjung. Seperti yang tersirat dalam nama daerahnya pinus Pulau Norfolk, pohon itu endemik di Pulau Norfolk, wilayah luar Australia yang terletak di Samudra Pasifik antara Selandia Baru dan Kaledonia Baru.',
      scienceName: 'Araucariaheterophylla',
      family: 'Araucariaceae',
      kingdom: 'Plantae',
      order: 'Conifers',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      localName: 'Bambu',
      about: 'Bambu adalah kelompok beragam tanaman berbunga abadi yang sebagian besar selalu hijau yang membentuk subfamili Bambusoideae dari keluarga rumput Poaceae.',
      scienceName: 'Bamboo',
      family: 'Poaceae',
      kingdom: 'Plantae',
      order: 'Poales',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      localName: 'Pakis pedang',
      about: 'Bostonfern, dikenal sebagai pakis pedang atau pakis Boston, adalah spesies pakis dalam keluarga Lomariopsidaceae. Ini asli Amerika. Tanaman hijau ini dapat mencapai setinggi 40–90 sentimeter, dan dalam kasus ekstrim hingga 1,5 meter.',
      scienceName: 'Bostonfern',
      family: 'Nephrolepidaceae',
      kingdom: 'Plantae',
      order: 'Polypodiales',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      localName: 'Lili Paris',
      about: 'Chlorophytum comosum, biasanya disebut lili paris atau tanaman laba-laba biasa karena penampilannya yang seperti laba-laba, juga dikenal sebagai spider ivy adalah spesies tanaman berbunga abadi yang selalu hijau dari keluarga Asparagaceae.',
      scienceName: 'Chlorophytumcomosum',
      family: 'Asparagaceae',
      kingdom: 'Plantae',
      order: 'Asparagales',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      localName: 'Puring',
      about: 'Puring adalah genus tanaman yang luas dalam keluarga spurge, Euphorbiaceae. Tumbuhan dari genus ini dideskripsikan dan diperkenalkan ke orang Eropa oleh Georg Eberhard Rumphius.',
      scienceName: 'Croton',
      family: 'Euphorbiaceae',
      kingdom: 'Plantae',
      order: 'Malpighiales',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      localName: 'Daun Bahagia',
      about: 'Dieffenbachia, umumnya dikenal sebagai daun bahagia atau leopard lily, adalah genus tumbuhan berbunga tropis dalam keluarga Araceae. Ini asli Tropis Dunia Baru dari Meksiko dan Hindia Barat selatan ke Argentina.',
      scienceName: 'Dieffenbachia',
      family: 'Araceae',
      kingdom: 'Plantae',
      order: 'Alismatales',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      localName: 'Sirih Gading',
      about: 'Sirih Gading adalah genus tanaman berbunga dalam keluarga Araceae, ditemukan di hutan tropis dari Cina, Himalaya, dan Asia Tenggara hingga Australia Pasifik Barat. ',
      scienceName: 'Epipremnum',
      family: 'Araceae',
      kingdom: 'Plantae',
      order: 'Monstereae',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      localName: 'Mahkota duri',
      about: 'Euphorbia milii, mahkota duri, tanaman Kristus, atau duri Kristus, adalah spesies tumbuhan berbunga dalam keluarga spurge Euphorbiaceae, asli Madagaskar.',
      scienceName: 'Euphorbiamilii',
      family: 'Euphorbiaceae',
      kingdom: 'Plantae',
      order: 'Malpighiales',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      localName: 'Ceriman',
      about: 'Ceriman, tanaman keju Swiss atau philodendron daun terbelah adalah spesies tanaman berbunga asli hutan tropis Meksiko selatan, selatan Panama. ',
      scienceName: 'Monsteradeliciosa',
      family: 'Araceae',
      kingdom: 'Plantae',
      order: 'Alismatales',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      localName: 'Lidah Mertua',
      about: 'Dracaena trifasciata adalah spesies tanaman berbunga dalam keluarga Asparagaceae, asli Afrika Barat tropis dari Nigeria timur hingga Kongo. Ini paling dikenal sebagai tanaman ular, pedang Saint George, lidah ibu mertua, dan nama-nama lainnya.',
      scienceName: 'Dracaenatrifasciata',
      family: 'Asparagaceae',
      kingdom: 'Plantae',
      order: 'Asparagales',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      localName: 'Lili perdamaian',
      about: 'Spathiphyllum adalah genus dari sekitar 47 spesies tanaman berbunga monokotil dalam keluarga Araceae, asli daerah tropis Amerika dan Asia Tenggara. Spesies tertentu dari Spathiphyllum umumnya dikenal sebagai spath atau bunga lili perdamaian.',
      scienceName: 'Spathiphyllum',
      family: 'Araceae',
      kingdom: 'Plantae',
      order: 'Alismatales',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      localName: 'Anggrek Putih',
      about: 'Anggrek Putih adalah tanaman yang termasuk dalam keluarga Orchidaceae, kelompok tanaman berbunga yang beragam dan tersebar luas dengan bunga yang sering berwarna-warni dan harum.',
      scienceName: 'Phalaenopsisamabilis',
      family: 'Orchidaceae',
      kingdom: 'Plantae',
      order: 'Asparagales',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      localName: 'Pohon Dollar',
      about: 'Pohon Dollar adalah genus tumbuhan berbunga dalam famili Araceae, yang mengandung spesies tunggal Zamioculcas zamiifolia. Ini adalah tanaman tahunan tropis, asli Afrika timur, dari Kenya selatan hingga Afrika Selatan timur laut.',
      scienceName: 'Zamioculcas',
      family: 'Araceae',
      kingdom: 'Plantae',
      order: 'Alismatales',
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
