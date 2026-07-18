'use strict';
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Permissions', [
      { businessId: 1, name: 'Create Branch', key: 'Branch:create', module: 'Branch', createdAt: new Date(), updatedAt: new Date() },
      { businessId: 1, name: 'View Branch', key: 'Branch:view', module: 'Branch', createdAt: new Date(), updatedAt: new Date() },
      { businessId: 1, name: 'Add Medicine', key: 'store:add', module: 'store', createdAt: new Date(), updatedAt: new Date() },
      { businessId: 1, name: 'View Reports', key: 'report:view', module: 'report', createdAt: new Date(), updatedAt: new Date() }
    ]);
  },
  async down(queryInterface) { await queryInterface.bulkDelete('Permissions', null, {}); }
};