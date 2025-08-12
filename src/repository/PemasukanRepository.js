// src/repositories/PemasukanRepository.js
const db = require("../config/db");

class PemasukanRepository {
    async findAll() {
        const result = await db.query("SELECT * FROM pemasukan ORDER BY id DESC");
        return result.rows;
    }

    async findById(id) {
        const result = await db.query("SELECT * FROM pemasukan WHERE id = $1", [id]);
        return result.rows[0];
    }

    async create({ deskripsi, jumlah, tanggal, customer_id, tipe_id }) {
        const result = await db.query(
            `INSERT INTO pemasukan (deskripsi, jumlah, tanggal, customer_id, tipe_id, created_at)
             VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING *`,
            [deskripsi, jumlah, tanggal, customer_id, tipe_id]
        );
        return result.rows[0];
    }

    async update(id, { deskripsi, jumlah, tanggal, customer_id, tipe_id }) {
        const result = await db.query(
            `UPDATE pemasukan SET deskripsi = $1, jumlah = $2, tanggal = $3, customer_id = $4, tipe_id = $5
             WHERE id = $6 RETURNING *`,
            [deskripsi, jumlah, tanggal, customer_id, tipe_id, id]
        );
        return result.rows[0];
    }

    async delete(id) {
        await db.query("DELETE FROM pemasukan WHERE id = $1", [id]);
        return true;
    }
}

module.exports = new PemasukanRepository();
