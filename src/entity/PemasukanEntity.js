// src/entities/PemasukanEntity.js
class PemasukanEntity {
    constructor({ id, deskripsi, jumlah, tanggal, customer_id, created_at, tipe_id }) {
        this.id = id;
        this.deskripsi = deskripsi;
        this.jumlah = jumlah;
        this.tanggal = tanggal;
        this.customer_id = customer_id;
        this.created_at = created_at;
        this.tipe_id = tipe_id;
    }
}

module.exports = PemasukanEntity;
