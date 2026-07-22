'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    class EducationLevel extends Model {

        static associate(models) {
            EducationLevel.hasMany(models.MemberProfile, { foreignKey: 'educationLevelId', as: 'memberProfiles' });
        }

    }

    EducationLevel.init({

        id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },

        name: { type: DataTypes.STRING(100), allowNull: false, unique: true },

        code: { type: DataTypes.STRING(30), unique: true },

        description: { type: DataTypes.TEXT },

        sortOrder: { type: DataTypes.INTEGER.UNSIGNED, defaultValue: 1 },

        isActive: { type: DataTypes.BOOLEAN, defaultValue: true }

    }, {

        sequelize,

        modelName: 'EducationLevel',

        tableName: 'EducationLevels',

        timestamps: true

    });

    return EducationLevel;

};