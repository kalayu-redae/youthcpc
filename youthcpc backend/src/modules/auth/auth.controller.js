'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Role } = require('../../models');
const { Op } = require('sequelize');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const { createMulterMiddleware, processUploadFilesToSave, deleteFile } = require('../../utils/fileUtils');
const { sendEmail, sendWelcomeEmail } = require('../../utils/emailUtils');

require('dotenv').config();

const signInToken = (user) => {
  const payload = { id: user.id, role: user.roleId };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
};

const userUpload = createMulterMiddleware(
  'uploads/users/',
  'user',
  ['image/jpeg', 'image/png', 'application/pdf', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel']
);

exports.uploadUserAttachments = userUpload.fields([
  { name: 'profileImage', maxCount: 1 },
  { name: 'images', maxCount: 5 },
  { name: 'documents', maxCount: 10 }
]);

exports.signup = catchAsync(async (req, res, next) => {
  console.log('req.body:', req.body);
  const { fullName, phoneNumber, email, password, roleId } = req.body;

  if (!fullName || !phoneNumber || !password || !roleId)
    return next(new AppError("Full name,phone number,password and role are required", 400));

  const existingUser = await User.findOne({ where: { phoneNumber } });
  console.log('existingUser:', existingUser);

  if (existingUser)
    return next(new AppError("Phone number already exists", 409));

  let { profileImage } = await processUploadFilesToSave(req, req.files, req.body);

  if (!profileImage)
    profileImage = `${req.protocol}://${req.get('host')}/uploads/default.png`;

  const role = await Role.findOne({
    where: { id: roleId, isActive: true }
  });

  if (!role)
    return next(new AppError("Invalid role selected", 400));

  const user = await User.create({
    fullName,
    phoneNumber,
    email,
    password,
    roleId,
    profileImage
  });

  await sendWelcomeEmail(user, password);

  res.status(201).json({
    status: 1,
    message: "User registered successfully",
    data: user
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { phoneNumber, password } = req.body;

  if (!phoneNumber || !password)
    return next(new AppError("Phone number and password are required", 400));

  const user = await User.scope('withPassword').findOne({
    where: { phoneNumber },
    include: [
      {
        model: Role,
        as: 'role'
      }
    ]
  });

  if (!user)
    return next(new AppError("Invalid credentials", 401));

  if (!user.isActive)
    return next(new AppError("Account is inactive", 403));

  // const correctPassword = await bcrypt.compare(password, user.password);
  const correctPassword = await user.checkPassword(password);
  if (!correctPassword) return next(new AppError("Invalid credentials", 401));

  user.lastLogin = new Date();
  await user.save({ hooks: false });

  const token = signInToken(user);

  res.status(200).json({
    status: 1,
    token,
    user,
    role: user.role ? user.role.code : null,
    changePassword: user.changePassword,
    message: user.changePassword
      ? "Login successful,please change your password"
      : "Login successful"
  });
});

exports.forgetPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ where: { email } });

  if (!user)
    return next(new AppError("No user found with this email", 404));

  const otp = user.createPasswordResetOTP();

  await user.save();

  await sendEmail({
    email: user.email,
    subject: "Password Reset OTP",
    message: `Your password reset OTP is ${otp}. It expires in 10 minutes.`
  });

  res.status(200).json({
    status: 1,
    message: "OTP sent successfully"
  });
});

exports.verifyOTP = catchAsync(async (req, res, next) => {
  const { email, passwordResetOTP } = req.body;

  if (!email || !passwordResetOTP)
    return next(new AppError("Email and OTP are required", 400));

  const user = await User.findOne({
    where: {
      email,
      passwordResetOTP,
      passwordResetOTPExpires: { [Op.gt]: new Date() }
    }
  });

  if (!user)
    return next(new AppError("Invalid or expired OTP", 400));

  user.passwordResetOTP = null;
  user.passwordResetOTPExpires = null;

  await user.save();

  res.status(200).json({
    status: 1,
    message: "OTP verified successfully"
  });
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const { email, newPassword } = req.body;

  const user = await User.findOne({
    where: { email }
  });

  if (!user)
    return next(new AppError("User not found", 404));

  user.password = newPassword;
  user.changePassword = false;

  await user.save();

  res.status(200).json({
    status: 1,
    message: "Password reset successfully"
  });
});

exports.updateMyPassword = catchAsync(async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword)
    return next(new AppError("Current and new password are required", 400));

  const user = await User.findByPk(req.user.id);

  if (!user)
    return next(new AppError("User not found", 404));

  const correct = await bcrypt.compare(currentPassword, user.password);

  if (!correct)
    return next(new AppError("Current password is incorrect", 401));

  user.password = newPassword;
  user.changePassword = false;

  await user.save();

  res.status(200).json({
    status: 1,
    message: "Password updated successfully"
  });
});

exports.getMe = catchAsync(async (req, res, next) => {
  const user = await User.findByPk(req.user.id, {
    attributes: {
      exclude: [
        'password',
        'passwordResetOTP',
        'passwordResetOTPExpires'
      ]
    },
    include: [
      {
        model: Role,
        as: 'role'
      }
    ]
  });

  if (!user)
    return next(new AppError("User not found", 404));

  res.status(200).json({
    status: 1,
    data: user
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  const user = await User.findByPk(req.user.id);

  if (!user)
    return next(new AppError("User not found", 404));

  const allowedFields = [
    'fullName',
    'phoneNumber',
    'email',
  ];

  const updateData = {};

  allowedFields.forEach(field => {
    if (req.body[field] !== undefined)
      updateData[field] = req.body[field];
  });

  if (req.files && req.files.profileImage) {
    const { profileImage } = await processUploadFilesToSave(req, req.files, req.body, user);
    updateData.profileImage = profileImage;
  }

  await user.update(updateData);

  res.status(200).json({
    status: 1,
    message: "Profile updated successfully",
    data: user
  });
});