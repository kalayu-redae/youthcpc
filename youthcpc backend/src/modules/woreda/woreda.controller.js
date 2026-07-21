'use strict';

const { Op } = require('sequelize');
const { Woreda, Zone } = require('../../models');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');

exports.createWoreda = catchAsync(async (req, res, next) => {
    const { zoneId, name, code } = req.body;

    if (!zoneId || !name || !code)
        return next(new AppError("Zone,name and code are required", 400));

    const zone = await Zone.findByPk(zoneId);

    if (!zone)
        return next(new AppError("Zone not found", 404));

    const exists = await Woreda.findOne({
        where: {
            [Op.or]: [
                { name },
                { code }
            ]
        }
    });

    if (exists)
        return next(new AppError("Woreda already exists", 409));

    const woreda = await Woreda.create({
        zoneId,
        name,
        code
    });

    res.status(201).json({
        status: 1,
        message: "Woreda created successfully",
        data: woreda
    });
});


exports.getWoredas = catchAsync(async (req, res, next) => {
    const {
        page = 1,
        limit = 20,
        search,
        zoneId,
        isActive,
        sortBy = "name",
        sortOrder = "ASC"
    } = req.query;

    const where = {};

    if (zoneId)
        where.zoneId = zoneId;

    if (search) {
        where[Op.or] = [
            { name: { [Op.like]: `%${search}%` } },
            { code: { [Op.like]: `%${search}%` } }
        ];
    }

    if (isActive !== undefined)
        where.isActive = ["true", "1", true, 1].includes(isActive);

    const offset = (page - 1) * limit;

    const { count, rows } = await Woreda.findAndCountAll({
        where,
        include: [
            {
                model: Zone,
                as: 'zone',
                attributes: ['id', 'name', 'code']
            }
        ],
        offset: Number(offset),
        limit: Number(limit),
        order: [[sortBy, sortOrder.toUpperCase()]]
    });

    res.status(200).json({
        status: 1,
        total: count,
        currentPage: Number(page),
        totalPages: Math.ceil(count / limit),
        data: rows
    });
});


exports.getWoreda = catchAsync(async (req, res, next) => {
    const woreda = await Woreda.findByPk(req.params.woredaId, {
        include: [
            {
                model: Zone,
                as: 'zone',
                attributes: ['id', 'name', 'code']
            }
        ]
    });

    if (!woreda)
        return next(new AppError("Woreda not found", 404));

    res.status(200).json({
        status: 1,
        data: woreda
    });
});


exports.updateWoreda = catchAsync(async (req, res, next) => {
    const woreda = await Woreda.findByPk(req.params.woredaId);

    if (!woreda)
        return next(new AppError("Woreda not found", 404));

    const { zoneId, name, code } = req.body;

    if (zoneId) {
        const zone = await Zone.findByPk(zoneId);

        if (!zone)
            return next(new AppError("Zone not found", 404));

        woreda.zoneId = zoneId;
    }

    if (name) {
        const exists = await Woreda.findOne({
            where: {
                name,
                id: { [Op.ne]: woreda.id }
            }
        });

        if (exists)
            return next(new AppError("Woreda name already exists", 409));

        woreda.name = name;
    }

    if (code) {
        const exists = await Woreda.findOne({
            where: {
                code,
                id: { [Op.ne]: woreda.id }
            }
        });

        if (exists)
            return next(new AppError("Woreda code already exists", 409));

        woreda.code = code;
    }

    await woreda.save();

    res.status(200).json({
        status: 1,
        message: "Woreda updated successfully",
        data: woreda
    });
});


exports.updateWoredaStatus = catchAsync(async (req, res, next) => {
    const woreda = await Woreda.findByPk(req.params.woredaId);

    if (!woreda)
        return next(new AppError("Woreda not found", 404));

    woreda.isActive = !woreda.isActive;

    await woreda.save();

    res.status(200).json({
        status: 1,
        message: `Woreda ${woreda.isActive ? "activated" : "deactivated"} successfully`,
        data: woreda
    });
});


exports.deleteWoreda = catchAsync(async (req, res, next) => {
    const woreda = await Woreda.findByPk(req.params.woredaId);

    if (!woreda)
        return next(new AppError("Woreda not found", 404));

    await woreda.destroy();

    res.status(200).json({
        status: 1,
        message: "Woreda deleted successfully"
    });
});


exports.getWoredaSummary = catchAsync(async (req, res, next) => {
    const totalWoredas = await Woreda.count();
    const activeWoredas = await Woreda.count({
        where: { isActive: true }
    });
    const inactiveWoredas = await Woreda.count({
        where: { isActive: false }
    });

    res.status(200).json({
        status: 1,
        totalWoredas,
        activeWoredas,
        inactiveWoredas
    });
});