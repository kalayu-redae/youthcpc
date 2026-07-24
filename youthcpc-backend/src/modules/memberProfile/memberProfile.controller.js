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

    if (exists)
        return next(new AppError("Member profile already exists", 409));


    const user = await User.findByPk(data.userId);

    if (!user)
        return next(new AppError("User not found", 404));


    const member = await MemberProfile.create(data);


    res.status(201).json({
        status: 1,
        message: "Member profile created successfully",
        data: member
    });

});



// GET ALL MEMBERS
exports.getMembers = catchAsync(async (req, res, next) => {

    const {
        page = 1,
        limit = 20,
        search,
        regionId,
        zoneId,
        woredaId,
        tabiyaId,
        educationLevelId,
        professionId,
        gender,
        employmentStatus,
        isVerified,
        isActive
    } = req.query;


    const where = {};


    if (regionId) where.regionId = regionId;
    if (zoneId) where.zoneId = zoneId;
    if (woredaId) where.woredaId = woredaId;
    if (tabiyaId) where.tabiyaId = tabiyaId;

    if (educationLevelId)
        where.educationLevelId = educationLevelId;

    if (professionId)
        where.professionId = professionId;

    if (gender)
        where.gender = gender;

    if (employmentStatus)
        where.employmentStatus = employmentStatus;

    if (isVerified !== undefined)
        where.isVerified = ['true', '1', true, 1].includes(isVerified);

    if (isActive !== undefined)
        where.isActive = ['true', '1', true, 1].includes(isActive);



    const include = [
        {
            model: User,
            as: 'user',
            attributes: ['id', 'fullName', 'phoneNumber', 'email']
        },
        {
            model: Region,
            as: 'region',
            attributes: ['id', 'name']
        },
        {
            model: Zone,
            as: 'zone',
            attributes: ['id', 'name']
        },
        {
            model: Woreda,
            as: 'woreda',
            attributes: ['id', 'name']
        },
        {
            model: Tabiya,
            as: 'tabiya',
            attributes: ['id', 'name']
        },
        {
            model: EducationLevel,
            as: 'educationLevel'
        },
        {
            model: Profession,
            as: 'profession'
        }
    ];


    if (search) {

        where[Op.or] = [
            {
                membershipNumber: {
                    [Op.like]: `%${search}%`
                }
            },
            {
                occupation: {
                    [Op.like]: `%${search}%`
                }
            },
            {
                organization: {
                    [Op.like]: `%${search}%`
                }
            },
            {
                bio: {
                    [Op.like]: `%${search}%`
                }
            }
        ];

    }



    const offset = (page - 1) * limit;


    const { count, rows } = await MemberProfile.findAndCountAll({

        where,

        include,

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
                model: User,
                as: 'user'
            },
            {
                model: Region,
                as: 'region'
            },
            {
                model: Zone,
                as: 'zone'
            },
            {
                model: Woreda,
                as: 'woreda'
            },
            {
                model: Tabiya,
                as: 'tabiya'
            },
            {
                model: EducationLevel,
                as: 'educationLevel'
            },
            {
                model: Profession,
                as: 'profession'
            }

        ]

    });


    if (!member)
        return next(new AppError("Member not found", 404));


    res.status(200).json({

        status: 1,
        data: member

    });


});



// UPDATE MEMBER PROFILE
exports.updateMemberProfile = catchAsync(async (req, res, next) => {


    const member = await MemberProfile.findByPk(req.params.memberId);


    if (!member)
        return next(new AppError("Member not found", 404));


    const allowedFields = [

        'gender',
        'dateOfBirth',
        'maritalStatus',
        'nationality',

        'regionId',
        'zoneId',
        'woredaId',
        'tabiyaId',

        'educationLevelId',
        'professionId',

        'occupation',
        'organization',

        'employmentStatus',

        'monthlyIncome',

        'availabilityStatus',
        'availabilityNote',

        'emergencyContactName',
        'emergencyContactPhone',

        'experience',
        'certifications',
        'volunteerExperience',
        'aspirations',

        'socialMedia',

        'bio'

    ];


    const updateData = {};


    allowedFields.forEach(field => {

        if (req.body[field] !== undefined)
            updateData[field] = req.body[field];

    });


    await member.update(updateData);



    res.status(200).json({

        status: 1,
        message: "Member profile updated successfully",
        data: member

    });


});



// VERIFY MEMBER
exports.verifyMemberProfile = catchAsync(async (req, res, next) => {


    const member = await MemberProfile.findByPk(req.params.memberId);


    if (!member)
        return next(new AppError("Member not found", 404));


    member.isVerified = true;
    member.verificationDate = new Date();
    member.verifiedBy = req.user.id;


    await member.save();



    res.status(200).json({

        status: 1,
        message: "Member verified successfully",
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


    const verified = await MemberProfile.count({
        where: { isVerified: true }
    });


    res.status(200).json({

        status: 1,
        totalMembers: total,
        activeMembers: active,
        inactiveMembers: inactive,
        verifiedMembers: verified

    });


});