class PengeluaranEntity {
    constructor({ id, deskripsi, jumlah, tanggal, created_at, tipe_id }) {
        this.id = id;
        this.deskripsi = deskripsi;
        this.jumlah = jumlah;
        this.tanggal = tanggal;
        this.created_at = created_at;
        this.tipe_id = tipe_id;
    }
}

module.exports = PengeluaranEntity;
