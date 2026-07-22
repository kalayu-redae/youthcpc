'use strict';

module.exports = {

  async up(queryInterface) {

    const now = new Date();

    await queryInterface.bulkInsert('Professions', [

      { name: 'Student', code: 'PRO001', isActive: true, createdAt: now, updatedAt: now },

      { name: 'Teacher', code: 'PRO002', isActive: true, createdAt: now, updatedAt: now },

      { name: 'Farmer', code: 'PRO003', isActive: true, createdAt: now, updatedAt: now },

      { name: 'Engineer', code: 'PRO004', isActive: true, createdAt: now, updatedAt: now },

      { name: 'Doctor', code: 'PRO005', isActive: true, createdAt: now, updatedAt: now },

      { name: 'Nurse', code: 'PRO006', isActive: true, createdAt: now, updatedAt: now },

      { name: 'Business Owner', code: 'PRO007', isActive: true, createdAt: now, updatedAt: now },

      { name: 'Civil Servant', code: 'PRO008', isActive: true, createdAt: now, updatedAt: now },

      { name: 'Driver', code: 'PRO009', isActive: true, createdAt: now, updatedAt: now },

      { name: 'Unemployed', code: 'PRO010', isActive: true, createdAt: now, updatedAt: now },

      { name: 'Other', code: 'PRO011', isActive: true, createdAt: now, updatedAt: now }

    ]);

  },

  async down(queryInterface) {

    await queryInterface.bulkDelete('Professions', null, {});

  }

};