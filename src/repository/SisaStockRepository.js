// src/repositories/SisaStockRepository.js
const db = require("../config/db");

class SisaStockRepository {
    async findAll() {
        const result = await db.query("SELECT * FROM sisa_stock ORDER BY id DESC");
        return result.rows;
    }

    async findById(id) {
        const result = await db.query("SELECT * FROM sisa_stock WHERE id = $1", [id]);
        return result.rows[0];
    }

    async create({ item_id, jumlah_stock }) {
        const result = await db.query(
            "INSERT INTO sisa_stock (item_id, jumlah_stock, created_at) VALUES ($1, $2, NOW()) RETURNING *",
            [item_id, jumlah_stock]
        );
        return result.rows[0];
    }

    async update(id, { jumlah_stock }) {
        const result = await db.query(
            "UPDATE sisa_stock SET jumlah_stock = $1 WHERE id = $2 RETURNING *",
            [jumlah_stock, id]
        );
        return result.rows[0];
    }

    async delete(id) {
        await db.query("DELETE FROM sisa_stock WHERE id = $1", [id]);
        return true;
    }
}

module.exports = new SisaStockRepository();
