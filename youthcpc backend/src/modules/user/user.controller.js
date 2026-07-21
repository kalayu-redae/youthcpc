'use strict';

const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');
const { User, Role } = require('../../models');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const { processUploadFilesToSave } = require('../../utils/fileUtils');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const { search, isActive, roleId, page = 1, limit = 20 } = req.query;

  const where = {};

  if (roleId) where.roleId = roleId;

  if (isActive !== undefined)
    where.isActive = ['true', '1', true, 1].includes(isActive);

  if (search) {
    where[Op.or] = [
      { fullName: { [Op.like]: `%${search}%` } },
      { phoneNumber: { [Op.like]: `%${search}%` } },
      { email: { [Op.like]: `%${search}%` } }
    ];
  }

  const offset = (page - 1) * limit;

  const { count, rows } = await User.findAndCountAll({
    where,
    include: [
      {
        model: Role,
        as: 'role',
        attributes: ['id', 'name', 'code']
      }
    ],
    attributes: {
      exclude: [
        'password',
        'passwordResetOTP',
        'passwordResetOTPExpires'
      ]
    },
    limit: Number(limit),
    offset: Number(offset),
    order: [['createdAt', 'DESC']]
  });

  res.status(200).json({
    status: 1,
    total: count,
    page: Number(page),
    totalPages: Math.ceil(count / limit),
    data: rows
  });
});

exports.getUser = catchAsync(async (req, res, next) => {

  const user = await User.findByPk(req.params.userId, {
    include: [
      {
        model: Role,
        as: 'role'
      }
    ],
    attributes: {
      exclude: [
        'password',
        'passwordResetOTP',
        'passwordResetOTPExpires'
      ]
    }
  });

  if (!user)
    return next(new AppError("User not found", 404));

  res.status(200).json({
    status: 1,
    data: user
  });
});

exports.createUser = catchAsync(async (req, res, next) => {

  const {
    fullName,
    phoneNumber,
    email,
    password,
    roleId
  } = req.body;


  if (!fullName || !phoneNumber || !password || !roleId)
    return next(new AppError("Required fields missing", 400));


  const exist = await User.findOne({
    where: { phoneNumber }
  });


  if (exist)
    return next(new AppError("Phone number already exists", 409));


  let { profileImage } = await processUploadFilesToSave(
    req,
    req.files,
    req.body
  );


  const user = await User.create({
    fullName,
    phoneNumber,
    email,
    password,
    roleId,
    profileImage
  });


  res.status(201).json({
    status: 1,
    message: "User created successfully",
    data: user
  });

});

exports.updateUser = catchAsync(async (req, res, next) => {

  const user = await User.findByPk(req.params.userId);


  if (!user)
    return next(new AppError("User not found", 404));


  let updateData = {
    fullName: req.body.fullName,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    roleId: req.body.roleId
  };


  if (req.files && req.files.profileImage) {

    const { profileImage } = await processUploadFilesToSave(
      req,
      req.files,
      req.body,
      user
    );

    updateData.profileImage = profileImage;

  }


  await user.update(updateData);


  res.status(200).json({
    status: 1,
    message: "User updated successfully",
    data: user
  });

});

exports.updateUserStatus = catchAsync(async (req, res, next) => {

  const user = await User.findByPk(req.params.userId);

  if (!user) return next(new AppError("User not found", 404));

  user.isActive = !user.isActive;

  await user.save();


  res.status(200).json({
    status: 1,
    message: `User ${user.isActive ? 'activated' : 'deactivated'} successfully`
  });

});

exports.resetPassword = catchAsync(async (req, res, next) => {

  const user = await User.findByPk(req.params.userId);


  if (!user)
    return next(new AppError("User not found", 404));


  const password =
    Math.random().toString(36).slice(-8);


  user.password = password;
  user.changePassword = true;


  await user.save();


  res.status(200).json({
    status: 1,
    message: "Password reset successfully",
    temporaryPassword: password
  });

});

exports.deleteUser = catchAsync(async (req, res, next) => {

  const user = await User.findByPk(req.params.userId);


  if (!user)
    return next(new AppError("User not found", 404));


  await user.destroy();


  res.status(200).json({
    status: 1,
    message: "User deleted successfully"
  });

});