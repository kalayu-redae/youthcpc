const { Op, fn, col } = require('sequelize');
const Sequelize=require("sequelize")

const xlsx = require('xlsx'); 
const ExcelJS = require("exceljs");

const validator = require('validator');
const { Patient,Branch ,Guardian} = require('../../models');
const fs = require('fs');
const catchAsync = require("../../utils/catchAsync")
const AppError = require("../../utils/appError")
require('dotenv').config();
const { sendEmail } = require('../../utils/emailUtils');

const {createMulterMiddleware,processUploadFilesToSave,importFromExcelFile,exportToExcelFile,exportToPDFFile,deleteFile} = require('../../utils/fileUtils');
const { error } = require('console');

const userUpload = createMulterMiddleware(
  'uploads/patients/',
  'patient',
  ['image/jpeg','image/png','application/pdf', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-excel'
  ]
);

// Middleware for handling multiple file 
exports.uploadPatientProfile=userUpload.fields([
    { name: 'profileImage', maxCount: 1 },
  ])
exports.uploadPatientFile = userUpload.single('file');// Middleware for handling single file upload

const buildClause = (user,query) => {
  const {branchId,gender,birthDate, startDate, mrn,endDate,status,search} = query;

  let whereClause = {businessId:user.businessId};

  if (branchId) whereClause.branchId = branchId;
  if (status) whereClause.status = status
  if(gender) whereClause.gender=gender
  if(birthDate) whereClause.birthDate=birthDate
  if(mrn)  whereClause[Op.or] = [{ mrn: { [Op.like]: `%${mrn}%` } }];
  
  if (startDate && endDate) {
    whereClause.createdAt = { [Op.between]: [new Date(startDate), new Date(endDate)]};
  }

  if (search) {
    whereClause[Op.or] = [
      { fullName: { [Op.like]: `%${search}%` } },
      { mrn: { [Op.like]: `%${search}%` } },
      { fan: { [Op.like]: `%${search}%` } },
      { email: { [Op.like]: `%${search}%` } },
      { phoneNumber: { [Op.like]: `%${search}%` } },
      { address: { [Op.like]: `%${search}%` } },
    ];
  }

  return whereClause;
};

// register Patient
exports.createPatient = catchAsync(async (req, res, next) => {
  console.log("Patient registration", req.body)
  console.log("patient profileImage", req.files)
  console.log('Patient model:', Patient);

  const { branchId,fullName,gender,birthDate,phoneNumber,email,fan,address,status} = req.body;
  if (!fullName ||!branchId ||!gender ||!birthDate||!phoneNumber || !address) {
    return next(new AppError("missing required fields", 404))
  }

  if (new Date(birthDate) > new Date()) {
  return next(new AppError("Birth date cannot be in the future", 400));
}


  let { profileImage} = await processUploadFilesToSave(req, req.files, req.body)
  if(!profileImage){
  profileImage=`${req.protocol}://${req.get('host')}/uploads/default.png`;// full URL to default image
  }

  const existingPatient = await Patient.findOne({ where: { fullName} });
  if (existingPatient) {
    if (req.files) deleteFile(req.files.path);
    return (next(new AppError("PhoneNumber already in use", 404)))
  }

  const mrn = await Patient.generateMRN();

  const patient = await Patient.create({
    businessId: req.user.businessId,
    branchId: branchId,
    mrn,
    fullName,
    gender,
    birthDate,
    phoneNumber,
    email,
    fan,
    address,
    profileImage: profileImage,
    status
  });

  // Return success response
  res.status(200).json({
    error:false,
    success:1,
    message: 'Patient registered successfully.',
    data: patient,
  });

});

exports.getPatients = catchAsync(async (req, res, next) => {
  const {page = 1,limit = 20} = req.query;

  const whereClause = buildClause(req.user,req.query)
  console.log("whe",whereClause)

  const offset = (page - 1) * limit;

  const total = await Patient.count({ where: whereClause });
  const inPatient = await Patient.count({where: {...whereClause,status: "inPatient"}});
  const outPatient = await Patient.count({where: {...whereClause,status: "outPatient"}});

  const patients = await Patient.findAll({
    where: whereClause,
    include: [
       { model: Branch, as: 'branch', attributes: ['id', 'name'] },
    ],
    offset: Number(offset),
    limit: Number(limit),
  });

  if (!patients.length) {
    return next(new AppError('No patients found', 404));
  }

  res.status(200).json({
    status: 1,
    total,inPatient,outPatient,
    currentPage: Number(page),
    totalPages: Math.ceil(total / limit),
    patients: patients
  });
});

