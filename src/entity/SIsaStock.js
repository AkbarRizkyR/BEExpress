// src/entities/SisaStockEntity.js
class SisaStockEntity {
    constructor({ id, item_id, jumlah_stock, created_at }) {
        this.id = id;
        this.item_id = item_id;
        this.jumlah_stock = jumlah_stock;
        this.created_at = created_at;
    }
}

module.exports = SisaStockEntity;
