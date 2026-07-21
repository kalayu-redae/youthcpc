'use strict';

module.exports = {
  async up(queryInterface) {

    const now = new Date();

    const [woredas] = await queryInterface.sequelize.query(
      `SELECT id,name FROM Woredas`
    );

    const woreda = {};

    woredas.forEach(item => {
      woreda[item.name] = item.id;
    });

    if (!woreda['Bora Chelena']) {
      throw new Error('Bora Chelena woreda not found');
    }

    await queryInterface.bulkInsert('Tabiyas', [
      {
        woredaId: woreda['Bora Chelena'],
        name: 'Waereb Deqali',
        code: 'TBY001',
        isActive: true,
        createdAt: now,
        updatedAt: now
      }
    ]);

  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Tabiyas', null, {});
  }
};