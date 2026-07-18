'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Businesses', [
      {
        name: 'Bruh General Hospital Inventory Company',
        ownerName: 'Sopho R',
        phone: '+251943662611',
        email: 'admin@bruhhospital.com',
        address: 'Mekelle,Ethiopia',
        logo: 'demo-logo.png',
        subscriptionStatus: 'trial',
        trialStart: new Date(),
        trialEnd: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Businesses', null, {});
  }
};
