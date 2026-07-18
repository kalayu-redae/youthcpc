'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('triages', {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },

      patient_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'Patients',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },

      assigned_department_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'Departments',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },

      severity: {
        type: Sequelize.ENUM('low', 'medium', 'high', 'critical'),
        allowNull: false
      },

      notes: {
        type: Sequelize.TEXT,
        allowNull: true
      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },

      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('triages');

    // Clean up ENUM type for PostgreSQL
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_triages_severity";');
  }
};