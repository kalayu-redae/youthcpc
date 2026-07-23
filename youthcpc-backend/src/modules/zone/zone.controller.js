'use strict';

const { Op } = require('sequelize');
const { Zone, Region } = require('../../models');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');

exports.createZone = catchAsync(async (req, res, next) => {
    const { regionId, name, code } = req.body;

    if (!regionId || !name || !code)
        return next(new AppError("Region,name and code are required", 400));

    const region = await Region.findByPk(regionId);

    if (!region)
        return next(new AppError("Region not found", 404));

    const exists = await Zone.findOne({
        where: {
            [Op.or]: [
                { name },
                { code }
            ]
        }
    });

    if (exists)
        return next(new AppError("Zone already exists", 409));

    const zone = await Zone.create({
        regionId,
        name,
        code
    });

    res.status(201).json({
        status: 1,
        message: "Zone created successfully",
        data: zone
    });
});

exports.getZones = catchAsync(async (req, res, next) => {
    const { page = 1, limit = 20, search, regionId, isActive, sortBy = "name", sortOrder = "ASC" } = req.query;
    const where = {};

    if (regionId) where.regionId = regionId;
    if (search) {
        where[Op.or] = [
            { name: { [Op.like]: `%${search}%` } },
            { code: { [Op.like]: `%${search}%` } }
        ];
    }

    if (isActive !== undefined)
        where.isActive = ["true", "1", true, 1].includes(isActive);

    const offset = (page - 1) * limit;

    const { count, rows } = await Zone.findAndCountAll({
        where,
        include: [
            {
                model: Region,
                as: 'region',
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

exports.getZone = catchAsync(async (req, res, next) => {
    const zone = await Zone.findByPk(req.params.zoneId, {
        include: [
            {
                model: Region,
                as: 'region',
                attributes: ['id', 'name', 'code']
            }
        ]
    });

    if (!zone)
        return next(new AppError("Zone not found", 404));

    res.status(200).json({
        status: 1,
        data: zone
    });
});

exports.updateZone = catchAsync(async (req, res, next) => {
    const zone = await Zone.findByPk(req.params.zoneId);

    if (!zone)
        return next(new AppError("Zone not found", 404));

    const { regionId, name, code } = req.body;

    if (regionId) {
        const region = await Region.findByPk(regionId);

        if (!region)
            return next(new AppError("Region not found", 404));

        zone.regionId = regionId;
    }

    if (name) {
        const exists = await Zone.findOne({
            where: {
                name,
                id: { [Op.ne]: zone.id }
            }
        });

        if (exists)
            return next(new AppError("Zone name already exists", 409));

        zone.name = name;
    }

    if (code) {
        const exists = await Zone.findOne({
            where: {
                code,
                id: { [Op.ne]: zone.id }
            }
        });

        if (exists)
            return next(new AppError("Zone code already exists", 409));

        zone.code = code;
    }

    await zone.save();

    res.status(200).json({
        status: 1,
        message: "Zone updated successfully",
        data: zone
    });
});

exports.updateZoneStatus = catchAsync(async (req, res, next) => {
    const zone = await Zone.findByPk(req.params.zoneId);

    if (!zone)
        return next(new AppError("Zone not found", 404));

    zone.isActive = !zone.isActive;

    await zone.save();

    res.status(200).json({
        status: 1,
        message: `Zone ${zone.isActive ? "activated" : "deactivated"} successfully`,
        data: zone
    });
});

exports.deleteZone = catchAsync(async (req, res, next) => {
    const zone = await Zone.findByPk(req.params.zoneId);

    if (!zone)
        return next(new AppError("Zone not found", 404));

    await zone.destroy();

    res.status(200).json({
        status: 1,
        message: "Zone deleted successfully"
    });
});

exports.getZoneSummary = catchAsync(async (req, res, next) => {
    const totalZones = await Zone.count();
    const activeZones = await Zone.count({ where: { isActive: true } });
    const inactiveZones = await Zone.count({ where: { isActive: false } });

    res.status(200).json({
        status: 1,
        totalZones,
        activeZones,
        inactiveZones
    });
});