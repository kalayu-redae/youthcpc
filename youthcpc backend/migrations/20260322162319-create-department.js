'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Departments', {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },

      businessId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'Businesses',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },

      branchId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true,
        references: {
          model: 'Branches',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },

      name: {
        type: Sequelize.STRING,
        allowNull: false
      },

      headUserId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
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

    // Composite unique index: businessId + name
    await queryInterface.addConstraint('Departments', {
      fields: ['businessId', 'name'],
      type: 'unique',
      name: 'unique_department_name_per_business'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Departments');
  }
};