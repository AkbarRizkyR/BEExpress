// src/entities/HargaHarianItemEntity.js
class HargaHarianItemEntity {
    constructor({ id, item_id, harga, tanggal, created_at }) {
        this.id = id;
        this.item_id = item_id;
        this.harga = harga;
        this.tanggal = tanggal;
        this.created_at = created_at;
    }
}

module.exports = HargaHarianItemEntity;
