'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    class MemberSkill extends Model {

        static associate(models) {

            MemberSkill.belongsTo(models.MemberProfile, { foreignKey: 'memberProfileId', as: 'memberProfile' });
            MemberSkill.belongsTo(models.Skill, { foreignKey: 'skillId', as: 'skill' });

        }

    }

    MemberSkill.init({

        id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
        memberProfileId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
        skillId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
        level: { type: DataTypes.ENUM('BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT'), defaultValue: 'BEGINNER' },
        yearsOfExperience: { type: DataTypes.DECIMAL(4, 1), defaultValue: 0 },
        remarks: { type: DataTypes.STRING(255) },
        isActive: { type: DataTypes.BOOLEAN, defaultValue: true }

    }, {

        sequelize,
        modelName: 'MemberSkill',
        tableName: 'MemberSkills',
        timestamps: true,
        indexes: [
            { unique: true, fields: ['memberProfileId', 'skillId'] }
        ]

    });

    return MemberSkill;

};