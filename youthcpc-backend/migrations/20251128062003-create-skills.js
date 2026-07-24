'use strict';

module.exports = {

    async up(queryInterface, Sequelize) {

        await queryInterface.createTable('Skills', {

            id: { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
            name: { type: Sequelize.STRING(150), allowNull: false, unique: true },
            category: { type: Sequelize.STRING(100) },
            description: { type: Sequelize.TEXT },
            isActive: { type: Sequelize.BOOLEAN, defaultValue: true },
            createdAt: { type: Sequelize.DATE, allowNull: false },
            updatedAt: { type: Sequelize.DATE, allowNull: false }

        });

    },

    async down(queryInterface) {

        await queryInterface.dropTable('Skills');

    }

};