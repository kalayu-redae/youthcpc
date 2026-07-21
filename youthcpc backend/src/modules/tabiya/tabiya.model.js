'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    class Tabiya extends Model {

        static associate(models) {
            Tabiya.belongsTo(models.Woreda, { foreignKey: 'woredaId', as: 'woreda' });
            Tabiya.hasMany(models.MemberProfile, { foreignKey: 'tabiyaId', as: 'members' });
        }

    }

    Tabiya.init({

        id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },

        woredaId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },

        name: { type: DataTypes.STRING(150), allowNull: false },

        code: { type: DataTypes.STRING(50), unique: true },

        isActive: { type: DataTypes.BOOLEAN, defaultValue: true }

    }, {

        sequelize,
        modelName: 'Tabiya',
        tableName: 'Tabiyas',
        timestamps: true

    });

    return Tabiya;

};