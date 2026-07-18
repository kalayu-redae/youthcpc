const express = require("express");
const app = express();
const router = express.Router();
const { authenticationJwt, requirePermission } = require("../../utils/authUtils");
const departmentController = require("./department.controller");

app.use(function (req, res, next) {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept'
  );
  next();
});


//Protect all routes after this middleware
router.use(authenticationJwt);


router.route("/")
.post(requirePermission("department:create"),departmentController.createDepartment)
.get(requirePermission("department:view"),departmentController.getAllDepartments);


router.route("/:id")
.get(requirePermission("department:view"),departmentController.getDepartmentById)
.patch(requirePermission("department:update"),departmentController.updateDepartment)
.delete(requirePermission("department:delete"),departmentController.deleteDepartment);
 console.log('you are in routes of departement')

module.exports=router;



/**
 * @swagger
 * tags:
 *   name: department
 *   description: department management APIs
 */

/**
 * @swagger
 * /department:
 *   post:
 *     summary: Create a new department
 *     tags: [department]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: "Cardiology"
 *             code: "CARD"
 *             description: "Handles heart related treatments"
 *             isActive: true
 *     responses:
 *       201:
 *         description: department created successfully
 */

/**
 * @swagger
 * /department:
 *   get:
 *     summary: Get all department
 *     tags: [department]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all department
 *         content:
 *           application/json:
 *             example:
 *               status: 1
 *               totaldepartment: 2
 *               data:
 *                 - id: 1
 *                   name: "Cardiology"
 *                   code: "CARD"
 *                   description: "Heart treatment department"
 *                   isActive: true
 *                 - id: 2
 *                   name: "Neurology"
 *                   code: "NEUR"
 *                   description: "Brain and nervous system department"
 *                   isActive: true
 */

/**
 * @swagger
 * /department/{id}:
 *   get:
 *     summary: Get a department by ID
 *     tags: [department]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: department ID
 *     responses:
 *       200:
 *         description: department retrieved successfully
 *       404:
 *         description: department not found
 */

/**
 * @swagger
 * /department/{id}:
 *   patch:
 *     summary: Update a department
 *     tags: [department]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: department ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: "Updated department"
 *             code: "UPD_DEP"
 *             description: "Updated department description"
 *             isActive: false
 *     responses:
 *       200:
 *         description: department updated successfully
 *       404:
 *         description: department not found
 */

/**
 * @swagger
 * /department/{id}:
 *   delete:
 *     summary: Delete a department
 *     tags: [department]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: department ID
 *     responses:
 *       204:
 *         description: department deleted successfully
 *       404:
 *         description: department not found
 */