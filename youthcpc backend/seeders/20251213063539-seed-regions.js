'use strict';

module.exports = {
  async up(queryInterface) {
    const now = new Date();

    await queryInterface.bulkInsert('Regions', [
      { name: 'Tigray', code: 'TIG', description: 'Tigray Regional State', isActive: true, createdAt: now, updatedAt: now },
      { name: 'Afar', code: 'AFR', description: 'Afar Regional State', isActive: true, createdAt: now, updatedAt: now },
      { name: 'Amhara', code: 'AMH', description: 'Amhara Regional State', isActive: true, createdAt: now, updatedAt: now },
      { name: 'Oromia', code: 'ORM', description: 'Oromia Regional State', isActive: true, createdAt: now, updatedAt: now },
      { name: 'Somali', code: 'SOM', description: 'Somali Regional State', isActive: true, createdAt: now, updatedAt: now },
      { name: 'Benishangul-Gumuz', code: 'BEN', description: 'Benishangul-Gumuz Regional State', isActive: true, createdAt: now, updatedAt: now },
      { name: 'Sidama', code: 'SID', description: 'Sidama Regional State', isActive: true, createdAt: now, updatedAt: now },
      { name: 'South Ethiopia', code: 'SER', description: 'South Ethiopia Regional State', isActive: true, createdAt: now, updatedAt: now },
      { name: 'Central Ethiopia', code: 'CER', description: 'Central Ethiopia Regional State', isActive: true, createdAt: now, updatedAt: now },
      { name: 'South West Ethiopia', code: 'SWE', description: 'South West Ethiopia Regional State', isActive: true, createdAt: now, updatedAt: now },
      { name: 'Gambela', code: 'GAM', description: 'Gambela Regional State', isActive: true, createdAt: now, updatedAt: now },
      { name: 'Harari', code: 'HAR', description: 'Harari Regional State', isActive: true, createdAt: now, updatedAt: now },
      { name: 'Addis Ababa', code: 'ADD', description: 'Addis Ababa City Administration', isActive: true, createdAt: now, updatedAt: now },
      { name: 'Dire Dawa', code: 'DIR', description: 'Dire Dawa City Administration', isActive: true, createdAt: now, updatedAt: now }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Regions', null, {});
  }
};