'use strict';

const { Tabiya, Woreda } = require('../../models');
const { Op } = require('sequelize');

const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');

exports.createTabiya = catchAsync(async (req, res, next) => {

    const { woredaId, name, code } = req.body;

    if (!woredaId || !name)
        return next(new AppError("Woreda and Tabiya name are required", 400));


    const woreda = await Woreda.findByPk(woredaId);

    if (!woreda)
        return next(new AppError("Woreda not found", 404));


    const existingTabiya = await Tabiya.findOne({
        where: {
            name,
            woredaId
        }
    });


    if (existingTabiya)
        return next(new AppError("Tabiya already exists in this woreda", 409));


    const tabiya = await Tabiya.create({
        woredaId,
        name,
        code
    });


    res.status(201).json({
        status: 1,
        message: "Tabiya created successfully",
        data: tabiya
    });

});


exports.getAllTabiyas = catchAsync(async (req, res, next) => {

    const {
        woredaId,
        search,
        isActive
    } = req.query;


    const where = {};


    if (woredaId)
        where.woredaId = woredaId;


    if (isActive !== undefined)
        where.isActive = ['true', '1', true, 1].includes(isActive);


    if (search)
        where.name = {
            [Op.like]: `%${search}%`
        };


    const tabiyas = await Tabiya.findAll({

        where,

        include: [
            {
                model: Woreda,
                as: 'woreda',
                attributes: ['id', 'name', 'code']
            }
        ],

        order: [
            ['name', 'ASC']
        ]

    });


    res.status(200).json({
        status: 1,
        count: tabiyas.length,
        data: tabiyas
    });

});


exports.getTabiya = catchAsync(async (req, res, next) => {

    const tabiya = await Tabiya.findByPk(req.params.id, {

        include: [
            {
                model: Woreda,
                as: 'woreda',
                attributes: ['id', 'name', 'code']
            }
        ]

    });


    if (!tabiya)
        return next(new AppError("Tabiya not found", 404));


    res.status(200).json({
        status: 1,
        data: tabiya
    });

});


exports.updateTabiya = catchAsync(async (req, res, next) => {

    const tabiya = await Tabiya.findByPk(req.params.id);


    if (!tabiya)
        return next(new AppError("Tabiya not found", 404));


    const {
        woredaId,
        name,
        code
    } = req.body;


    if (woredaId) {

        const woreda = await Woreda.findByPk(woredaId);

        if (!woreda)
            return next(new AppError("Woreda not found", 404));

    }


    await tabiya.update({

        woredaId: woredaId || tabiya.woredaId,
        name: name || tabiya.name,
        code: code || tabiya.code

    });


    res.status(200).json({

        status: 1,
        message: "Tabiya updated successfully",
        data: tabiya

    });

});


exports.updateStatus = catchAsync(async (req, res, next) => {

    const tabiya = await Tabiya.findByPk(req.params.id);


    if (!tabiya)
        return next(new AppError("Tabiya not found", 404));


    tabiya.isActive = !tabiya.isActive;

    await tabiya.save();


    res.status(200).json({

        status: 1,
        message: `Tabiya ${tabiya.isActive ? 'activated' : 'deactivated'} successfully`

    });

});


exports.deleteTabiya = catchAsync(async (req, res, next) => {

    const tabiya = await Tabiya.findByPk(req.params.id);


    if (!tabiya)
        return next(new AppError("Tabiya not found", 404));


    await tabiya.destroy();


    res.status(200).json({

        status: 1,
        message: "Tabiya deleted successfully"

    });

});