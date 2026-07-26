'use strict';

const router = require('express').Router();
const authController = require('./auth.controller');
const { authenticationJwt } = require('../../utils/authUtils');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/forgot-password', authController.forgetPassword);
router.post('/verify-otp', authController.verifyOTP);
router.patch('/reset-password', authController.resetPassword);

router.use(authenticationJwt);

router.get('/me', authController.getMe);
router.patch('/me', authController.updateMe);
router.patch('/update-password', authController.updateMyPassword);

module.exports = router;


/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication APIs
 */


// /**
//  * @swagger
//  * /auth/signup:
//  *   post:
//  *     summary: Register new user
//  *     tags: [Auth]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           example:
//  *             fullName: "Kalayu Redae"
//  *             phoneNumber: "0943662611"
//  *             email: "kalayuredae2016@gmail.com"
//  *             password: "Member@123"
//  *             roleId: 4
//  *             address: "Mekelle"
//  *     responses:
//  *       201:
//  *         description: User registered successfully
//  */

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Register a new member
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             fullName: "Kalayu Redae"
 *             phoneNumber: "0943662611"
 *             email: "kalayuredae2016@gmail.com"
 *             password: "Member@123"
 *             roleId: 4
 *             membershipNumber: "CPCT-000001"
 *             gender: "MALE"
 *             dateOfBirth: "1998-01-01"
 *             maritalStatus: "SINGLE"
 *             nationality: "Ethiopian"
 *             regionId: 1
 *             zoneId: 2
 *             woredaId: 3
 *             tabiyaId: 5
 *             educationLevelId: 4
 *             professionId: 8
 *             occupation: "Software Developer"
 *             organization: "CPCT Youth Wing"
 *             employmentStatus: "EMPLOYED"
 *             monthlyIncome: 5000
 *             availabilityStatus: "AVAILABLE"
 *             availabilityNote: "Available on weekends"
 *             emergencyContactName: "Redae Gebreab"
 *             emergencyContactPhone: "0911223344"
 *             membershipDate: "2026-07-25"
 *             experience: "5 years of software development."
 *             certifications: "AWS Certified Cloud Practitioner"
 *             volunteerExperience: "Youth mentor and community volunteer."
 *             aspirations: "Become a technology leader."
 *             socialMedia:
 *               facebook: "https://facebook.com/kalayu"
 *               telegram: "@kalayu"
 *               linkedin: "https://linkedin.com/in/kalayu"
 *             bio: "Active youth member interested in technology and leadership."
 *   responses:
 *     201:
 *       description: Member registered successfully
 *     400:
 *       description: Validation error
 *     409:
 *       description: Phone number or membership number already exists
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             phoneNumber: "0943662611"
 *             password: "Member@123"
 *     responses:
 *       200:
 *         description: Login successful
 */


/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     summary: Send password reset OTP
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             email: "kalayu@example.com"
 *     responses:
 *       200:
 *         description: OTP sent successfully
 */


/**
 * @swagger
 * /auth/verify-otp:
 *   post:
 *     summary: Verify password reset OTP
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             email: "kalayu@example.com"
 *             passwordResetOTP: "1234"
 *     responses:
 *       200:
 *         description: OTP verified successfully
 */


/**
 * @swagger
 * /auth/reset-password:
 *   patch:
 *     summary: Reset password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             email: "kalayu@example.com"
 *             newPassword: "NewPassword@123"
 *     responses:
 *       200:
 *         description: Password reset successfully
 */


/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Get current user profile
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile fetched successfully
 */


/**
 * @swagger
 * /auth/me:
 *   patch:
 *     summary: Update current user profile
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             fullName: "Updated Name"
 *             email: "updated@example.com"
 *             address: "Addis Ababa"
 *     responses:
 *       200:
 *         description: Profile updated successfully
 */


/**
 * @swagger
 * /auth/update-password:
 *   patch:
 *     summary: Change current password
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             currentPassword: "OldPassword@123"
 *             newPassword: "NewPassword@123"
 *     responses:
 *       200:
 *         description: Password updated successfully
 */