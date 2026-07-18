'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
 class Guardian extends Model {
    static associate(models) {
      Guardian.belongsTo(models.Patient, {foreignKey: 'patientId',as: 'patient'});
    }
  }
  Guardian.init({
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    patientId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true },
    fullName: { type: DataTypes.STRING, allowNull: false },
    gender:{ type: DataTypes.ENUM('male','female','other'),allowNull: false },
    relationship: { type: DataTypes.STRING, allowNull: false },
    phoneNumber: { type: DataTypes.STRING, allowNull: false, unique: true },
    email: { type: DataTypes.STRING, validate: { isEmail: true } },
    address: { type: DataTypes.STRING },
    isEmergency: {type: DataTypes.BOOLEAN,defaultValue: false}
  }, {
    sequelize,
    modelName: 'Guardian',
    tableName: 'Guardians',
    timestamps: true,
  });

  return Guardian;
};
