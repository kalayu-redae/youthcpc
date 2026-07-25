'use strict';

const router = require('express').Router();
const skillController = require('./skill.controller');
const { authenticationJwt } = require('../../utils/authUtils');

// router.use(authenticationJwt);

router.post('/', skillController.createSkill);
router.get('/', skillController.getSkills);
router.get('/summary', skillController.getSkillSummary);
router.get('/:skillId', skillController.getSkill);
router.patch('/:skillId', skillController.updateSkill);
router.patch('/status/:skillId', skillController.updateSkillStatus);
router.delete('/:skillId', skillController.deleteSkill);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Skills
 *   description: Skill management APIs
 */

/**
 * @swagger
 * /skill:
 *   post:
 *     summary: Create a new skill
 *     tags: [Skills]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: Web Development
 *             category: Information Technology
 *             description: Full stack web development
 *     responses:
 *       201:
 *         description: Skill created successfully
 */

/**
 * @swagger
 * /skill:
 *   get:
 *     summary: Get all skills
 *     tags: [Skills]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by skill name
 *       - in: query
 *         name: isActive
 *         schema:
 *           type: boolean
 *         description: Filter by active status
 *     responses:
 *       200:
 *         description: Skills fetched successfully
 */

/**
 * @swagger
 * /skill/summary:
 *   get:
 *     summary: Get skill summary
 *     tags: [Skills]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Skill summary fetched successfully
 */

/**
 * @swagger
 * /skill/{skillId}:
 *   get:
 *     summary: Get skill by ID
 *     tags: [Skills]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: skillId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Skill fetched successfully
 *       404:
 *         description: Skill not found
 */

/**
 * @swagger
 * /skill/{skillId}:
 *   patch:
 *     summary: Update skill
 *     tags: [Skills]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: skillId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: Mobile Development
 *             category: Software Development
 *             description: Flutter and React Native
 *     responses:
 *       200:
 *         description: Skill updated successfully
 *       404:
 *         description: Skill not found
 */

/**
 * @swagger
 * /skill/status/{skillId}:
 *   patch:
 *     summary: Activate or deactivate skill
 *     tags: [Skills]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: skillId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Skill status updated successfully
 *       404:
 *         description: Skill not found
 */

/**
 * @swagger
 * /skill/{skillId}:
 *   delete:
 *     summary: Delete skill
 *     tags: [Skills]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: skillId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Skill deleted successfully
 *       404:
 *         description: Skill not found
 */