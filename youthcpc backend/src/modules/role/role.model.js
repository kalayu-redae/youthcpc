'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      // 1️⃣ Users belonging to this role
      if (models.User) {
        Role.hasMany(models.User, { foreignKey: 'roleId', as: 'users' });
      }
    }
  }

  Role.init(
    {
      id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      name: { type: DataTypes.STRING, allowNull: false },
      code: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.STRING },
      isActive: { type: DataTypes.BOOLEAN, defaultValue: true }
    },
    {
      sequelize,
      modelName: 'Role',
      tableName: 'Roles',
      timestamps: true
    }
  );

  return Role;
};