'use strict';

const router = require('express').Router();
const memberController = require('./memberProfile.controller');
const { authenticationJwt } = require('../../utils/authUtils');

// router.use(authenticationJwt);

// Create member profile
router.post('/', memberController.createMemberProfile);

// Get all members with filters
router.get('/', memberController.getMembers);

// Get member summary
router.get('/summary', memberController.getMemberSummary);

// Get single member
router.get('/:memberId', memberController.getMemberProfile);

// Update member profile
router.patch('/:memberId', memberController.updateMemberProfile);

// Activate/deactivate member
router.patch('/status/:memberId', memberController.updateMemberStatus);

// Delete member
router.delete('/:memberId', memberController.deleteMemberProfile);

module.exports = router;


/**
 * @swagger
 * tags:
 *   name: MemberProfiles
 *   description: Member profile management APIs
 */


/**
 * @swagger
 * /memberProfile:
 *   post:
 *     summary: Create member profile
 *     tags: [MemberProfiles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             userId: 1
 *             membershipNumber: CPCT-000001
 *             gender: MALE
 *             dateOfBirth: 1998-01-01
 *             maritalStatus: SINGLE
 *             regionId: 1
 *             zoneId: 1
 *             woredaId: 1
 *             tabiyaId: 1
 *             educationLevelId: 1
 *             professionId: 1
 *             employmentStatus: EMPLOYED
 *             monthlyIncome: 5000
 *     responses:
 *       201:
 *         description: Member profile created successfully
 */


/**
 * @swagger
 * /memberProfile:
 *   get:
 *     summary: Get all member profiles
 *     tags: [MemberProfiles]
 *     parameters:
 *       - in: query
 *         name: regionId
 *         schema:
 *           type: integer
 *         description: Filter by region
 *       - in: query
 *         name: zoneId
 *         schema:
 *           type: integer
 *         description: Filter by zone
 *       - in: query
 *         name: woredaId
 *         schema:
 *           type: integer
 *         description: Filter by woreda
 *       - in: query
 *         name: tabiyaId
 *         schema:
 *           type: integer
 *         description: Filter by tabiya
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search member
 *     responses:
 *       200:
 *         description: Members fetched successfully
 */


/**
 * @swagger
 * /memberProfile/{memberId}:
 *   get:
 *     summary: Get member profile by ID
 *     tags: [MemberProfiles]
 *     parameters:
 *       - in: path
 *         name: memberId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Member fetched successfully
 */


/**
 * @swagger
 * /memberProfile/{memberId}:
 *   patch:
 *     summary: Update member profile
 *     tags: [MemberProfiles]
 *     parameters:
 *       - in: path
 *         name: memberId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             professionId: 2
 *             employmentStatus: SELF_EMPLOYED
 *             monthlyIncome: 8000
 *             bio: Updated profile
 *     responses:
 *       200:
 *         description: Member updated successfully
 */


/**
 * @swagger
 * /memberProfile/status/{memberId}:
 *   patch:
 *     summary: Activate or deactivate member
 *     tags: [MemberProfiles]
 *     parameters:
 *       - in: path
 *         name: memberId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Member status updated successfully
 */


/**
 * @swagger
 * /memberProfile/{memberId}:
 *   delete:
 *     summary: Delete member profile
 *     tags: [MemberProfiles]
 *     parameters:
 *       - in: path
 *         name: memberId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Member deleted successfully
 */


/**
 * @swagger
 * /memberProfile/summary:
 *   get:
 *     summary: Get member summary statistics
 *     tags: [MemberProfiles]
 *     responses:
 *       200:
 *         description: Member statistics fetched successfully
 */