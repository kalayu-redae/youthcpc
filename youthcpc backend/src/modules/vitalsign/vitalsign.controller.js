const { VitalSign, Patient, User } = require('../../models');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');

/**
 * Create Vital Sign
 */
exports.createVitalSign = catchAsync(async (req, res, next) => {

  const {
    patient_id,
    blood_group,
    blood_pressure,
    temperature,
    pulse,
    weight,
    height,
    recorded_by
  } = req.body;

  // 🔍 Validate patient
  const patient = await Patient.findByPk(patient_id);
  if (!patient) {
    return next(new AppError("Patient not found", 404));
  }

  // 🔍 Optional: validate user
  if (recorded_by) {
    const user = await User.findByPk(recorded_by);
    if (!user) {
      return next(new AppError("Recorded user not found", 404));
    }
  }

  const vital = await VitalSign.create({
    patient_id,
    blood_group,
    blood_pressure,
    temperature,
    pulse,
    weight,
    height,
    recorded_by
  });

  res.status(201).json({
    error: false,
    status: 1,
    message: "Vital signs recorded",
    data: vital
  });
});


/**
 * Get Vitals by Patient
 */
exports.getVitalsByPatient = catchAsync(async (req, res, next) => {

  const { patientId } = req.params;

  // 🔍 Validate patient
  const patient = await Patient.findByPk(patientId);
  if (!patient) {
    return next(new AppError("Patient not found", 404));
  }

  const vitals = await VitalSign.findAll({
    where: { patient_id: patientId },
    include: [
      { model: Patient },
      { model: User }
    ],
    order: [['recorded_at', 'DESC']] // 🔥 latest first
  });

  res.status(200).json({
    error: false,
    status: 1,
    total: vitals.length,
    data: vitals
  });
});