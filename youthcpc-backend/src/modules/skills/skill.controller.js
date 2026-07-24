'use strict';

const { Op } = require('sequelize');
const { Skill } = require('../../models');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');

exports.createSkill = catchAsync(async (req, res, next) => {

    const { name, category, description } = req.body;

    if (!name) return next(new AppError('Skill name is required', 400));

    const exists = await Skill.findOne({ where: { name } });

    if (exists) return next(new AppError('Skill already exists', 409));

    const skill = await Skill.create({ name, category, description });

    res.status(201).json({ status: 1, message: 'Skill created successfully', data: skill });

});

exports.getSkills = catchAsync(async (req, res) => {

    const { search, isActive } = req.query;

    const where = {};

    if (search) where.name = { [Op.like]: `%${search}%` };

    if (isActive !== undefined) where.isActive = ["true", "1", true, 1].includes(isActive);

    const skills = await Skill.findAll({ where, order: [['name', 'ASC']] });

    res.json({ status: 1, total: skills.length, data: skills });

});

exports.getSkill = catchAsync(async (req, res, next) => {

    const skill = await Skill.findByPk(req.params.skillId);

    if (!skill) return next(new AppError('Skill not found', 404));

    res.json({ status: 1, data: skill });

});

exports.updateSkill = catchAsync(async (req, res, next) => {

    const skill = await Skill.findByPk(req.params.skillId);

    if (!skill) return next(new AppError('Skill not found', 404));

    await skill.update(req.body);

    res.json({ status: 1, message: 'Skill updated successfully', data: skill });

});

exports.updateSkillStatus = catchAsync(async (req, res, next) => {

    const skill = await Skill.findByPk(req.params.skillId);

    if (!skill) return next(new AppError('Skill not found', 404));

    skill.isActive = !skill.isActive;

    await skill.save();

    res.json({ status: 1, message: 'Skill status updated', data: skill });

});

exports.deleteSkill = catchAsync(async (req, res, next) => {

    const skill = await Skill.findByPk(req.params.skillId);

    if (!skill) return next(new AppError('Skill not found', 404));

    await skill.destroy();

    res.json({ status: 1, message: 'Skill deleted successfully' });

});

exports.getSkillSummary = catchAsync(async (req, res) => {

    const totalSkills = await Skill.count();

    const activeSkills = await Skill.count({ where: { isActive: true } });

    const inactiveSkills = await Skill.count({ where: { isActive: false } });

    res.json({ status: 1, totalSkills, activeSkills, inactiveSkills });

});