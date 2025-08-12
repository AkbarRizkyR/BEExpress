// src/repositories/HargaHarianItemRepository.js
const db = require("../config/db");

class HargaHarianItemRepository {
    async findAll() {
        const result = await db.query("SELECT * FROM harga_harian_item ORDER BY id DESC");
        return result.rows;
    }

    async findById(id) {
        const result = await db.query("SELECT * FROM harga_harian_item WHERE id = $1", [id]);
        return result.rows[0];
    }

    async create({ item_id, harga, tanggal }) {
        const result = await db.query(
            "INSERT INTO harga_harian_item (item_id, harga, tanggal, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *",
            [item_id, harga, tanggal]
        );
        return result.rows[0];
    }

    async update(id, { harga, tanggal }) {
        const result = await db.query(
            "UPDATE harga_harian_item SET harga = $1, tanggal = $2 WHERE id = $3 RETURNING *",
            [harga, tanggal, id]
        );
        return result.rows[0];
    }

    async delete(id) {
        await db.query("DELETE FROM harga_harian_item WHERE id = $1", [id]);
        return true;
    }
}

module.exports = new HargaHarianItemRepository();
