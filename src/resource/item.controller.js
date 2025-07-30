const express = require('express');
const router = express.Router();

const {
    successResponse,
    notFoundResponse,
    errorResponse,
} = require('../utils/response.utils');

const ItemService = require('../service/item.service');
const ItemDTO = require('../dto/item.dto');

const authenticateToken = require('../middlewares/auth.middleware');

// ⛔ Middleware untuk semua route di bawah /customers
router.use(authenticateToken);

/**
 * @swagger
 * tags:
 *   name: Items
 *   description: API untuk item
 */

/**
 * @swagger
 * /items:
 *   get:
 *     summary: Ambil semua item
 *     tags: [Items]
 *     responses:
 *       200:
 *         description: Berhasil mengambil data
 */
router.get('/', async (req, res) => {
    try {
        const items = await ItemService.getAll();
        console.log('Items retrieved successfully:', items);
        return successResponse(res, 'Data berhasil ditemukan', items);
    } catch (err) {
        return errorResponse(res, 'Terjadi kesalahan saat mengambil data', err);
    }
});

/**
 * @swagger
 * /items/{id}:
 *   get:
 *     summary: Ambil item berdasarkan ID
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Berhasil menemukan item
 *       404:
 *         description: Item tidak ditemukan
 */
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const item = await ItemService.getById(id);
        return successResponse(res, 'Data berhasil ditemukan', item);
    } catch (err) {
        return notFoundResponse(res, 'Data tidak ditemukan');
    }
});

/**
 * @swagger
 * /items/create:
 *   post:
 *     summary: Tambah item baru
 *     tags: [Items]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - harga_pengali
 *             properties:
 *               name:
 *                 type: string
 *               harga_pengali:
 *                 type: number
 *     responses:
 *       201:
 *         description: Item berhasil ditambahkan
 */
router.post('/create', async (req, res) => {
    try {
        const dto = new ItemDTO(req.body);
        const item = await ItemService.create(dto);
        return successResponse(res, 'Item berhasil ditambahkan', item);
    } catch (err) {
        return errorResponse(res, 'Terjadi kesalahan saat menambahkan item', err);
    }
});

module.exports = router;
