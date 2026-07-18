'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Bed extends Model {
    static associate(models) {
      Bed.belongsTo(models.Room, { foreignKey: 'room_id' });
    }
  }

  Bed.init({
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    room_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    bed_number: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.ENUM('available', 'occupied', 'maintenance', 'reserved'), defaultValue: 'available' }
  }, {
    sequelize,
    modelName: 'Bed',
    tableName: 'Beds',
    timestamps: true
  });

  return Bed;
};