'use strict';

module.exports = {

    async up(queryInterface, Sequelize) {

        await queryInterface.createTable('ContactMessages', {

            id: {
                type: Sequelize.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },


            fullName: {
                type: Sequelize.STRING(150),
                allowNull: false
            },


            email: {
                type: Sequelize.STRING(150),
                allowNull: false
            },


            phone: {
                type: Sequelize.STRING(30)
            },


            subject: {
                type: Sequelize.STRING(200),
                allowNull: false
            },


            message: {
                type: Sequelize.TEXT,
                allowNull: false
            },


            status: {
                type: Sequelize.ENUM(
                    'NEW',
                    'READ',
                    'REPLIED',
                    'CLOSED'
                ),
                defaultValue: 'NEW'
            },


            reply: {
                type: Sequelize.TEXT
            },


            repliedBy: {
                type: Sequelize.INTEGER.UNSIGNED,

                references: {
                    model: 'Users',
                    key: 'id'
                },

                onUpdate: 'CASCADE',

                onDelete: 'SET NULL'

            },


            repliedAt: {
                type: Sequelize.DATE
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


    },


    async down(queryInterface) {

        await queryInterface.dropTable('ContactMessages');

    }

};