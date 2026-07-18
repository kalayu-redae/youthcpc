'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Patients', {   
      id: { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      businessId: { type: Sequelize.INTEGER.UNSIGNED, allowNull: false },
      branchId: { type: Sequelize.INTEGER.UNSIGNED, allowNull: true },
      mrn: { type: Sequelize.STRING(6), allowNull:false, unique:true },
      fullName: { type: Sequelize.STRING, allowNull: false },
      gender:{ type: Sequelize.ENUM('male','female','other'),allowNull: false },
      birthDate:{ type: Sequelize.DATE, allowNull: false },
      phoneNumber: { type: Sequelize.STRING, allowNull: false, unique: true },
      email: { type: Sequelize.STRING },
      profileImage: { type: Sequelize.STRING },
      address: { type: Sequelize.STRING },
      fan:{ type: Sequelize.STRING },
      status: {type: Sequelize.ENUM('inPatient','outPatient','Discharge','x'), defaultValue: "inPatient" },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Patients');
  }
};

