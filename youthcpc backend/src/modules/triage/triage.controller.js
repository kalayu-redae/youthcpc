const { Triage, Patient, Department, User } = require('../../models');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const { Op } = require('sequelize');

/**
 * Create Triage
 */
exports.createTriage = catchAsync(async (req, res, next) => {
  const { patient_id, assigned_department_id, severity, notes, assigned_by } = req.body;

  // Validate patient
  const patient = await Patient.findByPk(patient_id);
  if (!patient) {
    return next(new AppError("Patient not found", 404));
  }

  // Validate department (optional but recommended)
  if (assigned_department_id) {
    const department = await Department.findByPk(assigned_department_id);
    if (!department) {
      return next(new AppError("Department not found", 404));
    }
  }

  const triage = await Triage.create({
    patient_id,
    assigned_department_id,
    severity,
    notes
  });

  res.status(201).json({
    error: false,
    status: 1,
    message: "Triage created",
    data: triage
  });
});


/**
 * Get all triages
 */
exports.getAllTriages = catchAsync(async (req, res) => {

  const triages = await Triage.findAll({
    include: [
      { model: Patient },
      { model: Department }
    ]
  });

  res.status(200).json({
    error: false,
    status: 1,
    data: triages
  });
});


/**
 * Get today's triages
 */
exports.getTodayTriages = catchAsync(async (req, res) => {

  const start = new Date();
  start.setHours(0, 0, 0, 0);

  const end = new Date();
  end.setHours(23, 59, 59, 999);

  const triages = await Triage.findAll({
    where: {
      createdAt: {
        [Op.between]: [start, end]
      }
    },
    include: [
      { model: Patient },
      { model: Department }
    ]
  });

  res.status(200).json({
    error: false,
    status: 1,
    data: triages
  });
});


/**
 * Get Triage by ID
 */
exports.getTriageById = catchAsync(async (req, res, next) => {

  const triage = await Triage.findByPk(req.params.id, {
    include: [
      { model: Patient },
      { model: Department }
    ]
  });

  if (!triage) {
    return next(new AppError("Triage not found", 404));
  }

  res.status(200).json({
    error: false,
    status: 1,
    data: triage
  });
});


/**
 * Update Triage
 */
exports.updateTriage = catchAsync(async (req, res, next) => {

  const triage = await Triage.findByPk(req.params.id);
  if (!triage) {
    return next(new AppError("Triage not found", 404));
  }

  // validate department if being updated
  if (req.body.assigned_department_id) {
    const department = await Department.findByPk(req.body.assigned_department_id);
    if (!department) {
      return next(new AppError("Assigned department not found", 400));
    }
  }

  await triage.update(req.body);

  res.status(200).json({
    error: false,
    status: 1,
    message: "Triage updated",
    data: triage
  });
});

/**
 * Delete Triage
 */
exports.deleteTriage = catchAsync(async (req, res, next) => {

  const triage = await Triage.findByPk(req.params.id);

  if (!triage) {
    return next(new AppError("Triage not found", 404));
  }

  await triage.destroy();

  res.status(200).json({
    error: false,
    status: 1,
    message: "Triage deleted"
  });
});