const pool = require('../config/db');

const findByUsername = async (username) => {
    const result = await pool.query('SELECT * FROM admin_user WHERE username = $1', [username]);
    return result.rows[0];
};

const createAdminUser = async (username, hashedPassword) => {
    const result = await pool.query(
        'INSERT INTO admin_user (username, password) VALUES ($1, $2) RETURNING *',
        [username, hashedPassword]
    );
    return result.rows[0];
};

module.exports = {
    findByUsername,
    createAdminUser,
};
