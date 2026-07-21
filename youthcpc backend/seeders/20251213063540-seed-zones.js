'use strict';

module.exports = {
  async up(queryInterface) {
    const now = new Date();

    const [regions] = await queryInterface.sequelize.query(
      "SELECT id,name FROM Regions;"
    );

    const regionMap = {};
    regions.forEach(r => regionMap[r.name] = r.id);

    await queryInterface.bulkInsert('Zones', [
      {
        regionId: regionMap['Tigray'],
        name: 'Southern Zone',
        code: 'SZT',
        isActive: true,
        createdAt: now,
        updatedAt: now
      },
      {
        regionId: regionMap['Tigray'],
        name: 'Central Zone',
        code: 'CZT',
        isActive: true,
        createdAt: now,
        updatedAt: now
      },
      {
        regionId: regionMap['Amhara'],
        name: 'North Wollo',
        code: 'NWL',
        isActive: true,
        createdAt: now,
        updatedAt: now
      },
      {
        regionId: regionMap['Oromia'],
        name: 'East Shewa',
        code: 'ESH',
        isActive: true,
        createdAt: now,
        updatedAt: now
      },
      {
        regionId: regionMap['Sidama'],
        name: 'Sidama Zone',
        code: 'SID',
        isActive: true,
        createdAt: now,
        updatedAt: now
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Zones', null, {});
  }
};