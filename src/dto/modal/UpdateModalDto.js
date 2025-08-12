// src/dto/modal/UpdateModalDto.js
class UpdateModalDto {
    constructor({ nama_item, harga_modal }) {
        this.nama_item = nama_item ?? null;
        this.harga_modal = harga_modal ?? null;
    }
}

module.exports = UpdateModalDto;
