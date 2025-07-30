const express = require('express');
const router = express.Router();
const CustomerService = require('../service/customer.service');
const {
    successResponse,
    notFoundResponse,
    errorResponse,
} = require('../utils/response.utils');

const authenticateToken = require('../middlewares/auth.middleware');

// ⛔ Middleware untuk semua route di bawah /customers
router.use(authenticateToken);

/**
 * @swagger
 * tags:
 *   name: Customer
 *   description: API untuk manajemen customer
 */


/**
 * @swagger
 * /customers:
 *   get:
 *     summary: Mengambil semua customer
 *     tags: [Customer]
 *     responses:
 *       200:
 *         description: Data berhasil ditemukan
 */
router.get('/', async (req, res) => {
    try {
        const data = await CustomerService.getAll();
        return successResponse(res, 'Data berhasil ditemukan', data);
    } catch (err) {
        return errorResponse(res, 'Terjadi kesalahan saat mengambil data', err);
    }
});

/**
 * @swagger
 * /customers/{id}:
 *   get:
 *     summary: Mengambil customer berdasarkan ID
 *     tags: [Customer]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID dari customer
 *     responses:
 *       200:
 *         description: Data berhasil ditemukan
 */
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const data = await CustomerService.getById(id);

        if (!data) {
            return notFoundResponse(res, 'Data tidak ditemukan');
        }

        return successResponse(res, 'Data berhasil ditemukan', data);
    } catch (err) {
        return errorResponse(res, 'Terjadi kesalahan saat mengambil data', err);
    }
});

/**
 * @swagger
 * /customers:
 *   post:
 *     summary: Menambahkan customer baru
 *     tags: [Customer]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Data berhasil ditambahkan
 */
router.post('/', async (req, res) => {
    try {
        const data = await CustomerService.create(req.body);
        return successResponse(res, 'Data berhasil ditambahkan', data);
    } catch (err) {
        return errorResponse(res, 'Terjadi kesalahan saat menambahkan data', err);
    }
});

/**
 * @swagger
 * /customers/{id}:
 *   put:
 *     summary: Memperbarui data customer berdasarkan ID
 *     tags: [Customer]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID customer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Data berhasil diperbarui
 *       404:
 *         description: Data tidak ditemukan
 */
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const data = await CustomerService.update(id, req.body);

        if (!data) {
            return notFoundResponse(res, 'Data tidak ditemukan untuk diperbarui');
        }

        return successResponse(res, 'Data berhasil diperbarui', data);
    } catch (err) {
        return errorResponse(res, 'Terjadi kesalahan saat memperbarui data', err);
    }
});

/**
 * @swagger
 * /customers/{id}:
 *   post:
 *     summary: Menghapus customer berdasarkan ID
 *     tags: [Customer]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID customer
 *     responses:
 *       200:
 *         description: Data berhasil dihapus
 *       404:
 *         description: Data tidak ditemukan
 */
router.post('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const isDeleted = await CustomerService.delete(id);

        if (!isDeleted) {
            return notFoundResponse(res, 'Data tidak ditemukan untuk dihapus');
        }

        return successResponse(res, 'Data berhasil dihapus');
    } catch (err) {
        return errorResponse(res, 'Terjadi kesalahan saat menghapus data', err);
    }
});

module.exports = router;
