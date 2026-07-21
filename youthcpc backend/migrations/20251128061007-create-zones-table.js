'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Zones', {
      id: { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },

      regionId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: { model: 'Regions', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },

      name: { type: Sequelize.STRING(150), allowNull: false },

      code: { type: Sequelize.STRING(20), allowNull: false, unique: true },

      isActive: { type: Sequelize.BOOLEAN, defaultValue: true },

      createdAt: { allowNull: false, type: Sequelize.DATE },

      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });

    await queryInterface.addIndex('Zones', ['regionId']);
    await queryInterface.addIndex('Zones', ['name']);
    await queryInterface.addIndex('Zones', ['code']);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Zones');
  }
};