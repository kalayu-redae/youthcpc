// 'use strict';

// const { Model } = require('sequelize');
// const bcrypt = require('bcryptjs');

// module.exports = (sequelize, DataTypes) => {
//   class User extends Model {
//     createPasswordResetOTP() {
//       const otp = Math.floor(1000 + Math.random() * 9000).toString();
//       this.passwordResetOTP = otp;
//       this.passwordResetOTPExpires = new Date(Date.now() + 10 * 60 * 1000);
//       return otp;
//     }

//     generateRandomPassword() {
//       const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//       return Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
//     }

//     async checkPassword(password) {
//       return bcrypt.compare(password, this.password);
//     }
//   }

//   User.init({
//     id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
//     roleId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
//     fullName: { type: DataTypes.STRING, allowNull: false },
//     phoneNumber: { type: DataTypes.STRING, allowNull: false, unique: true },
//     email: { type: DataTypes.STRING, allowNull: true, unique: true, validate: { isEmail: true } },
//     password: { type: DataTypes.STRING, allowNull: true },
//     profileImage: { type: DataTypes.STRING },
//     dateOfBirth: { type: DataTypes.DATEONLY },
//     gender: { type: DataTypes.ENUM('MALE', 'FEMALE', 'OTHER') },
//     tabiyaId: { type: DataTypes.INTEGER.UNSIGNED },
//     professionId: { type: DataTypes.INTEGER.UNSIGNED },
//     educationLevelId: { type: DataTypes.INTEGER.UNSIGNED },
//     aspiration: { type: DataTypes.TEXT },
//     availabilityStatus: { type: DataTypes.ENUM('AVAILABLE', 'BUSY', 'NOT_AVAILABLE'), defaultValue: 'AVAILABLE' },
//     availabilityNote: { type: DataTypes.TEXT },
//     membershipDate: { type: DataTypes.DATEONLY },
//     isVerified: { type: DataTypes.BOOLEAN, defaultValue: false },
//     isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
//     lastLogin: { type: DataTypes.DATE },
//     passwordResetOTP: { type: DataTypes.STRING },
//     passwordResetOTPExpires: { type: DataTypes.DATE },
//     changePassword: { type: DataTypes.BOOLEAN, defaultValue: true }
//   }, {
//     sequelize,
//     modelName: 'Member',
//     tableName: 'Members',
//     timestamps: true,
//     hooks: {
//       beforeCreate: async (user) => { if (user.password) user.password = await bcrypt.hash(user.password, 12); },
//       beforeUpdate: async (user) => { if (user.changed('password')) user.password = await bcrypt.hash(user.password, 12); }
//     }
//   });

//   User.associate = (models) => {
//     User.belongsTo(models.Role, { foreignKey: 'roleId', as: 'role' });
//     User.belongsTo(models.Tabiya, { foreignKey: 'tabiyaId', as: 'tabiya' });
//     User.belongsTo(models.Profession, { foreignKey: 'professionId', as: 'profession' });
//     User.belongsTo(models.EducationLevel, { foreignKey: 'educationLevelId', as: 'educationLevel' });
//   };

//   return User;
// };