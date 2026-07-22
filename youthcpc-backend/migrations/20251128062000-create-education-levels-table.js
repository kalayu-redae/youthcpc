'use strict';

module.exports = {

  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('EducationLevels', {

      id: { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },

      name: { type: Sequelize.STRING(100), allowNull: false, unique: true },

      code: { type: Sequelize.STRING(30), unique: true },

      description: { type: Sequelize.TEXT },

      sortOrder: { type: Sequelize.INTEGER.UNSIGNED, defaultValue: 1 },

      isActive: { type: Sequelize.BOOLEAN, defaultValue: true },

      createdAt: { allowNull: false, type: Sequelize.DATE },

      updatedAt: { allowNull: false, type: Sequelize.DATE }

    });

  },

  async down(queryInterface) {

    await queryInterface.dropTable('EducationLevels');

  }

};