'use strict';

module.exports = {

    async up(queryInterface, Sequelize) {

        await queryInterface.createTable('News', {

            id: {
                type: Sequelize.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },

            title: {
                type: Sequelize.STRING(255),
                allowNull: false
            },

            slug: {
                type: Sequelize.STRING(255),
                allowNull: false,
                unique: true
            },

            summary: {
                type: Sequelize.STRING(500)
            },

            content: {
                type: Sequelize.TEXT,
                allowNull: false
            },

            image: {
                type: Sequelize.STRING(255)
            },

            category: {
                type: Sequelize.STRING(100)
            },


            authorId: {
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
                type: Sequelize.ENUM('DRAFT', 'PUBLISHED', 'ARCHIVED'),
                defaultValue: 'DRAFT'
            },


            publishedDate: {
                type: Sequelize.DATE
            },


            views: {
                type: Sequelize.INTEGER.UNSIGNED,
                defaultValue: 0
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

        await queryInterface.dropTable('News');

    }

};