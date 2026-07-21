'use strict';

const router = require('express').Router();
const roleController = require('./role.controller');

const { authenticationJwt } = require('../../utils/authUtils');

// router.use(authenticationJwt);

router
  .route('/')
  .get(roleController.getRoles)
  .post(roleController.createRole);

router.get('/summary/dashboard', roleController.getRoleSummary);

router
  .route('/:roleId')
  .get(roleController.getRole)
  .patch(roleController.updateRole)
  .delete(roleController.deleteRole);

router.get('/:roleId/users', roleController.getUsersByRole);

router.post('/:roleId/change-users', roleController.changeUsersToRole);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: Role Management APIs
 */

/**
 * @swagger
 * /role:
 *   get:
 *     summary: Get all roles
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by role name or code
 *       - in: query
 *         name: isActive
 *         schema:
 *           type: boolean
 *         description: Filter by active status
 *     responses:
 *       200:
 *         description: Roles retrieved successfully
 *
 *   post:
 *     summary: Create a new role
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - code
 *             properties:
 *               name:
 *                 type: string
 *                 example: Coordinator
 *               code:
 *                 type: string
 *                 example: COORDINATOR
 *               description:
 *                 type: string
 *                 example: Youth Coordinator Role
 *     responses:
 *       201:
 *         description: Role created successfully
 *       409:
 *         description: Role already exists
 */

/**
 * @swagger
 * /role/summary/dashboard:
 *   get:
 *     summary: Get role dashboard summary
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard summary retrieved successfully
 */

/**
 * @swagger
 * /role/{roleId}:
 *   get:
 *     summary: Get role by ID
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: roleId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Role retrieved successfully
 *       404:
 *         description: Role not found
 *
 *   patch:
 *     summary: Update role
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: roleId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               isActive:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Role updated successfully
 *       404:
 *         description: Role not found
 *
 *   delete:
 *     summary: Deactivate role
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: roleId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Role deactivated successfully
 *       403:
 *         description: System role cannot be deleted
 *       404:
 *         description: Role not found
 */

/**
 * @swagger
 * /role/{roleId}/users:
 *   get:
 *     summary: Get users assigned to a role
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: roleId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Users retrieved successfully
 *       404:
 *         description: Role not found
 */

/**
 * @swagger
 * /role/{roleId}/change-users:
 *   post:
 *     summary: Assign users to a role
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: roleId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userIds
 *             properties:
 *               userIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [1,2,3]
 *     responses:
 *       200:
 *         description: Users assigned successfully
 *       404:
 *         description: Role not found
 */