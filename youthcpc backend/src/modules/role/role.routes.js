const express = require('express');
const router = express.Router();

const roleController = require('../role/role.controller');
const { authenticationJwt, requirePermission } = require('../../utils/authUtils');

router.use(authenticationJwt);

router
  .route('/')
  .get(requirePermission('role:view'), roleController.getRoles)
  .post(requirePermission('role:create'), roleController.createRole)
  // .delete(requirePermission('role:delete'), roleController.deleteRoles);

router
  .route('/:roleId')
  .get(requirePermission('role:view'), roleController.getRole)
  .patch(requirePermission('role:update'), roleController.updateRole)
  .delete(requirePermission('role:delete'), roleController.deleteRole);

router.get( '/:roleId/users', requirePermission('role:view'), roleController.getUsersByRole);
router.get( '/:roleId/branches', requirePermission('role:view'), roleController.getbranchesByRole);

router.post('/:roleId/change-users',requirePermission('role:update'),  roleController.changeUsersToRole);

router.get('/summary/dashboard', requirePermission('role:view'), roleController.getRoleSummary);

module.exports = router;



/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: Role management APIs
 */

/**createROle
 * @swagger
 * /role:
 *   post:
 *     summary: Create new role
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             branchId: 1
 *             name: "Sales Manager"
 *             code: "SALES_MANAGER"
 *             description: "Manages sales operations"
 *     responses:
 *       201:
 *         description: Role created successfully
 */

/**getALlRoles
 * @swagger
 * /role:
 *   get:
 *     summary: Get all roles
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: branchId
 *         schema:
 *           type: integer
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
 *         description: List of roles
 */

/**getRoleByID
 /**
 * @swagger
 * /role/{roleId}:
 *   get:
 *     summary: Get a single role by ID
 *     description: Returns role details including assigned permissions and Branch information.
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: roleId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the role
 *     responses:
 *       200:
 *         description: Role fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               status: 1
 *               data:
 *                 id: 3
 *                 businessId: 1
 *                 branchId: 2
 *                 name: "Sales Manager"
 *                 code: "SALES_MANAGER"
 *                 description: "Manages all sales activities"
 *                 isActive: true
 *                 createdAt: "2026-03-01T08:30:00.000Z"
 *                 updatedAt: "2026-03-01T08:30:00.000Z"
 *                 Branch:
 *                   id: 2
 *                   name: "Main Branch"
 *                   location: "Addis Ababa"
 *                 permissions:
 *                   - id: 1
 *                     name: "Create Sale"
 *                     code: "sale:create"
 *                   - id: 2
 *                     name: "View Products"
 *                     code: "product:view"
 *       400:
 *         description: Invalid role ID
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Role not found
 */

 /**updateBYId
  * 
 * @swagger
 * /role/{roleId}:
 *   patch:
 *     summary: Update a role
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
 *           example:
 *             name: "Updated Sales Manager"
 *             description: "Updated role description"
 *             isActive: true
 *     responses:
 *       200:
 *         description: Role updated successfully
 *       404:
 *         description: Role not found
 */
/**changeUserRole
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
 *           example:
 *             userIds: [2, 3, 4]
 *     responses:
 *       200:
 *         description: Users assigned successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Role not found
 */

/**
 * @swagger
 * /role/summary/dashboard:
 *   get:
 *     summary: Get role summary dashboard
 *     description: Returns all roles with total users, permissions, and associated Branch.
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Role summary fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               status: 1
 *               totalRoles: 3
 *               data:
 *                 - roleId: 1
 *                   roleName: "Admin"
 *                   roleCode: "ADMIN"
 *                   isActive: true
 *                   totalUsers: 4
 *                   totalPermissions: 12
 *                   branchId: 2
 *                   BranchName: "Main Branch"
 *                 - roleId: 2
 *                   roleName: "Manager"
 *                   roleCode: "MANAGER"
 *                   isActive: true
 *                   totalUsers: 2
 *                   totalPermissions: 8
 *                   branchId: 3
 *                   BranchName: "Secondary Branch"
 *                 - roleId: 3
 *                   roleName: "Employee"
 *                   roleCode: "EMP"
 *                   isActive: false
 *                   totalUsers: 10
 *                   totalPermissions: 5
 *                   branchId: 2
 *                   BranchName: "Main Branch"
 */

/**delete
 * @swagger
 * /role/roleId:
 *   delete:
 *     summary: delete Role 
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: role deleted
 */

/**roleBybranches
 * @swagger
 * /role/{roleId}/branches:
 *   get:
 *     summary: Get Branch assigned to a role
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: roleId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Role ID
 *     responses:
 *       200:
 *         description: Branch fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               status: 1
 *               role: "SALES_MANAGER"
 *               Branch:
 *                 id: 2
 *                 name: "Main Branch"
 *                 location: "Addis Ababa"
 *       404:
 *         description: Role not found
 */