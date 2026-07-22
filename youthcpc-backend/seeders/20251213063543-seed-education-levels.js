'use strict';

module.exports = {

  async up(queryInterface) {

    const now = new Date();

    await queryInterface.bulkInsert('EducationLevels', [

      { name: 'No Formal Education', code: 'EDU001', sortOrder: 1, isActive: true, createdAt: now, updatedAt: now },

      { name: 'Primary Education', code: 'EDU002', sortOrder: 2, isActive: true, createdAt: now, updatedAt: now },

      { name: 'Secondary Education', code: 'EDU003', sortOrder: 3, isActive: true, createdAt: now, updatedAt: now },

      { name: 'Preparatory Education', code: 'EDU004', sortOrder: 4, isActive: true, createdAt: now, updatedAt: now },

      { name: 'TVET Certificate', code: 'EDU005', sortOrder: 5, isActive: true, createdAt: now, updatedAt: now },

      { name: 'Diploma', code: 'EDU006', sortOrder: 6, isActive: true, createdAt: now, updatedAt: now },

      { name: "Bachelor's Degree", code: 'EDU007', sortOrder: 7, isActive: true, createdAt: now, updatedAt: now },

      { name: "Master's Degree", code: 'EDU008', sortOrder: 8, isActive: true, createdAt: now, updatedAt: now },

      { name: 'PhD', code: 'EDU009', sortOrder: 9, isActive: true, createdAt: now, updatedAt: now }

    ]);

  },

  async down(queryInterface) {

    await queryInterface.bulkDelete('EducationLevels', null, {});

  }

};