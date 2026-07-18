'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Wards', {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      department_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'Departments',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      type: {
        type: Sequelize.STRING,
        allowNull: true
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true
      },
      capacity: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      occupiedBeds: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP') }
    });


    // Add unique constraint
    await queryInterface.addConstraint('Wards', {
      fields: ['department_id', 'name'],
      type: 'unique',
      name: 'unique_ward_name_per_department'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Wards');
  }
};