exports.getPatient = catchAsync(async (req, res, next) => {
  console.log("Requested Patient Role:", req.user.role,req.params);

  const patient = await Patient.findByPk(req.params.patientId, {
    include: [
       { model: Branch, as: 'branch', attributes: ['id', 'name'] },
       { model: Guardian, as: 'guardian', attributes: ['id', 'fullName'] },
    ],
  });


  if (!patient)  return next(new AppError('Patient not found', 404));

  res.status(200).json({
    status: 1,
    message: `Profile fetched successfully!`,
    data: patient
  });
});

exports.updatePatient= catchAsync(async (req, res, next) => {

  const patient = await Patient.findByPk(req.params.patientId);
  if (!patient)  return next(new AppError("Patient not found", 404));
  
  let {profileImage}= await processUploadFilesToSave(req,req.files, req.body, patient)
  if(!profileImage) profileImage=patient.profileImage
  
  const updateData = {...req.body, profileImage  };

  await patient.update(updateData);

  res.status(200).json({
    error:false,
    status: 1,
    message: `${patient.fullName} updated successfully`,
    data:patient,   
  });
});

exports.deletePatient = catchAsync(async (req, res, next) => {
  const patientId = parseInt(req.params.patientId, 10); 

  const deletedCount = await Patient.destroy({ where: { id: patientId } });

  if (deletedCount === 0) {
    return next(new AppError("Patient entry not found", 404));
  }

  res.status(200).json({
    status: 'success',
    message: 'Patient deleted successfully',
  });
});

exports.deletePatients = catchAsync(async (req, res, next) => {
  const deletedCount = await Patient.destroy({
    where: {},
  });

  if (deletedCount === 0) {
    return next(new AppError("No patient entries found to delete", 404));
  }

  res.status(200).json({
    status: 'success',
    message: `${deletedCount} patients deleted`,
  });
});

exports.importPatients = catchAsync(async (req, res, next) => {
  if (!req.file || !req.file.path) {
    return next(new AppError('File not uploaded or path is invalid.', 400));
  }

  // Only allow Excel files
  if (!req.file.mimetype.includes('spreadsheetml') && !req.file.originalname.endsWith('.xlsx')) {
    return next(new AppError('Please upload a valid Excel file (.xlsx)', 400));
  }

  const requiredFields = [
    'businessId', 'branchId','fullName','gender','birthDate', 'phoneNumber', 'email', 'fan',
    'address', 'status'
  ];

  const mrn=await Patient.generateMRN()
  // Transform each row before saving
  const transformFn = async (row) => ({
    businessId: row.businessId,
    branchId: row.branchId,
    fullName: row.fullName,
    gender:row.gender,
    mrn:row.mrn||mrn,
    birthDate:row.birthDate,
    phoneNumber: String(row.phoneNumber),
    email: String(row.email).toLowerCase(),
    fan:row.fan,
    status:row.status,
    address: row.address,
    profileImage: null
  });

  const saveFn = async (data) => await Patient.create(data);

  const { importedData, errors } = await importFromExcelFile({
    filePath: req.file.path,
    requiredFields,
    transformFn,
    saveFn
  });
  console.log('The data is :', importedData, errors)
  if (!importedData.length) {
    return next(new AppError('No valid Users were imported from the file.', 400));
  }

  res.status(200).json({
    status: 1,
    message: errors.length > 0 ? 'Import completed with some errors' : 'Data imported successfully',
    successCount: importedData.length,
    errorCount: errors.length,
    errors,
    importedUsers: importedData
  });
});

