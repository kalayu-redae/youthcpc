'use strict';

const { Op } = require('sequelize');
const { Region } = require('../../models');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');

exports.createRegion = catchAsync(async (req, res, next) => {
  const { name, code } = req.body;

  if (!name || !code)
    return next(new AppError("Region name and code are required", 400));

  const exists = await Region.findOne({
    where: {
      [Op.or]: [
        { name },
        { code }
      ]
    }
  });

  if (exists)
    return next(new AppError("Region already exists", 409));

  const region = await Region.create({
    name,
    code
  });

  res.status(201).json({
    status: 1,
    message: "Region created successfully",
    data: region
  });
});

exports.getRegions = catchAsync(async (req, res, next) => {
  const {
    page = 1,
    limit = 20,
    search,
    isActive,
    sortBy = "name",
    sortOrder = "ASC"
  } = req.query;

  const where = {};

  if (search) {
    where[Op.or] = [
      { name: { [Op.like]: `%${search}%` } },
      { code: { [Op.like]: `%${search}%` } }
    ];
  }

  if (isActive !== undefined)
    where.isActive = ["true", "1", true, 1].includes(isActive);

  const offset = (page - 1) * limit;

  const { count, rows } = await Region.findAndCountAll({
    where,
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

exports.getRegion = catchAsync(async (req, res, next) => {
  const region = await Region.findByPk(req.params.regionId);

  if (!region)
    return next(new AppError("Region not found", 404));

  res.status(200).json({
    status: 1,
    data: region
  });
});

exports.updateRegion = catchAsync(async (req, res, next) => {
  const region = await Region.findByPk(req.params.regionId);

  if (!region)
    return next(new AppError("Region not found", 404));

  const { name, code } = req.body;

  if (name) {
    const exists = await Region.findOne({
      where: {
        name,
        id: { [Op.ne]: region.id }
      }
    });

    if (exists)
      return next(new AppError("Region name already exists", 409));

    region.name = name;
  }

  if (code) {
    const exists = await Region.findOne({
      where: {
        code,
        id: { [Op.ne]: region.id }
      }
    });

    if (exists)
      return next(new AppError("Region code already exists", 409));

    region.code = code;
  }

  await region.save();

  res.status(200).json({
    status: 1,
    message: "Region updated successfully",
    data: region
  });
});

exports.updateRegionStatus = catchAsync(async (req, res, next) => {
  const region = await Region.findByPk(req.params.regionId);

  if (!region)
    return next(new AppError("Region not found", 404));

  region.isActive = !region.isActive;

  await region.save();

  res.status(200).json({
    status: 1,
    message: `Region ${region.isActive ? "activated" : "deactivated"} successfully`,
    data: region
  });
});

exports.deleteRegion = catchAsync(async (req, res, next) => {
  const region = await Region.findByPk(req.params.regionId);

  if (!region)
    return next(new AppError("Region not found", 404));

  await region.destroy();

  res.status(200).json({
    status: 1,
    message: "Region deleted successfully"
  });
});

exports.getRegionSummary = catchAsync(async (req, res, next) => {
  const totalRegions = await Region.count();
  const activeRegions = await Region.count({ where: { isActive: true } });
  const inactiveRegions = await Region.count({ where: { isActive: false } });

  res.status(200).json({
    status: 1,
    totalRegions,
    activeRegions,
    inactiveRegions
  });
});