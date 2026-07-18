'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    const patients = [];

    for (let i = 1; i <= 3; i++) {
      patients.push({
        businessId: 1,
        branchId: 1,
        mrn: String(i).padStart(6, '0'), // 000001 format
        fullName: `Patient ${i}`,
        gender: i % 2 === 0 ? 'female' : 'male',
        birthDate: new Date(1990, 1, i),
        phoneNumber: `091100000${i}`,
        email: `patient${i}@demo.com`,
        fan: `FAN00${i}`,
        profileImage: null,
        address: `Addis Ababa Area ${i}`,
        status: 'inPatient',
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    await queryInterface.bulkInsert('Patients', patients, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Patients', null, {});
  }
};
