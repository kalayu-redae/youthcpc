'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Department extends Model {
    static associate(models) {
      Department.belongsTo(models.Business, { foreignKey: 'businessId',as: 'business' });
      Department.belongsTo(models.Branch,{foreignKey:'branchId',as: 'branch'} );
      Department.hasMany(models.DepartmentStaff, { foreignKey: 'department_id',as: 'departmentstaff' });
      Department.hasMany(models.Ward, { foreignKey: 'department_id',as: 'ward' });
    }
  }

  Department.init({
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    businessId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
	  branchId:{type:DataTypes.INTEGER.UNSIGNED,allowNull: true },
    name: { type: DataTypes.STRING, allowNull: false },
    headUserId: { type: DataTypes.INTEGER.UNSIGNED },
    status: { type: DataTypes.BOOLEAN, defaultValue: true }
  }, {
    sequelize,
    modelName: 'Department',
    tableName: 'Departments',
    timestamps: true,
    indexes: [
        {
          unique: true,
          fields: ['businessId', 'name']
        }
      ]
  });

  return Department;
};