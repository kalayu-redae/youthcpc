const AppError = require('../utils/appError');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { Op } = require('sequelize');
const { User, Role } = require('../models');

require('dotenv').config();

exports.generateCode = async ({
  model,
  prefix,
  businessId,
  transaction = null
}) => {
  const lastRecord = await model.findOne({
    where: {
      business_id: businessId,
      code: { [Op.like]: `${prefix}%` }
    },
    order: [['createdAt', 'DESC']],
    attributes: ['code'],
    transaction,
    lock: transaction ? transaction.LOCK.UPDATE : undefined
  });

  let nextNumber = 1;

  if (lastRecord?.code) {
    const parsed = parseInt(lastRecord.code.replace(prefix, ''), 10);
    if (!isNaN(parsed)) nextNumber = parsed + 1;
  }

  return `${prefix}${String(nextNumber).padStart(4, '0')}`;
};

const normalizePermissions = (permissions) => {
  if (!permissions) return [];
  if (Array.isArray(permissions)) return permissions;
  if (typeof permissions === 'string') {
    try { return JSON.parse(permissions); } catch { return []; }
  }
  return [];
};

exports.requireRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.roleCode)) {
      return next(new AppError('Access denied', 403));
    }
    next();
  };
};

exports.authenticationJwt = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }

    console.log("Token:", token);
    if (!token)
      return next(new AppError('Not logged in', 401));

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findByPk(decoded.id, {
      include: [
        {
          model: Role,
          as: 'role'
        }
      ]
    });

    if (!user)
      return next(new AppError('User no longer exists', 401));

    if (!user.isActive)
      return next(new AppError('User is inactive', 403));

    if (!user.role)
      return next(new AppError('User role not found', 403));


    req.user = {
      id: user.id,
      fullName: user.fullName,
      phoneNumber: user.phoneNumber,
      roleId: user.roleId,
      roleCode: user.role.code
    };


    console.log("authenticated User:", req.user);

    next();

  } catch (error) {
    console.log(error.message);
    return next(new AppError('Invalid or expired token', 401));
  }
};