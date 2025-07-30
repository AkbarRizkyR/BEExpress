const pool = require('../config/db');

const CustomerRepository = {
    async findAll() {
        const res = await pool.query('SELECT * FROM customer ORDER BY id');
        return res.rows;
    },

    async findById(id) {
        const res = await pool.query('SELECT * FROM customer WHERE id = $1', [id]);
        return res.rows[0];
    },

    async create(data) {
        const { name, total_hutang, total_pesanan, total_bayar, kilo_pesanan } = data;
        const res = await pool.query(`
      INSERT INTO customer (name, total_hutang, total_pesanan, total_bayar, kilo_pesanan)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *`,
            [name, total_hutang || 0, total_pesanan || 0, total_bayar || 0, kilo_pesanan || 0]
        );
        return res.rows[0];
    },

    async update(id, data) {
        const { name, total_hutang, total_pesanan, total_bayar, kilo_pesanan } = data;
        const res = await pool.query(`
      UPDATE customer
      SET name = COALESCE($1, name),
          total_hutang = COALESCE($2, total_hutang),
          total_pesanan = COALESCE($3, total_pesanan),
          total_bayar = COALESCE($4, total_bayar),
          kilo_pesanan = COALESCE($5, kilo_pesanan),
          updated_at = NOW()
      WHERE id = $6 
      RETURNING *`,
            [name, total_hutang, total_pesanan, total_bayar, kilo_pesanan, id]
        );
        return res.rows[0];
    },

    async delete(id) {
        // Dapatkan dulu apakah ini ID terbesar
        const maxRes = await pool.query('SELECT MAX(id) as max_id FROM customer');
        const isMax = maxRes.rows[0].max_id == id;

        const res = await pool.query('DELETE FROM customer WHERE id = $1', [id]);

        if (isMax) {
            await pool.query(`
        SELECT setval(
          pg_get_serial_sequence('customer', 'id'), 
          COALESCE((SELECT MAX(id) FROM customer), 0) + 1, 
          false
        )`);
        }

        return res.rowCount > 0;
    }
};

module.exports = CustomerRepository;
