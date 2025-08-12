// src/repositories/ModalRepository.js
const db = require("../config/db");

class ModalRepository {
    async findAll() {
        const result = await db.query("SELECT * FROM modal ORDER BY id DESC");
        return result.rows;
    }

    async findById(id) {
        const result = await db.query("SELECT * FROM modal WHERE id = $1", [id]);
        return result.rows[0];
    }

    async create({ item_id, nama_item, harga_modal }) {
        const result = await db.query(
            "INSERT INTO modal (item_id, nama_item, harga_modal, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *",
            [item_id, nama_item, harga_modal]
        );
        return result.rows[0];
    }

    async update(id, { nama_item, harga_modal }) {
        const result = await db.query(
            "UPDATE modal SET nama_item = $1, harga_modal = $2 WHERE id = $3 RETURNING *",
            [nama_item, harga_modal, id]
        );
        return result.rows[0];
    }

    async delete(id) {
        await db.query("DELETE FROM modal WHERE id = $1", [id]);
        return true;
    }
}

module.exports = new ModalRepository();
