'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Branch extends Model {
    static associate(models) {
      // Branch belongs to Business
      Branch.belongsTo(models.Business, { foreignKey: 'businessId', as: 'business' });

      // Branch has many Users and Roles
      Branch.hasMany(models.User, { foreignKey: 'branchId', as: 'users' });
      Branch.hasMany(models.Role, { foreignKey: 'branchId', as: 'roles' });

      // Branch has many Departments, Wards, Rooms, Beds
      Branch.hasMany(models.Department, { foreignKey: 'branchId', as: 'departments' });
    }
  }

  Branch.init(
    {
      id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      businessId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
      name: { type: DataTypes.STRING, allowNull: false },
      code: { type: DataTypes.STRING, allowNull: false },
      location: DataTypes.STRING,
      managerName: DataTypes.STRING,
      phone: DataTypes.STRING,
      email: DataTypes.STRING,
      isActive: { type: DataTypes.BOOLEAN, defaultValue: true }
    },
    {
      sequelize,
      modelName: 'Branch',
      tableName: 'Branches',
      timestamps: true,
      indexes: [
        { unique: true, fields: ['businessId', 'code'] }
      ]
    }
  );

  return Branch;
};