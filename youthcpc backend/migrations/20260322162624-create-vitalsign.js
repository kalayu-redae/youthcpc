'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('vital_signs', {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
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

      blood_group: {
        type: Sequelize.STRING(10),
        allowNull: true
      },

      blood_pressure: {
        type: Sequelize.STRING(20),
        allowNull: true
      },

      temperature: {
        type: Sequelize.FLOAT,
        allowNull: true
      },

      pulse: {
        type: Sequelize.INTEGER,
        allowNull: true
      },

      weight: {
        type: Sequelize.FLOAT,
        allowNull: true
      },

      height: {
        type: Sequelize.FLOAT,
        allowNull: true
      },

      recorded_by: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },

      recorded_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
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
    await queryInterface.dropTable('vital_signs');
  }
};