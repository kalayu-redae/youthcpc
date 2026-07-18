const express = require("express");
const router = express.Router();

const departmentStaffController = require("./departmentstaff.controller");
const { authenticationJwt, requirePermission } = require("../../utils/authUtils");

router.use(authenticationJwt);

router.route("/")
.post(requirePermission("Department:create"),departmentStaffController.assignStaff)
.get(requirePermission("Department:view"),departmentStaffController.getDepartmentStaff);

router.route("/:id")
.delete(requirePermission("Department:delete"),departmentStaffController.removeStaff);

module.exports = router;




/**
 * @swagger
 * tags:
 *   name: departmentstaff
 *   description: Department Staff management APIs
 */

/**
 * @swagger
 * /departmentstaff:
 *   post:
 *     summary: Assign staff to a department
 *     tags: [departmentstaff]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             departmentId: 1
 *             staffId: 12
 *             role: "Doctor"
 *     responses:
 *       201:
 *         description: Staff assigned to department successfully
 *       400:
 *         description: Invalid request data
 */

/**
 * @swagger
 * /departmentstaff:
 *   get:
 *     summary: Get all staff assigned to departments
 *     tags: [departmentstaff]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of department staff
 *         content:
 *           application/json:
 *             example:
 *               status: 1
 *               totalStaff: 2
 *               data:
 *                 - id: 1
 *                   departmentId: 1
 *                   staffId: 12
 *                   role: "Doctor"
 *                 - id: 2
 *                   departmentId: 2
 *                   staffId: 18
 *                   role: "Nurse"
 */

/**
 * @swagger
 * /departmentstaff/{id}:
 *   delete:
 *     summary: Remove staff from a department
 *     tags: [departmentstaff]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Department Staff assignment ID
 *     responses:
 *       204:
 *         description: Staff removed from department successfully
 *       404:
 *         description: Staff assignment not found
 */