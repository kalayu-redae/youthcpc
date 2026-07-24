'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    class ContactMessage extends Model {

        static associate(models) {

            ContactMessage.belongsTo(models.User, {
                foreignKey: 'repliedBy',
                as: 'replyUser'
            });

        }

    }


    ContactMessage.init({

        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },


        fullName: {
            type: DataTypes.STRING(150),
            allowNull: false
        },


        email: {
            type: DataTypes.STRING(150),
            allowNull: false
        },


        phone: {
            type: DataTypes.STRING(30)
        },


        subject: {
            type: DataTypes.STRING(200),
            allowNull: false
        },


        message: {
            type: DataTypes.TEXT,
            allowNull: false
        },


        status: {
            type: DataTypes.ENUM(
                'NEW',
                'READ',
                'REPLIED',
                'CLOSED'
            ),
            defaultValue: 'NEW'
        },


        reply: {
            type: DataTypes.TEXT
        },


        repliedBy: {
            type: DataTypes.INTEGER.UNSIGNED
        },


        repliedAt: {
            type: DataTypes.DATE
        },


        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }


    }, {

        sequelize,

        modelName: 'ContactMessage',

        tableName: 'ContactMessages',

        timestamps: true

    });


    return ContactMessage;

};