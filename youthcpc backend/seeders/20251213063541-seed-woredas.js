'use strict';

module.exports = {
  async up(queryInterface) {
    const now = new Date();

    const [zones] = await queryInterface.sequelize.query(
      "SELECT id,name FROM Zones;"
    );

    const zoneMap = {};
    zones.forEach(z => zoneMap[z.name] = z.id);

    await queryInterface.bulkInsert('Woredas', [
      {
        zoneId: zoneMap['Southern Zone'],
        name: 'Bora Chelena',
        code: 'BOR',
        isActive: true,
        createdAt: now,
        updatedAt: now
      },
      {
        zoneId: zoneMap['Southern Zone'],
        name: 'Raya Alamata',
        code: 'RAL',
        isActive: true,
        createdAt: now,
        updatedAt: now
      },
      {
        zoneId: zoneMap['Central Zone'],
        name: 'Aksum',
        code: 'AKS',
        isActive: true,
        createdAt: now,
        updatedAt: now
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Woredas', null, {});
  }
};