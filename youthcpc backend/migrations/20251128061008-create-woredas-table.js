'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Woredas', {
      id: { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },

      zoneId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: { model: 'Zones', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },

      name: { type: Sequelize.STRING(150), allowNull: false },

      code: { type: Sequelize.STRING(20), allowNull: false, unique: true },

      isActive: { type: Sequelize.BOOLEAN, defaultValue: true },

      createdAt: { allowNull: false, type: Sequelize.DATE },

      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });

    await queryInterface.addIndex('Woredas', ['zoneId']);
    await queryInterface.addIndex('Woredas', ['name']);
    await queryInterface.addIndex('Woredas', ['code']);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Woredas');
  }
};