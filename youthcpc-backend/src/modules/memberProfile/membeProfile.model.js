'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    class MemberProfile extends Model {

        static associate(models) {

            MemberProfile.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });

            MemberProfile.belongsTo(models.Region, { foreignKey: 'regionId', as: 'region' });

            MemberProfile.belongsTo(models.Zone, { foreignKey: 'zoneId', as: 'zone' });

            MemberProfile.belongsTo(models.Woreda, { foreignKey: 'woredaId', as: 'woreda' });

            MemberProfile.belongsTo(models.Tabiya, { foreignKey: 'tabiyaId', as: 'tabiya' });

            MemberProfile.belongsTo(models.EducationLevel, { foreignKey: 'educationLevelId', as: 'educationLevel' });

            MemberProfile.belongsTo(models.Profession, { foreignKey: 'professionId', as: 'profession' });

        }

    }


    MemberProfile.init({

        id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },

        userId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, unique: true },

        membershipNumber: { type: DataTypes.STRING(50), allowNull: false, unique: true },

        gender: { type: DataTypes.ENUM('MALE', 'FEMALE') },

        dateOfBirth: { type: DataTypes.DATEONLY },

        maritalStatus: { type: DataTypes.ENUM('SINGLE', 'MARRIED', 'DIVORCED', 'WIDOWED') },

        nationality: { type: DataTypes.STRING(100), defaultValue: 'Ethiopian' },


        regionId: { type: DataTypes.INTEGER.UNSIGNED },

        zoneId: { type: DataTypes.INTEGER.UNSIGNED },

        woredaId: { type: DataTypes.INTEGER.UNSIGNED },

        tabiyaId: { type: DataTypes.INTEGER.UNSIGNED },


        educationLevelId: { type: DataTypes.INTEGER.UNSIGNED },

        professionId: { type: DataTypes.INTEGER.UNSIGNED },


        occupation: { type: DataTypes.STRING(150) },

        organization: { type: DataTypes.STRING(150) },


        employmentStatus: { type: DataTypes.ENUM('EMPLOYED', 'SELF_EMPLOYED', 'UNEMPLOYED', 'STUDENT') },


        monthlyIncome: { type: DataTypes.DECIMAL(12, 2) },


        availabilityStatus: { type: DataTypes.ENUM('AVAILABLE', 'BUSY', 'NOT_AVAILABLE'), defaultValue: 'AVAILABLE' },


        availabilityNote: { type: DataTypes.TEXT },


        emergencyContactName: { type: DataTypes.STRING(150) },

        emergencyContactPhone: { type: DataTypes.STRING(30) },


        membershipDate: { type: DataTypes.DATEONLY },


        bio: { type: DataTypes.TEXT },


        isActive: { type: DataTypes.BOOLEAN, defaultValue: true }

    }, {

        sequelize,

        modelName: 'MemberProfile',

        tableName: 'MemberProfiles',

        timestamps: true

    });


    return MemberProfile;

};