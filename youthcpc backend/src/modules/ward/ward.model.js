'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Ward extends Model {
    static associate(models) {
      Ward.belongsTo(models.Department, { foreignKey: 'department_id', as: 'department'  });
      Ward.hasMany(models.Room, { foreignKey: 'ward_id', as: 'rooms' });
    }
  }

  Ward.init({
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    department_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true },
    name: { type: DataTypes.STRING, allowNull: false },
    type: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING },
    capacity: { type: DataTypes.INTEGER, defaultValue: 0 },
    occupiedBeds: { type: DataTypes.INTEGER, defaultValue: 0 }
  }, {
    sequelize,
    modelName: 'Ward',
    tableName: 'Wards',
    timestamps: true
  });

  return Ward;
};