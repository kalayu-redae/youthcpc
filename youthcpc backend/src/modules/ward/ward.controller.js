const { Ward, Department, Room,Branch } = require('../../models');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');

/**
 * Create a new Ward
 */
exports.createWard = catchAsync(async (req, res, next) => {
  const { name, department_id, type, description, capacity } = req.body;

  if (!name) return next(new AppError("Ward name is required", 400));
  if (!department_id) return next(new AppError("Department ID is required", 400));

  const department = await Department.findByPk(department_id);
  if (!department) return next(new AppError("Department not found", 404));

  const ward = await Ward.create({
    name,
    department_id,
    type,
    description,
    capacity: capacity || 0,
    occupiedBeds: 0
  });

  res.status(201).json({
    status: 1,
    message: "Ward created successfully",
    data: ward
  });
});

/**
 * Get all Wards
 */
exports.getAllWards = catchAsync(async (req, res) => {
    console.log("ward model:", Ward);
  const wards = await Ward.findAll({
  attributes: ['id','department_id','name','type','description','capacity','occupiedBeds','createdAt','updatedAt'],
  include: [
    {
      model: Department,
      as: 'department', 
      attributes: ['id','name'],
      include: [
        {
          model: Branch,
          as: 'branch', 
          attributes: ['id','name'],
          required: false
        }
      ],
      required: false
    },

  ],
  order: [['id','ASC']]
});

  console.log('wards:',wards);

  res.status(200).json({
    status: 1,
    total: wards.length,
    data: wards
  });
});

/**
 * Get a single Ward by ID
 */
exports.getWardById = catchAsync(async (req, res, next) => {
  const ward = await Ward.findByPk(req.params.id, {
    include: [
      { model: Department,as: 'department', attributes: ["id", "name"] },
    ]
  });

  if (!ward) return next(new AppError("Ward not found", 404));

  res.status(200).json({
    status: 1,
    data: ward
  });
});

/**
 * Update a Ward
 */
exports.updateWard = catchAsync(async (req, res, next) => {
  const { name, type, description, capacity, department_id } = req.body;

  const ward = await Ward.findByPk(req.params.id);
  if (!ward) return next(new AppError("Ward not found", 404));

  if (department_id) {
    const department = await Department.findByPk(department_id);
    if (!department) return next(new AppError("Department not found", 404));
    ward.department_id = department_id;
  }

  ward.name = name || ward.name;
  ward.type = type || ward.type;
  ward.description = description || ward.description;
  ward.capacity = capacity ?? ward.capacity;

  await ward.save();

  res.status(200).json({
    status: 1,
    message: "Ward updated successfully",
    data: ward
  });
});

/**
 * Delete a Ward
 */
exports.deleteWard = catchAsync(async (req, res, next) => {
  const ward = await Ward.findByPk(req.params.id);
  if (!ward) return next(new AppError("Ward not found", 404));

  await ward.destroy();

  res.status(200).json({
    status: 1,
    message: "Ward deleted successfully"
  });
});