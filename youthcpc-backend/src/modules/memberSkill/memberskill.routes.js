'use strict';

const router = require('express').Router();
const memberSkillController = require('./memberSkill.controller');
const { authenticationJwt } = require('../../utils/authUtils');

//router.use(authenticationJwt);

router.post('/', memberSkillController.assignSkill);
router.get('/', memberSkillController.getMemberSkills);
router.get('/summary', memberSkillController.getMemberSkillSummary);
router.get('/:memberSkillId', memberSkillController.getMemberSkill);
router.patch('/:memberSkillId', memberSkillController.updateMemberSkill);
router.patch('/status/:memberSkillId', memberSkillController.updateMemberSkillStatus);
router.delete('/:memberSkillId', memberSkillController.deleteMemberSkill);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: MemberSkills
 *   description: Member Skill management APIs
 */

/**
 * @swagger
 * /memberSkill:
 *   post:
 *     summary: Assign a skill to a member
 *     tags: [MemberSkills]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             memberProfileId: 1
 *             skillId: 2
 *             level: ADVANCED
 *             yearsOfExperience: 4
 *             remarks: Backend Developer
 *     responses:
 *       201:
 *         description: Skill assigned successfully
 */

/**
 * @swagger
 * /memberSkill:
 *   get:
 *     summary: Get member skills
 *     tags: [MemberSkills]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: memberProfileId
 *         schema:
 *           type: integer
 *       - in: query
 *         name: skillId
 *         schema:
 *           type: integer
 *       - in: query
 *         name: level
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Member skills fetched successfully
 */

/**
 * @swagger
 * /memberSkill/summary:
 *   get:
 *     summary: Get member skill summary
 *     tags: [MemberSkills]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Summary fetched successfully
 */

/**
 * @swagger
 * /memberSkill/{memberSkillId}:
 *   get:
 *     summary: Get member skill by ID
 *     tags: [MemberSkills]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: memberSkillId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Member skill fetched successfully
 */

/**
 * @swagger
 * /memberSkill/{memberSkillId}:
 *   patch:
 *     summary: Update member skill
 *     tags: [MemberSkills]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: memberSkillId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             level: EXPERT
 *             yearsOfExperience: 8
 *             remarks: Senior Trainer
 *     responses:
 *       200:
 *         description: Member skill updated successfully
 */

/**
 * @swagger
 * /memberSkill/status/{memberSkillId}:
 *   patch:
 *     summary: Activate or deactivate member skill
 *     tags: [MemberSkills]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: memberSkillId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Member skill status updated successfully
 */

/**
 * @swagger
 * /memberSkill/{memberSkillId}:
 *   delete:
 *     summary: Delete member skill
 *     tags: [MemberSkills]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: memberSkillId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Member skill deleted successfully
 */