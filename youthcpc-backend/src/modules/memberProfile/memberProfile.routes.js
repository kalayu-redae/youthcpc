// const express = require("express")
// const app = express();
// const router = express.Router()

// const membercontroller = require("./member.controller")

// const { authenticationJwt, requirePermission, requirePermissionOrSelf } = require('../../utils/authUtils');

// router.use(function (req, res, next) {
//   res.header(
//     'Access-Control-Allow-Headers',
//     'x-access-token, Origin, Content-Type, Accept'
//   );
//   next();
// });

// // Protect all routes after this middleware

// router.use(authenticationJwt);

// router.route('/')
//   .get(requirePermission('members:view'), membercontroller.getAllUsers)
//   .delete(requirePermission('members:delete'), membercontroller.deleteUsers)

// router.route('/:userId')
//   .get(requirePermissionOrSelf('members:view'), membercontroller.getUser)
//   .patch(membercontroller.uploaduserAttachements, requirePermissionOrSelf('members:update'), membercontroller.updateUser)
//   .delete(requirePermission('members:delete'), membercontroller.deleteUser);

// router.patch('/:userId/resetPassword', requirePermission('members:resetPassword'), membercontroller.resetPassword);
// router.patch("/:userId/status", requirePermission('members:update'), membercontroller.updateUserStatus);
// router.route('/sendEmails').post(requirePermission('members:sendEmail'), membercontroller.sendEmailMessages)

// router.route('/import').post(membercontroller.uploaduserFile, requirePermission('members:import'), membercontroller.importUsers)
// router.route('/export/to-excel-pdf').get(requirePermission('members:export'), membercontroller.exportUsers)
// router.route('/report/dashboard').get(requirePermission('report:view'), membercontroller.getUserDashboardSummary)

// module.exports = router


// /**
//  * @swagger
//  * tags:
//  *   name: Members
//  *   description: User management routes
//  */

// /**
//  * @swagger
//  * /members:
//  *   get:
//  *     summary: Get all users
//  *     tags: [Users]
//  *     security:
//  *       - bearerAuth: []
//  *     responses:
//  *       200:
//  *         description: List of users
//  *       403:
//  *         description: Forbidden
//  */

// /**
//  * @swagger
//  * /members/{userId}:
//  *   get:
//  *     summary: Get members by ID
//  *     tags: [Users]
//  *     parameters:
//  *       - name: userId
//  *         in: path
//  *         required: true
//  *         schema:
//  *           type: integer
//  *     security:
//  *       - bearerAuth: []
//  *     responses:
//  *       200:
//  *         description: User details
//  *       404:
//  *         description: User not found
//  *   patch:
//  *     summary: Update members by ID
//  *     tags: [Users]
//  *     parameters:
//  *       - name: userId
//  *         in: path
//  *         required: true
//  *         schema:
//  *           type: integer
//  *     requestBody:
//  *       content:
//  *         multipart/form-data:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               profileImage:
//  *                 type: string
//  *                 format: binary
//  *     security:
//  *       - bearerAuth: []
//  *     responses:
//  *       200:
//  *         description: User updated
//  *   delete:
//  *     summary: Delete members by ID
//  *     tags: [Users]
//  *     parameters:
//  *       - name: userId
//  *         in: path
//  *         required: true
//  *         schema:
//  *           type: integer
//  *     security:
//  *       - bearerAuth: []
//  *     responses:
//  *       200:
//  *         description: User deleted
//  */

// /**
//  * @swagger
//  * /members/{userId}/resetPassword:
//  *   patch:
//  *     summary: Reset a members's password
//  *     tags: [Users]
//  *     parameters:
//  *       - name: userId
//  *         in: path
//  *         required: true
//  *         schema:
//  *           type: integer
//  *     security:
//  *       - bearerAuth: []
//  *     responses:
//  *       200:
//  *         description: Password reset
//  */

// /**
//  * @swagger
//  * /members/{userId}/status:
//  *   patch:
//  *     summary: Update a members's status (active/inactive)
//  *     tags: [Users]
//  *     parameters:
//  *       - name: userId
//  *         in: path
//  *         required: true
//  *         schema:
//  *           type: integer
//  *       - name: isActive
//  *         in: query
//  *         required: true
//  *         schema:
//  *           type: boolean
//  *     security:
//  *       - bearerAuth: []
//  *     responses:
//  *       200:
//  *         description: Status updated
//  */


// /**
//  * @swagger
//  * /members/import:
//  *   post:
//  *     summary: Import users from Excel file
//  *     tags: [Users]
//  *     security:
//  *       - bearerAuth: []
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         multipart/form-data:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               file:
//  *                 type: string
//  *                 format: binary
//  *     responses:
//  *       200:
//  *         description: Users imported
//  */

// /**
//  * @swagger
//  * /members/export/to-excel-pdf:
//  *   get:
//  *     summary: Export users in Excel or PDF format
//  *     tags: [Users]
//  *     parameters:
//  *       - name: format
//  *         in: query
//  *         schema:
//  *           type: string
//  *           enum: [excel, pdf]
//  *     security:
//  *       - bearerAuth: []
//  *     responses:
//  *       200:
//  *         description: File generated
//  *         content:
//  *           application/octet-stream:
//  *             schema:
//  *               type: string
//  *               format: binary
//  */

// /**
//  * @swagger
//  * /members/report/dashboard:
//  *   get:
//  *     summary: Get dashboard summary for users
//  *     tags: [Users]
//  *     security:
//  *       - bearerAuth: []
//  *     responses:
//  *       200:
//  *         description: Dashboard data
//  */

