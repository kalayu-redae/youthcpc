const express=require("express")
const app = express();
const router=express.Router();
const { authenticationJwt, requirePermission } = require('../../utils/authUtils');
const branchController=require("./branch.controller")

app.use(function (req, res, next) {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept'
  );
  next();
});


//Protect all routes after this middleware
router.use(authenticationJwt);

router.route('/')
      .post(requirePermission("Branch:create"),branchController.createBranch)
      .get(requirePermission("Branch:view"),branchController.getAllbranches)
    //   .delete(requirePermission("Branch:create"),branchController.deleteAllbranches)


// Summary report route first
router.route('/summary/report')
  .get(requirePermission("Branch:view"), branchController.getbranchesummaryReport);

// Toggle status route
router.route('/:branchId/toggle-status')
  .patch(requirePermission("Branch:update"), branchController.togglebranchestatus);

// Dynamic branchId route last
router.route('/:branchId')
  .get(requirePermission("Branch:view"), branchController.getBranchById)
  .patch(requirePermission("Branch:update"), branchController.updateBranch)
  .delete(requirePermission("Branch:delete"), branchController.deleteBranchById);


module.exports=router

/**
 * @swagger
 * tags:
 *   name: branches
 *   description: Branch management APIs
 */

/**
 * @swagger
 * /branch:
 *   post:
 *     summary: Create a new Branch
 *     tags: [branches]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: "Main Branch"
 *             code: "MAIN_WH"
 *             location: "Addis Ababa"
 *             managerName: "John Doe"
 *             phone: "+251911000000"
 *             email: "main@Branch.com"
 *             isActive: true
 *     responses:
 *       201:
 *         description: Branch created successfully
 */

/**
 * @swagger
 * /branch:
 *   get:
 *     summary: Get all branches with optional search, pagination, and sorting
 *     tags: [branches]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: isActive
 *         schema:
 *           type: boolean
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [createdAt, updatedAt, name, code]
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [ASC, DESC]
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of branches with pagination
 */

/**
 * @swagger
 * /branch/{branchId}:
 *   get:
 *     summary: Get a Branch by ID
 *     tags: [branches]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: branchId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Branch ID
 *     responses:
 *       200:
 *         description: Branch retrieved successfully
 *       404:
 *         description: Branch not found
 */

/**
 * @swagger
 * /branch/{branchId}:
 *   patch:
 *     summary: Update a Branch
 *     tags: [branches]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: branchId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: "Updated Branch Name"
 *             location: "New Location"
 *             managerName: "Jane Doe"
 *             phone: "+251922000000"
 *             email: "updated@Branch.com"
 *             isActive: false
 *     responses:
 *       200:
 *         description: Branch updated successfully
 *       404:
 *         description: Branch not found
 */

/**
 * @swagger
 * /branch/{branchId}:
 *   delete:
 *     summary: Delete a Branch
 *     tags: [branches]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: branchId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Branch deleted successfully
 *       400:
 *         description: Cannot delete Branch with existing stock
 *       404:
 *         description: Branch not found
 */

/**
 * @swagger
 * /branch/{branchId}/toggle-status:
 *   patch:
 *     summary: Activate or deactivate a Branch
 *     tags: [branches]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: branchId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Branch status toggled successfully
 *       404:
 *         description: Branch not found
 */

/**
 * @swagger
 * /branch/summary/report:
 *   get:
 *     summary: Get summary report of all branches
 *     description: Returns total users, roles, stock items, and transactions for each Branch
 *     tags: [branches]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Branch summary report
 *         content:
 *           application/json:
 *             example:
 *               status: 1
 *               totalbranches: 3
 *               data:
 *                 - branchId: 1
 *                   name: "Main Branch"
 *                   code: "MAIN_WH"
 *                   location: "Addis Ababa"
 *                   managerName: "John Doe"
 *                   phone: "+251911000000"
 *                   email: "main@Branch.com"
 *                   totalUsers: 5
 *                   totalRoles: 3
 *                   totalStockItems: 120
 *                   totalTransactions: 350
 *                   isActive: true
 *                 - branchId: 2
 *                   name: "Secondary Branch"
 *                   code: "SEC_WH"
 *                   location: "Bahir Dar"
 *                   managerName: "Jane Doe"
 *                   phone: "+251922000000"
 *                   email: "secondary@Branch.com"
 *                   totalUsers: 2
 *                   totalRoles: 1
 *                   totalStockItems: 60
 *                   totalTransactions: 120
 *                   isActive: false
 */