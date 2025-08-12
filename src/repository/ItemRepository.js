// src/repositories/ItemRepository.js
const db = require("../config/db");

class ItemRepository {
    async findAll() {
        const result = await db.query("SELECT * FROM item ORDER BY id DESC");
        return result.rows;
    }

    async findById(id) {
        const result = await db.query("SELECT * FROM item WHERE id = $1", [id]);
        return result.rows[0];
    }

    async create({ name, harga_pengait }) {
        const result = await db.query(
            "INSERT INTO item (name, harga_pengait, created_at) VALUES ($1, $2, NOW()) RETURNING *",
            [name, harga_pengait]
        );
        return result.rows[0];
    }

    async update(id, { name, harga_pengait }) {
        const result = await db.query(
            "UPDATE item SET name = $1, harga_pengait = $2 WHERE id = $3 RETURNING *",
            [name, harga_pengait, id]
        );
        return result.rows[0];
    }

    async delete(id) {
        await db.query("DELETE FROM item WHERE id = $1", [id]);
        return true;
    }
}

module.exports = new ItemRepository();
