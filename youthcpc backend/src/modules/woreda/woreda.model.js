'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Woreda extends Model {
        static associate(models) {
            Woreda.belongsTo(models.Zone, { foreignKey: 'zoneId', as: 'zone' });
            Woreda.hasMany(models.Tabiya, { foreignKey: 'woredaId', as: 'tabiyas' });
        }
    }

    Woreda.init({
        id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
        zoneId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
        name: { type: DataTypes.STRING(150), allowNull: false },
        code: { type: DataTypes.STRING(20), allowNull: false, unique: true },
        isActive: { type: DataTypes.BOOLEAN, defaultValue: true }
    }, {
        sequelize,
        modelName: 'Woreda',
        tableName: 'Woredas',
        timestamps: true
    });

    return Woreda;
};