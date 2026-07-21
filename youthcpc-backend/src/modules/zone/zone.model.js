'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Zone extends Model {
        static associate(models) {
            Zone.belongsTo(models.Region, { foreignKey: 'regionId', as: 'region' });
            Zone.hasMany(models.Woreda, { foreignKey: 'zoneId', as: 'woredas' });
        }
    }

    Zone.init({
        id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
        regionId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
        name: { type: DataTypes.STRING(150), allowNull: false },
        code: { type: DataTypes.STRING(20), allowNull: false, unique: true },
        isActive: { type: DataTypes.BOOLEAN, defaultValue: true }
    }, {
        sequelize,
        modelName: 'Zone',
        tableName: 'Zones',
        timestamps: true
    });

    return Zone;
};