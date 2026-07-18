const express = require("express");
const router = express.Router();

const bedController = require("./bed.controller");
const { authenticationJwt, requirePermission } = require("../../utils/authUtils");

router.use(authenticationJwt);


router.route("/")
.post(requirePermission("Bed:create"),bedController.createBed)
.get(requirePermission("Bed:view"),bedController.getAllBeds);


router.route("/:id")
.get(requirePermission("Bed:view"),bedController.getBedById)
.patch(requirePermission("Bed:update"),bedController.updateBed)
.delete(requirePermission("Bed:delete"),bedController.deleteBed);


module.exports = router;


/**
 * @swagger
 * tags:
 *   name: beds
 *   description: Bed management APIs
 */

/**
 * @swagger
 * /bed:
 *   post:
 *     summary: Create a new bed
 *     tags: [beds]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             room_id: 1
 *             bed_number: "B101"
 *             status: "available"
 *     responses:
 *       201:
 *         description: Bed created successfully
 */

/**
 * @swagger
 * /bed:
 *   get:
 *     summary: Retrieve all beds
 *     tags: [beds]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of beds
 *         content:
 *           application/json:
 *             example:
 *               status: 1
 *               totalBeds: 2
 *               data:
 *                 - id: 1
 *                   room_id: 1
 *                   bed_number: "B101"
 *                   status: "available"
 *                 - id: 2
 *                   room_id: 2
 *                   bed_number: "B102"
 *                   status: "occupied"
 */

/**
 * @swagger
 * /bed/{id}:
 *   get:
 *     summary: Retrieve a bed by ID
 *     tags: [beds]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Bed ID
 *     responses:
 *       200:
 *         description: Bed retrieved successfully
 *       404:
 *         description: Bed not found
 */

/**
 * @swagger
 * /bed/{id}:
 *   patch:
 *     summary: Update a bed
 *     tags: [beds]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Bed ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             bed_number: "B101"
 *             status: "maintenance"
 *     responses:
 *       200:
 *         description: Bed updated successfully
 *       404:
 *         description: Bed not found
 */

/**
 * @swagger
 * /bed/{id}:
 *   delete:
 *     summary: Delete a bed
 *     tags: [beds]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Bed ID
 *     responses:
 *       204:
 *         description: Bed deleted successfully
 *       404:
 *         description: Bed not found
 */