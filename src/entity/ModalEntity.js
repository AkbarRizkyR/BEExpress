// src/entities/ModalEntity.js
class ModalEntity {
    constructor({ id, item_id, nama_item, harga_modal, created_at }) {
        this.id = id;
        this.item_id = item_id;
        this.nama_item = nama_item;
        this.harga_modal = harga_modal;
        this.created_at = created_at;
    }
}

module.exports = ModalEntity;
