const express = require("express");
const router = express.Router();

const wardController = require("./ward.controller");
const { authenticationJwt, requirePermission } = require("../../utils/authUtils");

router.use(authenticationJwt);

router.route("/")
.post(requirePermission("Ward:create"),wardController.createWard)
.get(requirePermission("Ward:view"),wardController.getAllWards);

router.route("/:id")
.get(requirePermission("Ward:view"),wardController.getWardById)
.patch(requirePermission("Ward:update"),wardController.updateWard)
.delete(requirePermission("Ward:delete"),wardController.deleteWard);

module.exports = router;



/**
 * @swagger
 * tags:
 *   name: ward
 *   description: Ward management APIs
 */

/**
 * @swagger
 * /ward:
 *   post:
 *     summary: Create a new Ward
 *     tags: [ward]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: "ICU"
 *             department_id: 1
 *             type: "Critical"
 *             description: "Intensive Care Unit"
 *             capacity: 10
 *     responses:
 *       201:
 *         description: Ward created successfully
 *         content:
 *           application/json:
 *             example:
 *               status: 1
 *               message: "Ward created successfully"
 *               data:
 *                 id: 1
 *                 name: "ICU"
 *                 department_id: 1
 *                 type: "Critical"
 *                 description: "Intensive Care Unit"
 *                 capacity: 10
 *                 occupiedBeds: 0
 */

/**
 * @swagger
 * /ward:
 *   get:
 *     summary: Get all Wards
 *     tags: [ward]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of Wards
 *         content:
 *           application/json:
 *             example:
 *               status: 1
 *               total: 2
 *               data:
 *                 - id: 1
 *                   name: "ICU"
 *                   department_id: 1
 *                   type: "Critical"
 *                   description: "Intensive Care Unit"
 *                   capacity: 10
 *                   occupiedBeds: 0
 *                 - id: 2
 *                   name: "General"
 *                   department_id: 1
 *                   type: "Regular"
 *                   description: "General patients ward"
 *                   capacity: 20
 *                   occupiedBeds: 5
 */

/**
 * @swagger
 * /ward/{id}:
 *   get:
 *     summary: Get a Ward by ID
 *     tags: [ward]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Ward ID
 *     responses:
 *       200:
 *         description: Ward retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               status: 1
 *               data:
 *                 id: 1
 *                 name: "ICU"
 *                 department_id: 1
 *                 type: "Critical"
 *                 description: "Intensive Care Unit"
 *                 capacity: 10
 *                 occupiedBeds: 0
 *       404:
 *         description: Ward not found
 *         content:
 *           application/json:
 *             example:
 *               status: 0
 *               message: "Ward not found"
 */

/**
 * @swagger
 * /ward/{id}:
 *   patch:
 *     summary: Update a Ward
 *     tags: [ward]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Ward ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: "Updated ICU"
 *             department_id: 1
 *             type: "Critical Updated"
 *             description: "Updated ICU description"
 *             capacity: 15
 *     responses:
 *       200:
 *         description: Ward updated successfully
 *         content:
 *           application/json:
 *             example:
 *               status: 1
 *               message: "Ward updated successfully"
 *               data:
 *                 id: 1
 *                 name: "Updated ICU"
 *                 department_id: 1
 *                 type: "Critical Updated"
 *                 description: "Updated ICU description"
 *                 capacity: 15
 *                 occupiedBeds: 0
 *       404:
 *         description: Ward not found
 *         content:
 *           application/json:
 *             example:
 *               status: 0
 *               message: "Ward not found"
 */

/**
 * @swagger
 * /ward/{id}:
 *   delete:
 *     summary: Delete a Ward
 *     tags: [ward]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Ward ID
 *     responses:
 *       200:
 *         description: Ward deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               status: 1
 *               message: "Ward deleted successfully"
 *       404:
 *         description: Ward not found
 *         content:
 *           application/json:
 *             example:
 *               status: 0
 *               message: "Ward not found"
 */