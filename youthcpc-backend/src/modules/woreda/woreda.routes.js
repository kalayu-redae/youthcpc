'use strict';

const router = require('express').Router();
const woredaController = require('./woreda.controller');

const { authenticationJwt } = require('../../utils/authUtils');

router.use(authenticationJwt);

router.post('/', woredaController.createWoreda);

router.get('/', woredaController.getAllWoredas);

router.get('/:id', woredaController.getWoreda);

router.patch('/:id', woredaController.updateWoreda);

router.delete('/:id', woredaController.deleteWoreda);

router.patch('/status/:id', woredaController.updateStatus);

module.exports = router;


/**
 * @swagger
 * tags:
 *   name: Woredas
 *   description: Woreda management APIs
 */


/**
 * @swagger
 * /woredas:
 *   post:
 *     summary: Create a new woreda
 *     tags: [Woredas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             zoneId: 1
 *             name: Mekelle City
 *             code: MKL
 *     responses:
 *       201:
 *         description: Woreda created successfully
 */


/**
 * @swagger
 * /woredas:
 *   get:
 *     summary: Get all woredas
 *     tags: [Woredas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: zoneId
 *         schema:
 *           type: integer
 *         description: Filter by zone ID
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search woreda by name
 *     responses:
 *       200:
 *         description: Woredas fetched successfully
 */


/**
 * @swagger
 * /woredas/{id}:
 *   get:
 *     summary: Get woreda by ID
 *     tags: [Woredas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Woreda fetched successfully
 */


/**
 * @swagger
 * /woredas/{id}:
 *   patch:
 *     summary: Update woreda
 *     tags: [Woredas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             zoneId: 2
 *             name: Updated Woreda
 *             code: WR001
 *     responses:
 *       200:
 *         description: Woreda updated successfully
 */


/**
 * @swagger
 * /woredas/{id}:
 *   delete:
 *     summary: Delete woreda
 *     tags: [Woredas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Woreda deleted successfully
 */


/**
 * @swagger
 * /woredas/status/{id}:
 *   patch:
 *     summary: Activate or deactivate woreda
 *     tags: [Woredas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Woreda status updated successfully
 */