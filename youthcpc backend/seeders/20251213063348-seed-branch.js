'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Branches', [
      {
        businessId: 1,
        name: 'Main Branch',
        code: 'MAIN',
        location: 'Alamata',
        managerName: 'Abel Tesfaye',
        phone: '+251911111111',
        email: 'main@demohms.com',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        businessId: 1,
        name: 'Secondary Branch',
        code: 'SEC',
        location: 'Mekelle',
        managerName: 'Sara Kebede',
        phone: '+251922222222',
        email: 'secondary@demohms.com',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('branches', null, {});
  }
};
