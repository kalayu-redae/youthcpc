'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
  class VitalSign extends Model {
    static associate(models) {
      VitalSign.belongsTo(models.Patient, { foreignKey: 'patient_id' });
      VitalSign.belongsTo(models.User, { foreignKey: 'recorded_by' });
    }
  }

  VitalSign.init({
    id: {
      type: Sequelize.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },

    patient_id: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false
    },

    blood_group: {
      type: Sequelize.STRING(10)
    },

    blood_pressure: {
      type: Sequelize.STRING(20)
    },

    temperature: {
      type: Sequelize.FLOAT
    },

    pulse: {
      type: Sequelize.INTEGER
    },

    weight: {
      type: Sequelize.FLOAT
    },

    height: {
      type: Sequelize.FLOAT
    },

    recorded_by: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: true
    },

    recorded_at: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    }

  }, {
    sequelize,
    modelName: 'VitalSign',
    tableName: 'vital_signs',
    timestamps: true
  });

  return VitalSign;
};