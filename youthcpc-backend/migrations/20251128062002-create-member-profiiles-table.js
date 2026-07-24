'use strict';

module.exports = {

    async up(queryInterface, Sequelize) {

        await queryInterface.createTable('MemberProfiles', {

            id: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },

            userId: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
                unique: true,
                references: {
                    model: 'Users',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },

            membershipNumber: {
                type: Sequelize.STRING(50),
                allowNull: false,
                unique: true
            },

            gender: {
                type: Sequelize.STRING(20)
            },

            dateOfBirth: {
                type: Sequelize.DATEONLY
            },

            maritalStatus: {
                type: Sequelize.STRING(30)
            },

            nationality: {
                type: Sequelize.STRING(100),
                defaultValue: 'Ethiopian'
            },


            regionId: {
                type: Sequelize.INTEGER.UNSIGNED,
                references: {
                    model: 'Regions',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            },


            zoneId: {
                type: Sequelize.INTEGER.UNSIGNED,
                references: {
                    model: 'Zones',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            },


            woredaId: {
                type: Sequelize.INTEGER.UNSIGNED,
                references: {
                    model: 'Woredas',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            },


            tabiyaId: {
                type: Sequelize.INTEGER.UNSIGNED,
                references: {
                    model: 'Tabiyas',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            },


            educationLevelId: {
                type: Sequelize.INTEGER.UNSIGNED,
                references: {
                    model: 'EducationLevels',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            },


            professionId: {
                type: Sequelize.INTEGER.UNSIGNED,
                references: {
                    model: 'Professions',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            },


            occupation: {
                type: Sequelize.STRING(150)
            },


            organization: {
                type: Sequelize.STRING(150)
            },


            employmentStatus: {
                type: Sequelize.STRING(30)
            },


            monthlyIncome: {
                type: Sequelize.DECIMAL(12, 2)
            },


            availabilityStatus: {
                type: Sequelize.STRING(30),
                defaultValue: 'AVAILABLE'
            },


            availabilityNote: {
                type: Sequelize.TEXT
            },


            emergencyContactName: {
                type: Sequelize.STRING(150)
            },


            emergencyContactPhone: {
                type: Sequelize.STRING(30)
            },


            membershipDate: {
                type: Sequelize.DATEONLY
            },


            experience: {
                type: Sequelize.TEXT
            },


            certifications: {
                type: Sequelize.TEXT
            },


            volunteerExperience: {
                type: Sequelize.TEXT
            },


            aspirations: {
                type: Sequelize.TEXT
            },


            socialMedia: {
                type: Sequelize.JSON
            },


            bio: {
                type: Sequelize.TEXT
            },


            isVerified: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },


            verificationDate: {
                type: Sequelize.DATE
            },


            verifiedBy: {
                type: Sequelize.INTEGER.UNSIGNED,
                references: {
                    model: 'Users',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            },


            isActive: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
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

        await queryInterface.dropTable('MemberProfiles');

    }

};