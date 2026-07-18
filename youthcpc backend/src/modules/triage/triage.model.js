'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
  class Triage extends Model {
    static associate(models) {
      Triage.belongsTo(models.Patient, { foreignKey: 'patient_id' });
      Triage.belongsTo(models.Department, { foreignKey: 'assigned_department_id' });
    //   Triage.belongsTo(models.User, { foreignKey: 'assigned_by' });
    }
  }

  Triage.init({
    id: {
      type: Sequelize.INTEGER.UNSIGNED, 
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },

    patient_id: {
      type: Sequelize.INTEGER.UNSIGNED, allowNull: false,
    },

    assigned_department_id: {
      type: Sequelize.INTEGER.UNSIGNED, allowNull: false
    },

    severity: {
      type: Sequelize.ENUM('low', 'medium', 'high', 'critical'),
      allowNull: false
    },

    notes: {
      type: Sequelize.TEXT
    }

  }, {
    sequelize,
    modelName: 'Triage',
    tableName: 'triages',
    timestamps: true
  });

  return Triage;
};