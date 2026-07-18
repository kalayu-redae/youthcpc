'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Guardians', {     
    id: { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    patientId: { type: Sequelize.INTEGER.UNSIGNED, allowNull: true },
    fullName: { type: Sequelize.STRING, allowNull: false },
    gender:{ type: Sequelize.ENUM('male','female','other'),allowNull: false },
    relationship: { type: Sequelize.STRING, allowNull: false },
    phoneNumber: { type: Sequelize.STRING, allowNull: false, unique: true },
    email: { type: Sequelize.STRING, validate: { isEmail: true } },
    address: { type: Sequelize.STRING },
    isEmergency: {type: Sequelize.BOOLEAN,defaultValue: false},
    createdAt: { allowNull: false, type: Sequelize.DATE },
    updatedAt: { allowNull: false, type: Sequelize.DATE }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Guardians');
  }
};

