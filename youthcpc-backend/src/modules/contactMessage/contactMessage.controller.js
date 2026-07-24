'use strict';

const { Op } = require('sequelize');
const { ContactMessage, User } = require('../../models');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');


// CREATE CONTACT MESSAGE (PUBLIC)
exports.createContactMessage = catchAsync(async (req, res, next) => {

    const message = await ContactMessage.create(req.body);


    res.status(201).json({

        status: 1,

        message: "Contact message sent successfully",

        data: message

    });

});



// GET ALL CONTACT MESSAGES (ADMIN)
exports.getContactMessages = catchAsync(async (req, res, next) => {


    const {
        page = 1,
        limit = 20,
        search,
        status
    } = req.query;


    const where = {};


    if (status)
        where.status = status;


    if (search) {

        where[Op.or] = [

            {
                fullName: {
                    [Op.like]: `%${search}%`
                }
            },

            {
                email: {
                    [Op.like]: `%${search}%`
                }
            },

            {
                subject: {
                    [Op.like]: `%${search}%`
                }
            }

        ];

    }



    const offset = (page - 1) * limit;


    const { count, rows } = await ContactMessage.findAndCountAll({

        where,

        include: [

            {

                model: User,

                as: 'replyUser',

                attributes: ['id', 'fullName']

            }

        ],


        limit: Number(limit),

        offset: Number(offset),

        order: [
            ['createdAt', 'DESC']
        ]

    });



    res.status(200).json({

        status: 1,

        total: count,

        currentPage: Number(page),

        totalPages: Math.ceil(count / limit),

        data: rows

    });


});



// GET SINGLE CONTACT MESSAGE
exports.getContactMessage = catchAsync(async (req, res, next) => {


    const message = await ContactMessage.findByPk(req.params.messageId, {

        include: [

            {

                model: User,

                as: 'replyUser',

                attributes: ['id', 'fullName']

            }

        ]

    });


    if (!message)
        return next(new AppError("Contact message not found", 404));



    if (message.status === 'NEW') {

        message.status = 'READ';

        await message.save();

    }



    res.status(200).json({

        status: 1,

        data: message

    });


});



// REPLY CONTACT MESSAGE
exports.replyContactMessage = catchAsync(async (req, res, next) => {


    const message = await ContactMessage.findByPk(req.params.messageId);


    if (!message)
        return next(new AppError("Contact message not found", 404));


    message.reply = req.body.reply;

    message.status = 'REPLIED';

    message.repliedBy = req.user.id;

    message.repliedAt = new Date();


    await message.save();



    res.status(200).json({

        status: 1,

        message: "Reply sent successfully",

        data: message

    });


});



// UPDATE STATUS
exports.updateContactStatus = catchAsync(async (req, res, next) => {


    const message = await ContactMessage.findByPk(req.params.messageId);


    if (!message)
        return next(new AppError("Contact message not found", 404));


    const { status } = req.body;


    if (!['NEW', 'READ', 'REPLIED', 'CLOSED'].includes(status))

        return next(new AppError("Invalid status", 400));



    message.status = status;


    await message.save();



    res.status(200).json({

        status: 1,

        message: "Contact status updated successfully",

        data: message

    });


});



// DELETE CONTACT MESSAGE
exports.deleteContactMessage = catchAsync(async (req, res, next) => {


    const message = await ContactMessage.findByPk(req.params.messageId);


    if (!message)
        return next(new AppError("Contact message not found", 404));


    await message.destroy();



    res.status(200).json({

        status: 1,

        message: "Contact message deleted successfully"

    });


});



// CONTACT MESSAGE SUMMARY
exports.getContactSummary = catchAsync(async (req, res, next) => {


    const total = await ContactMessage.count();


    const newMessages = await ContactMessage.count({

        where: {
            status: 'NEW'
        }

    });


    const replied = await ContactMessage.count({

        where: {
            status: 'REPLIED'
        }

    });


    const closed = await ContactMessage.count({

        where: {
            status: 'CLOSED'
        }

    });



    res.status(200).json({

        status: 1,

        totalMessages: total,

        newMessages,

        repliedMessages: replied,

        closedMessages: closed

    });


});