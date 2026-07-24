'use strict';

const router = require('express').Router();
const controller = require('./skill.controller');

router.post('/', controller.createSkill);
router.get('/', controller.getSkills);
router.get('/summary', controller.getSkillSummary);
router.get('/:skillId', controller.getSkill);
router.patch('/:skillId', controller.updateSkill);
router.patch('/status/:skillId', controller.updateSkillStatus);
router.delete('/:skillId', controller.deleteSkill);

module.exports = router; \

/**
 * @swagger
 * tags:
 *   name: Skills
 *   description: Skills management APIs
 */

/**
 * @swagger
 * /skill:
 *   post:
 *     summary: Create skill
 *     tags: [Skills]
 */

/**
 * @swagger
 * /skill:
 *   get:
 *     summary: Get all skills
 *     tags: [Skills]
 */

/**
 * @swagger
 * /skill/summary:
 *   get:
 *     summary: Get skills summary
 *     tags: [Skills]
 */

/**
 * @swagger
 * /skill/{skillId}:
 *   get:
 *     summary: Get skill by ID
 *     tags: [Skills]
 */

/**
 * @swagger
 * /skill/{skillId}:
 *   patch:
 *     summary: Update skill
 *     tags: [Skills]
 */

/**
 * @swagger
 * /skill/status/{skillId}:
 *   patch:
 *     summary: Activate or deactivate skill
 *     tags: [Skills]
 */

/**
 * @swagger
 * /skill/{skillId}:
 *   delete:
 *     summary: Delete skill
 *     tags: [Skills]
 */