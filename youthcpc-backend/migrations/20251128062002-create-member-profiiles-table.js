'use strict';

module.exports = {

    async up(queryInterface, Sequelize) {

        await queryInterface.createTable('MemberProfiles', {

            id: { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },

            userId: { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, unique: true, references: { model: 'Users', key: 'id' }, onUpdate: 'CASCADE', onDelete: 'CASCADE' },

            membershipNumber: { type: Sequelize.STRING(50), unique: true },

            firstName: { type: Sequelize.STRING(100), allowNull: false },

            middleName: { type: Sequelize.STRING(100) },

            lastName: { type: Sequelize.STRING(100) },

            gender: { type: Sequelize.ENUM('MALE', 'FEMALE') },

            dateOfBirth: { type: Sequelize.DATEONLY },

            maritalStatus: { type: Sequelize.ENUM('SINGLE', 'MARRIED', 'DIVORCED', 'WIDOWED') },

            nationality: { type: Sequelize.STRING(100), defaultValue: 'Ethiopian' },

            tabiyaId: { type: Sequelize.INTEGER.UNSIGNED, references: { model: 'Tabiyas', key: 'id' }, onUpdate: 'CASCADE', onDelete: 'SET NULL' },

            educationLevelId: { type: Sequelize.INTEGER.UNSIGNED, references: { model: 'EducationLevels', key: 'id' }, onUpdate: 'CASCADE', onDelete: 'SET NULL' },

            professionId: { type: Sequelize.INTEGER.UNSIGNED, references: { model: 'Professions', key: 'id' }, onUpdate: 'CASCADE', onDelete: 'SET NULL' },

            occupation: { type: Sequelize.STRING(150) },

            organization: { type: Sequelize.STRING(150) },

            employmentStatus: { type: Sequelize.ENUM('EMPLOYED', 'SELF_EMPLOYED', 'UNEMPLOYED', 'STUDENT') },

            monthlyIncome: { type: Sequelize.DECIMAL(12, 2) },

            skills: { type: Sequelize.JSON },

            interests: { type: Sequelize.JSON },

            aspirations: { type: Sequelize.JSON },

            availabilityStatus: { type: Sequelize.ENUM('AVAILABLE', 'BUSY', 'NOT_AVAILABLE'), defaultValue: 'AVAILABLE' },

            availabilityNote: { type: Sequelize.TEXT },

            emergencyContactName: { type: Sequelize.STRING(150) },

            emergencyContactPhone: { type: Sequelize.STRING(30) },

            membershipDate: { type: Sequelize.DATEONLY },

            bio: { type: Sequelize.TEXT },

            createdAt: { allowNull: false, type: Sequelize.DATE },

            updatedAt: { allowNull: false, type: Sequelize.DATE }

        });

        await queryInterface.addIndex('MemberProfiles', ['userId']);
        await queryInterface.addIndex('MemberProfiles', ['membershipNumber']);
        await queryInterface.addIndex('MemberProfiles', ['tabiyaId']);

    },

    async down(queryInterface) {

        await queryInterface.dropTable('MemberProfiles');

    }

};