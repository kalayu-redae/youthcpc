'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    class Skill extends Model {

        static associate(models) {

            Skill.hasMany(models.MemberSkill, { foreignKey: 'skillId', as: 'memberSkills' });

        }

    }

    Skill.init({

        id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
        name: { type: DataTypes.STRING(150), allowNull: false, unique: true },
        category: { type: DataTypes.STRING(100) },
        description: { type: DataTypes.TEXT },
        isActive: { type: DataTypes.BOOLEAN, defaultValue: true }

    }, {

        sequelize,
        modelName: 'Skill',
        tableName: 'Skills',
        timestamps: true

    });

    return Skill;

};