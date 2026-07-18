const express = require("express");
const router = express.Router();

const roomController = require("./room.controller");
const { authenticationJwt, requirePermission } = require("../../utils/authUtils");

router.use(authenticationJwt);


router.route("/")
.post(requirePermission("Room:create"),roomController.createRoom)
.get(requirePermission("Room:view"),roomController.getAllRooms);


router.route("/:id")
.get(requirePermission("Room:view"),roomController.getRoomById)
.patch(requirePermission("Room:update"),roomController.updateRoom)
.delete(requirePermission("Room:delete"),roomController.deleteRoom);


module.exports = router;



/**
 * @swagger
 * tags:
 *   name: rooms
 *   description: Room management APIs
 */

/**
 * @swagger
 * /room:
 *   post:
 *     summary: Create a new Room
 *     tags: [rooms]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             ward_id: 1
 *             room_number: "R101"
 *             type: "ICU"
 *             capacity: 2
 *             occupiedBeds: 0
 *             status: true
 *     responses:
 *       201:
 *         description: Room created successfully
 */

/**
 * @swagger
 * /room:
 *   get:
 *     summary: Get all rooms
 *     tags: [rooms]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of rooms
 *         content:
 *           application/json:
 *             example:
 *               status: 1
 *               totalRooms: 2
 *               data:
 *                 - id: 1
 *                   ward_id: 1
 *                   room_number: "R101"
 *                   type: "ICU"
 *                   capacity: 2
 *                   occupiedBeds: 0
 *                   status: true
 *                 - id: 2
 *                   ward_id: 2
 *                   room_number: "R102"
 *                   type: "General"
 *                   capacity: 4
 *                   occupiedBeds: 1
 *                   status: true
 */

/**
 * @swagger
 * /room/{id}:
 *   get:
 *     summary: Get a Room by ID
 *     tags: [rooms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Room ID
 *     responses:
 *       200:
 *         description: Room retrieved successfully
 *       404:
 *         description: Room not found
 */

/**
 * @swagger
 * /room/{id}:
 *   patch:
 *     summary: Update a Room
 *     tags: [rooms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Room ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             room_number: "R101"
 *             type: "Private"
 *             capacity: 1
 *             occupiedBeds: 0
 *             status: false
 *     responses:
 *       200:
 *         description: Room updated successfully
 *       404:
 *         description: Room not found
 */

/**
 * @swagger
 * /room/{id}:
 *   delete:
 *     summary: Delete a Room
 *     tags: [rooms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Room ID
 *     responses:
 *       204:
 *         description: Room deleted successfully
 *       404:
 *         description: Room not found
 */