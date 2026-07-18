const express=require("express")
const app = express();
const router=express.Router()

const patientController=require("./patient.controller")
const { authenticationJwt,requirePermission,requirePermissionOrSelf} = require('../../utils/authUtils');

router.use(function (req, res, next) {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept'
  );
  next();
});

// Protect all routes after this middleware
router.use(authenticationJwt);

router.route('/:patientId/guardians')
  .post(requirePermission('guardian:create'),patientController.addPatientGuardian)
  .get(requirePermission('guardian:create'),patientController.getPatientGuardians)

router.route('/:patientId/guardians/:guardianId')
  .get(requirePermission('guardian:create'),patientController.getPatientGuardian)
  .patch(requirePermission('guardian:create'),patientController.updatePatientGuardian)
  .delete(requirePermission('guardian:create'),patientController.deletePatientGuardian)

router.route('/')
      .post(requirePermission('patient:create'),patientController.uploadPatientProfile,patientController.createPatient)
      .get(requirePermission('patient:view'),patientController.getPatients)
      .delete(requirePermission('patient:delete'),patientController.deletePatients)

router.route('/:patientId')
  .get(requirePermissionOrSelf('patient:view'),patientController.getPatient)
  .patch(patientController.uploadPatientProfile,requirePermissionOrSelf('patient:update'),patientController.updatePatient)
  .delete(requirePermission('patient:delete'),patientController.deletePatient);

router.route('/import').post(patientController.uploadPatientFile,requirePermission('patient:import'),patientController.importPatients)
router.route('/export/to-excel-pdf').get(requirePermission('patient:export'),patientController.exportPatients)


module.exports=router

/**
 * @swagger
 * tags:
 *   name: Patients
 *   description: Patient management routes
 */

/**
 * @swagger
 * /patient:
 *   post:
 *     summary: Create a new patient
 *     tags: [Patients]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - branchId
 *               - fullName
 *               - gender
 *               - birthDate
 *               - phoneNumber
 *               - address
 *             properties:
 *               branchId:
 *                 type: integer
 *               fullName:
 *                 type: string
 *               gender:
 *                 type: string
 *                 enum: [male, female, other]
 *               birthDate:
 *                 type: string
 *                 format: date
 *               phoneNumber:
 *                 type: string
 *               email:
 *                 type: string
 *               FAN:
 *                 type: string
 *               address:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [inPatient, outPatient, Discharge]
 *               profileImage:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Patient created successfully
 *       400:
 *         description: Validation error
 *
 *   get:
 *     summary: Get all patients
 *     tags: [Patients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of patients
 */

/**
 * @swagger
 * /patient/{patientId}:
 *   get:
 *     summary: Get patient by ID
 *     tags: [Patients]
 *     parameters:
 *       - name: patientId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Patient details
 *       404:
 *         description: Patient not found
 *
 *   patch:
 *     summary: Update patient
 *     tags: [Patients]
 *     parameters:
 *       - name: patientId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               gender:
 *                 type: string
 *                 enum: [male, female, other]
 *               birthDate:
 *                 type: string
 *                 format: date
 *               phoneNumber:
 *                 type: string
 *               email:
 *                 type: string
 *               address:
 *                 type: string
 *               status:
 *                 type: string
 *               profileImage:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Patient updated successfully
 *
 *   delete:
 *     summary: Delete patient
 *     tags: [Patients]
 *     parameters:
 *       - name: patientId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Patient deleted
 */

/**
 * @swagger
 * /patient/import:
 *   post:
 *     summary: Import patients from Excel
 *     tags: [Patients]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Patients imported successfully
 */

/**
 * @swagger
 * /patient/export/to-excel-pdf:
 *   get:
 *     summary: Export patients to Excel or PDF
 *     tags: [Patients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: format
 *         in: query
 *         schema:
 *           type: string
 *           enum: [excel, pdf]
 *     responses:
 *       200:
 *         description: File exported
 *         content:
 *           application/octet-stream:
 *             schema:
 *               type: string
 *               format: binary
 */


/**
 * @swagger
 * tags:
 *   name: Guardians
 *   description: Manage patient guardians
 */

/**
 * @swagger
 * /patient/{patientId}/guardians:
 *   post:
 *     summary: Add a guardian to a patient
 *     tags: [Guardians]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Patient ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *               - gender
 *               - relationship
 *               - phoneNumber
 *               - address
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: Abel Tesfaye
 *               gender:
 *                 type: string
 *                 enum: [male, female, other]
 *               relationship:
 *                 type: string
 *                 example: Father
 *               phoneNumber:
 *                 type: string
 *                 example: 0912345678
 *               email:
 *                 type: string
 *                 example: father@example.com
 *               address:
 *                 type: string
 *                 example: Addis Ababa
 *               isEmergency:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       200:
 *         description: Guardian registered successfully
 *       400:
 *         description: Missing required fields
 *       404:
 *         description: Patient not found
 */

/**
 * @swagger
 * /patient/{patientId}/guardians:
 *   get:
 *     summary: Get all guardians for a patient
 *     tags: [Guardians]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Patient ID
 *     responses:
 *       200:
 *         description: List of guardians
 *       404:
 *         description: Patient not found
 */

/**
 * @swagger
 * /patient/{patientId}/guardians/{guardianId}:
 *   get:
 *     summary: Get a specific guardian of a patient
 *     tags: [Guardians]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: guardianId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Guardian retrieved successfully
 *       404:
 *         description: Guardian not found
 */

/**
 * @swagger
 * /patient/{patientId}/guardians/{guardianId}:
 *   patch:
 *     summary: Update a patient's guardian
 *     tags: [Guardians]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: guardianId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               gender:
 *                 type: string
 *                 enum: [male, female, other]
 *               relationship:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               email:
 *                 type: string
 *               address:
 *                 type: string
 *               isEmergency:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Guardian updated successfully
 *       404:
 *         description: Guardian not found
 */

/**
 * @swagger
 * /patient/{patientId}/guardians/{guardianId}:
 *   delete:
 *     summary: Delete a patient's guardian
 *     tags: [Guardians]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: guardianId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Guardian deleted successfully
 *       404:
 *         description: Guardian not found
 */