const db = require("../config/db");

class PengeluaranRepository {
    async findAll() {
        const result = await db.query(`
        SELECT id, deskripsi, jumlah, tanggal, created_at
        FROM pengeluaran
        ORDER BY created_at DESC
    `);
        return result.rows;
    }

    async findById(id) {
        const result = await db.query("SELECT * FROM pengeluaran WHERE id = $1", [id]);
        return result.rows[0];
    }

    async findByTipeId(tipe_id) {
        const result = await db.query("SELECT * FROM pengeluaran WHERE tipe_id = $1", [tipe_id]);
        return result.rows;
    }

    async findAllByDate(tanggal) {
        const result = await db.query(
            `SELECT *
             FROM pengeluaran
             WHERE tanggal = $1
             ORDER BY created_at DESC`,
            [tanggal]
        );
        return result.rows;
    }

    async findByDateAndTipe(tanggal, tipe_id) {
        const result = await db.query(
            "SELECT * FROM pengeluaran WHERE tanggal = $1 AND tipe_id = $2",
            [tanggal, tipe_id]
        );
        return result.rows[0];
    }

    async create(entity) {
        const result = await db.query(
            `INSERT INTO pengeluaran (deskripsi, jumlah, tanggal, tipe_id, created_at)
         VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [entity.deskripsi, entity.jumlah, entity.tanggal, entity.tipe_id, entity.created_at]
        );
        return result.rows[0];
    }

    async getTotalHarian() {
        const result = await db.query(`
        SELECT tanggal, COALESCE(SUM(jumlah), 0) AS total_harian
        FROM pengeluaran
        GROUP BY tanggal
        ORDER BY tanggal DESC
    `);
        return result.rows[0].total_harian; // ini array [{tanggal: ..., total_harian: ...}, ...]
    }


    async getTotalPerTipe(tipe_id) {
        const result = await db.query(
            `SELECT COALESCE(SUM(jumlah), 0) AS total_per_tipe
         FROM pengeluaran
         WHERE tipe_id = $1`,
            [tipe_id]
        );
        return result.rows[0].total_per_tipe;
    }



    async update(id, entity) {
        const result = await db.query(
            `UPDATE pengeluaran 
             SET deskripsi = $1, jumlah = $2, tanggal = $3, tipe_id = $4
             WHERE id = $5 RETURNING *`,
            [entity.deskripsi, entity.jumlah, entity.tanggal, entity.tipe_id, id]
        );
        return result.rows[0];
    }

    async delete(id) {
        const result = await db.query("DELETE FROM pengeluaran WHERE id = $1 RETURNING *", [id]);
        return result.rows[0];
    }
}

module.exports = new PengeluaranRepository();
