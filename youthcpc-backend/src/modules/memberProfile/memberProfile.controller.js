'use strict';

const { Op } = require('sequelize');
const { MemberProfile, User, Region, Zone, Woreda, Tabiya, EducationLevel, Profession } = require('../../models');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');


// CREATE MEMBER PROFILE
exports.createMemberProfile = catchAsync(async (req, res, next) => {
    const data = req.body;

    const exists = await MemberProfile.findOne({
        where: { userId: data.userId }
    });

    if (exists) return next(new AppError("Member profile already exists", 409));

    const member = await MemberProfile.create(data);

    res.status(201).json({
        status: 1,
        message: "Member profile created successfully",
        data: member
    });

});

// GET ALL MEMBERS
exports.getMembers = catchAsync(async (req, res, next) => {
    const { page = 1, limit = 20, search, regionId, zoneId, woredaId, tabiyaId, educationLevelId, professionId, isActive } = req.query;


    const where = {};

    if (regionId) where.regionId = regionId;
    if (zoneId) where.zoneId = zoneId;
    if (woredaId) where.woredaId = woredaId;
    if (tabiyaId) where.tabiyaId = tabiyaId;

    if (educationLevelId) where.educationLevelId = educationLevelId;
    if (professionId) where.professionId = professionId;

    if (isActive !== undefined)
        where.isActive = ['true', '1', true, 1].includes(isActive);

    if (search) {
        where[Op.or] = [
            { membershipNumber: { [Op.like]: `%${search}%` } },
            { bio: { [Op.like]: `%${search}%` } }
        ];

    }

    const offset = (page - 1) * limit;
    const { count, rows } = await MemberProfile.findAndCountAll({
        where,
        include: [
            {
                model: User, as: 'user', attributes: ['id', 'fullName', 'phoneNumber', 'email']
            },

            {
                model: Region, as: 'region', attributes: ['id', 'name']
            },

            {
                model: Zone, as: 'zone', attributes: ['id', 'name']
            },

            {
                model: Woreda, as: 'woreda', attributes: ['id', 'name']
            },

            {
                model: Tabiya, as: 'tabiya', attributes: ['id', 'name']
            },

            {
                model: EducationLevel, as: 'educationLevel'
            },

            {
                model: Profession, as: 'profession'
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

// GET SINGLE MEMBER
exports.getMemberProfile = catchAsync(async (req, res, next) => {
    const member = await MemberProfile.findByPk(req.params.memberId, {

        include: [

            {
                model: User, as: 'user'
            },

            {
                model: Region, as: 'region'
            },

            {
                model: Zone, as: 'zone'
            },

            {
                model: Woreda, as: 'woreda'
            },

            {
                model: Tabiya, as: 'tabiya'
            },

            {
                model: EducationLevel, as: 'educationLevel'
            },

            {
                model: Profession, as: 'profession'
            }

        ]

    });


    if (!member) return next(new AppError("Member not found", 404));


    res.status(200).json({
        status: 1,
        data: member

    });


});

// UPDATE MEMBER PROFILE
exports.updateMemberProfile = catchAsync(async (req, res, next) => {
    const member = await MemberProfile.findByPk(req.params.memberId);

    if (!member) return next(new AppError("Member not found", 404));

    await member.update(req.body);

    res.status(200).json({

        status: 1,

        message: "Member profile updated successfully",

        data: member

    });


});

// CHANGE STATUS
exports.updateMemberStatus = catchAsync(async (req, res, next) => {


    const member = await MemberProfile.findByPk(req.params.memberId);


    if (!member)
        return next(new AppError("Member not found", 404));



    member.isActive = !member.isActive;


    await member.save();



    res.status(200).json({

        status: 1,

        message: `Member ${member.isActive ? 'activated' : 'deactivated'} successfully`

    });


});

// DELETE MEMBER
exports.deleteMemberProfile = catchAsync(async (req, res, next) => {

    const member = await MemberProfile.findByPk(req.params.memberId);

    if (!member)
        return next(new AppError("Member not found", 404));

    await member.destroy();

    res.status(200).json({

        status: 1,

        message: "Member profile deleted successfully"

    });


});

// MEMBER SUMMARY
exports.getMemberSummary = catchAsync(async (req, res, next) => {

    const total = await MemberProfile.count();


    const active = await MemberProfile.count({

        where: { isActive: true }

    });


    const inactive = await MemberProfile.count({

        where: { isActive: false }

    });


    res.status(200).json({

        status: 1,

        totalMembers: total,

        activeMembers: active,

        inactiveMembers: inactive

    });


});