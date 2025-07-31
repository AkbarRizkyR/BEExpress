const db = require('../config/db'); // pakai `pg.Pool`

const HargaHarianItemRepository = {
    async findByItemAndDate(item_id, tanggal) {
        const result = await db.query(
            `SELECT * FROM harga_harian_item WHERE item_id = $1 AND tanggal = $2`,
            [item_id, tanggal]
        );
        return result.rows[0] || null;
    },

    async upsert(dto) {
        const result = await db.query(`
      INSERT INTO harga_harian_item (item_id, harga, tanggal)
      VALUES ($1, $2, $3)
      ON CONFLICT (item_id, tanggal) DO UPDATE SET harga = EXCLUDED.harga
      RETURNING *;
    `, [dto.item_id, dto.harga, dto.tanggal]);
        return result.rows[0];
    },

    async getAll() {
        const result = await db.query(`SELECT * FROM harga_harian_item ORDER BY tanggal DESC`);
        return result.rows;
    }
};

module.exports = HargaHarianItemRepository;
