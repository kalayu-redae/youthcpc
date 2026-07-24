'use strict';

const router = require('express').Router();
const newsController = require('./news.controller');
const { authenticationJwt } = require('../../utils/authUtils');


// Public routes
router.get('/public', newsController.getPublishedNews);

router.get('/public/:slug', newsController.getNewsBySlug);


// Admin routes
// router.use(authenticationJwt);


router.post('/', newsController.createNews);

router.get('/', newsController.getNews);

router.get('/summary', newsController.getNewsSummary);

router.get('/:newsId', newsController.getNewsById);

router.patch('/:newsId', newsController.updateNews);

router.patch('/publish/:newsId', newsController.publishNews);

router.patch('/status/:newsId', newsController.updateNewsStatus);

router.delete('/:newsId', newsController.deleteNews);


module.exports = router;



/**
 * @swagger
 * tags:
 *   name: News
 *   description: News management APIs
 */


/**
 * @swagger
 * /news:
 *   post:
 *     summary: Create news article
 *     tags: [News]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             title: CPCT Youth Training Program
 *             slug: cpct-youth-training-program
 *             summary: Youth leadership training announcement
 *             content: Detailed news content here
 *             image: training.jpg
 *             category: Training
 *     responses:
 *       201:
 *         description: News created successfully
 */


/**
 * @swagger
 * /news:
 *   get:
 *     summary: Get all news
 *     tags: [News]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search news
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum:
 *             - DRAFT
 *             - PUBLISHED
 *             - ARCHIVED
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
 *         description: News fetched successfully
 */


/**
 * @swagger
 * /news/{newsId}:
 *   get:
 *     summary: Get news by ID
 *     tags: [News]
 *     parameters:
 *       - in: path
 *         name: newsId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: News fetched successfully
 */


/**
 * @swagger
 * /news/{newsId}:
 *   patch:
 *     summary: Update news
 *     tags: [News]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: newsId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             title: Updated news title
 *             summary: Updated summary
 *             content: Updated content
 *             category: Announcement
 *     responses:
 *       200:
 *         description: News updated successfully
 */


/**
 * @swagger
 * /news/publish/{newsId}:
 *   patch:
 *     summary: Publish news article
 *     tags: [News]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: newsId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: News published successfully
 */


/**
 * @swagger
 * /news/status/{newsId}:
 *   patch:
 *     summary: Activate or deactivate news
 *     tags: [News]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: newsId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: News status updated successfully
 */


/**
 * @swagger
 * /news/{newsId}:
 *   delete:
 *     summary: Delete news
 *     tags: [News]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: newsId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: News deleted successfully
 */


/**
 * @swagger
 * /news/summary:
 *   get:
 *     summary: Get news summary
 *     tags: [News]
 *     responses:
 *       200:
 *         description: News statistics fetched successfully
 */


/**
 * @swagger
 * /news/public:
 *   get:
 *     summary: Get published news
 *     tags: [News]
 *     responses:
 *       200:
 *         description: Published news fetched successfully
 */


/**
 * @swagger
 * /news/public/{slug}:
 *   get:
 *     summary: Get public news by slug
 *     tags: [News]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Public news fetched successfully
 */