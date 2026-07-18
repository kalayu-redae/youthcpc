'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      // 1️⃣ Users belonging to this role
      if (models.User) {
        Role.hasMany(models.User, { foreignKey: 'roleId', as: 'users' });
      }

      // 2️⃣ Role-Permissions many-to-many
      if (models.RolePermission && models.Permission) {
        Role.belongsToMany(models.Permission, {
          through: models.RolePermission,
          foreignKey: 'roleId',
          as: 'permissions'
        });
      }

      // 3️⃣ Belongs to Business
      if (models.Business) {
        Role.belongsTo(models.Business, { foreignKey: 'businessId', as: 'business' });
      }

      // 4️⃣ Belongs to Branch (optional)
      if (models.Branch) {
        Role.belongsTo(models.Branch, { foreignKey: 'branchId', as: 'branch' }); // lowercase alias
      }
    }
  }

  Role.init(
    {
      id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      businessId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
      branchId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true },
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