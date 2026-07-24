'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    class News extends Model {

        static associate(models) {

            News.belongsTo(models.User, { foreignKey: 'authorId', as: 'author' });

        }

    }


    News.init({

        id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },

        title: { type: DataTypes.STRING(255), allowNull: false },

        slug: { type: DataTypes.STRING(255), allowNull: false, unique: true },

        summary: { type: DataTypes.STRING(500) },

        content: { type: DataTypes.TEXT, allowNull: false },

        image: { type: DataTypes.STRING(255) },

        category: { type: DataTypes.STRING(100) },

        authorId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },

        status: {
            type: DataTypes.ENUM('DRAFT', 'PUBLISHED', 'ARCHIVED'),
            defaultValue: 'DRAFT'
        },

        publishedDate: { type: DataTypes.DATE },

        views: { type: DataTypes.INTEGER.UNSIGNED, defaultValue: 0 },

        isActive: { type: DataTypes.BOOLEAN, defaultValue: true }

    }, {

        sequelize,

        modelName: 'News',

        tableName: 'News',

        timestamps: true

    });


    return News;

};