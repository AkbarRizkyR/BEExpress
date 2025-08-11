const express = require("express");
const router = express.Router();

const PengeluaranService = require("../service/PengeluaranService");
const CreatePengeluaranDto = require("../dto/CreatePengeluaranDto");
const UpdatePengeluaranDto = require("../dto/UpdatePengeluaranDto");

const {
    successResponse,
    notFoundResponse,
    errorResponse,
} = require("../utils/response.utils");

const authenticateToken = require("../middlewares/auth.middleware");

// ⛔ Middleware untuk semua route di bawah /pengeluaran
router.use(authenticateToken);

/**
 * @swagger
 * tags:
 *   name: Pengeluaran
 *   description: API untuk manajemen pengeluaran
 */

/**
 * @swagger
 * /pengeluaran:
 *   get:
 *     summary: Ambil semua data pengeluaran
 *     tags: [Pengeluaran]
 *     responses:
 *       200:
 *         description: Daftar pengeluaran
 */
router.get("/", async (req, res) => {
    try {
        const data = await PengeluaranService.getAllWithTotal();
        return successResponse(res, data, "Berhasil mengambil data pengeluaran");
    } catch (err) {
        return errorResponse(res, err.message);
    }
});

/**
 * @swagger
 * /pengeluaran/{id}:
 *   get:
 *     summary: Ambil pengeluaran berdasarkan ID
 *     tags: [Pengeluaran]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detail pengeluaran
 */
router.get("/:id", async (req, res) => {
    try {
        const data = await PengeluaranService.getDetailWithTotalPerTipe(req.params.id);
        if (!data) return notFoundResponse(res, "Pengeluaran tidak ditemukan");
        return successResponse(res, data, "Berhasil mengambil detail pengeluaran");
    } catch (err) {
        return errorResponse(res, err.message);
    }
});

/**
 * @swagger
 * /pengeluaran/harian:
 *   post:
 *     summary: Generate pengeluaran harian secara manual
 *     tags: [Pengeluaran]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tanggal:
 *                 type: string
 *                 format: date
 *                 example: "2025-08-11"
 *     responses:
 *       200:
 *         description: Pengeluaran harian berhasil dibuat
 */
router.post("/harian", async (req, res) => {
    try {
        const { tanggal } = req.body;
        const result = await PengeluaranService.insertPengeluaranHariIni(
            tanggal ? new Date(tanggal) : undefined
        );

        if (!result.data || result.data.length === 0) {
            return notFoundResponse(res, "Tidak ada pengeluaran yang dibuat (sudah ada atau bukan tanggal 1 untuk bulanan)");
        }

        return successResponse(res, result, "Pengeluaran harian berhasil dibuat");
    } catch (err) {
        return errorResponse(res, err.message);
    }
});



/**
 * @swagger
 * /pengeluaran:
 *   post:
 *     summary: Tambah data pengeluaran
 *     tags: [Pengeluaran]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pengeluaran'
 *     responses:
 *       201:
 *         description: Pengeluaran berhasil ditambahkan
 */
router.post("/", async (req, res) => {
    try {
        const dto = new CreatePengeluaranDto(req.body);
        const created = await PengeluaranService.create(dto);
        return successResponse(res, created, "Pengeluaran berhasil ditambahkan", 201);
    } catch (err) {
        return errorResponse(res, err.message, 400);
    }
});

/**
 * @swagger
 * /pengeluaran/{id}:
 *   put:
 *     summary: Update data pengeluaran
 *     tags: [Pengeluaran]
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
 *           schema:
 *             $ref: '#/components/schemas/Pengeluaran'
 *     responses:
 *       200:
 *         description: Pengeluaran berhasil diperbarui
 */
router.put("/:id", async (req, res) => {
    try {
        const dto = new UpdatePengeluaranDto(req.body);
        const updated = await PengeluaranService.update(req.params.id, dto);
        if (!updated) return notFoundResponse(res, "Pengeluaran tidak ditemukan");
        return successResponse(res, updated, "Pengeluaran berhasil diperbarui");
    } catch (err) {
        return errorResponse(res, err.message, 400);
    }
});

/**
 * @swagger
 * /pengeluaran/{id}:
 *   delete:
 *     summary: Hapus data pengeluaran
 *     tags: [Pengeluaran]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pengeluaran berhasil dihapus
 */
router.delete("/:id", async (req, res) => {
    try {
        const deleted = await PengeluaranService.delete(req.params.id);
        if (!deleted) return notFoundResponse(res, "Pengeluaran tidak ditemukan");
        return successResponse(res, null, "Pengeluaran berhasil dihapus");
    } catch (err) {
        return errorResponse(res, err.message);
    }
});

module.exports = router;
