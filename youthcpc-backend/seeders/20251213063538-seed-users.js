'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface) {
    const now = new Date();

    const [roles] = await queryInterface.sequelize.query(`
      SELECT id,code
      FROM Roles
      WHERE code IN ('SUPER_ADMIN','ADMIN','COORDINATOR','MEMBER')
    `);

    const getRole = code => roles.find(r => r.code === code)?.id;

    await queryInterface.bulkInsert('Users', [
      {
        roleId: getRole('SUPER_ADMIN'),
        fullName: 'Super Administrator',
        phoneNumber: '0911000000',
        email: 'superadmin@youthcpc.org',
        password: await bcrypt.hash('SuperAdmin@123', 12),
        profileImage: null,
        isVerified: true,
        isActive: true,
        changePassword: false,
        lastLogin: null,
        passwordResetOTP: null,
        passwordResetOTPExpires: null,
        createdAt: now,
        updatedAt: now
      },
      {
        roleId: getRole('ADMIN'),
        fullName: 'System Administrator',
        phoneNumber: '0911000001',
        email: 'admin@youthcpc.org',
        password: await bcrypt.hash('Admin@123', 12),
        profileImage: null,
        isVerified: true,
        isActive: true,
        changePassword: true,
        lastLogin: null,
        passwordResetOTP: null,
        passwordResetOTPExpires: null,
        createdAt: now,
        updatedAt: now
      },
      {
        roleId: getRole('COORDINATOR'),
        fullName: 'Youth Coordinator',
        phoneNumber: '0911000002',
        email: 'coordinator@youthcpc.org',
        password: await bcrypt.hash('Coordinator@123', 12),
        profileImage: null,
        isVerified: true,
        isActive: true,
        changePassword: true,
        lastLogin: null,
        passwordResetOTP: null,
        passwordResetOTPExpires: null,
        createdAt: now,
        updatedAt: now
      },
      {
        roleId: getRole('MEMBER'),
        fullName: 'Youth Member',
        phoneNumber: '0911000003',
        email: 'member@youthcpc.org',
        password: await bcrypt.hash('Member@123', 12),
        profileImage: null,
        isVerified: true,
        isActive: true,
        changePassword: true,
        lastLogin: null,
        passwordResetOTP: null,
        passwordResetOTPExpires: null,
        createdAt: now,
        updatedAt: now
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Users', {
      phoneNumber: ['0911000000', '0911000001', '0911000002']
    });
  }
};