'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Patient extends Model {
    static async generateMRN(){
      const lastPatient = await Patient.findOne({order:[['id','DESC']]});
      let nextNumber = 1;
      
      if(lastPatient && lastPatient.mrn){
        nextNumber = parseInt(lastPatient.mrn) + 1;
      }

      return String(nextNumber).padStart(6,'0'); // 000001
    }
  }

  Patient.init({
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    businessId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    branchId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true },
    mrn: { type: DataTypes.STRING(6), allowNull:false, unique:true },
    fullName: { type: DataTypes.STRING, allowNull: false },
    gender:{ type: DataTypes.ENUM('male','female','other'),allowNull: false },
    birthDate:{ type: DataTypes.DATEONLY, allowNull: false },
    phoneNumber: { type: DataTypes.STRING, allowNull: false, unique: true },
    email: { type: DataTypes.STRING, validate: { isEmail: true } },
    fan:{ type: DataTypes.STRING},
    profileImage: { type: DataTypes.STRING },
    address: { type: DataTypes.STRING },
    status: {type: DataTypes.ENUM('inPatient','outPatient','Discharge','x'), defaultValue: "inPatient" },

  }, {
    sequelize,
    modelName: 'Patient',
    tableName: 'Patients',
    timestamps: true,
  });

  Patient.associate = (models) => {
    Patient.belongsTo(models.Business, { foreignKey: 'businessId', as: 'business' });
    Patient.belongsTo(models.Branch, { foreignKey: 'branchId', as: 'branch' });
    Patient.hasMany(models.Guardian, {foreignKey: 'patientId', as: 'guardian'});
  };

  return Patient;
};
