'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    class Profession extends Model {

        static associate(models) {
            Profession.hasMany(models.MemberProfile, { foreignKey: 'professionId', as: 'memberProfiles' });
        }

    }

    Profession.init({

        id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },

        name: { type: DataTypes.STRING(120), allowNull: false, unique: true },

        code: { type: DataTypes.STRING(30), unique: true },

        description: { type: DataTypes.TEXT },

        isActive: { type: DataTypes.BOOLEAN, defaultValue: true }

    }, {

        sequelize,

        modelName: 'Profession',

        tableName: 'Professions',

        timestamps: true

    });

    return Profession;

};