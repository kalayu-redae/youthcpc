'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Beds', {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },

      room_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'Rooms',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },

      bed_number: {
        type: Sequelize.STRING,
        allowNull: false
      },

      status: {
        type: Sequelize.ENUM('available', 'occupied', 'maintenance', 'reserved'),
        defaultValue: 'available'
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

    // Prevent duplicate bed numbers inside the same room
    await queryInterface.addConstraint('Beds', {
      fields: ['room_id', 'bed_number'],
      type: 'unique',
      name: 'unique_bed_per_room'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Beds');

    // Required for PostgreSQL and some MySQL setups to avoid leftover enum type
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Beds_status";');
  }
};