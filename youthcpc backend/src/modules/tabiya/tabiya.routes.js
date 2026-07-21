'use strict';

const router = require('express').Router();

const tabiyaController = require('./tabiya.controller');

const { authenticationJwt } = require('../../utils/authUtils');


router.use(authenticationJwt);


router.post('/', tabiyaController.createTabiya);

router.get('/', tabiyaController.getAllTabiyas);

router.get('/:id', tabiyaController.getTabiya);

router.patch('/:id', tabiyaController.updateTabiya);

router.patch('/status/:id', tabiyaController.updateStatus);

router.delete('/:id', tabiyaController.deleteTabiya);


module.exports = router;


/**
 * @swagger
 * tags:
 *   name: Tabiyas
 *   description: Tabiya management APIs
 */


/**
 * @swagger
 * /tabiya:
 *   post:
 *     summary: Create a new tabiya
 *     tags: [Tabiyas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             woredaId: 1
 *             name: Waereb Deqali
 *             code: TBY001
 *     responses:
 *       201:
 *         description: Tabiya created successfully
 */


/**
 * @swagger
 * /tabiya:
 *   get:
 *     summary: Get all tabiya
 *     tags: [Tabiyas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: woredaId
 *         schema:
 *           type: integer
 *         description: Filter tabiya by woreda
 *
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search tabiya name
 *
 *       - in: query
 *         name: isActive
 *         schema:
 *           type: boolean
 *         description: Filter active or inactive tabiya
 *
 *     responses:
 *       200:
 *         description: Tabiyas fetched successfully
 */


/**
 * @swagger
 * /tabiya/{id}:
 *   get:
 *     summary: Get tabiya by ID
 *     tags: [Tabiyas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *
 *     responses:
 *       200:
 *         description: Tabiya fetched successfully
 */


/**
 * @swagger
 * /tabiya/{id}:
 *   patch:
 *     summary: Update tabiya
 *     tags: [Tabiyas]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             woredaId: 2
 *             name: Updated Tabiya Name
 *             code: TBY002
 *
 *     responses:
 *       200:
 *         description: Tabiya updated successfully
 */


/**
 * @swagger
 * /tabiya/status/{id}:
 *   patch:
 *     summary: Activate or deactivate tabiya
 *     tags: [Tabiyas]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *
 *     responses:
 *       200:
 *         description: Tabiya status updated successfully
 */


/**
 * @swagger
 * /tabiya/{id}:
 *   delete:
 *     summary: Delete tabiya
 *     tags: [Tabiyas]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *
 *     responses:
 *       200:
 *         description: Tabiya deleted successfully
 */