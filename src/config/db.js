const { Pool } = require('pg');
require('dotenv').config();

// Gunakan connection URI
// const pool = new Pool({
//   connectionString: process.env.DB_URI,
//   ssl: {
//     rejectUnauthorized: false // Required for Supabase connection
//   }
// });

// Atau jika menggunakan komponen terpisah

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: { rejectUnauthorized: false }
});


module.exports = {
    query: (text, params) => pool.query(text, params),
};