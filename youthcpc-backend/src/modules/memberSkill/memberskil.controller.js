'use strict';

const { Op } = require('sequelize');
const { MemberSkill, MemberProfile, Skill } = require('../../models');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');

exports.assignSkill = catchAsync(async (req, res, next) => {

    const { memberProfileId, skillId, level, yearsOfExperience, remarks } = req.body;

    if (!memberProfileId || !skillId)
        return next(new AppError('Member profile and skill are required', 400));

    const member = await MemberProfile.findByPk(memberProfileId);
    if (!member) return next(new AppError('Member profile not found', 404));

    const skill = await Skill.findByPk(skillId);
    if (!skill) return next(new AppError('Skill not found', 404));

    const exists = await MemberSkill.findOne({ where: { memberProfileId, skillId } });
    if (exists) return next(new AppError('Skill already assigned to this member', 409));

    const memberSkill = await MemberSkill.create({
        memberProfileId,
        skillId,
        level,
        yearsOfExperience,
        remarks
    });

    res.status(201).json({
        status: 1,
        message: 'Skill assigned successfully',
        data: memberSkill
    });

});

exports.getMemberSkills = catchAsync(async (req, res) => {

    const { memberProfileId, skillId, level } = req.query;

    const where = {};

    if (memberProfileId) where.memberProfileId = memberProfileId;
    if (skillId) where.skillId = skillId;
    if (level) where.level = level;

    const memberSkills = await MemberSkill.findAll({
        where,
        include: [
            { model: MemberProfile, as: 'memberProfile', attributes: ['id', 'membershipNumber', 'firstName', 'middleName', 'lastName'] },
            { model: Skill, as: 'skill', attributes: ['id', 'name', 'category'] }
        ],
        order: [['createdAt', 'DESC']]
    });

    res.status(200).json({
        status: 1,
        total: memberSkills.length,
        data: memberSkills
    });

});

exports.getMemberSkill = catchAsync(async (req, res, next) => {

    const memberSkill = await MemberSkill.findByPk(req.params.memberSkillId, {
        include: [
            { model: MemberProfile, as: 'memberProfile' },
            { model: Skill, as: 'skill' }
        ]
    });

    if (!memberSkill)
        return next(new AppError('Member skill not found', 404));

    res.status(200).json({
        status: 1,
        data: memberSkill
    });

});

exports.updateMemberSkill = catchAsync(async (req, res, next) => {

    const memberSkill = await MemberSkill.findByPk(req.params.memberSkillId);

    if (!memberSkill)
        return next(new AppError('Member skill not found', 404));

    await memberSkill.update(req.body);

    res.status(200).json({
        status: 1,
        message: 'Member skill updated successfully',
        data: memberSkill
    });

});

exports.updateMemberSkillStatus = catchAsync(async (req, res, next) => {

    const memberSkill = await MemberSkill.findByPk(req.params.memberSkillId);

    if (!memberSkill)
        return next(new AppError('Member skill not found', 404));

    memberSkill.isActive = !memberSkill.isActive;

    await memberSkill.save();

    res.status(200).json({
        status: 1,
        message: `Member skill ${memberSkill.isActive ? 'activated' : 'deactivated'} successfully`,
        data: memberSkill
    });

});

exports.deleteMemberSkill = catchAsync(async (req, res, next) => {

    const memberSkill = await MemberSkill.findByPk(req.params.memberSkillId);

    if (!memberSkill)
        return next(new AppError('Member skill not found', 404));

    await memberSkill.destroy();

    res.status(200).json({
        status: 1,
        message: 'Member skill deleted successfully'
    });

});

exports.getMemberSkillSummary = catchAsync(async (req, res) => {

    const total = await MemberSkill.count();
    const active = await MemberSkill.count({ where: { isActive: true } });
    const inactive = await MemberSkill.count({ where: { isActive: false } });

    res.status(200).json({
        status: 1,
        total,
        active,
        inactive
    });

});