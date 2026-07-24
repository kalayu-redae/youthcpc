'use strict';

const router = require('express').Router();
const contactController = require('./contactMessage.controller');
const { authenticationJwt } = require('../../utils/authUtils');


// Public contact form
router.post('/', contactController.createContactMessage);


// Admin routes
// router.use(authenticationJwt);


router.get('/', contactController.getContactMessages);

router.get('/summary', contactController.getContactSummary);

router.get('/:messageId', contactController.getContactMessage);

router.patch('/reply/:messageId', contactController.replyContactMessage);

router.patch('/status/:messageId', contactController.updateContactStatus);

router.delete('/:messageId', contactController.deleteContactMessage);



module.exports = router;



/**
 * @swagger
 * tags:
 *   name: ContactMessages
 *   description: Contact message management APIs
 */


/**
 * @swagger
 * /contactMessage:
 *   post:
 *     summary: Send contact message
 *     tags: [ContactMessages]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             fullName: Kalayu Redae
 *             email: kalayu@gmail.com
 *             phone: 0911111111
 *             subject: Membership Information
 *             message: I want to know more about joining CPCT Youth
 *     responses:
 *       201:
 *         description: Contact message sent successfully
 */


/**
 * @swagger
 * /contactMessage:
 *   get:
 *     summary: Get all contact messages
 *     tags: [ContactMessages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by name, email or subject
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum:
 *             - NEW
 *             - READ
 *             - REPLIED
 *             - CLOSED
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
 *         description: Contact messages fetched successfully
 */


/**
 * @swagger
 * /contactMessage/{messageId}:
 *   get:
 *     summary: Get contact message by ID
 *     tags: [ContactMessages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: messageId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Contact message fetched successfully
 */


/**
 * @swagger
 * /contactMessage/reply/{messageId}:
 *   patch:
 *     summary: Reply to contact message
 *     tags: [ContactMessages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: messageId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             reply: Thank you for contacting CPCT Youth. We will respond soon.
 *     responses:
 *       200:
 *         description: Reply saved successfully
 */


/**
 * @swagger
 * /contactMessage/status/{messageId}:
 *   patch:
 *     summary: Update contact message status
 *     tags: [ContactMessages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: messageId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             status: CLOSED
 *     responses:
 *       200:
 *         description: Contact status updated successfully
 */


/**
 * @swagger
 * /contactMessage/{messageId}:
 *   delete:
 *     summary: Delete contact message
 *     tags: [ContactMessages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: messageId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Contact message deleted successfully
 */


/**
 * @swagger
 * /contactMessage/summary:
 *   get:
 *     summary: Get contact message summary
 *     tags: [ContactMessages]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Contact message statistics fetched successfully
 */