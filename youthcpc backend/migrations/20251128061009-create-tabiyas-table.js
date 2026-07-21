'use strict';

module.exports = {

  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('Tabiyas', {

      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },

      woredaId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'Woredas',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },

      name: {
        type: Sequelize.STRING(150),
        allowNull: false
      },

      code: {
        type: Sequelize.STRING(50),
        unique: true
      },

      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }

    });


    await queryInterface.addIndex('Tabiyas', ['woredaId']);

    await queryInterface.addIndex('Tabiyas', ['code'], {
      unique: true
    });

  },


  async down(queryInterface) {

    await queryInterface.dropTable('Tabiyas');

  }

};