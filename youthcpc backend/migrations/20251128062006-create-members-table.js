// 'use strict';

// module.exports = {
//   async up(queryInterface, Sequelize) {
//     await queryInterface.createTable('Users', {
//       id: { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
//       roleId: { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, references: { model: 'Roles', key: 'id' }, onUpdate: 'CASCADE', onDelete: 'RESTRICT' },

//       fullName: { type: Sequelize.STRING, allowNull: false },
//       phoneNumber: { type: Sequelize.STRING, allowNull: false, unique: true },
//       email: { type: Sequelize.STRING, unique: true },
//       password: { type: Sequelize.STRING },

//       profileImage: { type: Sequelize.STRING },
//       dateOfBirth: { type: Sequelize.DATEONLY },
//       gender: { type: Sequelize.ENUM('MALE', 'FEMALE', 'OTHER') },

//       tabiyaId: { type: Sequelize.INTEGER.UNSIGNED, references: { model: 'Tabiyas', key: 'id' }, onUpdate: 'CASCADE', onDelete: 'SET NULL' },
//       professionId: { type: Sequelize.INTEGER.UNSIGNED, references: { model: 'Professions', key: 'id' }, onUpdate: 'CASCADE', onDelete: 'SET NULL' },
//       educationLevelId: { type: Sequelize.INTEGER.UNSIGNED, references: { model: 'EducationLevels', key: 'id' }, onUpdate: 'CASCADE', onDelete: 'SET NULL' },
//       aspiration: { type: Sequelize.TEXT },

//       availabilityStatus: { type: Sequelize.ENUM('AVAILABLE', 'BUSY', 'NOT_AVAILABLE'), defaultValue: 'AVAILABLE' },
//       availabilityNote: { type: Sequelize.TEXT },
//       membershipDate: { type: Sequelize.DATEONLY },

//       isVerified: { type: Sequelize.BOOLEAN, defaultValue: false },
//       isActive: { type: Sequelize.BOOLEAN, defaultValue: true },
//       lastLogin: { type: Sequelize.DATE },

//       passwordResetOTP: { type: Sequelize.STRING },
//       passwordResetOTPExpires: { type: Sequelize.DATE },

//       changePassword: { type: Sequelize.BOOLEAN, defaultValue: true },

//       createdAt: { allowNull: false, type: Sequelize.DATE },
//       updatedAt: { allowNull: false, type: Sequelize.DATE }
//     });

//     await queryInterface.addIndex('Users', ['phoneNumber']);
//     await queryInterface.addIndex('Users', ['email']);
//     await queryInterface.addIndex('Users', ['roleId']);
//     await queryInterface.addIndex('Users', ['tabiyaId']);
//   },

//   async down(queryInterface) {
//     await queryInterface.dropTable('Users');
//   }
// };