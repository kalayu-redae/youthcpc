'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface) {

    const now = new Date();

    const [roles] = await queryInterface.sequelize.query(
      "SELECT id, code FROM Roles WHERE code IN ( 'SUPER_ADMIN', 'ADMIN', 'COORDINATOR', 'MEMBER' );"
    );

    const superAdminRole = roles.find(role => role.code === 'SUPER_ADMIN');
    const adminRole = roles.find(role => role.code === 'ADMIN');
    const coordinatorRole = roles.find(role => role.code === 'COORDINATOR');
    const memberRole = roles.find(role => role.code === 'MEMBER');


    if (!!superAdminRole || !adminRole || !coordinatorRole || !memberRole) {
      throw new Error('Required roles not found. Run role seeder first.');
    }

    const superAdminPassword = await bcrypt.hash('SuperAdmin@1234', 12);
    const adminPassword = await bcrypt.hash('Admin@1234', 12);
    const coordinatorPassword = await bcrypt.hash('Coordinator@1234', 12);
    const memberPassword = await bcrypt.hash('Member@1234', 12);


    await queryInterface.bulkInsert('Users', [

      {
        roleId: superAdminRole.id,
        fullName: 'System Administrator',
        phoneNumber: '0911111111',
        email: 'superadmin@youthcpc.com',
        password: superAdminPassword,
        gender: 'MALE',
        availabilityStatus: 'AVAILABLE',
        isVerified: true,
        isActive: true,
        changePassword: false,
        membershipDate: now,
        createdAt: now,
        updatedAt: now
      },

      {
        roleId: adminRole.id,
        fullName: 'Administrator',
        phoneNumber: '0911111112',
        email: 'admin@youthcpc.com',
        password: adminPassword,
        gender: 'MALE',
        availabilityStatus: 'AVAILABLE',
        isVerified: true,
        isActive: true,
        changePassword: false,
        membershipDate: now,
        createdAt: now,
        updatedAt: now
      },


      {
        roleId: coordinatorRole.id,
        fullName: 'Youth Coordinator',
        phoneNumber: '0922222222',
        email: 'coordinator@youthcpc.com',
        password: coordinatorPassword,
        gender: 'MALE',
        availabilityStatus: 'AVAILABLE',
        aspiration: 'Coordinate youth activities and mobilization',
        isVerified: true,
        isActive: true,
        createdAt: now,
        updatedAt: now
      },


      {
        roleId: memberRole.id,
        fullName: 'Sample Member',
        phoneNumber: '0933333333',
        email: 'member@youthcpc.com',
        password: memberPassword,
        gender: 'MALE',
        availabilityStatus: 'AVAILABLE',
        aspiration: 'Contribute to youth development programs',
        isVerified: true,
        isActive: true,
        createdAt: now,
        updatedAt: now
      }

    ]);

  },


  async down(queryInterface) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};