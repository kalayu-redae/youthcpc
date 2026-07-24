'use strict';

const { Model } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsTo(models.Role, { foreignKey: 'roleId', as: 'role' });
      User.hasOne(models.MemberProfile, { foreignKey: 'userId', as: 'memberProfile' });
      User.hasMany(models.News, { foreignKey: 'authorId', as: 'news' });
    }

    createPasswordResetOTP() {
      const otp = Math.floor(1000 + Math.random() * 9000).toString();
      this.passwordResetOTP = otp;
      this.passwordResetOTPExpires = new Date(Date.now() + 10 * 60 * 1000);
      return otp;
    }

    generateRandomPassword() {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      return Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    }

    async checkPassword(password) {
      console.log('password:', password);
      return bcrypt.compare(password, this.password);
    }
  }

  User.init({
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    roleId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    fullName: { type: DataTypes.STRING(150), allowNull: false },
    phoneNumber: { type: DataTypes.STRING(20), allowNull: false, unique: true },
    email: { type: DataTypes.STRING(120), unique: true, validate: { isEmail: true } },
    password: { type: DataTypes.STRING, allowNull: false },

    profileImage: { type: DataTypes.STRING },

    isVerified: { type: DataTypes.BOOLEAN, defaultValue: false },

    isActive: { type: DataTypes.BOOLEAN, defaultValue: true },

    changePassword: { type: DataTypes.BOOLEAN, defaultValue: true },

    lastLogin: { type: DataTypes.DATE },

    passwordResetOTP: { type: DataTypes.STRING },

    passwordResetOTPExpires: { type: DataTypes.DATE }

  }, {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
    timestamps: true,

    defaultScope: {
      attributes: { exclude: ['password', 'passwordResetOTP', 'passwordResetOTPExpires'] }
    },

    scopes: {
      withPassword: {}
    },

    hooks: {
      beforeCreate: async user => {
        if (user.password) user.password = await bcrypt.hash(user.password, 12);
      },

      beforeUpdate: async user => {
        if (user.changed('password')) user.password = await bcrypt.hash(user.password, 12);
      }
    }
  });

  return User;
};