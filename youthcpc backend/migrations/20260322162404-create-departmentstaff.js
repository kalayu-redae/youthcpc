'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Department_Staff', {
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

      user_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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

    // Prevent same user being assigned twice to same department
    await queryInterface.addConstraint('Department_Staff', {
      fields: ['department_id', 'user_id'],
      type: 'unique',
      name: 'unique_department_staff_assignment'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Department_Staff');
  }
};