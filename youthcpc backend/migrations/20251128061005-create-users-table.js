'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      roleId: { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, references: { model: 'Roles', key: 'id' }, onUpdate: 'CASCADE', onDelete: 'RESTRICT' },

      fullName: { type: Sequelize.STRING(150), allowNull: false },
      phoneNumber: { type: Sequelize.STRING(20), allowNull: false, unique: true },
      email: { type: Sequelize.STRING(120), unique: true },
      password: { type: Sequelize.STRING, allowNull: false },
      profileImage: { type: Sequelize.STRING },

      isVerified: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
      isActive: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
      changePassword: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },

      lastLogin: { type: Sequelize.DATE },
      passwordResetOTP: { type: Sequelize.STRING(10) },
      passwordResetOTPExpires: { type: Sequelize.DATE },

      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false }
    });

    await queryInterface.addIndex('Users', ['roleId']);
    await queryInterface.addIndex('Users', ['phoneNumber'], { unique: true });
    await queryInterface.addIndex('Users', ['email'], { unique: true });
    await queryInterface.addIndex('Users', ['isActive']);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Users');
  }
};