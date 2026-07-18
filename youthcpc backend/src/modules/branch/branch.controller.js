const { Branch, Stock,User,Role,StockTransaction} = require('../../models');
const { Op } = require('sequelize');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');

exports.createBranch = catchAsync(async (req, res, next) => {
  const {name, code, location,managerName,phone,email,isActive } = req.body;
  console.log("warhouse req.body",req.body);

  if (!name || !code) {
    return next(new AppError('Business ID, Branch name and code are required', 400));
  }

  const exists = await Branch.findOne({ where: { code } });
  if (exists) {
    return next(new AppError('Branch code already exists', 409));
  }
exports.getAllbranches = catchAsync(async (req, res) => {
  const {isActive,search,sortBy = 'createdAt',sortOrder = 'DESC',page = 1,limit = 20 } = req.query;
  const whereQuery = {};
  // how do you see this brother 
  /** const whereQuery = {businessId: req.user.businessId}; */

  if (isActive !== undefined) {
    whereQuery.isActive = ['true', '1'].includes(isActive);
  }

  if (search) {
    whereQuery[Op.or] = [
      { name: { [Op.like]: `%${search}%` } },
      { code: { [Op.like]: `%${search}%` } },
      { location: { [Op.like]: `%${search}%` } },
      { phone: { [Op.like]: `%${search}%` } },
      { email: { [Op.like]: `%${search}%` } },
      { managerName: { [Op.like]: `%${search}%` } },
    ];
  }

  const validSortColumns = ['createdAt', 'updatedAt', 'name', 'code'];
  const orderColumn = validSortColumns.includes(sortBy)
    ? sortBy
    : 'createdAt';

  const offset = (page - 1) * limit;

  const { rows, count } = await Branch.findAndCountAll({
    where: whereQuery,
    limit: Number(limit),
    offset,
    order: [[orderColumn, sortOrder === 'asc' ? 'ASC' : 'DESC']],
  });

  res.status(200).json({
    status: 'success',
    total: count,
    page: Number(page),
    pages: Math.ceil(count / limit),
    results: rows.length,
    data: rows,
  });
});

exports.getBranchById = catchAsync(async (req, res, next) => {
  const Branch = await Branch.findByPk(req.params.branchId);

  if (!branch) {
    return next(new AppError('Branch not found', 404));
  }

  res.status(200).json({
    status: 1,
    message: 'Branch retrieved successfully',
    data: branch,
  });
});

exports.updateBranch = catchAsync(async (req, res, next) => {
  const Branch = await Branch.findByPk(req.params.branchId);
  if (!Branch) {
    return next(new AppError('Branch not found', 404));
  }

  const allowedFields = ['name', 'location', 'phone', 'email','managerName', 'isActive'];
  const updates = {};

  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      updates[field] = req.body[field];
    }
  });

  await branch.update(updates);

  res.status(200).json({
    status: 'success',
    data: branch,
  });
});

exports.togglebranchestatus = catchAsync(async (req, res, next) => {
  const Branch = await Branch.findByPk(req.params.branchId);
  if (!Branch) {
    return next(new AppError('Branch not foundl', 404));
  }

  Branch.isActive = !Branch.isActive;
  await Branch.save();

  res.status(200).json({
    status: 1,
    message:`${branch.isActive ? 'Activated' : 'Deactivated'} successfully`,
    isActive: branch.isActive,
  });
});

exports.deleteBranchById = catchAsync(async (req, res, next) => {
  const branch = await Branch.findByPk(req.params.branchId);
  if (!branch) {
    return next(new AppError('Branch not found', 404));
  }

  const stockCount = await Stock.count({
    where: { branchId: Branch.id },
  });

  // if (stockCount > 0) {
  //   return next(
  //     new AppError('Cannot delete Branch with existing stock', 400)
  //   );
  // }
  // this is for the time being
  const branchCount = await Branch.count({
    where:{isActive:false},
  })
if (branchCount < 0) {
    return next(
      new AppError('Cannot delete Branch with existing not active ', 400)
    );
  }

  await Branch.destroy();

  res.status(204).json({ 
    status: 1, 
    message: 'Branch deleted successfully'
   });
});

exports.getbranchesummaryReport = catchAsync(async (req, res, next) => {
  console.log("Branchreached")
  const branches = await Branch.findAll({
    include: [
      { model: User, attributes: ['id'] },
      { model: Role, attributes: ['id'] },
      { model: Stock, attributes: ['id'] },
      { model: StockTransaction, attributes: ['id'] },
      //...added all the other module
    ],
  });

  const summary = branches.map(wh => ({
    branchId: wh.id,
    name: wh.name,
    code: wh.code,
    location: wh.location,
    managerName: wh.managerName,
    phone: wh.phone,
    email: wh.email,

    // totalUsers: wh.Users.length,
    // totalRoles: wh.Roles.length,
    // totalStockItems: wh.Stocks.length,
    // totalTransactions: wh.StockTransactions.length,
        totalUsers: wh.Users?.length || 0,
        totalRoles: wh.Roles?.length || 0,
        totalStockItems: wh.Stocks?.length || 0,
        totalTransactions: wh.StockTransactions?.length || 0,
        isActive: wh.isActive,
  }));

  res.status(200).json({
    status: 1,
    totalbranches: branches.length,
    data: summary,
  });
});