exports.exportPatients = catchAsync(async (req, res, next) => {
  const { sortBy = "createdAt", sortOrder = "desc", page = 1, limit = 1000 } = req.query;

  const whereQuery = buildClause(req.user,req.query)

  const validSortColumns = ["createdAt", "updatedAt", "fullName", "mrn"];
  const orderColumn = validSortColumns.includes(sortBy) ? sortBy : "createdAt";
  const orderDirection = sortOrder.toLowerCase() === "asc" ? "ASC" : "DESC";

  const patients = await Patient.findAll({
    where: whereQuery,
    include: [
      { model: Branch, as: "branch", attributes: ["id", "name"] }
    ],
    order: [[orderColumn, orderDirection]],
    limit: Number(limit),
    offset: (page - 1) * limit
  });

  if (!patients.length) {
    return next(new AppError("No patients found for the given filters.", 404));
  }

  // nst transformFn = async (row) => ({
  //   businessId: row.businessId,
  //   branchId: row.branchId,
  //   fullName: row.fullName,
  //   gender:row.gender,
  //   mrn:row.mrn||mrn,
  //   birthDate:row.birthDate,
  //   phoneNumber: String(row.phoneNumber),
  //   email: String(row.email).toLowerCase(),
  //   fan:row.fan,
  //   status:row.status,
  //   address: row.address,
  //   profileImage: null

  // Format patients for export
  const formattedPatients = patients.map(p => ({
    ID: p.id,
    Branch: p.Branch?.name || "N/A",
    "Full Name": p.fullName,
    Gender:p.gender,
    MRN:p.mrn,
    birthDate:p.birthDate,
    Phone: p.phoneNumber,
    Email: p.email,
    fan:p.fan,
    status:p.status,
    address:p.address,
  }));

  // Define columns for Excel
  const columns = Object.keys(formattedPatients[0]).map(key => ({
    header: key,
    key,
    width: 20
  }));

  // Call generic Excel export
  await exportToExcelFile({
    data: formattedPatients,
    columns,
    fileName: "patients",
    res
  });
});


//guardian Handling
exports.addPatientGuardian = catchAsync(async (req, res, next) => {
  console.log("Guardian registration", req.body)
  console.log("Guardian profileImage", req.files)

  const patientId=req.params.patientId
  console.log('Patient ID:',patientId);
  const { fullName,gender,relationship,phoneNumber,email,address} = req.body;
  if (!fullName ||!gender ||!relationship||!phoneNumber || !address) {
    return next(new AppError("missing required fields", 404))
  }
  try{
  const guardian = await Guardian.create({
  patientId:patientId,
  fullName,
  gender,
  relationship,
  phoneNumber,
  email,
  address,
  isEmergency:false,
  });
  res.status(200).json({
    error:false,
    success:1,
    message: 'Guardian registered successfully.',
    data: guardian,
  });
  } catch(err){
    console.log(err.errors);
    throw Error(err);
  }

});

exports.getPatientGuardians = catchAsync(async (req, res, next) => {
  const { patientId } = req.params;

  const guardians = await Guardian.findAll({
    where: { patientId }
  });

  res.status(200).json({
    success: true,
    results: guardians.length,
    data: guardians
  });
});

exports.getPatientGuardian = catchAsync(async (req, res, next) => {
  const { patientId, guardianId } = req.params;

  const guardian = await Guardian.findOne({
    where: {
      id: guardianId,
      patientId
    }
  });

  if (!guardian) {
    return next(new AppError("Guardian not found", 404));
  }

  res.status(200).json({
    success: true,
    data: guardian
  });
});

exports.updatePatientGuardian= catchAsync(async (req, res, next) => {
  const { patientId, guardianId } = req.params;

  const guardian = await Guardian.findOne({
    where: { id: guardianId, patientId }
  });

  if (!guardian) {
    return next(new AppError("Guardian not found", 404));
  }

  await guardian.update(req.body);

  res.status(200).json({
    success: true,
    message: "Guardian updated successfully",
    data: guardian
  });
});

exports.deletePatientGuardian = catchAsync(async (req, res, next) => {
  const { patientId, guardianId } = req.params;

  const guardian = await Guardian.findOne({
    where: { id: guardianId, patientId }
  });

  if (!guardian) {
    return next(new AppError("Guardian not found", 404));
  }

  await guardian.destroy();

//   res.status(200).json({
//     success: true,
//     message: "Guardian deleted successfully"
//   });
// });
res.status(200).send({
    success: true,
    message: "Guardian deleted successfully"
  });
});