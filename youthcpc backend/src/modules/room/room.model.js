'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    static associate(models) {
      Room.belongsTo(models.Ward, { foreignKey: 'ward_id' });
      Room.hasMany(models.Bed, { foreignKey: 'room_id' });
    }
  }

  Room.init({
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    ward_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    room_number: { type: DataTypes.STRING, allowNull: false },
    type: { type: DataTypes.STRING },
    capacity: { type: DataTypes.INTEGER, defaultValue: 1 },
    occupiedBeds: { type: DataTypes.INTEGER, defaultValue: 0 },
    status: { type: DataTypes.BOOLEAN, defaultValue: true }
  }, {
    sequelize,
    modelName: 'Room',
    tableName: 'Rooms',
    timestamps: true
  });

  return Room;
};