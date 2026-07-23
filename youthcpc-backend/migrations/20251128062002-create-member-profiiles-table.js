'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {

        await queryInterface.createTable('MemberProfiles', {

            id: { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },

            userId: { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, unique: true, references: { model: 'Users', key: 'id' }, onUpdate: 'CASCADE', onDelete: 'CASCADE' },

            membershipNumber: { type: Sequelize.STRING(50), allowNull: false, unique: true },

            gender: { type: Sequelize.ENUM('MALE', 'FEMALE') },

            dateOfBirth: { type: Sequelize.DATEONLY },

            maritalStatus: { type: Sequelize.ENUM('SINGLE', 'MARRIED', 'DIVORCED', 'WIDOWED') },

            nationality: { type: Sequelize.STRING(100), defaultValue: 'Ethiopian' },


            regionId: { type: Sequelize.INTEGER.UNSIGNED, references: { model: 'Regions', key: 'id' }, onUpdate: 'CASCADE', onDelete: 'SET NULL' },

            zoneId: { type: Sequelize.INTEGER.UNSIGNED, references: { model: 'Zones', key: 'id' }, onUpdate: 'CASCADE', onDelete: 'SET NULL' },

            woredaId: { type: Sequelize.INTEGER.UNSIGNED, references: { model: 'Woredas', key: 'id' }, onUpdate: 'CASCADE', onDelete: 'SET NULL' },

            tabiyaId: { type: Sequelize.INTEGER.UNSIGNED, references: { model: 'Tabiyas', key: 'id' }, onUpdate: 'CASCADE', onDelete: 'SET NULL' },


            educationLevelId: { type: Sequelize.INTEGER.UNSIGNED, references: { model: 'EducationLevels', key: 'id' }, onUpdate: 'CASCADE', onDelete: 'SET NULL' },

            professionId: { type: Sequelize.INTEGER.UNSIGNED, references: { model: 'Professions', key: 'id' }, onUpdate: 'CASCADE', onDelete: 'SET NULL' },


            occupation: { type: Sequelize.STRING(150) },

            organization: { type: Sequelize.STRING(150) },


            employmentStatus: { type: Sequelize.ENUM('EMPLOYED', 'SELF_EMPLOYED', 'UNEMPLOYED', 'STUDENT') },


            monthlyIncome: { type: Sequelize.DECIMAL(12, 2) },


            availabilityStatus: { type: Sequelize.ENUM('AVAILABLE', 'BUSY', 'NOT_AVAILABLE'), defaultValue: 'AVAILABLE' },


            availabilityNote: { type: Sequelize.TEXT },


            emergencyContactName: { type: Sequelize.STRING(150) },

            emergencyContactPhone: { type: Sequelize.STRING(30) },


            membershipDate: { type: Sequelize.DATEONLY },


            bio: { type: Sequelize.TEXT },


            isActive: { type: Sequelize.BOOLEAN, defaultValue: true },


            createdAt: { type: Sequelize.DATE, allowNull: false },

            updatedAt: { type: Sequelize.DATE, allowNull: false }

        });

    },


    async down(queryInterface) {

        await queryInterface.dropTable('MemberProfiles');

    }

};