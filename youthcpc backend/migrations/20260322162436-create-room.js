'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Rooms', {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },

      ward_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'Wards',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },

      room_number: {
        type: Sequelize.STRING,
        allowNull: false
      },

      type: {
        type: Sequelize.STRING,
        allowNull: true
      },

      capacity: {
        type: Sequelize.INTEGER,
        defaultValue: 1
      },

      occupiedBeds: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },

      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
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

    // Prevent duplicate room numbers within the same ward
    await queryInterface.addConstraint('Rooms', {
      fields: ['ward_id', 'room_number'],
      type: 'unique',
      name: 'unique_room_per_ward'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Rooms');
  }
};