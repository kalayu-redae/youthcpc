'use strict';

module.exports = {

    async up(queryInterface, Sequelize) {

        await queryInterface.createTable('MemberSkills', {

            id: { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },

            memberProfileId: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
                references: { model: 'MemberProfiles', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },

            skillId: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
                references: { model: 'Skills', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },

            level: {
                type: Sequelize.ENUM('BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT'),
                allowNull: false,
                defaultValue: 'BEGINNER'
            },

            yearsOfExperience: { type: Sequelize.DECIMAL(4, 1), defaultValue: 0 },

            remarks: { type: Sequelize.STRING(255) },

            isActive: { type: Sequelize.BOOLEAN, defaultValue: true },

            createdAt: { type: Sequelize.DATE, allowNull: false },

            updatedAt: { type: Sequelize.DATE, allowNull: false }

        });

        await queryInterface.addConstraint('MemberSkills', {

            fields: ['memberProfileId', 'skillId'],
            type: 'unique',
            name: 'unique_member_skill'

        });

    },

    async down(queryInterface) {

        await queryInterface.dropTable('MemberSkills');

    }

};