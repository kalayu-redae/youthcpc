'use strict';

const router = require('express').Router();
const zoneController = require('./zone.controller');
const { authenticationJwt } = require('../../utils/authUtils');

// router.use(authenticationJwt);

router.post('/', zoneController.createZone);
router.get('/', zoneController.getZones);
router.get('/summary', zoneController.getZoneSummary);
router.get('/:zoneId', zoneController.getZone);
router.patch('/:zoneId', zoneController.updateZone);
router.patch('/:zoneId/status', zoneController.updateZoneStatus);
router.delete('/:zoneId', zoneController.deleteZone);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Zones
 *   description: Zone management APIs
 */

/**
 * @swagger
 * /zone:
 *   post:
 *     summary: Create a new zone
 *     tags: [Zones]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             regionId: 1
 *             name: Southern Zone
 *             code: SZT
 *     responses:
 *       201:
 *         description: Zone created successfully
 */

/**
 * @swagger
 * /zone:
 *   get:
 *     summary: Get all zone
 *     tags: [Zones]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         example: 20
 *       - in: query
 *         name: regionId
 *         schema:
 *           type: integer
 *         example: 1
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         example: Southern
 *       - in: query
 *         name: isActive
 *         schema:
 *           type: boolean
 *         example: true
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         example: name
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *         example: ASC
 *     responses:
 *       200:
 *         description: Zones fetched successfully
 */

/**
 * @swagger
 * /zone/summary:
 *   get:
 *     summary: Get zone dashboard summary
 *     tags: [Zones]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Zone summary fetched successfully
 */

/**
 * @swagger
 * /zone/{zoneId}:
 *   get:
 *     summary: Get zone by ID
 *     tags: [Zones]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: zoneId
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Zone fetched successfully
 */

/**
 * @swagger
 * /zone/{zoneId}:
 *   patch:
 *     summary: Update zone
 *     tags: [Zones]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: zoneId
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             regionId: 1
 *             name: Southern Zone
 *             code: SZT
 *     responses:
 *       200:
 *         description: Zone updated successfully
 */

/**
 * @swagger
 * /zone/{zoneId}/status:
 *   patch:
 *     summary: Activate or deactivate a zone
 *     tags: [Zones]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: zoneId
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Zone status updated successfully
 */

/**
 * @swagger
 * /zone/{zoneId}:
 *   delete:
 *     summary: Delete a zone
 *     tags: [Zones]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: zoneId
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Zone deleted successfully
 */