'use strict';

const router = require('express').Router();

const userController = require('./user.controller');
const { authenticationJwt } = require('../../utils/authUtils');


// router.use(authenticationJwt);

router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);
router.get('/:userId', userController.getUser);
router.patch('/:userId', userController.updateUser);
router.patch('/:userId/status', userController.updateUserStatus);

router.patch('/:userId/resetPassword', userController.resetPassword);

router.delete('/:userId', userController.deleteUser);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User account management
 */


/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get all user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: search
 *         in: query
 *       - name: roleId
 *         in: query
 *       - name: isActive
 *         in: query
 *     responses:
 *       200:
 *         description: Users fetched successfully
 */


/**
 * @swagger
 * /user:
 *   post:
 *     summary: Create user account
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             fullName: Kalayu Redae
 *             phoneNumber: "0943662611"
 *             email: kalayu@example.com
 *             password: Password@123
 *             roleId: 4
 *     responses:
 *       201:
 *         description: User created successfully
 */


/**
 * @swagger
 * /user/{userId}:
 *   get:
 *     summary: Get single user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User fetched successfully
 */


/**
 * @swagger
 * /user/{userId}:
 *   patch:
 *     summary: Update user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 */


/**
 * @swagger
 * /user/{userId}/status:
 *   patch:
 *     summary: Activate or deactivate user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 */


/**
 * @swagger
 * /user/{userId}/resetPassword:
 *   patch:
 *     summary: Reset user password
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 */


/**
 * @swagger
 * /user/{userId}:
 *   delete:
 *     summary: Delete user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 */