// src/repositories/PemasukanDetailRepository.js
const db = require("../config/db");

class PemasukanDetailRepository {
    async findAll() {
        const result = await db.query("SELECT * FROM pemasukan_detail ORDER BY id DESC");
        return result.rows;
    }

    async findById(id) {
        const result = await db.query("SELECT * FROM pemasukan_detail WHERE id = $1", [id]);
        return result.rows[0];
    }

    async create(data) {
        const {
            pemasukan_id,
            item_id,
            kilo_pesanan,
            total_pengait,
            total_hutang,
            total_pesanan,
            total_bayar,
            tanggal
        } = data;

        const result = await db.query(
            `INSERT INTO pemasukan_detail
            (pemasukan_id, item_id, kilo_pesanan, total_pengait, total_hutang, total_pesanan, total_bayar, tanggal, created_at)
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8,NOW()) RETURNING *`,
            [pemasukan_id, item_id, kilo_pesanan, total_pengait, total_hutang, total_pesanan, total_bayar, tanggal]
        );
        return result.rows[0];
    }

    async update(id, data) {
        const {
            kilo_pesanan,
            total_pengait,
            total_hutang,
            total_pesanan,
            total_bayar,
            tanggal
        } = data;

        const result = await db.query(
            `UPDATE pemasukan_detail
             SET kilo_pesanan = $1, total_pengait = $2, total_hutang = $3,
                 total_pesanan = $4, total_bayar = $5, tanggal = $6
             WHERE id = $7 RETURNING *`,
            [kilo_pesanan, total_pengait, total_hutang, total_pesanan, total_bayar, tanggal, id]
        );
        return result.rows[0];
    }

    async delete(id) {
        await db.query("DELETE FROM pemasukan_detail WHERE id = $1", [id]);
        return true;
    }
}

module.exports = new PemasukanDetailRepository();
