'use strict';

const router = require('express').Router();

const professionController = require('./profession.controller');
const { authenticationJwt } = require('../../utils/authUtils');

// router.use(authenticationJwt);

router.post('/', professionController.createProfession);
router.get('/', professionController.getProfessions);
router.get('/:professionId', professionController.getProfession);
router.patch('/:professionId', professionController.updateProfession);
router.patch('/:professionId/status', professionController.updateProfessionStatus);
router.delete('/:professionId', professionController.deleteProfession);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Professions
 *   description: Profession management APIs
 */

/**
 * @swagger
 * /profession:
 *   post:
 *     summary: Create profession
 *     tags: [Professions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: Software Engineer
 *             code: PRO001
 *             description: Software development profession
 *     responses:
 *       201:
 *         description: Profession created successfully
 */

/**
 * @swagger
 * /profession:
 *   get:
 *     summary: Get all profession
 *     tags: [Professions]
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
 *         description: List of profession
 */

/**
 * @swagger
 * /profession/{professionId}:
 *   get:
 *     summary: Get profession by ID
 *     tags: [Professions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: professionId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Profession details
 */

/**
 * @swagger
 * /profession/{professionId}:
 *   patch:
 *     summary: Update profession
 *     tags: [Professions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: professionId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: Civil Engineer
 *             code: PRO002
 *             description: Civil engineering profession
 *     responses:
 *       200:
 *         description: Profession updated successfully
 */

/**
 * @swagger
 * /profession/{professionId}/status:
 *   patch:
 *     summary: Activate or deactivate profession
 *     tags: [Professions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: professionId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Profession status updated successfully
 */

/**
 * @swagger
 * /profession/{professionId}:
 *   delete:
 *     summary: Delete profession
 *     tags: [Professions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: professionId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Profession deleted successfully
 */