const express = require("express");
const router = express.Router();

const triageController = require("./triage.controller");
const { authenticationJwt, requirePermission } = require("../../utils/authUtils");

router.use(authenticationJwt);

router.route("/")
.post(requirePermission("Triage:create"), triageController.createTriage)
.get(requirePermission("Triage:view"), triageController.getAllTriages);

router.route("/today")
.get(requirePermission("Triage:view"), triageController.getTodayTriages);

router.route("/:id")
.get(requirePermission("Triage:view"), triageController.getTriageById)
.patch(requirePermission("Triage:update"), triageController.updateTriage)
.delete(requirePermission("Triage:delete"), triageController.deleteTriage);

module.exports = router;




/**
 * @swagger
 * tags:
 *   name: triage
 *   description: Patient triage and department assignment APIs
 */

/**
 * @swagger
 * /triage:
 *   post:
 *     summary: Create a triage record for a patient
 *     tags: [triage]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             patient_id: 1
 *             assigned_department_id: 2
 *             severity: "high"
 *             notes: "Patient experiencing chest pain"
 *     responses:
 *       201:
 *         description: Triage record created successfully
 */

/**
 * @swagger
 * /triage:
 *   get:
 *     summary: Retrieve all triage records
 *     tags: [triage]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of triage records
 *         content:
 *           application/json:
 *             example:
 *               status: 1
 *               totalTriages: 2
 *               data:
 *                 - id: 1
 *                   patient_id: 1
 *                   assigned_department_id: 2
 *                   severity: "high"
 *                   notes: "Patient experiencing chest pain"
 *                   createdAt: "2026-03-23T09:00:00Z"
 *                 - id: 2
 *                   patient_id: 2
 *                   assigned_department_id: 1
 *                   severity: "medium"
 *                   notes: "Moderate fever"
 *                   createdAt: "2026-03-23T10:30:00Z"
 */

/**
 * @swagger
 * /triage/today:
 *   get:
 *     summary: Retrieve triage records created today
 *     tags: [triage]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Today's triage records
 */

/**
 * @swagger
 * /triage/{id}:
 *   get:
 *     summary: Retrieve a triage record by ID
 *     tags: [triage]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Triage record ID
 *     responses:
 *       200:
 *         description: Triage record retrieved successfully
 *       404:
 *         description: Triage record not found
 */

/**
 * @swagger
 * /triage/{id}:
 *   patch:
 *     summary: Update a triage record
 *     tags: [triage]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Triage record ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             assigned_department_id: 3
 *             severity: "medium"
 *             notes: "Patient condition stabilized"
 *     responses:
 *       200:
 *         description: Triage record updated successfully
 *       404:
 *         description: Triage record not found
 */

/**
 * @swagger
 * /triage/{id}:
 *   delete:
 *     summary: Delete a triage record
 *     tags: [triage]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Triage record ID
 *     responses:
 *       204:
 *         description: Triage record deleted successfully
 *       404:
 *         description: Triage record not found
 */