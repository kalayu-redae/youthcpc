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
        page = 1,
        limit = 20,
        search,
        regionId,
        zoneId,
        woredaId,
        isActive
    } = req.query;

    const where = {};

    if (search) {
        where[Op.or] = [
            { name: { [Op.like]: `%${search}%` } },
            { code: { [Op.like]: `%${search}%` } }
        ];
    }

    if (isActive !== undefined)
        where.isActive = ['true', '1', true, 1].includes(isActive);

    if (woredaId)
        where.woredaId = woredaId;

    const include = [{
        model: Woreda,
        as: 'woreda',
        attributes: ['id', 'name', 'code'],
        include: [{
            model: Zone,
            as: 'zone',
            attributes: ['id', 'name', 'code'],
            include: [{
                model: Region,
                as: 'region',
                attributes: ['id', 'name', 'code']
            }]
        }]
    }];

    if (zoneId)
        include[0].where = { zoneId };

    if (regionId)
        include[0].include[0].where = { regionId };

    const { count, rows } = await Tabiya.findAndCountAll({
        where,
        include,
        distinct: true,
        offset: (page - 1) * limit,
        limit: Number(limit),
        order: [['name', 'ASC']]
    });

    res.status(200).json({
        status: 1,
        total: count,
        currentPage: Number(page),
        totalPages: Math.ceil(count / limit),
        data: rows
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