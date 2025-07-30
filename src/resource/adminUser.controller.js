const express = require('express');
const router = express.Router();
const service = require('../service/adminUser.service');
const {
    successResponse,
    errorResponse,
} = require('../utils/response.utils');

/**
 * @swagger
 * tags:
 *   name: AdminUser
 *   description: Endpoints for Admin User login and registration
 */

/**
 * @swagger
 * /admin/register:
 *   post:
 *     summary: Register a new admin
 *     tags: [AdminUser]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Admin registered successfully
 *       400:
 *         description: Registration failed
 */
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const result = await service.register(username, password);
        return successResponse(res, result, 'Admin registered successfully');
    } catch (err) {
        return errorResponse(res, err.message || 'Registration failed', 400);
    }
});

/**
 * @swagger
 * /admin/login:
 *   post:
 *     summary: Login as admin
 *     tags: [AdminUser]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Login failed
 */
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const result = await service.login(username, password);
        return successResponse(res, result, 'Login successful');
    } catch (err) {
        return errorResponse(res, err.message || 'Login failed', 401);
    }
});

module.exports = router;
