const express = require('express');
const router = express.Router();
const HargaHarianItemDTO = require('../dto/HargaHarianItemDTO');
const HargaHarianItemService = require('../service/HargaHarianItemService');

const {
    successResponse,
    errorResponse,
} = require('../utils/response.utils');

/**
 * @swagger
 * tags:
 *   name: Harga Harian Item
 *   description: API untuk mengelola harga harian item
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     HargaHarianItem:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         tanggal:
 *           type: string
 *           format: date
 *           example: 2025-07-31
 *         harga:
 *           type: number
 *           format: float
 *           example: 25000
 *         item_id:
 *           type: integer
 *           example: 3
 */

// ✅ POST /harga-harian
/**
 * @swagger
 * /harga-harian:
 *   post:
 *     summary: Menyimpan atau mengupdate harga harian item
 *     tags: [Harga Harian Item]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/HargaHarianItem'
 *     responses:
 *       200:
 *         description: Harga berhasil disimpan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Harga berhasil disimpan
 *                 data:
 *                   $ref: '#/components/schemas/HargaHarianItem'
 *       400:
 *         description: Terjadi kesalahan saat menyimpan harga
 */
router.post('/', async (req, res) => {
    try {
        const dto = new HargaHarianItemDTO(req.body);
        const result = await HargaHarianItemService.createOrUpdate(dto);
        return successResponse(res, 'Harga berhasil disimpan', result);
    } catch (err) {
        return errorResponse(res, 'Terjadi kesalahan saat menyimpan harga', err);
    }
});

// ✅ GET /harga-harian/:item_id
/**
 * @swagger
 * /harga-harian/{item_id}:
 *   get:
 *     summary: Mengambil harga harian terbaru untuk item tertentu
 *     tags: [Harga Harian Item]
 *     parameters:
 *       - in: path
 *         name: item_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID dari item
 *     responses:
 *       200:
 *         description: Harga ditemukan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Harga berhasil ditemukan
 *                 data:
 *                   $ref: '#/components/schemas/HargaHarianItem'
 *       404:
 *         description: Harga tidak ditemukan
 */
router.get('/:item_id', async (req, res) => {
    try {
        const result = await HargaHarianItemService.getToday(req.params.item_id);
        if (!result) return errorResponse(res, 'Harga tidak ditemukan', null, 404);
        return successResponse(res, 'Harga berhasil ditemukan', result);
    } catch (err) {
        return errorResponse(res, 'Terjadi kesalahan saat mengambil data', err);
    }
});

// ✅ GET /harga-harian
/**
 * @swagger
 * /harga-harian:
 *   get:
 *     summary: Mengambil semua data harga harian item
 *     tags: [Harga Harian Item]
 *     responses:
 *       200:
 *         description: Data berhasil ditemukan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Data berhasil ditemukan
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/HargaHarianItem'
 */
router.get('/', async (req, res) => {
    try {
        const items = await HargaHarianItemService.getAll();
        return successResponse(res, 'Data berhasil ditemukan', items);
    } catch (err) {
        return errorResponse(res, 'Terjadi kesalahan saat mengambil data', err);
    }
});

module.exports = router;
