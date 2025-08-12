// src/entities/PemasukanDetailEntity.js
class PemasukanDetailEntity {
    constructor({
        id,
        pemasukan_id,
        item_id,
        kilo_pesanan,
        total_pengait,
        total_hutang,
        total_pesanan,
        total_bayar,
        tanggal,
        created_at
    }) {
        this.id = id;
        this.pemasukan_id = pemasukan_id;
        this.item_id = item_id;
        this.kilo_pesanan = kilo_pesanan;
        this.total_pengait = total_pengait;
        this.total_hutang = total_hutang;
        this.total_pesanan = total_pesanan;
        this.total_bayar = total_bayar;
        this.tanggal = tanggal;
        this.created_at = created_at;
    }
}

module.exports = PemasukanDetailEntity;
