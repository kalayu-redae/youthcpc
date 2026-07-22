'use strict';

const { Op } = require('sequelize');
const { EducationLevel } = require('../../models');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');

exports.createEducationLevel = catchAsync(async (req, res, next) => {

    const { name, code, description, sortOrder } = req.body;

    if (!name) return next(new AppError('Education level name is required', 400));

    const exists = await EducationLevel.findOne({
        where: {
            [Op.or]: [
                { name },
                ...(code ? [{ code }] : [])
            ]
        }
    });

    if (exists) return next(new AppError('Education level already exists', 409));

    const educationLevel = await EducationLevel.create({
        name,
        code,
        description,
        sortOrder
    });

    res.status(201).json({
        status: 1,
        message: 'Education level created successfully',
        data: educationLevel
    });

});

exports.getEducationLevels = catchAsync(async (req, res, next) => {

    const { search, isActive } = req.query;

    const where = {};

    if (search) {
        where[Op.or] = [
            { name: { [Op.like]: `%${search}%` } },
            { code: { [Op.like]: `%${search}%` } }
        ];
    }

    if (isActive !== undefined) {
        where.isActive = ['true', '1', true, 1].includes(isActive);
    }

    const educationLevels = await EducationLevel.findAll({
        where,
        order: [['sortOrder', 'ASC'], ['name', 'ASC']]
    });

    res.status(200).json({
        status: 1,
        total: educationLevels.length,
        data: educationLevels
    });

});

exports.getEducationLevel = catchAsync(async (req, res, next) => {

    const educationLevel = await EducationLevel.findByPk(req.params.educationLevelId);

    if (!educationLevel) return next(new AppError('Education level not found', 404));

    res.status(200).json({
        status: 1,
        data: educationLevel
    });

});

exports.updateEducationLevel = catchAsync(async (req, res, next) => {

    const educationLevel = await EducationLevel.findByPk(req.params.educationLevelId);

    if (!educationLevel) return next(new AppError('Education level not found', 404));

    await educationLevel.update(req.body);

    res.status(200).json({
        status: 1,
        message: 'Education level updated successfully',
        data: educationLevel
    });

});

exports.updateEducationLevelStatus = catchAsync(async (req, res, next) => {

    const educationLevel = await EducationLevel.findByPk(req.params.educationLevelId);

    if (!educationLevel) return next(new AppError('Education level not found', 404));

    educationLevel.isActive = !educationLevel.isActive;

    await educationLevel.save();

    res.status(200).json({
        status: 1,
        message: `Education level ${educationLevel.isActive ? 'activated' : 'deactivated'} successfully`
    });

});

exports.deleteEducationLevel = catchAsync(async (req, res, next) => {

    const educationLevel = await EducationLevel.findByPk(req.params.educationLevelId);

    if (!educationLevel) return next(new AppError('Education level not found', 404));

    await educationLevel.destroy();

    res.status(200).json({
        status: 1,
        message: 'Education level deleted successfully'
    });

});