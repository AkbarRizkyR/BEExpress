const pool = require('../config/db');

const ItemRepository = {
    async findAll() {
        const result = await pool.query('SELECT * FROM item ORDER BY id ASC');
        return result.rows;
    },

    async findById(id) {
        const result = await pool.query('SELECT * FROM item WHERE id = $1', [id]);
        return result.rows[0];
    },

    async save(dto) {
        const result = await pool.query(
            'INSERT INTO item (name, harga_pengali, created_at) VALUES ($1, $2, NOW()) RETURNING *',
            [dto.name, dto.harga_pengali]
        );
        return result.rows[0];
    }
};

module.exports = ItemRepository;
