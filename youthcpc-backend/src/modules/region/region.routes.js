'use strict';

const router = require('express').Router();
const regionController = require('./region.controller');
const { authenticationJwt } = require('../../utils/authUtils');

// router.use(authenticationJwt);

router.post('/', regionController.createRegion);
router.get('/', regionController.getRegions);
router.get('/summary', regionController.getRegionSummary);
router.get('/:regionId', regionController.getRegion);
router.patch('/:regionId', regionController.updateRegion);
router.patch('/:regionId/status', regionController.updateRegionStatus);
router.delete('/:regionId', regionController.deleteRegion);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Regions
 *   description: Region management APIs
 */

/**
 * @swagger
 * /region:
 *   post:
 *     summary: Create a new region
 *     tags: [Regions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: Tigray
 *             code: TIG
 *     responses:
 *       201:
 *         description: Region created successfully
 */

/**
 * @swagger
 * /region:
 *   get:
 *     summary: Get all regions
 *     tags: [Regions]
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
 *         name: search
 *         schema:
 *           type: string
 *         example: Tig
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
 *         description: Regions fetched successfully
 */

/**
 * @swagger
 * /region/summary:
 *   get:
 *     summary: Get region dashboard summary
 *     tags: [Regions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Region summary fetched successfully
 */

/**
 * @swagger
 * /region/{regionId}:
 *   get:
 *     summary: Get region by ID
 *     tags: [Regions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: regionId
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Region fetched successfully
 */

/**
 * @swagger
 * /region/{regionId}:
 *   patch:
 *     summary: Update region
 *     tags: [Regions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: regionId
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: Oromia
 *             code: ORM
 *     responses:
 *       200:
 *         description: Region updated successfully
 */

/**
 * @swagger
 * /region/{regionId}/status:
 *   patch:
 *     summary: Activate or deactivate a region
 *     tags: [Regions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: regionId
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Region status updated successfully
 */

/**
 * @swagger
 * /region/{regionId}:
 *   delete:
 *     summary: Delete a region
 *     tags: [Regions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: regionId
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Region deleted successfully
 */