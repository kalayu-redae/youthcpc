'use strict';

const { Op } = require('sequelize');
const { News, User } = require('../../models');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');


// CREATE NEWS
exports.createNews = catchAsync(async (req, res, next) => {

    const data = req.body;


    const exists = await News.findOne({
        where: { slug: data.slug }
    });


    if (exists)
        return next(new AppError("News slug already exists", 409));


    const news = await News.create({

        ...data,

        authorId: req.user.id

    });


    res.status(201).json({

        status: 1,

        message: "News created successfully",

        data: news

    });


});



// GET ALL NEWS
exports.getNews = catchAsync(async (req, res, next) => {


    const {
        page = 1,
        limit = 20,
        search,
        category,
        status,
        isActive
    } = req.query;


    const where = {};


    if (category)
        where.category = category;


    if (status)
        where.status = status;


    if (isActive !== undefined)
        where.isActive = ['true', '1', true, 1].includes(isActive);



    if (search) {

        where[Op.or] = [

            {
                title: {
                    [Op.like]: `%${search}%`
                }
            },

            {
                summary: {
                    [Op.like]: `%${search}%`
                }
            },

            {
                content: {
                    [Op.like]: `%${search}%`
                }
            }

        ];

    }



    const offset = (page - 1) * limit;



    const { count, rows } = await News.findAndCountAll({

        where,

        include: [
            {
                model: User,
                as: 'author',
                attributes: ['id', 'fullName', 'email']
            }
        ],

        limit: Number(limit),

        offset: Number(offset),

        order: [['createdAt', 'DESC']]

    });



    res.status(200).json({

        status: 1,

        total: count,

        currentPage: Number(page),

        totalPages: Math.ceil(count / limit),

        data: rows

    });


});



// GET PUBLISHED NEWS (PUBLIC)
exports.getPublishedNews = catchAsync(async (req, res, next) => {


    const news = await News.findAll({

        where: {
            status: 'PUBLISHED',
            isActive: true
        },

        include: [
            {
                model: User,
                as: 'author',
                attributes: ['id', 'fullName']
            }
        ],

        order: [
            ['publishedDate', 'DESC']
        ]

    });


    res.status(200).json({

        status: 1,

        data: news

    });


});



// GET SINGLE NEWS BY ID
exports.getNewsById = catchAsync(async (req, res, next) => {


    const news = await News.findByPk(req.params.newsId, {

        include: [
            {
                model: User,
                as: 'author',
                attributes: ['id', 'fullName', 'email']
            }
        ]

    });


    if (!news)
        return next(new AppError("News not found", 404));


    res.status(200).json({

        status: 1,

        data: news

    });


});



// GET SINGLE NEWS BY SLUG PUBLIC
exports.getNewsBySlug = catchAsync(async (req, res, next) => {


    const news = await News.findOne({

        where: {
            slug: req.params.slug,
            status: 'PUBLISHED',
            isActive: true
        },

        include: [
            {
                model: User,
                as: 'author',
                attributes: ['id', 'fullName']
            }
        ]

    });


    if (!news)
        return next(new AppError("News not found", 404));



    await news.increment('views');



    res.status(200).json({

        status: 1,

        data: news

    });


});



// UPDATE NEWS
exports.updateNews = catchAsync(async (req, res, next) => {


    const news = await News.findByPk(req.params.newsId);


    if (!news)
        return next(new AppError("News not found", 404));


    await news.update(req.body);



    res.status(200).json({

        status: 1,

        message: "News updated successfully",

        data: news

    });


});



// PUBLISH NEWS
exports.publishNews = catchAsync(async (req, res, next) => {


    const news = await News.findByPk(req.params.newsId);


    if (!news)
        return next(new AppError("News not found", 404));


    news.status = 'PUBLISHED';

    news.publishedDate = new Date();


    await news.save();



    res.status(200).json({

        status: 1,

        message: "News published successfully",

        data: news

    });


});



// CHANGE NEWS STATUS
exports.updateNewsStatus = catchAsync(async (req, res, next) => {


    const news = await News.findByPk(req.params.newsId);


    if (!news)
        return next(new AppError("News not found", 404));


    news.isActive = !news.isActive;


    await news.save();



    res.status(200).json({

        status: 1,

        message: `News ${news.isActive ? 'activated' : 'deactivated'} successfully`

    });


});



// DELETE NEWS
exports.deleteNews = catchAsync(async (req, res, next) => {


    const news = await News.findByPk(req.params.newsId);


    if (!news)
        return next(new AppError("News not found", 404));


    await news.destroy();



    res.status(200).json({

        status: 1,

        message: "News deleted successfully"

    });


});



// NEWS SUMMARY
exports.getNewsSummary = catchAsync(async (req, res, next) => {


    const total = await News.count();


    const published = await News.count({

        where: {
            status: 'PUBLISHED'
        }

    });


    const draft = await News.count({

        where: {
            status: 'DRAFT'
        }

    });


    const archived = await News.count({

        where: {
            status: 'ARCHIVED'
        }

    });


    res.status(200).json({

        status: 1,

        totalNews: total,

        publishedNews: published,

        draftNews: draft,

        archivedNews: archived

    });


});