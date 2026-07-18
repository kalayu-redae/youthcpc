
const express = require("express");
const router = express.Router();

const vitalSignController = require("./vitalsign.controller");
const { authenticationJwt, requirePermission } = require("../../utils/authUtils");

router.use(authenticationJwt);

router.route("/")
.post(requirePermission("VitalSign:create"), vitalSignController.createVitalSign);

router.route("/:patientId")
.get(requirePermission("VitalSign:view"), vitalSignController.getVitalsByPatient);

module.exports = router;


 /**
 * @swagger
 * tags:
 *   name: vitals
 *   description: Vital Signs management APIs
 */

/**
 * @swagger
 * /vitalsign:
 *   post:
 *     summary: Record patient vital signs
 *     tags: [vitals]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             patient_id: 1
 *             blood_group: "O+"
 *             blood_pressure: "120/80"
 *             temperature: 36.7
 *             pulse: 72
 *             weight: 70
 *             height: 175
 *             recorded_by: 1
 *     responses:
 *       201:
 *         description: Vital signs recorded successfully
 */

/**
 * @swagger
 * /vitalsign/{patientId}:
 *   get:
 *     summary: Get vital signs by patient ID
 *     tags: [vitals]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Patient vital signs
 */