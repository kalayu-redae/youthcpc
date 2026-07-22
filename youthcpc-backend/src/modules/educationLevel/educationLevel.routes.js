'use strict';

const router = require('express').Router();

const educationLevelController = require('./educationLevel.controller');
const { authenticationJwt } = require('../../utils/authUtils');

// router.use(authenticationJwt);

router.post('/', educationLevelController.createEducationLevel);
router.get('/', educationLevelController.getEducationLevels);
router.get('/:educationLevelId', educationLevelController.getEducationLevel);
router.patch('/:educationLevelId', educationLevelController.updateEducationLevel);
router.patch('/:educationLevelId/status', educationLevelController.updateEducationLevelStatus);
router.delete('/:educationLevelId', educationLevelController.deleteEducationLevel);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Education Levels
 *   description: Education Level management APIs
 */

/**
 * @swagger
 * /educationlevel:
 *   post:
 *     summary: Create education level
 *     tags: [Education Levels]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: Bachelor's Degree
 *             code: EDU007
 *             description: Undergraduate degree
 *             sortOrder: 7
 *     responses:
 *       201:
 *         description: Education level created successfully
 */

/**
 * @swagger
 * /educationlevel:
 *   get:
 *     summary: Get all education levels
 *     tags: [Education Levels]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *       - in: query
 *         name: isActive
 *         schema:
 *           type: boolean
 *     responses:
 *       200:
 *         description: List of education levels
 */

/**
 * @swagger
 * /educationlevel/{educationLevelId}:
 *   get:
 *     summary: Get education level by ID
 *     tags: [Education Levels]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: educationLevelId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Education level details
 */

/**
 * @swagger
 * /educationlevel/{educationLevelId}:
 *   patch:
 *     summary: Update education level
 *     tags: [Education Levels]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: educationLevelId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: Master's Degree
 *             sortOrder: 8
 *     responses:
 *       200:
 *         description: Education level updated successfully
 */

/**
 * @swagger
 * /educationlevel/{educationLevelId}/status:
 *   patch:
 *     summary: Activate or deactivate education level
 *     tags: [Education Levels]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: educationLevelId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Status updated successfully
 */

/**
 * @swagger
 * /educationlevel/{educationLevelId}:
 *   delete:
 *     summary: Delete education level
 *     tags: [Education Levels]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: educationLevelId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Education level deleted successfully
 */