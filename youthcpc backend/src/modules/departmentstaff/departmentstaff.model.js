'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class DepartmentStaff extends Model {
    static associate(models) {
      DepartmentStaff.belongsTo(models.Department, { foreignKey: 'department_id' });
      DepartmentStaff.belongsTo(models.User, { foreignKey: 'user_id' });
    }
  }

  DepartmentStaff.init({
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    department_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    user_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    status: { type: DataTypes.BOOLEAN, defaultValue: true }
  }, {
    sequelize,
    modelName: 'DepartmentStaff',
    tableName: 'Department_Staff',
    timestamps: true
  });

  return DepartmentStaff;
};