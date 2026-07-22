'use strict';

const { Op } = require('sequelize');
const { Profession } = require('../../models');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');

exports.createProfession = catchAsync(async (req, res, next) => {

    const { name, code, description } = req.body;

    if (!name) return next(new AppError('Profession name is required', 400));

    const exists = await Profession.findOne({
        where: {
            [Op.or]: [
                { name },
                ...(code ? [{ code }] : [])
            ]
        }
    });

    if (exists) return next(new AppError('Profession already exists', 409));

    const profession = await Profession.create({
        name,
        code,
        description
    });

    res.status(201).json({
        status: 1,
        message: 'Profession created successfully',
        data: profession
    });

});

exports.getProfessions = catchAsync(async (req, res, next) => {

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

    const professions = await Profession.findAll({
        where,
        order: [['name', 'ASC']]
    });

    res.status(200).json({
        status: 1,
        total: professions.length,
        data: professions
    });

});

exports.getProfession = catchAsync(async (req, res, next) => {

    const profession = await Profession.findByPk(req.params.professionId);

    if (!profession) return next(new AppError('Profession not found', 404));

    res.status(200).json({
        status: 1,
        data: profession
    });

});

exports.updateProfession = catchAsync(async (req, res, next) => {

    const profession = await Profession.findByPk(req.params.professionId);

    if (!profession) return next(new AppError('Profession not found', 404));

    await profession.update(req.body);

    res.status(200).json({
        status: 1,
        message: 'Profession updated successfully',
        data: profession
    });

});

exports.updateProfessionStatus = catchAsync(async (req, res, next) => {

    const profession = await Profession.findByPk(req.params.professionId);

    if (!profession) return next(new AppError('Profession not found', 404));

    profession.isActive = !profession.isActive;

    await profession.save();

    res.status(200).json({
        status: 1,
        message: `Profession ${profession.isActive ? 'activated' : 'deactivated'} successfully`
    });

});

exports.deleteProfession = catchAsync(async (req, res, next) => {

    const profession = await Profession.findByPk(req.params.professionId);

    if (!profession) return next(new AppError('Profession not found', 404));

    await profession.destroy();

    res.status(200).json({
        status: 1,
        message: 'Profession deleted successfully'
    });

});