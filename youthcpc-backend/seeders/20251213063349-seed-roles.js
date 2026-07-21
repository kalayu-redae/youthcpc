'use strict';


module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Roles', [
      {
        name: 'Super Admin',
        code: 'SUPER_ADMIN',
        description: 'Full system access',
        isSystem: true,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        name: 'Admin',
        code: 'ADMIN',
        description: 'Manage system operations',
        isSystem: true,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        name: 'Coordinator',
        code: 'COORDINATOR',
        description: 'Manage youth coordination activities',
        isSystem: false,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        name: 'Member',
        code: 'MEMBER',
        description: 'Regular youth member',
        isSystem: false,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }

    ]);


  },



  async down(queryInterface) {


    await queryInterface.bulkDelete(
      'Roles',
      null,
      {}
    );


  }


};