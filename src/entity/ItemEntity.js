// src/entities/ItemEntity.js
class ItemEntity {
    constructor({ id, name, harga_pengali, created_at }) {
        this.id = id;
        this.name = name;
        this.harga_pengali = harga_pengali;
        this.created_at = created_at;
    }
}

module.exports = ItemEntity;
